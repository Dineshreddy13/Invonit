import { pgTable, serial, varchar, text, numeric, integer, timestamp } from "drizzle-orm/pg-core";
import { parties } from "./parties.schema.js";

// Every financial transaction creates ledger entries
export const ledgerEntries = pgTable("ledger_entries", {
  id: serial("id").primaryKey(),
  partyId: integer("party_id").references(() => parties.id),
  referenceType: varchar("reference_type", { length: 30 }), // sale|purchase|payment|expense|return
  referenceId: integer("reference_id"),
  description: text("description"),
  debit: numeric("debit", { precision: 12, scale: 2 }).default("0"),
  credit: numeric("credit", { precision: 12, scale: 2 }).default("0"),
  balance: numeric("balance", { precision: 12, scale: 2 }).default("0"), // running balance
  entryDate: timestamp("entry_date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  partyId: integer("party_id").references(() => parties.id),
  referenceType: varchar("reference_type", { length: 20 }), // sale|purchase
  referenceId: integer("reference_id"),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  paymentMode: varchar("payment_mode", { length: 20 }).default("cash"),
  paymentDate: timestamp("payment_date").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});