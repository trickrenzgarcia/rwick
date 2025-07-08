import { db } from "@/drizzle/db";
import { insertProjectSchema, projects } from "@/drizzle/schema";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import * as z from "zod/v4-mini";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const schema = insertProjectSchema.safeParse(body);

    if (!schema.success) {
      return NextResponse.json(
        {
          message: "Invalid request body",
          error: z.treeifyError(schema.error),
        },
        { status: 400 }
      );
    }

    // Insert the validated project into the database
    const [project] = await db.insert(projects).values(schema.data).returning();

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
