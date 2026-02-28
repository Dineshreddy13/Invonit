import { pgTable, serial, varchar, text, numeric, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { parties } from "./parties.schema.js";
import { products } from "./products.schema.js";

export const sales = pgTable("sales", {
  id: serial("id").primaryKey(),
  invoiceNumber: varchar("invoice_number", { length: 80 }).notNull().unique(),
  type: varchar("type", { length: 20 }).default("invoice"), // invoice|estimate|challan
  customerId: integer("customer_id").references(() => parties.id),
  invoiceDate: timestamp("invoice_date").notNull(),
  dueDate: timestamp("due_date"),
  subtotal: numeric("subtotal", { precision: 12, scale: 2 }).default("0"),
  discountAmount: numeric("discount_amount", { precision: 12, scale: 2 }).default("0"),
  totalGst: numeric("total_gst", { precision: 12, scale: 2 }).default("0"),
  totalAmount: numeric("total_amount", { precision: 12, scale: 2 }).default("0"),
  paidAmount: numeric("paid_amount", { precision: 12, scale: 2 }).default("0"),
  paymentMode: varchar("payment_mode", { length: 20 }).default("cash"),
  status: varchar("status", { length: 20 }).default("unpaid"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const saleItems = pgTable("sale_items", {
  id: serial("id").primaryKey(),
  saleId: integer("sale_id").references(() => sales.id, { onDelete: "cascade" }),
  productId: integer("product_id").references(() => products.id),
  productName: varchar("product_name", { length: 200 }).notNull(),
  quantity: numeric("quantity", { precision: 12, scale: 3 }).notNull(),
  unit: varchar("unit", { length: 20 }),
  sellingPrice: numeric("selling_price", { precision: 12, scale: 2 }).notNull(),
  discountPct: numeric("discount_pct", { precision: 5, scale: 2 }).default("0"),
  gstRate: numeric("gst_rate", { precision: 5, scale: 2 }).default("0"),
  gstAmount: numeric("gst_amount", { precision: 12, scale: 2 }).default("0"),
  totalAmount: numeric("total_amount", { precision: 12, scale: 2 }).notNull(),
});

export const saleReturns = pgTable("sale_returns", {
  id: serial("id").primaryKey(),
  saleId: integer("sale_id").references(() => sales.id),
  returnDate: timestamp("return_date").defaultNow(),
  totalAmount: numeric("total_amount", { precision: 12, scale: 2 }),
  reason: text("reason"),
  createdAt: timestamp("created_at").defaultNow(),
});