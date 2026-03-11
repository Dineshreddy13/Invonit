// auth.service.js
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "../../database/db.js";
import { users } from "../../database/schemas/user.schema.js";
import { redis } from "../../config/redis.js";
import { generateToken } from "../../utils/token.js";
import { OTP_TTL } from "../../config/env.js";
import { createOTP, verifyOTP, refreshOTP } from "../../services/otp.service.js";
import {sendOTPEmail} from "../../services/email.service.js";


export const requestRegisteration = async ({ name, email, phone, password }) => {
  const existing = await db
  .select()
  .from(users)
  .where(eq(users.email, email))
  .limit(1);
  
  if (existing.length > 0) throw new Error("Email already registered.");

  const hashedPassword = await bcrypt.hash(password, 12);
  await redis.set(
    `pending_registration:${email}`,
    JSON.stringify({ name, email, phone: phone || null, password: hashedPassword }),
    "EX",
    OTP_TTL
  );

  const otp = await createOTP("registration", email);
  await sendOTPEmail({ to: email, name, otp });
};

export const verifyAndRegister = async ({ email, otp }) => {
  await verifyOTP("registration", email, otp);

  const raw = await redis.get(`pending_registration:${email}`);
  if (!raw) throw new Error("Registration session expired. Please start over.");

  const tempData = JSON.parse(raw);

  const [newUser] = await db
    .insert(users)
    .values({ ...tempData, isVerified: true })
    .returning({
      id: users.id, name: users.name, email: users.email,
      phone: users.phone, isVerified: users.isVerified, createdAt: users.createdAt,
    });

  await redis.del(`pending_registration:${email}`);

  const token = generateToken({
    id: newUser.id,
    email: newUser.email
  });

  return { user: newUser, token };
};


export const resendRegistrationOTP = async (email) => {
  const raw = await redis.get(`pending_registration:${email}`);
  if (!raw) throw new Error("No pending registration found. Please start over.");

  const { name } = JSON.parse(raw);
  const otp = await refreshOTP("registration", email);
  await sendOTPEmail({
    to: email,
    name,
    otp
  });
  
};


export const loginUser = async ({ email, password }) => {
  const [user] = await db
  .select()
  .from(users)
  .where(eq(users.email, email))
  .limit(1);

  if (!user) throw new Error("Invalid email or password.");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password.");

  const token = generateToken({ id: user.id, email: user.email });
  const { password: _, ...safeUser } = user;
  return { 
    user: safeUser,
    token 
  };
};

export const getUserById = async (id) => {
  const [user] = await db
    .select({
      id: users.id, name: users.name, email: users.email,
      phone: users.phone, isVerified: users.isVerified, createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, id))
    .limit(1);

  if (!user) throw new Error("User not found.");
  return user;
};