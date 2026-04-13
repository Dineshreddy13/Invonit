import {
    PARTY_TYPES, BALANCE_TYPES,
    GSTIN_REGEX, PAN_REGEX, PHONE_REGEX, PINCODE_REGEX,
} from "../../utils/constants.js";

export function validatePartyPayload(body, isUpdate = false) {
    const errors = [];

    // ── Required on create ────────────────────────────────────────────────────
    if (!isUpdate) {
        if (!body.name || String(body.name).trim().length < 2) {
            errors.push("Party name is required and must be at least 2 characters.");
        }
        if (!body.partyType || !PARTY_TYPES.includes(body.partyType)) {
            errors.push(`Party type is required. Allowed: ${PARTY_TYPES.join(", ")}.`);
        }
    }

    // ── Conditional on update ─────────────────────────────────────────────────
    if (isUpdate) {
        if (body.name !== undefined && String(body.name).trim().length < 2) {
            errors.push("Party name must be at least 2 characters.");
        }
        if (body.partyType !== undefined && !PARTY_TYPES.includes(body.partyType)) {
            errors.push(`Invalid party type. Allowed: ${PARTY_TYPES.join(", ")}.`);
        }
    }

    // ── Optional fields ───────────────────────────────────────────────────────
    if (body.phone?.trim()) {
        if (!PHONE_REGEX.test(body.phone.trim())) {
            errors.push("Invalid phone number. Must be a 10-digit Indian mobile number.");
        }
    }

    if (body.email?.trim()) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) {
            errors.push("Invalid email address.");
        }
    }

    if (body.gstin?.trim()) {
        if (!GSTIN_REGEX.test(body.gstin.trim().toUpperCase())) {
            errors.push("Invalid GSTIN format.");
        }
    }

    if (body.pan?.trim()) {
        if (!PAN_REGEX.test(body.pan.trim().toUpperCase())) {
            errors.push("Invalid PAN format.");
        }
    }

    if (body.pincode?.trim()) {
        if (!PINCODE_REGEX.test(body.pincode.trim())) {
            errors.push("Invalid pincode.");
        }
    }

    if (body.openingBalanceType !== undefined) {
        if (!BALANCE_TYPES.includes(body.openingBalanceType)) {
            errors.push("Opening balance type must be 'Dr' or 'Cr'.");
        }
    }

    if (body.openingBalance !== undefined) {
        const val = parseFloat(body.openingBalance);
        if (isNaN(val) || val < 0) {
            errors.push("Opening balance must be a non-negative number.");
        }
    }

    if (body.creditLimit !== undefined) {
        const val = parseFloat(body.creditLimit);
        if (isNaN(val) || val < 0) {
            errors.push("Credit limit must be a non-negative number.");
        }
    }

    if (body.creditDays !== undefined) {
        const val = parseInt(body.creditDays);
        if (isNaN(val) || val < 0 || val > 9999) {
            errors.push("Credit days must be between 0 and 9999.");
        }
    }

    return errors;
}