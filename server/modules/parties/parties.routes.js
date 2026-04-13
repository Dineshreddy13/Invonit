import { Router } from "express";
// import { protect } from "../../middlewares/auth.middleware.js";
import { protect } from "../../middlewares/auth.middleware.js";
import {
    getParties,
    getPartyById,
    createParty,
    updateParty,
    deleteParty,
} from "./parties.controller.js";

const router = Router({ mergeParams: true }); // ← mergeParams to access :businessId

router.use(protect);

router.get("/", getParties);
router.get("/:id", getPartyById);
router.post("/", createParty);
router.patch("/:id", updateParty);
router.delete("/:id", deleteParty);

export default router;