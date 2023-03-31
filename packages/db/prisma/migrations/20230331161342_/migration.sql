/*
  Warnings:

  - You are about to drop the column `verifyId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `VerificationToken` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `VerificationToken` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_verifyId_fkey";

-- DropIndex
DROP INDEX "User_verifyId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "verifyId";

-- AlterTable
ALTER TABLE "VerificationToken" ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_userId_key" ON "VerificationToken"("userId");

-- AddForeignKey
ALTER TABLE "VerificationToken" ADD CONSTRAINT "VerificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
