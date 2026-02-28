import { pgTable, serial, varchar, text, numeric, timestamp, boolean } from "drizzle-orm/pg-core";

export const parties = pgTable("parties", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 150 }).notNull(),
  type: varchar("type", { length: 20 }).notNull(), // customer | supplier | both
  phone: varchar("phone", { length: 15 }),
  email: varchar("email", { length: 100 }),
  gstin: varchar("gstin", { length: 20 }),
  address: text("address"),
  city: varchar("city", { length: 60 }),
  state: varchar("state", { length: 60 }),
  openingBalance: numeric("opening_balance", { precision: 12, scale: 2 }).default("0"),
  openingBalanceType: varchar("opening_balance_type", { length: 2 }).default("Dr"), // Dr | Cr
  creditLimit: numeric("credit_limit", { precision: 12, scale: 2 }).default("0"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});