import { defineConfig } from 'drizzle-kit';

// load DATABASE_URL from .env
import { config } from 'dotenv';
config();

export default defineConfig({
    schema: './src/lib/server/schema.ts',
    out: './src/drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    }
});
