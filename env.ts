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
  // Redis configuration

  REDIS_HOST: z.string(),
  REDIS_PORT: z.string(),
  REDIS_PASSWORD: z.string(),
  // REDIS_DB: z.number().default(0),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(env.error.format(), null, 4)
  );
  process.exit(1);
}

export default env.data;
