import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string().nullish() }).nullish()).query(({ input }) => {
    return {
      greeting: `Hello ${input?.text ?? 'world'}`,
    };
  }),
  getAll: publicProcedure.query(() => {
    // return ctx.prisma.example.findMany();
    return { message: 'Hello World' };
  }),
});
