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


// ─── Category ─────────────────────────────────────────────────────────────────
export const MAX_CATEGORY_DEPTH = 3; // root → sub → sub-sub only


// ─── Tax Rates ────────────────────────────────────────────────────────────────
export const GST_SLABS = [0, 5, 12, 18, 28]; // standard Indian GST slabs (informational)
export const MAX_TAX_RATE = 100;


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

    // Category
    CATEGORY_CREATED: "Category created successfully.",
    CATEGORY_UPDATED: "Category updated successfully.",
    CATEGORY_FETCHED: "Category fetched successfully.",
    CATEGORIES_FETCHED: "Categories fetched successfully.",
    CATEGORY_DELETED: "Category deactivated successfully.",
    CATEGORY_NOT_FOUND: "Category not found.",
    CATEGORY_NAME_EXISTS: "A category with this name already exists under the same parent.",
    CATEGORY_DEPTH_EXCEEDED: `Categories can only be nested up to ${MAX_CATEGORY_DEPTH} levels deep.`,
    CATEGORY_CIRCULAR_REF: "A category cannot be its own parent or ancestor.",
    CATEGORY_HAS_CHILDREN: "Cannot deactivate a category that has active sub-categories.",

    // Tax Rates
    TAX_RATE_CREATED: "Tax rate created successfully.",
    TAX_RATE_UPDATED: "Tax rate updated successfully.",
    TAX_RATE_FETCHED: "Tax rate fetched successfully.",
    TAX_RATES_FETCHED: "Tax rates fetched successfully.",
    TAX_RATE_DELETED: "Tax rate deactivated successfully.",
    TAX_RATE_NOT_FOUND: "Tax rate not found.",
    TAX_RATE_NAME_EXISTS: "A tax rate with this name already exists.",
    TAX_RATE_IN_USE: "Cannot deactivate a tax rate that is assigned to active products.",
};