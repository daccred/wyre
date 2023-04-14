import { createNowTask, queueOptions } from '../../core/bull';
import logger from '../../core/logger';
import type { PayrollScheduleData, RecipientData } from '../../types';
import type { MapleradConfigOptions } from '@wyrecc/maplerad';
import { MapleradProvider } from '@wyrecc/maplerad';
import type { DoneCallback } from 'bull';
import Queue from 'bull';

const config: MapleradConfigOptions = {
  supported_currencies: 'NGN',
  environment: 'sandbox',
  secret_key: 'mpr_sandbox_sk_b87df6cc-124c-441c-b21f-04ae72940ef3',
};

type RecipientJobData = RecipientData & { index: number };

export const mapleradConsumer = async (
  rootQueueJob: Queue.Job<PayrollScheduleData>,
  done: DoneCallback
) => {
  logger.debug(`[MAPLERAD JOB STARTED ---->] ${JSON.stringify(rootQueueJob)}`);

  /* Setup the Maplerad provider */
  const maplerad = new MapleradProvider(config);

  /* This is a debug call, let us see what is in config */
  const mapleConfig = maplerad.getConfig();
  logger.debug(`[MAPLERAD CONFIG ---->] ${JSON.stringify(mapleConfig)}`);

  const { data: rootQueueJobData } = rootQueueJob;
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
        const queueName = `${recipient.email}_${consumerQueueName}`;

        logger.debug(
          `[MAPLERAD SENDING PAYMENT FOR RECIPIENT ---->] ${recipient.firstName}::${index}`
        );
        createNowTask<RecipientJobData>(queue, {
          name: queueName,
          data: { ...recipient, index },
        });

        /// This is the worker that will process the payment request internally to Maplerad
        queue.process(queueName, async (job, done) => {
          try {
            const data = job.data as RecipientJobData;

            logger.debug(
              `[MAPLERAD PAYMENT PROCESSING FOR RECIPIENT ---->] ${data.index}`
            );

            const transactionReference = `_${Math.random()
              .toString(36)
              .substring(2, 8)}_${rootQueueJobData.ref.replace(':', '_')}`;

            const response = await maplerad.executeNairaTransfer({
              account_number: data.bank?.accountNumber as string,
              /// Convert to Kobo
              amount: Number(data.salary) * 100,
              reason: queueName,
              /** convert our redis style reference to snake_case for Maplerad Go API */
              reference: transactionReference,
              bank_code: data.bank?.bankCode as string,
              currency: 'NGN',
            });
            logger.debug(
              `[MAPLERAD PAYMENT RESPONSE ---->] ${JSON.stringify(response)}`
            );
            done();
          } catch (error) {
            console.error(`[mapleradConsumer.queue.process]`, error);
          }
        });
      }),
    ]));
  done();
};
