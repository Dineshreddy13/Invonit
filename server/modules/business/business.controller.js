import { businessService } from "./business.service.js";
import { validateBusinessPayload } from "./business.validator.js";
import { MSG } from "../../utils/constants.js";

// ─── GET /business ────────────────────────────────────────────────────────────
export async function getBusinesses(req, res) {
    try {
        const businesses = await businessService.getBusinessesByOwner(req.user.id);
        return res.status(200).json({
            success: true,
            message: MSG.BUSINESSES_FETCHED,
            data: { businesses },
        });
    } catch (err) {
        console.error("[getBusinesses]", err);
        return res.status(500).json({ success: false, message: MSG.INTERNAL_ERROR });
    }
}

// ─── GET /business/:id ────────────────────────────────────────────────────────
export async function getBusinessById(req, res) {
    try {
        const business = await businessService.getBusinessById(req.params.id, req.user.id);
        if (!business) {
            return res.status(404).json({ success: false, message: MSG.BUSINESS_NOT_FOUND });
        }
        return res.status(200).json({
            success: true,
            message: MSG.BUSINESS_FETCHED,
            data: { business },
        });
    } catch (err) {
        console.error("[getBusinessById]", err);
        return res.status(500).json({ success: false, message: MSG.INTERNAL_ERROR });
    }
}

// ─── POST /business ───────────────────────────────────────────────────────────
export async function createBusiness(req, res) {
    try {
        const errors = validateBusinessPayload(req.body, false);
        if (errors.length > 0) {
            return res.status(422).json({ success: false, message: MSG.VALIDATION_ERROR, errors });
        }

        const business = await businessService.createBusiness(req.user.id, req.body);
        return res.status(201).json({
            success: true,
            message: MSG.BUSINESS_CREATED,
            data: { business },
        });
    } catch (err) {
        console.error("[createBusiness]", err);
        const status = err.statusCode || 500;
        return res.status(status).json({ success: false, message: err.message || MSG.INTERNAL_ERROR });
    }
}

// ─── PATCH /business/:id ──────────────────────────────────────────────────────
export async function updateBusiness(req, res) {
    try {
        const errors = validateBusinessPayload(req.body, true);
        if (errors.length > 0) {
            return res.status(422).json({ success: false, message: MSG.VALIDATION_ERROR, errors });
        }

        const business = await businessService.updateBusiness(req.params.id, req.user.id, req.body);
        return res.status(200).json({
            success: true,
            message: MSG.BUSINESS_UPDATED,
            data: { business },
        });
    } catch (err) {
        console.error("[updateBusiness]", err);
        const status = err.statusCode || 500;
        return res.status(status).json({ success: false, message: err.message || MSG.INTERNAL_ERROR });
    }
}