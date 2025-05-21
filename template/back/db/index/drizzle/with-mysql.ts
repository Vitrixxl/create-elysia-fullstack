import { drizzle } from 'drizzle-orm/mysql2';
export * as schema from './schema';

export const db = drizzle(Bun.env.DATABASE_URL!);
