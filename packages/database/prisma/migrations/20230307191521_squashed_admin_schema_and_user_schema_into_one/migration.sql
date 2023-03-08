/*
  Warnings:

  - You are about to drop the column `adminId` on the `Invitation` table. All the data in the column will be lost.
  - The `type` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'USER');

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_verifyId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_expenseId_fkey";

-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_adminId_fkey";

-- AlterTable
ALTER TABLE "Invitation" DROP COLUMN "adminId";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "Role" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Admin";

-- CreateTable
CREATE TABLE "_EmployeeToExpense" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EmployeeToExpense_AB_unique" ON "_EmployeeToExpense"("A", "B");

-- CreateIndex
CREATE INDEX "_EmployeeToExpense_B_index" ON "_EmployeeToExpense"("B");

-- AddForeignKey
ALTER TABLE "_EmployeeToExpense" ADD CONSTRAINT "_EmployeeToExpense_A_fkey" FOREIGN KEY ("A") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeToExpense" ADD CONSTRAINT "_EmployeeToExpense_B_fkey" FOREIGN KEY ("B") REFERENCES "Expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;
