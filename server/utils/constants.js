// ─── Business ───────────────────────────────────────────────────────────────
export const BUSINESS_TYPES = ["retail", "wholesale", "manufacturing", "service", "other"];

export const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

export const CURRENCIES = ["INR", "USD", "EUR", "GBP", "AED"];

export const FINANCIAL_YEAR_STARTS = [
    { label: "1st April (India Standard)", value: "04-01" },
    { label: "1st January", value: "01-01" },
    { label: "1st July", value: "07-01" },
];

// ─── Regex Validators ────────────────────────────────────────────────────────
export const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
export const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
export const PHONE_REGEX = /^[6-9]\d{9}$/;
export const PINCODE_REGEX = /^[1-9][0-9]{5}$/;

// ─── Limits ──────────────────────────────────────────────────────────────────
export const MAX_BUSINESSES_PER_USER = 5;

// ─── Party ───────────────────────────────────────────────────────────────────
export const PARTY_TYPES = ["customer", "supplier", "both"];
export const BALANCE_TYPES = ["Dr", "Cr"];


// ─── Response Messages ───────────────────────────────────────────────────────
export const MSG = {
    BUSINESS_CREATED: "Business created successfully.",
    BUSINESS_UPDATED: "Business updated successfully.",
    BUSINESS_FETCHED: "Business fetched successfully.",
    BUSINESSES_FETCHED: "Businesses fetched successfully.",
    BUSINESS_NOT_FOUND: "Business not found.",
    BUSINESS_LIMIT: `You can create a maximum of ${MAX_BUSINESSES_PER_USER} businesses.`,
    UNAUTHORIZED: "Unauthorized access.",
    VALIDATION_ERROR: "Validation error.",
    INTERNAL_ERROR: "Internal server error.",
    GSTIN_INVALID: "Invalid GSTIN format.",
    PAN_INVALID: "Invalid PAN format.",
    GSTIN_EXISTS: "A business with this GSTIN already exists.",

    // Party
    PARTY_CREATED: "Party created successfully.",
    PARTY_UPDATED: "Party updated successfully.",
    PARTY_FETCHED: "Party fetched successfully.",
    PARTIES_FETCHED: "Parties fetched successfully.",
    PARTY_DELETED: "Party deactivated successfully.",
    PARTY_NOT_FOUND: "Party not found.",
    PARTY_PHONE_EXISTS: "A party with this phone number already exists in this business.",
    PARTY_GSTIN_EXISTS: "A party with this GSTIN already exists in this business.",
    PARTY_NAME_EXISTS: "A party with this name already exists in this business.",

};