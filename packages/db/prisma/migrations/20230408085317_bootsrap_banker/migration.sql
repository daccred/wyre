/*
  Warnings:

  - The `type` column on the `Expense` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `teamCategory` column on the `Team` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `description` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `receiverEmail` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `receiverName` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `receiverPhoneNumber` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `reference` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `usdTransferCode` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `wyreRequestId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `ExpenseAttchment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FailedWyreRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OutBoundTransaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TeamCategory" AS ENUM ('EMPLOYEE', 'CONTRACTOR');

-- CreateEnum
CREATE TYPE "ExpenseCategory" AS ENUM ('Reimbursement', 'Payment');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('Bank_Transfer', 'Crypto');

-- CreateEnum
CREATE TYPE "TransactionCategory" AS ENUM ('EXPENSE', 'PAYROLL');

-- DropForeignKey
ALTER TABLE "ExpenseAttchment" DROP CONSTRAINT "ExpenseAttchment_expenseId_fkey";

-- DropForeignKey
ALTER TABLE "FailedWyreRequest" DROP CONSTRAINT "FailedWyreRequest_owner_fkey";

-- DropForeignKey
ALTER TABLE "OutBoundTransaction" DROP CONSTRAINT "OutBoundTransaction_inboundTransactionId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "type",
ADD COLUMN     "type" "ExpenseCategory" NOT NULL DEFAULT 'Payment';

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "teamCategory",
ADD COLUMN     "teamCategory" "TeamCategory" NOT NULL DEFAULT 'EMPLOYEE';

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "description",
DROP COLUMN "receiverEmail",
DROP COLUMN "receiverName",
DROP COLUMN "receiverPhoneNumber",
DROP COLUMN "reference",
DROP COLUMN "usdTransferCode",
DROP COLUMN "userId",
DROP COLUMN "wyreRequestId",
ADD COLUMN     "attempts" INTEGER DEFAULT 0,
ADD COLUMN     "category" "TransactionCategory" NOT NULL DEFAULT 'PAYROLL',
ADD COLUMN     "categoryRefId" TEXT,
ADD COLUMN     "provider" TEXT;

-- DropTable
DROP TABLE "ExpenseAttchment";

-- DropTable
DROP TABLE "FailedWyreRequest";

-- DropTable
DROP TABLE "OutBoundTransaction";

-- DropEnum
DROP TYPE "ExpensType";

-- DropEnum
DROP TYPE "ExpensePaymentMethod";

-- DropEnum
DROP TYPE "WorkerType";

-- CreateTable
CREATE TABLE "ExpenseAttachment" (
    "id" TEXT NOT NULL,
    "expenseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "ExpenseAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseAttachment_expenseId_key" ON "ExpenseAttachment"("expenseId");

-- AddForeignKey
ALTER TABLE "ExpenseAttachment" ADD CONSTRAINT "ExpenseAttachment_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;
