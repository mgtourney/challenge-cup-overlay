import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { DATABASE_URL } from '$env/static/private'

try {
    const migrationClient = postgres(DATABASE_URL, { max: 1});
    await migrate(drizzle(migrationClient), { migrationsFolder: './src/drizzle' });
} catch (e) {
    console.error(e);
}

const queryClient = postgres(DATABASE_URL);

export const db = drizzle(queryClient);