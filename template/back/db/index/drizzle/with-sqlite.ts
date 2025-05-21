import { drizzle } from 'drizzle-orm/bun-sqlite';
export * as schema from './schema';

export const db = drizzle(Bun.env.DATABASE_URL!);
