import { env } from '@wyrecc/env';
import type Queue from 'bull';
import IORedis from 'ioredis';

const subscriber = new IORedis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  connectionName: 'wyre:queue:subscriber',
});

export const queueOptions: Queue.QueueOptions = {
  /** in Nextjs we are client only and produce jobs */
  createClient: (__type__) => {
    switch (__type__) {
      case 'subscriber':
        return subscriber;
      default:
        return subscriber;
    }
  },
  defaultJobOptions: {
    delay: 50,
    removeOnComplete: true,
  },
  limiter: {
    max: 20,
    duration: 5000,
  },
};

export const DEFAULT_BACKOFF = {
  type: 'exponential',
  delay: 10000,
};

export type NowTaskOptions<T> = {
  name: string;
  data: T;
};

/**
 * @name createNowTask
 * @description Creates a realtime task that executes immediately, with a small delay
 * as a backoff to handle recurring invocations
 * */
export const createNowTask = <T>(
  queue: Queue.Queue,
  { name, ...options }: NowTaskOptions<T>
) => {
  return queue.add(name, options.data, {
    attempts: 3,
    delay: 100,
    removeOnComplete: true,
    backoff: DEFAULT_BACKOFF,
  });
};
