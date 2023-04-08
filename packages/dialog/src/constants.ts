import { env } from '@wyrecc/env';

// export const POSTMARK_CLIENT_ID = process.env.POSTMARK_CLIENT_ID as string;
export const POSTMARK_CLIENT_ID = env.POSTMARK_CLIENT_ID;

console.log(POSTMARK_CLIENT_ID, 'logging in dialog package');
