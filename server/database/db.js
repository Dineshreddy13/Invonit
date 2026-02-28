import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { DATABASE_URL } from "../config/env.js";

const { Pool } = pg;

const pool = new Pool({
  connectionString: DATABASE_URL,
});

export const db = drizzle(pool);

export const connectDB = async () => {
  await pool.query("SELECT 1");   
  console.log("Database Connected.");
};