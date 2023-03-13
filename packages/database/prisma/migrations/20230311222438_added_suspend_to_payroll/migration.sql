/*
  Warnings:

  - Added the required column `date` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `suspend` to the `Payroll` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ExpenseType" AS ENUM ('Reimbursement', 'Payment');

-- CreateEnum
CREATE TYPE "ExpenseStatus" AS ENUM ('Failed', 'Pending', 'Success');

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "ExpenseStatus" NOT NULL,
ADD COLUMN     "type" "ExpenseType" NOT NULL;

-- AlterTable
ALTER TABLE "Payroll" ADD COLUMN     "suspend" BOOLEAN NOT NULL;
