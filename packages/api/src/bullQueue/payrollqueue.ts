import Queue from "bull";

import { REDIS_CONNECTION } from "./redis";

const PayrollQueue = new Queue("Payroll Queue", {
  redis: REDIS_CONNECTION,
});

// LISTENERS
PayrollQueue.on("active", (job) => {
  return job.data;
});
PayrollQueue.on("active", (job) => {
  console.info(`[STARTED] Job ID ${job.id} has been started`);
});
PayrollQueue.on("completed", (job) => {
  console.info(`[COMPLETED] Job ID ${job.id} has been completed`);
});
PayrollQueue.on("failed", (job) => {
  console.error(`[FAILED] Job ID ${job.id} has been failed`);
});
PayrollQueue.on("error", (job) => {
  console.error(`[ERROR] An error occurred by the queue, got ${job.message}`);
});
PayrollQueue.on("cleaned", function () {
  console.info(`[CLEANED] Report queue has been cleaned`);
});
PayrollQueue.on("drained", function () {
  console.info(`[WAITING] Waiting for jobs...`);
});

export { PayrollQueue };
