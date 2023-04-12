import { type Queue } from 'bull';

export function __queueStatusHook(queue: Queue) {
  queue.on('waiting', (jobID) => {
    console.info(`[ADDED] Job added with job ID ${jobID}`);
  });
  queue.on('active', (job) => {
    console.info(`[STARTED] Job ID ${job.id} has been started`);
  });
  queue.on('completed', (job) => {
    console.info(`[COMPLETED] Job ID ${job.id} has been completed`);
  });
  queue.on('failed', (job) => {
    console.error(`[FAILED] Job ID ${job.id} has been failed`);
  });
  queue.on('error', (job) => {
    console.error(`[ERROR] An error occurred by the queue, got ${job}`);
  });
  queue.on('cleaned', function () {
    console.info(`[CLEANED] Report queue has been cleaned`);
  });
  queue.on('drained', function () {
    console.info(`[WAITING] Waiting for jobs...`);
  });
}
