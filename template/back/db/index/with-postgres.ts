import { SQL } from 'bun';

export const db = new SQL({
  url: Bun.env.DATABASE_URL!,
});
