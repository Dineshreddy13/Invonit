import { pgTable, uuid, varchar, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { businesses } from "./business.schema.js";


export const categories = pgTable("categories", {
  id:          uuid("id").defaultRandom().primaryKey(),
  businessId:  uuid("business_id")
                 .notNull()
                 .references(() => businesses.id, { onDelete: "cascade" }),
  name:        varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  parentId:    uuid("parent_id").references(() => categories.id, { onDelete: "set null" }),
  isActive:    boolean("is_active").default(true),
  createdAt:   timestamp("created_at").defaultNow(),
  updatedAt:   timestamp("updated_at").defaultNow(),
});