import type { DoneCallback } from 'bull';
import type Bull from 'bull';

export async function smsConsumer(job: Bull.Job<any[]>, done: DoneCallback) {
  const { data } = job;
  console.log('SMS JOB STARTED ---->', job);

  // Call the Email provider
  data.forEach(async (item) => {
    const phone = item.phone;
    const name = item.name;
    const message = item.message || '';
    const senderID = 'DEBT';
    // await mbSMSProvider(phone, senderID, name, message);
    console.log('SMS JOB COMPLETED ---->', phone, name, message, senderID);
  });
  done();
}
