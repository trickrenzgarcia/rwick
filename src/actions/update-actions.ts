'use server';

import { db } from '@/drizzle/db';
import { projects } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import type { InsertProject } from '@/types';

export async function updateProject(id: number, data: Partial<InsertProject>) {
  await db.update(projects).set(data).where(eq(projects.id, id));
  revalidatePath('/projects');
}
