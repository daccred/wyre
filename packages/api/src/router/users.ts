import { UserService } from "../services";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  // this is a public route
  getAllUsers: publicProcedure.query(async () => {
    const users = await UserService.getUsers();
    return users;
  }),
  getAll: publicProcedure.query(() => {
    // return await ctx.prisma.in.findMany();
    return { message: "Hello Worlds" };
  }),
});
