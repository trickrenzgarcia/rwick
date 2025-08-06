import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { pgTable, serial, text, timestamp, boolean, json } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  url: text("url").notNull(),
  repo: text("repo"),
  isVisible: boolean("is_visible").notNull().default(true),
  isPrivate: boolean("is_private").notNull().default(false),
  tags: json("tags")
    .notNull()
    .default([])
    .$type<string[]>(),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});

export type User = typeof users.$inferSelect;
export type Project = typeof projects.$inferSelect;
