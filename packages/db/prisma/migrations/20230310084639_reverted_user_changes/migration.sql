/*
  Warnings:

  - Made the column `verifyId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'SUPER_ADMIN';

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_companyId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_verifyId_fkey";

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "companyPhone" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "verifyId" SET NOT NULL,
ALTER COLUMN "jobRole" DROP NOT NULL,
ALTER COLUMN "companyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_verifyId_fkey" FOREIGN KEY ("verifyId") REFERENCES "VerificationToken"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
