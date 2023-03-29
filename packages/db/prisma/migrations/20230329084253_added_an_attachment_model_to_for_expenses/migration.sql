/*
  Warnings:

  - You are about to drop the column `attachment` on the `Expense` table. All the data in the column will be lost.
  - Added the required column `attachmentId` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ExpensePaymentMethod" AS ENUM ('Bank_Transfer', 'Crypto');

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "attachment",
ADD COLUMN     "attachmentId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ExpenseAttchment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "expenseId" TEXT NOT NULL,

    CONSTRAINT "ExpenseAttchment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseAttchment_expenseId_key" ON "ExpenseAttchment"("expenseId");

-- AddForeignKey
ALTER TABLE "ExpenseAttchment" ADD CONSTRAINT "ExpenseAttchment_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
