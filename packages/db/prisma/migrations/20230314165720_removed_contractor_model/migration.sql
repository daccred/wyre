/*
  Warnings:

  - You are about to drop the column `contractorId` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the `Contractor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contractor" DROP CONSTRAINT "Contractor_payrollId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_contractorId_fkey";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "contractorId";

-- DropTable
DROP TABLE "Contractor";
