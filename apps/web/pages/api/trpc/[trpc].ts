import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "@wyre-zayroll/env/src/index.mjs";
import { createContext } from "../../../../../packages/api/src/context";
import { appRouter } from "../../../../../packages/api/src/router/_app";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path}: ${error}`);
        }
      : undefined,
});
