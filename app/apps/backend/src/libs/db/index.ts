import { drizzle } from 'drizzle-orm/bun-sql';
export * as schema from './schema';

export const db = drizzle(Bun.env.DATABASE_URL!);
