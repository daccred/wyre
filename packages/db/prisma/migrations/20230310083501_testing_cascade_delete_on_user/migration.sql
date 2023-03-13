/*
  Warnings:

  - You are about to drop the column `category` on the `User` table. All the data in the column will be lost.
  - Made the column `phone` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `jobRole` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `companyId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_companyId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_verifyId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "category",
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "jobRole" SET NOT NULL,
ALTER COLUMN "companyId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_verifyId_fkey" FOREIGN KEY ("verifyId") REFERENCES "VerificationToken"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
