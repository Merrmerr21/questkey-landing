import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const waitlistTable = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  investorType: varchar("investor_type", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  ipAddress: text("ip_address"),
});

export const insertWaitlistSchema = createInsertSchema(waitlistTable, {
  email: z.email(),
  firstName: z.string().max(100).optional(),
  investorType: z
    .enum([
      "first_time_investor",
      "airbnb_host",
      "long_term_landlord",
      "agent_operator",
      "just_exploring",
    ])
    .optional(),
}).omit({ id: true, createdAt: true, ipAddress: true });

export type InsertWaitlist = z.infer<typeof insertWaitlistSchema>;
export type Waitlist = typeof waitlistTable.$inferSelect;
