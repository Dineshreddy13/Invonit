// ─── HTTP Status Codes ─────────────────────────────────────────────────────
export const HTTP = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL: 500,
};

// ─── Response Messages ────────────────────────────────────────────────────
export const MSG = {
  // Auth
  REGISTER_SUCCESS: "Registration initiated. OTP sent to your email.",
  OTP_VERIFIED: "OTP verified. Account created successfully.",
  OTP_INVALID: "Invalid or expired OTP.",
  OTP_RESENT: "OTP resent successfully.",
  LOGIN_SUCCESS: "Logged in successfully.",
  LOGIN_FAILED: "Invalid email or password.",
  LOGOUT_SUCCESS: "Logged out successfully.",
  UNAUTHORIZED: "Authentication required.",
  FORBIDDEN: "Access denied.",
  TOKEN_INVALID: "Invalid or expired token.",
  FORGOT_PASSWORD_SUCCESS: "Password reset OTP sent to your email.",
  RESET_PASSWORD_SUCCESS: "Password reset successfully.",
  USER_NOT_FOUND: "User not found.",
  EMAIL_ALREADY_EXISTS: "Email already registered.",
  PHONE_ALREADY_EXISTS: "Phone number already registered.",

  // Business
  BUSINESS_CREATED: "Business created successfully.",
  BUSINESS_UPDATED: "Business updated successfully.",
  BUSINESS_FETCHED: "Business fetched successfully.",
  BUSINESS_NOT_FOUND: "Business not found.",
  BUSINESS_ALREADY_EXISTS: "Business already exists for this account.",
  BUSINESS_FORBIDDEN: "You do not have access to this business.",

  // Generic
  VALIDATION_ERROR: "Validation error.",
  NOT_FOUND: "Resource not found.",
  INTERNAL_ERROR: "Internal server error.",
  DUPLICATE: "Duplicate entry detected.",
};

// ─── Business ─────────────────────────────────────────────────────────────
export const BUSINESS_TYPES = ["retail", "wholesale", "manufacturing", "service", "other"];

export const CURRENCIES = ["INR", "USD", "EUR", "GBP", "AED"];

export const DEFAULT_INVOICE_PREFIX = "INV";
export const DEFAULT_FINANCIAL_YEAR_START = "04-01";
export const DEFAULT_CURRENCY = "INR";
export const DEFAULT_COUNTRY = "India";

// ─── OTP ──────────────────────────────────────────────────────────────────
export const OTP_LENGTH = 6;
export const OTP_EXPIRES_MINUTES = 10;
export const OTP_RESEND_COOLDOWN_SECONDS = 60;
export const MAX_OTP_ATTEMPTS = 5;

// ─── Token ────────────────────────────────────────────────────────────────
export const JWT_EXPIRES_IN = "7d";
export const RESET_TOKEN_EXPIRES_MINUTES = 15;

// ─── Pagination ───────────────────────────────────────────────────────────
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 20;
export const MAX_LIMIT = 100;

// ─── GST ──────────────────────────────────────────────────────────────────
export const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
export const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
export const PINCODE_REGEX = /^[1-9][0-9]{5}$/;