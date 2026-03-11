import { Router } from "express";
import {
    startRegisteration,
    completeRegisteration,
    resendRegistrationOTPHandler,
    login,
    getMe,
} from "./auth.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = Router();

// Registration
router.post("/register", startRegisteration);
router.post("/register/verify", completeRegisteration);
router.post("/register/resend-otp", resendRegistrationOTPHandler);

router.post("/login", login);

router.get("/me", protect, getMe);

export default router;