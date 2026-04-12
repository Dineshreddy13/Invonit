import { eq, and } from "drizzle-orm";
import { db } from "../../database/db.js";
import { businesses } from "../../database/schemas/index.js";
import { MSG, MAX_BUSINESSES_PER_USER } from "../../utils/constants.js";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function sanitizeBusiness(body) {
    const allowed = [
        "name", "legalName", "businessType", "gstin", "pan", "phone", "email",
        "address", "city", "state", "pincode", "country", "currency",
        "financialYearStart", "invoicePrefix", "logoUrl",
    ];
    const data = {};
    for (const key of allowed) {
        if (body[key] !== undefined) {
            // Uppercase specific fields
            if (key === "gstin" && body[key]) data[key] = body[key].trim().toUpperCase();
            else if (key === "pan" && body[key]) data[key] = body[key].trim().toUpperCase();
            else data[key] = typeof body[key] === "string" ? body[key].trim() : body[key];
        }
    }
    return data;
}

// ─── Service ─────────────────────────────────────────────────────────────────

export const businessService = {

    async getBusinessesByOwner(ownerId) {
        return db
            .select()
            .from(businesses)
            .where(eq(businesses.ownerId, ownerId));
    },

    async getBusinessById(id, ownerId) {
        const [business] = await db
            .select()
            .from(businesses)
            .where(and(eq(businesses.id, id), eq(businesses.ownerId, ownerId)));
        return business ?? null;
    },

    async createBusiness(ownerId, payload) {
        // Enforce per-user business limit
        const existing = await db
            .select({ id: businesses.id })
            .from(businesses)
            .where(eq(businesses.ownerId, ownerId));

        if (existing.length >= MAX_BUSINESSES_PER_USER) {
            throw Object.assign(new Error(MSG.BUSINESS_LIMIT), { statusCode: 400 });
        }

        // GSTIN uniqueness
        if (payload.gstin) {
            const [duplicate] = await db
                .select({ id: businesses.id })
                .from(businesses)
                .where(eq(businesses.gstin, payload.gstin));
            if (duplicate) {
                throw Object.assign(new Error(MSG.GSTIN_EXISTS), { statusCode: 409 });
            }
        }

        const [created] = await db
            .insert(businesses)
            .values({ ownerId, ...sanitizeBusiness(payload) })
            .returning();

        return created;
    },

    async updateBusiness(id, ownerId, payload) {
        const existing = await businessService.getBusinessById(id, ownerId);
        if (!existing) {
            throw Object.assign(new Error(MSG.BUSINESS_NOT_FOUND), { statusCode: 404 });
        }

        // GSTIN uniqueness (exclude self)
        if (payload.gstin && payload.gstin !== existing.gstin) {
            const [duplicate] = await db
                .select({ id: businesses.id })
                .from(businesses)
                .where(eq(businesses.gstin, payload.gstin));
            if (duplicate) {
                throw Object.assign(new Error(MSG.GSTIN_EXISTS), { statusCode: 409 });
            }
        }

        const updateData = {
            ...sanitizeBusiness(payload),
            updatedAt: new Date(),
        };

        const [updated] = await db
            .update(businesses)
            .set(updateData)
            .where(and(eq(businesses.id, id), eq(businesses.ownerId, ownerId)))
            .returning();

        return updated;
    },
};