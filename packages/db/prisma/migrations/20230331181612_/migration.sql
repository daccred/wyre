/*
  Warnings:

  - You are about to drop the column `attachmentId` on the `Expense` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Expense_attachmentId_key";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "attachmentId";
