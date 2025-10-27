'use server';

import { db } from '@/drizzle/db';
import { projects, recommendations, connections } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function deleteProject(id: number) {
  await db.delete(projects).where(eq(projects.id, id));
  revalidatePath('/projects');
}

export async function deleteRecommendation(id: number) {
  await db.delete(recommendations).where(eq(recommendations.id, id));
  revalidatePath('/recommendations');
}

export async function deleteConnection(id: number) {
  await db.delete(connections).where(eq(connections.id, id));
  revalidatePath('/connections');
}
