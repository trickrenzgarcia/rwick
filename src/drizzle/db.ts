import 'dotenv/config';

import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL!;

const client = postgres(connectionString, { prepare: false });

const db = drizzle({ client, schema });

export { db };
