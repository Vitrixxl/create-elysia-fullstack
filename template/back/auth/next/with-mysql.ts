import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db, schema } from '../db';

export const auth = betterAuth({
  trustedOrigins: ['http://localhost:3000'],
  database: drizzleAdapter(db, {
    provider: 'mysql',
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
