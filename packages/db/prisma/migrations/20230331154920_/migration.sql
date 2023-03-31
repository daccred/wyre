/*
  Warnings:

  - Made the column `userId` on table `VerificationToken` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "VerificationToken" ALTER COLUMN "userId" SET NOT NULL;
