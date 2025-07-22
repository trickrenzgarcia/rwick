import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  url: text("url").notNull(),
  repo: text("repo"),
  isVisible: text("is_visible").notNull().default("true"),
  isPrivate: text("is_private").notNull().default("false"),
  tags: text("tags", { mode: "json" })
    .notNull()
    .default("[]")
    .$type<string[]>(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});

export type User = typeof users.$inferSelect;
export type Project = typeof projects.$inferSelect;
