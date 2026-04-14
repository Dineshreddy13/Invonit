import { eq, and, isNull, sql } from "drizzle-orm";
import { db } from "../../database/db.js";
import { categories } from "../../database/schemas/index.js";
import { businesses }  from "../../database/schemas/index.js";
import { MSG, MAX_CATEGORY_DEPTH } from "../../utils/constants.js";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function throwError(message, statusCode = 400) {
  throw Object.assign(new Error(message), { statusCode });
}

function sanitize(body) {
  const data = {};
  const allowed = ["name", "description", "parentId", "isActive"];
  for (const key of allowed) {
    if (body[key] === undefined) continue;
    // Normalise empty string parentId → null
    if (key === "parentId" && (body[key] === "" || body[key] === "null")) {
      data[key] = null;
    } else if (typeof body[key] === "string") {
      data[key] = body[key].trim() || null;
    } else {
      data[key] = body[key];
    }
  }
  // name never null
  if (data.name === null) delete data.name;
  return data;
}

async function assertBusinessOwner(businessId, userId) {
  const [biz] = await db
    .select({ id: businesses.id })
    .from(businesses)
    .where(and(eq(businesses.id, businessId), eq(businesses.ownerId, userId)));
  if (!biz) throwError("Business not found or access denied.", 403);
}

// ─── Depth check ─────────────────────────────────────────────────────────────
// Walks up the ancestor chain and returns the depth level (root = 1).
async function getAncestorDepth(parentId, businessId) {
  let depth = 1;
  let currentId = parentId;

  while (currentId) {
    const [parent] = await db
      .select({ id: categories.id, parentId: categories.parentId })
      .from(categories)
      .where(
        and(
          eq(categories.id, currentId),
          eq(categories.businessId, businessId),
        )
      );

    if (!parent) break;
    depth++;
    currentId = parent.parentId;

    if (depth >= MAX_CATEGORY_DEPTH) break;
  }

  return depth;
}

// ─── Circular reference check ─────────────────────────────────────────────────
// Ensures newParentId is not a descendant of categoryId.
async function isCircularRef(categoryId, newParentId, businessId) {
  if (categoryId === newParentId) return true;

  let currentId = newParentId;
  while (currentId) {
    const [node] = await db
      .select({ parentId: categories.parentId })
      .from(categories)
      .where(
        and(
          eq(categories.id, currentId),
          eq(categories.businessId, businessId),
        )
      );

    if (!node) break;
    if (node.parentId === categoryId) return true;
    currentId = node.parentId;
  }

  return false;
}

