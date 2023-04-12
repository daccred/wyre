import { createNowTask, queueOptions } from '../../core/bull';
import logger from '../../core/logger';
import type { PayrollScheduleData, RecipientData } from '../../types';
import type { MapleradConfigOptions } from '@wyrecc/maplerad';
import { MapleradProvider } from '@wyrecc/maplerad';
import type { DoneCallback } from 'bull';
import Queue from 'bull';

const config: MapleradConfigOptions = {
  supported_currencies: 'NGN',
};

type RecipientJobData = RecipientData & { index: number };

export const mapleradConsumer = async (
  rootQueueJob: Queue.Job<PayrollScheduleData>,
  done: DoneCallback
) => {
  logger.debug(`[MAPLERAD JOB STARTED ---->] ${rootQueueJob}`);

  /* Setup the Maplerad provider */
  const maplerad = new MapleradProvider(config);

  /* This is a debug call, let us see what is in config */
  const mapleConfig = maplerad.getConfig();
  logger.debug(`[MAPLERAD CONFIG ---->] ${mapleConfig}`);

  const { data: rootQueueJobData } = rootQueueJob;
  logger.debug(`[MAPLERAD JOB DATA ---->] ${rootQueueJobData}`);

  const consumerQueueName = `maplerad-${rootQueueJobData.ref}_${rootQueueJobData.currency}`;
  const queue = new Queue(consumerQueueName, queueOptions);

  /**
   * for loop through the rootQueueJobData and create a queue for each recipient
   * and then call the Maplerad API to execute the transfer
   * each queue will be processed by a worker that will call the Maplerad API
   * to execute the transfer, and will have a unique name
   *
   */
  Array.isArray(rootQueueJobData.payload) &&
    (await Promise.all([
      rootQueueJobData.payload.forEach((recipient: RecipientData, index) => {
        // const queueName = `${recipient.email}${consumerQueueName}`;

        logger.verbose(
          `[MAPLERAD SENDING PAYMENT FOR RECIPIENT ---->] ${recipient}::${index}`
        );
        createNowTask<RecipientJobData>(queue, {
          name: consumerQueueName,
          data: { ...recipient, index },
        });

        /// This is the worker that will process the payment request internally to Maplerad
        queue.process(consumerQueueName, async (job, done) => {
          const data = job.data as RecipientJobData;

          logger.verbose(
            `[MAPLERAD PAYMENT PROCESSING FOR RECIPIENT ---->] ${data.index}`
          );
          const response = maplerad.executeNairaTransfer({
            account_number: data.bank?.accountNumber as string,
            amount: Number(data.salary),
            reference: rootQueueJobData.ref,
            bank_code: data.bank?.bankCode as string,
            currency: 'NGN',
          });
          logger.verbose(`[MAPLERAD PAYMENT RESPONSE ---->] ${response}`);
          done();
        });
      }),
    ]));
  done();
};
