import * as schema from '@/drizzle/schema';
import { z } from 'zod';

export type Project = typeof schema.projects.$inferSelect;

export type InsertProject = z.infer<typeof schema.insertProjectSchema>;

export type Recommendations = typeof schema.recommendations.$inferSelect;

export type InsertRecommendation = z.infer<
  typeof schema.insertRecommendationSchema
>;

export type Connections = typeof schema.connections.$inferSelect;

export type InsertConnection = z.infer<typeof schema.insertConnectionSchema>;

export type ProjectContent = {
  id: string;
  title: string;
  description: string;
  images?: string[];
};
