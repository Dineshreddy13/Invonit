import {
    GSTIN_REGEX, PAN_REGEX, PHONE_REGEX, PINCODE_REGEX,
    BUSINESS_TYPES, CURRENCIES, INDIAN_STATES, MSG,
} from "../../utils/constants.js";

/**
 * Validates business creation / update payload.
 * Returns { errors: string[] }. Empty array = valid.
 */
export function validateBusinessPayload(body, isUpdate = false) {
    const errors = [];

    if (!isUpdate) {
        // name is required only on create
        if (!body.name || String(body.name).trim().length < 2) {
            errors.push("Business name is required and must be at least 2 characters.");
        }
    } else {
        if (body.name !== undefined && String(body.name).trim().length < 2) {
            errors.push("Business name must be at least 2 characters.");
        }
    }

    if (body.gstin !== undefined && body.gstin !== null && body.gstin !== "") {
        if (!GSTIN_REGEX.test(body.gstin.trim().toUpperCase())) {
            errors.push(MSG.GSTIN_INVALID);
        }
    }

    if (body.pan !== undefined && body.pan !== null && body.pan !== "") {
        if (!PAN_REGEX.test(body.pan.trim().toUpperCase())) {
            errors.push(MSG.PAN_INVALID);
        }
    }

    if (body.phone !== undefined && body.phone !== null && body.phone !== "") {
        if (!PHONE_REGEX.test(body.phone.trim())) {
            errors.push("Invalid phone number. Must be a 10-digit Indian mobile number.");
        }
    }

    if (body.pincode !== undefined && body.pincode !== null && body.pincode !== "") {
        if (!PINCODE_REGEX.test(body.pincode.trim())) {
            errors.push("Invalid pincode. Must be a 6-digit Indian pincode.");
        }
    }

    if (body.businessType !== undefined && !BUSINESS_TYPES.includes(body.businessType)) {
        errors.push(`Invalid business type. Allowed: ${BUSINESS_TYPES.join(", ")}.`);
    }

    if (body.currency !== undefined && !CURRENCIES.includes(body.currency)) {
        errors.push(`Invalid currency. Allowed: ${CURRENCIES.join(", ")}.`);
    }

    if (body.state !== undefined && body.state !== null && body.state !== "") {
        if (!INDIAN_STATES.includes(body.state)) {
            errors.push("Invalid state.");
        }
    }

    if (body.financialYearStart !== undefined) {
        const valid = ["01-01", "04-01", "07-01"];
        if (!valid.includes(body.financialYearStart)) {
            errors.push("Invalid financial year start. Allowed: 01-01, 04-01, 07-01.");
        }
    }

    if (body.invoicePrefix !== undefined) {
        const p = String(body.invoicePrefix).trim();
        if (p.length < 1 || p.length > 10 || !/^[A-Za-z0-9\-_]+$/.test(p)) {
            errors.push("Invoice prefix must be 1–10 alphanumeric characters (hyphens/underscores allowed).");
        }
    }

    if (body.email !== undefined && body.email !== null && body.email !== "") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email.trim())) {
            errors.push("Invalid business email address.");
        }
    }

    return errors;
}