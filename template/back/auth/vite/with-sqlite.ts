import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db, schema } from '../db';

export const auth = betterAuth({
  trustedOrigins: ['http://localhost:5173'],
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
