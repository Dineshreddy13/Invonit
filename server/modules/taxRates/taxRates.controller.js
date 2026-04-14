import { taxRatesService } from "./taxRates.service.js";
import { validateTaxRatePayload } from "./taxRates.validator.js";
import { MSG } from "../../utils/constants.js";

const handle = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (err) {
    console.error(`[taxRates] ${err.message}`);
    res.status(err.statusCode || 500).json({ success: false, message: err.message || MSG.INTERNAL_ERROR });
  }
};

export const getTaxRates = handle(async (req, res) => {
  const data = await taxRatesService.getTaxRates(req.params.businessId, req.user.id, req.query);
  res.json({ success: true, message: MSG.TAX_RATES_FETCHED, data: { taxRates: data, count: data.length } });
});

export const getTaxRateById = handle(async (req, res) => {
  const rate = await taxRatesService.getTaxRateById(req.params.id, req.params.businessId, req.user.id);
  if (!rate) return res.status(404).json({ success: false, message: MSG.TAX_RATE_NOT_FOUND });
  res.json({ success: true, message: MSG.TAX_RATE_FETCHED, data: { taxRate: rate } });
});

export const createTaxRate = handle(async (req, res) => {
  const errors = validateTaxRatePayload(req.body, false);
  if (errors.length) return res.status(422).json({ success: false, message: MSG.VALIDATION_ERROR, errors });
  const rate = await taxRatesService.createTaxRate(req.params.businessId, req.user.id, req.body);
  res.status(201).json({ success: true, message: MSG.TAX_RATE_CREATED, data: { taxRate: rate } });
});

export const updateTaxRate = handle(async (req, res) => {
  const errors = validateTaxRatePayload(req.body, true);
  if (errors.length) return res.status(422).json({ success: false, message: MSG.VALIDATION_ERROR, errors });
  const rate = await taxRatesService.updateTaxRate(req.params.id, req.params.businessId, req.user.id, req.body);
  res.json({ success: true, message: MSG.TAX_RATE_UPDATED, data: { taxRate: rate } });
});

export const deleteTaxRate = handle(async (req, res) => {
  await taxRatesService.deleteTaxRate(req.params.id, req.params.businessId, req.user.id);
  res.json({ success: true, message: MSG.TAX_RATE_DELETED });
});