import {
    pgTable, uuid, varchar, text, timestamp, boolean, pgEnum,
} from "drizzle-orm/pg-core";
import { users } from "./user.schema.js";

export const businessTypeEnum = pgEnum("business_type", [
    "retail", "wholesale", "manufacturing", "service", "other",
]);

export const businesses = pgTable("businesses", {
    id: uuid("id").defaultRandom().primaryKey(),
    ownerId: uuid("owner_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    name: varchar("name", { length: 150 }).notNull(),
    legalName: varchar("legal_name", { length: 150 }),
    businessType: businessTypeEnum("business_type").default("retail"),
    gstin: varchar("gstin", { length: 15 }).unique(),
    pan: varchar("pan", { length: 10 }),
    phone: varchar("phone", { length: 15 }),
    email: varchar("email", { length: 150 }),
    address: text("address"),
    city: varchar("city", { length: 100 }),
    state: varchar("state", { length: 100 }),
    pincode: varchar("pincode", { length: 10 }),
    country: varchar("country", { length: 50 }).default("India"),
    currency: varchar("currency", { length: 10 }).default("INR"),
    financialYearStart: varchar("financial_year_start", { length: 5 }).default("04-01"),
    invoicePrefix: varchar("invoice_prefix", { length: 10 }).default("INV"),
    logoUrl: text("logo_url"),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});