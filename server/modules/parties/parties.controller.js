import { partiesService } from "./parties.service.js";
import { validatePartyPayload } from "./parties.validator.js";
import { MSG } from "../../utils/constants.js";

// ─── GET /business/:businessId/parties ───────────────────────────────────────
export async function getParties(req, res) {
    try {
        const list = await partiesService.getParties(
            req.params.businessId,
            req.user.id,
            req.query              // type, search, includeInactive
        );
        return res.status(200).json({
            success: true,
            message: MSG.PARTIES_FETCHED,
            data: { parties: list, count: list.length },
        });
    } catch (err) {
        console.error("[getParties]", err);
        return res.status(err.statusCode || 500).json({
            success: false, message: err.message || MSG.INTERNAL_ERROR,
        });
    }
}

// ─── GET /business/:businessId/parties/:id ───────────────────────────────────
export async function getPartyById(req, res) {
    try {
        const party = await partiesService.getPartyById(
            req.params.id,
            req.params.businessId,
            req.user.id
        );
        if (!party) {
            return res.status(404).json({ success: false, message: MSG.PARTY_NOT_FOUND });
        }
        return res.status(200).json({
            success: true,
            message: MSG.PARTY_FETCHED,
            data: { party },
        });
    } catch (err) {
        console.error("[getPartyById]", err);
        return res.status(err.statusCode || 500).json({
            success: false, message: err.message || MSG.INTERNAL_ERROR,
        });
    }
}

// ─── POST /business/:businessId/parties ──────────────────────────────────────
export async function createParty(req, res) {
    try {
        const errors = validatePartyPayload(req.body, false);
        if (errors.length > 0) {
            return res.status(422).json({ success: false, message: MSG.VALIDATION_ERROR, errors });
        }

        const party = await partiesService.createParty(
            req.params.businessId,
            req.user.id,
            req.body
        );
        return res.status(201).json({
            success: true,
            message: MSG.PARTY_CREATED,
            data: { party },
        });
    } catch (err) {
        console.error("[createParty]", err);
        return res.status(err.statusCode || 500).json({
            success: false, message: err.message || MSG.INTERNAL_ERROR,
        });
    }
}

// ─── PATCH /business/:businessId/parties/:id ─────────────────────────────────
export async function updateParty(req, res) {
    try {
        const errors = validatePartyPayload(req.body, true);
        if (errors.length > 0) {
            return res.status(422).json({ success: false, message: MSG.VALIDATION_ERROR, errors });
        }

        const party = await partiesService.updateParty(
            req.params.id,
            req.params.businessId,
            req.user.id,
            req.body
        );
        return res.status(200).json({
            success: true,
            message: MSG.PARTY_UPDATED,
            data: { party },
        });
    } catch (err) {
        console.error("[updateParty]", err);
        return res.status(err.statusCode || 500).json({
            success: false, message: err.message || MSG.INTERNAL_ERROR,
        });
    }
}

// ─── DELETE /business/:businessId/parties/:id ────────────────────────────────
export async function deleteParty(req, res) {
    try {
        await partiesService.deleteParty(
            req.params.id,
            req.params.businessId,
            req.user.id
        );
        return res.status(200).json({
            success: true,
            message: MSG.PARTY_DELETED,
        });
    } catch (err) {
        console.error("[deleteParty]", err);
        return res.status(err.statusCode || 500).json({
            success: false, message: err.message || MSG.INTERNAL_ERROR,
        });
    }
}