import { treaty } from '@elysiajs/eden';
import type { App } from 'bun-api';

export const api = treaty<App>(process.env.NEXT_PUBLIC_BASE_API_URL!);
