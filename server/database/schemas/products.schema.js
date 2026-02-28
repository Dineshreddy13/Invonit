import { pgTable, serial, varchar, text, numeric, integer, timestamp, boolean } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  sku: varchar("sku", { length: 60 }).unique(),
  barcode: varchar("barcode", { length: 60 }).unique(),
  categoryId: integer("category_id").references(() => categories.id),
  hsnCode: varchar("hsn_code", { length: 20 }),
  unit: varchar("unit", { length: 20 }).default("pcs"),
  purchasePrice: numeric("purchase_price", { precision: 12, scale: 2 }).default("0"),
  sellingPrice: numeric("selling_price", { precision: 12, scale: 2 }).default("0"),
  mrp: numeric("mrp", { precision: 12, scale: 2 }).default("0"),
  gstRate: numeric("gst_rate", { precision: 5, scale: 2 }).default("0"), // percentage
  stock: numeric("stock", { precision: 12, scale: 3 }).default("0"),
  lowStockThreshold: numeric("low_stock_threshold", { precision: 12, scale: 3 }).default("5"),
  description: text("description"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});