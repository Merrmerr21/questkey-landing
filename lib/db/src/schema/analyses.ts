import { pgTable, serial, integer, varchar, timestamp, text, jsonb } from "drizzle-orm/pg-core";
import { propertiesTable } from "./properties";

export const analysesTable = pgTable("analyses", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").notNull().references(() => propertiesTable.id, { onDelete: "cascade" }),
  agentCategory: varchar("agent_category", { length: 50 }).notNull(),
  agentName: varchar("agent_name", { length: 100 }).notNull(),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  summary: text("summary"),
  findings: jsonb("findings"),
  recommendation: text("recommendation"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export type Analysis = typeof analysesTable.$inferSelect;
