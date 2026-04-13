import { eq, and, ilike, or, sql } from "drizzle-orm";
import { db } from "../../database/db.js";
import { parties } from "../../database/schemas/index.js";
import { businesses } from "../../database/schemas/index.js";
import { MSG } from "../../utils/constants.js";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ALLOWED_FIELDS = [
    "name", "partyType", "phone", "email", "gstin", "pan",
    "address", "city", "state", "pincode",
    "openingBalance", "openingBalanceType",
    "creditLimit", "creditDays",
    "isActive", "notes",
];

function sanitize(body) {
    const data = {};
    for (const key of ALLOWED_FIELDS) {
        if (body[key] === undefined) continue;
        if (key === "gstin" && body[key]) data[key] = body[key].trim().toUpperCase();
        else if (key === "pan" && body[key]) data[key] = body[key].trim().toUpperCase();
        else if (typeof body[key] === "string") data[key] = body[key].trim();
        else data[key] = body[key];
    }
    return data;
}

function throwError(message, statusCode = 400) {
    throw Object.assign(new Error(message), { statusCode });
}

// ─── Ownership guard: verify businessId belongs to the requesting user ────────
async function assertBusinessOwner(businessId, userId) {
    const [biz] = await db
        .select({ id: businesses.id })
        .from(businesses)
        .where(and(eq(businesses.id, businessId), eq(businesses.ownerId, userId)));

    if (!biz) throwError("Business not found or access denied.", 403);
}

// ─── Uniqueness checks within a business ─────────────────────────────────────
async function assertUnique(businessId, field, value, excludeId = null) {
    const conditions = [
        eq(parties.businessId, businessId),
        eq(parties[field], value),
        eq(parties.isActive, true),
    ];
    if (excludeId) conditions.push(sql`${parties.id} != ${excludeId}`);

    const [existing] = await db
        .select({ id: parties.id })
        .from(parties)
        .where(and(...conditions));

    return !!existing;
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const partiesService = {

    // List parties with optional filters
    async getParties(businessId, userId, query = {}) {
        await assertBusinessOwner(businessId, userId);

        const { type, search, includeInactive } = query;
        const conditions = [eq(parties.businessId, businessId)];

        // By default only return active parties
        if (!includeInactive || includeInactive === "false") {
            conditions.push(eq(parties.isActive, true));
        }

        if (type && ["customer", "supplier", "both"].includes(type)) {
            // "both" partyType means the party is both customer & supplier
            // If caller wants "customer", return partyType=customer OR partyType=both
            if (type === "customer") {
                conditions.push(
                    or(eq(parties.partyType, "customer"), eq(parties.partyType, "both"))
                );
            } else if (type === "supplier") {
                conditions.push(
                    or(eq(parties.partyType, "supplier"), eq(parties.partyType, "both"))
                );
            } else {
                conditions.push(eq(parties.partyType, "both"));
            }
        }

        if (search?.trim()) {
            const term = `%${search.trim()}%`;
            conditions.push(
                or(
                    ilike(parties.name, term),
                    ilike(parties.phone, term),
                    ilike(parties.email, term),
                    ilike(parties.gstin, term),
                )
            );
        }

        return db
            .select()
            .from(parties)
            .where(and(...conditions))
            .orderBy(parties.name);
    },

    // Get single party
    async getPartyById(id, businessId, userId) {
        await assertBusinessOwner(businessId, userId);

        const [party] = await db
            .select()
            .from(parties)
            .where(and(eq(parties.id, id), eq(parties.businessId, businessId)));

        return party ?? null;
    },

    // Create party
    async createParty(businessId, userId, payload) {
        await assertBusinessOwner(businessId, userId);

        const data = sanitize(payload);

        // Uniqueness: name (case-insensitive) within business
        const nameTaken = await assertUnique(businessId, "name", data.name);
        if (nameTaken) throwError(MSG.PARTY_NAME_EXISTS, 409);

        // Uniqueness: phone within business
        if (data.phone) {
            const phoneTaken = await assertUnique(businessId, "phone", data.phone);
            if (phoneTaken) throwError(MSG.PARTY_PHONE_EXISTS, 409);
        }

        // Uniqueness: GSTIN within business
        if (data.gstin) {
            const gstinTaken = await assertUnique(businessId, "gstin", data.gstin);
            if (gstinTaken) throwError(MSG.PARTY_GSTIN_EXISTS, 409);
        }

        const [created] = await db
            .insert(parties)
            .values({ businessId, ...data })
            .returning();

        return created;
    },

    // Update party
    async updateParty(id, businessId, userId, payload) {
        await assertBusinessOwner(businessId, userId);

        const existing = await partiesService.getPartyById(id, businessId, userId);
        if (!existing) throwError(MSG.PARTY_NOT_FOUND, 404);

        const data = sanitize(payload);

        // Uniqueness checks (exclude self)
        if (data.name && data.name !== existing.name) {
            const nameTaken = await assertUnique(businessId, "name", data.name, id);
            if (nameTaken) throwError(MSG.PARTY_NAME_EXISTS, 409);
        }

        if (data.phone && data.phone !== existing.phone) {
            const phoneTaken = await assertUnique(businessId, "phone", data.phone, id);
            if (phoneTaken) throwError(MSG.PARTY_PHONE_EXISTS, 409);
        }

        if (data.gstin && data.gstin !== existing.gstin) {
            const gstinTaken = await assertUnique(businessId, "gstin", data.gstin, id);
            if (gstinTaken) throwError(MSG.PARTY_GSTIN_EXISTS, 409);
        }

        const [updated] = await db
            .update(parties)
            .set({ ...data, updatedAt: new Date() })
            .where(and(eq(parties.id, id), eq(parties.businessId, businessId)))
            .returning();

        return updated;
    },

    // Soft delete
    async deleteParty(id, businessId, userId) {
        await assertBusinessOwner(businessId, userId);

        const existing = await partiesService.getPartyById(id, businessId, userId);
        if (!existing) throwError(MSG.PARTY_NOT_FOUND, 404);

        const [deleted] = await db
            .update(parties)
            .set({ isActive: false, updatedAt: new Date() })
            .where(and(eq(parties.id, id), eq(parties.businessId, businessId)))
            .returning();

        return deleted;
    },
};