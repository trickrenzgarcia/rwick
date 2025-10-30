'use server';

import { db } from '@/drizzle/db';
import { projects, recommendations, connections } from '@/drizzle/schema';
import { revalidatePath, revalidateTag } from 'next/cache';

import type {
  InsertProject,
  InsertRecommendation,
  InsertConnection,
} from '@/types';
import { eq } from 'drizzle-orm';

export async function addProject(data: InsertProject) {
  await db.insert(projects).values(data);
  revalidatePath('/projects');
}

export async function addRecommendation(data: InsertRecommendation) {
  await db.insert(recommendations).values(data);
  revalidateTag('recommendations', 'max');
}

export async function addConnection(data: InsertConnection) {
  await db.insert(connections).values(data);
  revalidateTag('connections', 'max');
}
