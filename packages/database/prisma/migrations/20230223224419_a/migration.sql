/*
  Warnings:

  - You are about to drop the column `payrollEmployeesId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Payroll` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PayrollEmployees` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PayrollEmployees" DROP CONSTRAINT "PayrollEmployees_payrollId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_payrollEmployeesId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "payrollEmployeesId";

-- DropTable
DROP TABLE "Payroll";

-- DropTable
DROP TABLE "PayrollEmployees";
