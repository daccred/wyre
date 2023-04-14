import { ServerClient } from 'postmark';
import { POSTMARK_CLIENT_ID } from '../constants';

// import queryString from "query-string";
// import { getBaseUrl } from "../sms/utils";

type Props = {
  from: string;
  to: string;
  subject: string;
  textBody: string;
  htmlBody: string;
};

const client = new ServerClient(POSTMARK_CLIENT_ID);

export const sendEmail = async (mailProps: Props) => {
  try {
    const res = await client.sendEmail({
      From: mailProps.from,
      To: mailProps.to,
      Subject: mailProps.subject,
      TextBody: mailProps.textBody,
      HtmlBody: mailProps.htmlBody,
    });
    return res;
  } catch (e) {
    throw new Error(e as string);
  }
};
