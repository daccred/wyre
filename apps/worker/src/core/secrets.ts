require('dotenv').config({ debug: process.env.DEBUG });
const { NODE_ENV, HOST, PORT, REDIS_PORT } = process.env;

export default {
  HOST: HOST || 'localhost',
  PORT: PORT || 4000,
  REDIS_URI: process.env.REDIS_URI || 'null',
  IS_PROD: NODE_ENV === 'production',
  REDIS_PORT: typeof REDIS_PORT === 'undefined' ? 6379 : parseInt(REDIS_PORT),
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  MESSAGEBIRD_KEY: process.env.MESSAGEBIRD_KEY,
  // Break
  POSTMARK_SENDER: process.env.POSTMARK_SENDER || '',
  POSTMARK_KEY: process.env.POSTMARK_KEY,
  MESSAGEBIRD_TESTKEY: process.env.MESSAGEBIRD_TESTKEY,
  CALL_SENDERID: process.env.CALL_SENDERID,
  AIRTABLE_KEY: process.env.AIRTABLE_KEY || 'keyaTSENYwqu9sS4U',
  AIRTABLE_BASE: process.env.AIRTABLE_BASE || 'appjLTNmjrOOVNxiY',
  SEND_INTERVAL: (process.env.SEND_INTERVAL as unknown) || 28800000,
};
