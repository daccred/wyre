import { mapleradConsumer } from './consumers/maplerad';
import { queueOptions } from './core/bull';
import { __queueStatusHook } from './helpers/queue.hooks';
import Queue from 'bull';

export const DEFAULT_QUEUE_NAME = 'payroll:queue';

/**
 * =======================================================
 * WE LIST OUT OUR QUEUES HERE
 * AS A CONST TO BE USED IN OUR APP PUBLISHERS
 * =======================================================
 */
export const payrollQueue = new Queue(DEFAULT_QUEUE_NAME, queueOptions);

/**
 * =======================================================
 * The Root Queue Worker
 * =======================================================
 * @param queue - the root worker queue
 * @description - This is the root queue worker that will be called by the main app
 * and only executes based on external worker events
 * @example - `payrollQue` is a root queue worker called from the Nextjs app
 * @returns void
 *
 */
export default async function queue() {
  /* Instantiate all Producers here */
  // _createRepeatableTask(messageQueue)(EMAIL, await emailProducer());
  // _createCronTask(messageQueue, SMS, await smsProducer());
  // _createRepeatableTask(messageQueue)(VOICE, await voiceProducer());

  /// Call Consumers here
  payrollQueue.process(DEFAULT_QUEUE_NAME, (job, done) =>
    mapleradConsumer(job, done)
  );
  // messageQueue.process(SMS, MAX_CONCURRENCY, (job, done) =>
  //   smsConsumer(job, done)
  // );
  // messageQueue.process(VOICE, (job, done) => voiceConsumer(job, done));

  // / Report Queue Event Listeners
  __queueStatusHook(payrollQueue);
}
