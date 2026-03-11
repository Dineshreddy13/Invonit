import { Router } from "express";
import {
  sendOTP,
  verifyOTP,
  resendOTPHandler,
  login,
  getMe,
} from "./auth.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", sendOTP);
router.post("/register/verify", verifyOTP);
router.post("/register/resend-otp", resendOTPHandler);
router.post("/login", login);
router.get("/me", protect, getMe);


export default router;