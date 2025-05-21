import { createPool } from 'mysql2';

export const db = createPool({ uri: Bun.env.DATABASE_URL });
