import { eq, and, sql } from "drizzle-orm";
import { db } from "../../database/db.js";
import { taxRates } from "../../database/schemas/index.js";
import { products }  from "../../database/schemas/index.js";
import { businesses } from "../../database/schemas/index.js";
import { MSG } from "../../utils/constants.js";

function throwError(msg, code = 400) {
  throw Object.assign(new Error(msg), { statusCode: code });
}

function sanitize(body) {
  const allowed = ["taxName", "hsnCode", "sacCode", "cgstRate", "sgstRate", "igstRate", "cessRate", "isActive"];
  const data = {};
  for (const key of allowed) {
    if (body[key] === undefined) continue;
    data[key] = typeof body[key] === "string" ? body[key].trim() || null : body[key];
  }
  if (data.taxName === null) delete data.taxName;
  return data;
}

async function assertBusinessOwner(businessId, userId) {
  const [biz] = await db
    .select({ id: businesses.id })
    .from(businesses)
    .where(and(eq(businesses.id, businessId), eq(businesses.ownerId, userId)));
  if (!biz) throwError("Business not found or access denied.", 403);
}

export const taxRatesService = {

  async getTaxRates(businessId, userId, query = {}) {
    await assertBusinessOwner(businessId, userId);

    const conditions = [eq(taxRates.businessId, businessId)];
    if (!query.includeInactive || query.includeInactive === "false") {
      conditions.push(eq(taxRates.isActive, true));
    }

    return db
      .select()
      .from(taxRates)
      .where(and(...conditions))
      .orderBy(taxRates.taxName);
  },

  async getTaxRateById(id, businessId, userId) {
    await assertBusinessOwner(businessId, userId);

    const [rate] = await db
      .select()
      .from(taxRates)
      .where(and(eq(taxRates.id, id), eq(taxRates.businessId, businessId)));

    return rate ?? null;
  },

  async createTaxRate(businessId, userId, payload) {
    await assertBusinessOwner(businessId, userId);

    const data = sanitize(payload);

    // Name uniqueness (case-insensitive)
    const [dup] = await db
      .select({ id: taxRates.id })
      .from(taxRates)
      .where(
        and(
          eq(taxRates.businessId, businessId),
          sql`LOWER(${taxRates.taxName}) = LOWER(${data.taxName})`,
          eq(taxRates.isActive, true),
        )
      );
    if (dup) throwError(MSG.TAX_RATE_NAME_EXISTS, 409);

    const [created] = await db
      .insert(taxRates)
      .values({ businessId, ...data })
      .returning();

    return created;
  },

  async updateTaxRate(id, businessId, userId, payload) {
    await assertBusinessOwner(businessId, userId);

    const existing = await taxRatesService.getTaxRateById(id, businessId, userId);
    if (!existing) throwError(MSG.TAX_RATE_NOT_FOUND, 404);

    const data = sanitize(payload);

    // Name uniqueness (exclude self)
    if (data.taxName) {
      const [dup] = await db
        .select({ id: taxRates.id })
        .from(taxRates)
        .where(
          and(
            eq(taxRates.businessId, businessId),
            sql`LOWER(${taxRates.taxName}) = LOWER(${data.taxName})`,
            eq(taxRates.isActive, true),
            sql`${taxRates.id} != ${id}`,
          )
        );
      if (dup) throwError(MSG.TAX_RATE_NAME_EXISTS, 409);
    }

    const [updated] = await db
      .update(taxRates)
      .set({ ...data, updatedAt: new Date() })
      .where(and(eq(taxRates.id, id), eq(taxRates.businessId, businessId)))
      .returning();

    return updated;
  },

  async deleteTaxRate(id, businessId, userId) {
    await assertBusinessOwner(businessId, userId);

    const existing = await taxRatesService.getTaxRateById(id, businessId, userId);
    if (!existing) throwError(MSG.TAX_RATE_NOT_FOUND, 404);

    // Guard: active products using this tax rate?
    const [inUse] = await db
      .select({ id: products.id })
      .from(products)
      .where(
        and(
          eq(products.taxRateId, id),
          eq(products.businessId, businessId),
          eq(products.isActive, true),
        )
      );
    if (inUse) throwError(MSG.TAX_RATE_IN_USE, 409);

    const [deleted] = await db
      .update(taxRates)
      .set({ isActive: false, updatedAt: new Date() })
      .where(and(eq(taxRates.id, id), eq(taxRates.businessId, businessId)))
      .returning();

    return deleted;
  },
};