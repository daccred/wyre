import { z } from "zod";
import { UserSchema } from "../interfaces";
import { UserService } from "../services";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  addUser: publicProcedure.input(UserSchema).mutation(({ input }) => {
    const user = UserService.createUser(input);
    return user;
  }),

  updateUser: protectedProcedure
    .input(z.object({ id: z.string(), data: UserSchema }))
    .mutation(({ input }) => {
      const user = UserService.updateUser(input.id, input.data);
      return user;
    }),

  deleteUser: protectedProcedure.input(z.string()).mutation(({ input }) => {
    const user = UserService.deleteUser(input);
    return user;
  }),
  getUsers: protectedProcedure.query(() => {
    const users = UserService.getUsers();
    return users;
  }),
  getSingleUser: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      const user = UserService.getSingleUser(input.id);
      return user;
    }),
});
