import { MAX_TAX_RATE } from "../../utils/constants.js";

function isValidRate(val) {
  const n = parseFloat(val);
  return !isNaN(n) && n >= 0 && n <= MAX_TAX_RATE;
}

export function validateTaxRatePayload(body, isUpdate = false) {
  const errors = [];

  if (!isUpdate) {
    if (!body.taxName || String(body.taxName).trim().length < 2) {
      errors.push("Tax name is required and must be at least 2 characters.");
    }
  } else {
    if (body.taxName !== undefined && String(body.taxName).trim().length < 2) {
      errors.push("Tax name must be at least 2 characters.");
    }
  }

  for (const field of ["cgstRate", "sgstRate", "igstRate", "cessRate"]) {
    if (body[field] !== undefined) {
      if (!isValidRate(body[field])) {
        errors.push(`${field} must be a number between 0 and ${MAX_TAX_RATE}.`);
      }
    }
  }

  // CGST and SGST must be equal (Indian GST rule)
  if (body.cgstRate !== undefined && body.sgstRate !== undefined) {
    if (parseFloat(body.cgstRate) !== parseFloat(body.sgstRate)) {
      errors.push("CGST rate and SGST rate must be equal.");
    }
  }

  if (body.hsnCode !== undefined && body.hsnCode !== null && body.hsnCode !== "") {
    if (!/^\d{4,8}$/.test(String(body.hsnCode).trim())) {
      errors.push("HSN code must be 4–8 digits.");
    }
  }

  if (body.sacCode !== undefined && body.sacCode !== null && body.sacCode !== "") {
    if (!/^\d{4,6}$/.test(String(body.sacCode).trim())) {
      errors.push("SAC code must be 4–6 digits.");
    }
  }

  return errors;
}