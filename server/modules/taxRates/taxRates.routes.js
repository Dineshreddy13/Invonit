import { Router } from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import { getTaxRates, getTaxRateById, createTaxRate, updateTaxRate, deleteTaxRate } from "./taxRates.controller.js";

const router = Router({ mergeParams: true });
router.use(protect);

router.get("/",       getTaxRates);
router.get("/:id",    getTaxRateById);
router.post("/",      createTaxRate);
router.patch("/:id",  updateTaxRate);
router.delete("/:id", deleteTaxRate);

export default router;