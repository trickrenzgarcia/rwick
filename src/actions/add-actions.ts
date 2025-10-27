'use server';

import { db } from '@/drizzle/db';
import { projects, recommendations, connections } from '@/drizzle/schema';
import { revalidatePath } from 'next/cache';

import type {
  InsertProject,
  InsertRecommendation,
  InsertConnection,
} from '@/types';

export async function addProject(data: InsertProject) {
  await db.insert(projects).values(data);
  revalidatePath('/projects');
}

export async function addRecommendation(data: InsertRecommendation) {
  await db.insert(recommendations).values(data);
  revalidatePath('/recommendations');
}

export async function addConnection(data: InsertConnection) {
  await db.insert(connections).values(data);
  revalidatePath('/connections');
}
