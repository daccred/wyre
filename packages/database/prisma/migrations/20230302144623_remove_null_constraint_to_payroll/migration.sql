-- DropForeignKey
ALTER TABLE "Contractor" DROP CONSTRAINT "Contractor_payrollId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_payrollId_fkey";

-- AlterTable
ALTER TABLE "Contractor" ALTER COLUMN "payrollId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "payrollId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_payrollId_fkey" FOREIGN KEY ("payrollId") REFERENCES "Payroll"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contractor" ADD CONSTRAINT "Contractor_payrollId_fkey" FOREIGN KEY ("payrollId") REFERENCES "Payroll"("id") ON DELETE SET NULL ON UPDATE CASCADE;
