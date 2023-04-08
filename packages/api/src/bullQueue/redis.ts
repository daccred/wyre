import { env } from '@wyrecc/env';

export const REDIS_CONNECTION = { port: +env.REDIS_PORT, host: env.REDIS_URL, password: env.REDIS_PASSWORD };
