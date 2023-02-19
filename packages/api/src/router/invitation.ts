import { InvitationSchema } from "../interfaces";
import { InvitationService } from "../services";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const invitationRouter = router({
  createInvitation: protectedProcedure
    .input(InvitationSchema)
    .mutation(async ({ ctx, input }) => {
      return await InvitationService.createInvitation({
        ...input,
        adminId: ctx.session.user.email as string,
      });
    }),
});
