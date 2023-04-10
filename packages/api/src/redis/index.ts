import { createClient } from 'redis';

import { env } from '@wyrecc/env';

const redisClient = createClient({
  socket: {
    host: env.REDIS_URL,
    port: parseInt(env.REDIS_PORT, 10),
  },

  password: env.REDIS_PASSWORD,
});
redisClient.on('error', (err) => console.warn(err));
redisClient
  .connect()
  .then(() => console.log('Connected to Redis'))
  .catch(() => console.warn('Failed to connect to Redis'));

export default redisClient;
