import { pgTable, serial, varchar, text, numeric, integer, timestamp } from "drizzle-orm/pg-core";

export const expenseCategories = pgTable("expense_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").references(() => expenseCategories.id),
  description: text("description"),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  expenseDate: timestamp("expense_date").notNull(),
  paymentMode: varchar("payment_mode", { length: 20 }).default("cash"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});