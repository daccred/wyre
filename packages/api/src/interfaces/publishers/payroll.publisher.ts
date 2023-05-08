import type { PayrollTaskOptions } from '..';
import { createRealtimeTask, payrollQueue } from '../../common/bull';

/**
 * @name createPayrollPublisher
 * @description Creates a realtime task that executes immediately or on a cron
 * its best to only used named queues for cron jobs and recurring producers This is because
 */
export const createPayrollPublisher = async (options: PayrollTaskOptions) => {
  const queue = payrollQueue;
  return await createRealtimeTask<PayrollTaskOptions['data']>(queue, {
    isCron: false,
    name: options.name,
    delay: options.delay,
    data: options.data,
  });
};
