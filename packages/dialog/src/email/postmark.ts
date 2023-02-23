import postmark from "postmark";
import { POSTMARK_CLIENT_ID } from "../constants";

type EmailProps = {
  from: string;
  to: string;
  subject: string;
  textBody: string;
};
const client = new postmark.ServerClient(POSTMARK_CLIENT_ID);

export const sendEmail = async (mailProps: EmailProps) => {
  try {
    await client.sendEmail({
      From: mailProps.from,
      To: mailProps.to,
      Subject: mailProps.subject,
      TextBody: mailProps.textBody,
    });
  } catch (e) {
    throw new Error(e as string);
  }
};
