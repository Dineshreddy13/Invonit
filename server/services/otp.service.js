// services/otp.service.js
import { redis } from "../config/redis.js";
import {generateOTP} from "../utils/otp.js"
import { OTP_TTL } from "../config/env.js";

export const createOTP = async (namespace, email) => {
  const otp = generateOTP();
  await redis.set(`otp:${namespace}:${email}`, otp, "EX", OTP_TTL);
  return otp;
};

export const verifyOTP = async (namespace, email, otp) => {
  const stored = await redis.get(`otp:${namespace}:${email}`);
  if (!stored) throw new Error("OTP expired or not found. Please request a new one.");
  if (stored !== otp) throw new Error("Invalid OTP.");
  await redis.del(`otp:${namespace}:${email}`);
};

export const refreshOTP = async (namespace, email, cooldownSeconds = 60) => {
  const ttl = await redis.ttl(`otp:${namespace}:${email}`);
  if (ttl < 0) throw new Error("No pending OTP found. Please start over.");
  if (ttl > OTP_TTL - cooldownSeconds) {
    throw new Error("Please wait before requesting a new OTP.");
  }
  return createOTP(namespace, email);
};