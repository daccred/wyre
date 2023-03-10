import { z } from "zod";

// # Since .env is gitignored, you can use .env-example to build a new `.env` file when you clone the repo.
// # Keep this file up-to-date when you add new variables to `.env`.

// # This file will be committed to version control, so make sure not to have any secrets in it.
// # If you are cloning this repo, create a copy of this file named `.env` and populate it with your secrets.

// # When adding additional env variables, the schema in /env/schema.mjs should be updated accordingly
const PORT = process.env.PORT || 3000;
const envSchema = z.object({
  // Prisma
  DATABASE_URL: z.string(),

  //     # Next Auth
  // # You can generate the secret via 'openssl rand -base64 32' on Linux
  // # More info: https://next-auth.js.org/configuration/options#secret

  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().default(`http://localhost:${PORT}`),

  // # Next Auth Discord Provider
  DISCORD_CLIENT_ID: z.string(),
  DISCORD_CLIENT_SECRET: z.string(),

  // # Postmark environment variables
  POSTMARK_CLIENT_ID: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
