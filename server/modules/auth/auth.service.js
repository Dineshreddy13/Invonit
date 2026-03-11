import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "../../database/db.js";
import { users } from "../../database/schemas/user.schema.js";
import { redis } from "../../config/redis.js";
import { emailQueue } from "../../jobs/queues/email.queue.js";
import { generateOTP } from "../../utils/otp.js";
import { generateToken } from "../../utils/token.js";
import { OTP_TTL } from "../../config/env.js";


export const sendRegistrationOTP = async ({ name, email, phone, password }) => {

  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existing.length > 0) {
    throw new Error("Email already registered.");
  }

  const otp = generateOTP();
  const hashedPassword = await bcrypt.hash(password, 12);

  const tempData = JSON.stringify({
    name,
    email,
    phone: phone || null,
    password: hashedPassword,
    otp,
  });

  await redis.set(`pending_registration:${email}`, tempData, "EX", OTP_TTL);

  await emailQueue.add("send-otp", {
    to: email,
    subject: "Your Invonit Verification Code",
    template: "otpEmail",
    data: {
      name,
      otp,
      expiry: "10 minutes",
    }
  });
};

export const verifyOTPAndRegister = async ({ email, otp }) => {
  const raw = await redis.get(`pending_registration:${email}`);

  if (!raw) {
    throw new Error("OTP expired or not found. Please request a new one.");
  }

  const tempData = JSON.parse(raw);

  if (tempData.otp !== otp) {
    throw new Error("Invalid OTP.");
  }

  const [newUser] = await db
    .insert(users)
    .values({
      name: tempData.name,
      email: tempData.email,
      phone: tempData.phone,
      password: tempData.password,
      isVerified: true,
    })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      phone: users.phone,
      isVerified: users.isVerified,
      createdAt: users.createdAt,
    });

  await redis.del(`pending_registration:${email}`);

  const token = generateToken({ id: newUser.id, email: newUser.email });

  return { user: newUser, token };
};

export const resendOTP = async (email) => {
  const raw = await redis.get(`pending_registration:${email}`);

  if (!raw) {
    throw new Error("No pending registration found. Please start over.");
  }

  const tempData = JSON.parse(raw);

  const ttl = await redis.ttl(`pending_registration:${email}`);
  if (ttl > 540) {
    throw new Error("Please wait before requesting a new OTP.");
  }

  const otp = generateOTP();
  tempData.otp = otp;

  await redis.set(
    `pending_registration:${email}`,
    JSON.stringify(tempData),
    "EX",
    OTP_TTL
  );

  await emailQueue.add("send-otp", {
    to: email,
    subject: "Your Invonit Verification Code",
    template: "otpEmail",
    data: {
      name: tempData.name,
      otp,
      expiry: "10 minutes",
    }
  });
};
