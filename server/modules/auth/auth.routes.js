import { Router } from "express";
import {
  sendOTP,
  verifyOTP,
  resendOTPHandler,
} from "./auth.controller.js";

const router = Router();

router.post("/register", sendOTP);
router.post("/register/verify", verifyOTP);
router.post("/register/resend-otp", resendOTPHandler);

export default router;