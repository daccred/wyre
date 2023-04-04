import secrets from './core/secrets';
// import { _createRepeatableTask } from './helpers/tasks';

/* Import Producers and Consumers from Messaging Channels */
// import { emailConsumer, emailProducer } from './channels/email';
// import { smsConsumer, smsProducer } from './providers/sms';
// import { voiceConsumer, voiceProducer } from './providers/voice';
import Bull from 'bull';
import ioredis from 'ioredis';

// const MAX_CONCURRENCY = 3;
// const SMS = 'SMS';
// const VOICE = 'voice';
// const EMAIL = 'email';

// Initialize the Redis Connection Options
// const redisConnectionOptions = {
// 	port: secrets.REDIS_PORT,
// 	host: secrets.REDIS_HOST,
// 	password: secrets.REDIS_PASSWORD
// };

// const client = new ioredis(redisConnectionOptions);
// const subscriber = new ioredis(redisConnectionOptions);

// Initialize the Redis Connection Options
const client = new ioredis(secrets.REDIS_URI, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  connectionName: 'meta:queue:client',
  // tls: { rejectUnauthorized: false },
  // compatibility for heroku
  enableTLSForSentinelMode: false,
});
const subscriber = new ioredis(secrets.REDIS_URI, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  connectionName: 'meta:queue:subscriber',
  autoResubscribe: true,
  // tls: { rejectUnauthorized: false },
  // compatibility for heroku
  enableTLSForSentinelMode: false,
});

/* --------------------------------------------------------------------------------
 * 
 * Re-use connection in ioredis 
 * https://github.com/OptimalBits/bull/blob/master/PATTERNS.md#reusing-redis-connections
 * 
 ---------------------------------------------------------------------------------*/
const queueOptions: Bull.QueueOptions = {
  createClient: (__type__) => {
    switch (__type__) {
      case 'client':
        return client;
      case 'subscriber':
        return subscriber;
      default:
        /* Send a default connection out other connection types */
        return new ioredis(secrets.REDIS_URI, {
          maxRetriesPerRequest: null,
          enableReadyCheck: false,
        });
    }
  },
};

const messageQueue = new Bull('messenger', queueOptions);

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
  messageQueue.on('waiting', (jobID) => {
    console.info(`[ADDED] Job added with job ID ${jobID}`);
  });
  messageQueue.on('active', (job) => {
    console.info(`[STARTED] Job ID ${job.id} has been started`);
  });
  messageQueue.on('completed', (job) => {
    console.info(`[COMPLETED] Job ID ${job.id} has been completed`);
  });
  messageQueue.on('failed', (job) => {
    console.error(`[FAILED] Job ID ${job.id} has been failed`);
  });
  messageQueue.on('error', (job) => {
    console.error(`[ERROR] An error occurred by the queue, got ${job}`);
  });
  messageQueue.on('cleaned', function () {
    console.info(`[CLEANED] Report queue has been cleaned`);
  });
  messageQueue.on('drained', function () {
    console.info(`[WAITING] Waiting for jobs...`);
  });
}
