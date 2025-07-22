"use server";

import { db } from "@/drizzle/db";
import { projects } from "@/drizzle/schema";
import { revalidatePath } from "next/cache";

interface ProjectData {
  title: string;
  description: string;
  image: string;
  url: string;
  repo?: string;
  tags?: string[];
  isVisible?: string;
  isPrivate?: string;
}

export async function addProject(data: ProjectData) {
  await db.insert(projects).values(data);
  revalidatePath("/projects");
}
