import { ServerClient } from "postmark";
import crypto from "crypto";
import queryString from "query-string";
import { POSTMARK_CLIENT_ID } from "../constants";
import { getBaseUrl } from "../sms/utils";
import { emailHTML } from "./templates/sendEmail";

type Props = {
  from: string;
  to: string;
  subject: string;
  textBody: string;
  userId?: string;
  verifyCode: string;
};

const client = new ServerClient(POSTMARK_CLIENT_ID);

export const sendEmail = async (mailProps: Props) => {
  try {
    const verifyCode = mailProps.verifyCode;
    const userId = mailProps.userId;
    const token = crypto.randomBytes(20).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const confirmLink = `${getBaseUrl()}/confirm?${queryString.stringify({
      id: userId,
      token: token,
      expires: expires.toISOString(),
    })}`;

    const htmlBody = emailHTML({ confirmLink, confirmCode: verifyCode });

    const res = await client.sendEmail({
      From: mailProps.from,
      To: mailProps.to,
      Subject: mailProps.subject,
      TextBody: mailProps.textBody,
      HtmlBody: htmlBody,
    });
    return res;
  } catch (e) {
    throw new Error(e as string);
  }
};
