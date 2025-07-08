import { db } from "@/drizzle/db";
import { Effect } from "effect";
import { NextResponse } from "next/server";

const getProjects = () => {
  const program = Effect.tryPromise({
    try: () => db.query.projects.findMany({ limit: 50 }),
    catch: (unknown) => new Error(`Something went wrong ${unknown}`),
  });

  return Effect.runPromise(program);
};

export async function GET() {
  const program = await getProjects();
  return NextResponse.json(program);
}
