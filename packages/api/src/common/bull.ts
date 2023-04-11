import Queue from 'bull';
import type Bull from 'bull';
import IORedis from 'ioredis';

import { env } from '@wyrecc/env';

const client = new IORedis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  connectionName: 'wyre:queue:client',
});

const queueOptions: Queue.QueueOptions = {
  /** in Nextjs we are client only and produce jobs */
  createClient: (__type__) => {
    switch (__type__) {
      case 'client':
        return client;
      default:
        return client;
    }
  },
  defaultJobOptions: {
    delay: 50,
    removeOnComplete: true,
  },
  limiter: {
    max: 3,
    duration: 5000,
  },
};

export const DEFAULT_BACKOFF = {
  type: 'exponential',
  delay: 10000,
};
export const DEFAULT_QUEUE_NAME = 'payroll:queue';

/**
 * =======================================================
 * WE LIST OUT OUR QUEUES HERE
 * AS A CONST TO BE USED IN OUR APP PUBLISHERS
 * =======================================================
 */
export const payrollQueue = new Queue(DEFAULT_QUEUE_NAME, queueOptions);

export type TaskQueueOptions<T> = {
  isCron: boolean;
  name: string;
  /** Use to schedule when a task should be executed */
  delay?: Bull.JobOptions['delay'];
  /** uses with cron jobs to define repeatable tasks  */
  repeat?: Bull.JobOptions['repeat']; // cron job
  data: T;
};

/**
 * @name createRealtimeTask
 * @description Creates a realtime task that executes immediately or on a cron
 * its best to only used named queues for cron jobs and recurring producers This is because
 * Bulljs cannot allow you to have two jobs with the same names
 * */
export const createRealtimeTask = <T>(
  queue: Queue.Queue,
  { isCron, name, ...options }: TaskQueueOptions<T>
) => {
  if (isCron) {
    queue.add(name, options.data, {
      removeOnComplete: true,
      attempts: 5,
      repeat: options.repeat,
      backoff: DEFAULT_BACKOFF,
    });

    /* This is our default operation for scheduled tasks */
  } else {
    queue.add(name, options.data, {
      attempts: 3,
      delay: options.delay,
      removeOnComplete: true,
      backoff: DEFAULT_BACKOFF,
    });
  }
};
