import { InvitationSchema } from "../interfaces";
import { InvitationService } from "../services";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const invitationRouter = createTRPCRouter({
  createInvitation: protectedProcedure
    .input(InvitationSchema)
    .mutation(async ({ ctx, input }) => {
      return await InvitationService.createInvitation({
        ...input,
        adminId: ctx.session.user.email as string,
      });
    }),
});
