// @ts-check
import * as dotenv from 'dotenv';
import { formatErrors } from './internal';
import { clientEnv, clientSchema } from './schema';

dotenv.config();

const _clientEnv = clientSchema.safeParse(clientEnv) as {
  success: boolean;
  data: import('zod').infer<typeof clientSchema>;
  error: import('zod').ZodError;
};

if (!_clientEnv.success) {
  console.error('❌ Invalid environment variables:\n', ...formatErrors(_clientEnv.error.format()));
  throw new Error('Invalid environment variables');
}

for (const key of Object.keys(_clientEnv.data)) {
  if (!key.startsWith('NEXT_PUBLIC_')) {
    console.warn(`❌ Invalid public environment variable name: ${key}. It must begin with 'NEXT_PUBLIC_'`);

    throw new Error('Invalid public environment variable name');
  }
}

export const env = _clientEnv.data;
