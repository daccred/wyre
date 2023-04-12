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

export default async function queue() {
  /* Instantiate all Producers here */
  // _createRepeatableTask(messageQueue)(EMAIL, await emailProducer());
  // _createCronTask(messageQueue, SMS, await smsProducer());
  // _createRepeatableTask(messageQueue)(VOICE, await voiceProducer());

  // Call Consumers here
  // messageQueue.process(EMAIL, (job, done) => emailConsumer(job, done));
  // messageQueue.process(SMS, MAX_CONCURRENCY, (job, done) =>
  //   smsConsumer(job, done)
  // );
  // messageQueue.process(VOICE, (job, done) => voiceConsumer(job, done));

  // / Report Queue Event Listeners
  __queueStatusHook(payrollQueue);
}
