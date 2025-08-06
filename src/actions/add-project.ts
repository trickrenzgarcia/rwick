"use server";

import { db } from "@/drizzle/db";
import { projects, insertProjectSchema } from "@/drizzle/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type ProjectInsertType = z.infer<typeof insertProjectSchema>;

export async function addProject(data: ProjectInsertType) {
  await db.insert(projects).values(data);
  revalidatePath("/projects");
}
