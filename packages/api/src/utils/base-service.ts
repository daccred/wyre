import type { createTRPCContext } from '../trpc';
import { ServerError } from './server-error';

export abstract class BaseService {
  protected context: typeof createTRPCContext;
  protected error: typeof ServerError;

  constructor(context: typeof createTRPCContext) {
    this.context = context;
    this.error = ServerError;
  }
}
