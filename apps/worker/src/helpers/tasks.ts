import secrets from '../core/secrets';

/**
 * 1. Make Repeatable Task: A Function to repeat a task over a period of time
 * 2. Make CronTask: A Function to generate a cron task for the Queue
 */

/* ------------------------------------------------------------------------ */
import type Bull from 'bull';

type TQueueProducer = Record<string, unknown>;
type TData = TQueueProducer | (() => TQueueProducer);

export const _createRepeatableTask =
  (queue: Bull.Queue) =>
  <T extends TData>(name: string, data: T) => {
    queue.add(name, data, {
      repeat: {
        // 300 minutes = 18000000
        // 8 hours = 28800000
        every: secrets.SEND_INTERVAL as number,
        limit: 10000,
      },
    });
  };

export const _createCronTask = (
  queue: Bull.Queue,
  name: string,
  data: TData
) => {
  // “At every minute past hour 12.”
  queue.add(name, data, {
    repeat: { cron: '* 12 * * *' },
  });
};
