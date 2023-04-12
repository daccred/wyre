// @ts-check
import { z } from 'zod';
import { formatErrors } from './client';

/**
 * Specify only Worker environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const workerSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
  REDIS_URL: z.string(),
  ENCRYPTION_KEY: z.string().optional(),
});

const _workerEnv = workerSchema.safeParse(process.env) as {
  success: boolean;
  data: import('zod').infer<typeof workerSchema>;
  error: import('zod').ZodError;
};

if (!_workerEnv.success) {
  console.error('❌ Invalid environment variables:\n', ...formatErrors(_workerEnv.error.format()));
  throw new Error('Invalid environment variables');
}

for (const key of Object.keys(_workerEnv.data)) {
  if (key.startsWith('NEXT_PUBLIC_')) {
    console.warn('❌ You are exposing a server-side env-variable:', key);

    throw new Error('You are exposing a server-side env-variable');
  }
}

export const env = { ..._workerEnv.data };
