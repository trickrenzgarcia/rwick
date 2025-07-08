import { db } from "@/drizzle/db";
import { LoginOptions, User } from "@/types/auth";
import { eq } from "drizzle-orm";
import { users } from "@/drizzle/schema";
import bcrypt from "bcrypt";

export async function authenticateUser({ email, password }: LoginOptions) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    return undefined;
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return undefined;
  }

  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
  } satisfies User;
}
