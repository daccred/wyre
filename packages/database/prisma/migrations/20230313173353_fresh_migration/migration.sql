/*
  Warnings:

  - The `type` column on the `Expense` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `passwordOtp` on the `VerificationToken` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ExpensType" AS ENUM ('Reimbursement', 'Payment');

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "type",
ADD COLUMN     "type" "ExpensType" NOT NULL DEFAULT 'Payment';

-- AlterTable
ALTER TABLE "Payroll" ALTER COLUMN "suspend" SET DEFAULT false;

-- AlterTable
ALTER TABLE "VerificationToken" DROP COLUMN "passwordOtp";

-- DropEnum
DROP TYPE "ExpenseType";
