import { treaty } from '@elysiajs/eden';
import type { App } from 'bun-api';

export const api = treaty<App>(import.meta.env.VITE_BASE_API_URL!);
