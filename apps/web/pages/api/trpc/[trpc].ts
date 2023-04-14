import { appRouter, createTRPCContext } from '@wyrecc/api';
import { createNextApiHandler } from '@trpc/server/adapters/next';
import { env } from '../../../env/server.mjs';

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === 'development'
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path}: ${error}`);
        }
      : undefined,
});
