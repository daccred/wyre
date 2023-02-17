import { router, publicProcedure } from "../trpc";

export const userRouter = router({
  // this is a public route
  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany();
    return users;
  }),
  getAll: publicProcedure.query(() => {
    // return await ctx.prisma.in.findMany();
    return { message: "Hello World" };
  }),
});
