import dotenv from "dotenv";

dotenv.config();

export const POSTMARK_CLIENT_ID = process.env.POSTMARK_CLIENT_ID as string;
