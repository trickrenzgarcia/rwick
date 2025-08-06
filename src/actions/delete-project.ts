"use server";

import { db } from "@/drizzle/db";
import { projects } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type ProjectSchemaType = typeof projects.$inferSelect;

export async function deleteProject(data: ProjectSchemaType) {
  await db.delete(projects).where(
    and(
      eq(projects.id, data.id)
    )
  )
  revalidatePath("/projects")
}