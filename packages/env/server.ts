// @ts-check

/**
 * This file is included in `/next.config.mjs` which ensures the app isn't built with invalid env vars.
 * It has to be a `.mjs`-file to be imported there.
 */
import { env as clientEnv, formatErrors } from "./client";
import { serverSchema } from "./schema";

const _serverEnv = serverSchema.safeParse(process.env) as {
  success: boolean;
  data: import("zod").infer<typeof serverSchema>;
  error: import("zod").ZodError;
};

if (!_serverEnv.success) {
  console.error("❌ Invalid environment variables:\n", ...formatErrors(_serverEnv.error.format()));
  throw new Error("Invalid environment variables");
}

for (let key of Object.keys(_serverEnv.data)) {
  if (key.startsWith("NEXT_PUBLIC_")) {
    console.warn("❌ You are exposing a server-side env-variable:", key);

    throw new Error("You are exposing a server-side env-variable");
  }
}

export const env = { ..._serverEnv.data, ...clientEnv };
