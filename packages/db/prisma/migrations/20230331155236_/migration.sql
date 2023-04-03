/*
  Warnings:

  - You are about to drop the column `userId` on the `VerificationToken` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "VerificationToken" DROP CONSTRAINT "VerificationToken_userId_fkey";

-- DropIndex
DROP INDEX "VerificationToken_userId_key";

-- AlterTable
ALTER TABLE "VerificationToken" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_verifyId_fkey" FOREIGN KEY ("verifyId") REFERENCES "VerificationToken"("id") ON DELETE CASCADE ON UPDATE CASCADE;