// ─── Tree builder ─────────────────────────────────────────────────────────────
// Converts a flat list into a nested tree structure.
function buildTree(flat) {
  const map = {};
  const roots = [];

  for (const cat of flat) {
    map[cat.id] = { ...cat, children: [] };
  }

  for (const cat of flat) {
    if (cat.parentId && map[cat.parentId]) {
      map[cat.parentId].children.push(map[cat.id]);
    } else {
      roots.push(map[cat.id]);
    }
  }

  return roots;
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const categoriesService = {

  // List — flat or tree, active-only by default
  async getCategories(businessId, userId, query = {}) {
    await assertBusinessOwner(businessId, userId);

    const { tree, includeInactive, parentId } = query;
    const conditions = [eq(categories.businessId, businessId)];

    if (!includeInactive || includeInactive === "false") {
      conditions.push(eq(categories.isActive, true));
    }

    // Filter to a specific parent (or root-only)
    if (parentId === "null" || parentId === "") {
      conditions.push(isNull(categories.parentId));
    } else if (parentId) {
      conditions.push(eq(categories.parentId, parentId));
    }

    const rows = await db
      .select()
      .from(categories)
      .where(and(...conditions))
      .orderBy(categories.name);

    // Return nested tree when ?tree=true and no parentId filter
    if ((tree === "true" || tree === true) && !parentId) {
      return buildTree(rows);
    }

    return rows;
  },

  async getCategoryById(id, businessId, userId) {
    await assertBusinessOwner(businessId, userId);

    const [category] = await db
      .select()
      .from(categories)
      .where(and(eq(categories.id, id), eq(categories.businessId, businessId)));

    return category ?? null;
  },

  // Get immediate children of a category
  async getChildren(parentId, businessId, userId) {
    await assertBusinessOwner(businessId, userId);

    return db
      .select()
      .from(categories)
      .where(
        and(
          eq(categories.businessId, businessId),
          eq(categories.parentId, parentId),
          eq(categories.isActive, true),
        )
      )
      .orderBy(categories.name);
  },

  async createCategory(businessId, userId, payload) {
    await assertBusinessOwner(businessId, userId);

    const data = sanitize(payload);

    // ── Parent validation ──────────────────────────────────────────────────
    if (data.parentId) {
      const [parent] = await db
        .select()
        .from(categories)
        .where(
          and(
            eq(categories.id, data.parentId),
            eq(categories.businessId, businessId),
            eq(categories.isActive, true),
          )
        );

      if (!parent) throwError("Parent category not found or inactive.", 404);

      // Depth guard
      const depth = await getAncestorDepth(data.parentId, businessId);
      if (depth >= MAX_CATEGORY_DEPTH) {
        throwError(MSG.CATEGORY_DEPTH_EXCEEDED, 422);
      }
    }

    // ── Name uniqueness within same parent ────────────────────────────────
    const nameConditions = [
      eq(categories.businessId, businessId),
      eq(categories.isActive, true),
      sql`LOWER(${categories.name}) = LOWER(${data.name})`,
    ];

    if (data.parentId) {
      nameConditions.push(eq(categories.parentId, data.parentId));
    } else {
      nameConditions.push(isNull(categories.parentId));
    }

    const [duplicate] = await db
      .select({ id: categories.id })
      .from(categories)
      .where(and(...nameConditions));

    if (duplicate) throwError(MSG.CATEGORY_NAME_EXISTS, 409);

    const [created] = await db
      .insert(categories)
      .values({ businessId, ...data })
      .returning();

    return created;
  },

  async updateCategory(id, businessId, userId, payload) {
    await assertBusinessOwner(businessId, userId);

    const existing = await categoriesService.getCategoryById(id, businessId, userId);
    if (!existing) throwError(MSG.CATEGORY_NOT_FOUND, 404);

    const data = sanitize(payload);

    // ── Parent change validation ───────────────────────────────────────────
    const newParentId = Object.prototype.hasOwnProperty.call(data, "parentId")
      ? data.parentId
      : existing.parentId;

    if (newParentId) {
      // Can't set parent to self
      if (newParentId === id) throwError(MSG.CATEGORY_CIRCULAR_REF, 422);

      // Circular ref check
      const circular = await isCircularRef(id, newParentId, businessId);
      if (circular) throwError(MSG.CATEGORY_CIRCULAR_REF, 422);

      // Parent must exist and be active
      const [parent] = await db
        .select()
        .from(categories)
        .where(
          and(
            eq(categories.id, newParentId),
            eq(categories.businessId, businessId),
            eq(categories.isActive, true),
          )
        );
      if (!parent) throwError("Parent category not found or inactive.", 404);

      // Depth check
      const depth = await getAncestorDepth(newParentId, businessId);
      if (depth >= MAX_CATEGORY_DEPTH) throwError(MSG.CATEGORY_DEPTH_EXCEEDED, 422);
    }

    // ── Name uniqueness (exclude self) ────────────────────────────────────
    if (data.name) {
      const nameConditions = [
        eq(categories.businessId, businessId),
        eq(categories.isActive, true),
        sql`LOWER(${categories.name}) = LOWER(${data.name})`,
        sql`${categories.id} != ${id}`,
      ];

      if (newParentId) {
        nameConditions.push(eq(categories.parentId, newParentId));
      } else {
        nameConditions.push(isNull(categories.parentId));
      }

      const [duplicate] = await db
        .select({ id: categories.id })
        .from(categories)
        .where(and(...nameConditions));

      if (duplicate) throwError(MSG.CATEGORY_NAME_EXISTS, 409);
    }

    const [updated] = await db
      .update(categories)
      .set({ ...data, updatedAt: new Date() })
      .where(and(eq(categories.id, id), eq(categories.businessId, businessId)))
      .returning();

    return updated;
  },

  // Soft delete — blocks if active children exist
  async deleteCategory(id, businessId, userId) {
    await assertBusinessOwner(businessId, userId);

    const existing = await categoriesService.getCategoryById(id, businessId, userId);
    if (!existing) throwError(MSG.CATEGORY_NOT_FOUND, 404);

    // Guard: active children?
    const [child] = await db
      .select({ id: categories.id })
      .from(categories)
      .where(
        and(
          eq(categories.parentId, id),
          eq(categories.businessId, businessId),
          eq(categories.isActive, true),
        )
      );

    if (child) throwError(MSG.CATEGORY_HAS_CHILDREN, 409);

    const [deleted] = await db
      .update(categories)
      .set({ isActive: false, updatedAt: new Date() })
      .where(and(eq(categories.id, id), eq(categories.businessId, businessId)))
      .returning();

    return deleted;
  },
};