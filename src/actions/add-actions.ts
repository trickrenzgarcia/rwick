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
  const connection = await db.query.connections.findFirst({
    where: eq(connections.browserId, data.browserId),
  });

  if (connection) {
    throw new Error(
      'Please wait a moment before submitting another connection. Thank you!'
    );
  }

  await db.insert(connections).values(data);
  revalidateTag('connections', 'max');
}
