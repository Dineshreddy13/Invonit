import { pgTable, serial, varchar, text, numeric, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { parties } from "./parties.schema.js";
import { products } from "./products.schema.js";

export const purchases = pgTable("purchases", {
  id: serial("id").primaryKey(),
  invoiceNumber: varchar("invoice_number", { length: 80 }).notNull(),
  supplierId: integer("supplier_id").references(() => parties.id),
  invoiceDate: timestamp("invoice_date").notNull(),
  dueDate: timestamp("due_date"),
  subtotal: numeric("subtotal", { precision: 12, scale: 2 }).default("0"),
  totalGst: numeric("total_gst", { precision: 12, scale: 2 }).default("0"),
  totalAmount: numeric("total_amount", { precision: 12, scale: 2 }).default("0"),
  paidAmount: numeric("paid_amount", { precision: 12, scale: 2 }).default("0"),
  paymentMode: varchar("payment_mode", { length: 20 }).default("credit"), // cash|upi|bank|credit
  status: varchar("status", { length: 20 }).default("unpaid"), // paid|unpaid|partial
  notes: text("notes"),
  isOcrGenerated: boolean("is_ocr_generated").default(false),
  ocrData: jsonb("ocr_data"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const purchaseItems = pgTable("purchase_items", {
  id: serial("id").primaryKey(),
  purchaseId: integer("purchase_id").references(() => purchases.id, { onDelete: "cascade" }),
  productId: integer("product_id").references(() => products.id),
  productName: varchar("product_name", { length: 200 }).notNull(), // snapshot
  quantity: numeric("quantity", { precision: 12, scale: 3 }).notNull(),
  unit: varchar("unit", { length: 20 }),
  purchasePrice: numeric("purchase_price", { precision: 12, scale: 2 }).notNull(),
  gstRate: numeric("gst_rate", { precision: 5, scale: 2 }).default("0"),
  gstAmount: numeric("gst_amount", { precision: 12, scale: 2 }).default("0"),
  totalAmount: numeric("total_amount", { precision: 12, scale: 2 }).notNull(),
});

export const purchaseReturns = pgTable("purchase_returns", {
  id: serial("id").primaryKey(),
  purchaseId: integer("purchase_id").references(() => purchases.id),
  returnDate: timestamp("return_date").defaultNow(),
  totalAmount: numeric("total_amount", { precision: 12, scale: 2 }),
  reason: text("reason"),
  createdAt: timestamp("created_at").defaultNow(),
});