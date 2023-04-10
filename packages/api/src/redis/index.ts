import IORedis from 'ioredis';

import { env } from '@wyrecc/env';

// const redisClient = IORedis({
//   socket: {
//     host: ,
//     port: parseInt(env.REDIS_PORT, 10),
//   },

//   password: env.REDIS_PASSWORD,
// });

const redisClient = new IORedis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  connectionName: 'wyre:server',
});

// redisClient.on('error', (err) => console.warn(err));
// redisClient
//   .connect()
//   .then(() => console.log('Connected to Redis'))
//   .catch(() => console.warn('Failed to connect to Redis'));

export default redisClient;
