import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export function ServicesError(error: unknown) {
  if (error instanceof TRPCError) {
    throw new TRPCError({ code: error.code, message: error.message });
  }
  if (error instanceof Prisma.PrismaClientValidationError) {
    console.warn(error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      cause: error.name,
      message: "Prisma Client validation failed",
    });
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      cause: error.name,
      message: "Unknown request error",
    });
  }
  if (error instanceof Prisma.PrismaClientInitializationError) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      cause: error.name,
      message:
        "Prisma Client initialisation failed. Check your database configuration",
    });
  }
  console.warn(error);
  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "Something went wrong. Try again or reach out to the maintainers",
  });
}
