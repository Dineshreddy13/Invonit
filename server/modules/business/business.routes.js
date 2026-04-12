import { Router } from "express";
// import { authenticate } from "../auth/auth.middleware.js";
import { protect } from "../../middlewares/auth.middleware.js";
import {
    getBusinesses,
    getBusinessById,
    createBusiness,
    updateBusiness,
} from "./business.controller.js";

const router = Router();

// All routes require authentication
router.use(protect);

router.get("/", getBusinesses);
router.get("/:id", getBusinessById);
router.post("/", createBusiness);
router.patch("/:id", updateBusiness);

export default router;