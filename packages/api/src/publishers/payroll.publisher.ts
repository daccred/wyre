import { createRealtimeTask, payrollQueue } from '../common/bull';
import type { PayrollTaskOptions } from '../interfaces';

/**
 * @name createPayrollPublisher
 * @description Creates a realtime task that executes immediately or on a cron
 * its best to only used named queues for cron jobs and recurring producers This is because
 */
export const createPayrollPublisher = async (options: PayrollTaskOptions) => {
  const queue = payrollQueue;
  return await createRealtimeTask<PayrollTaskOptions['data']>(queue, {
    isCron: false,
    delay: options.delay,
    data: options.data,
  });
};
