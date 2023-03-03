-- AlterTable
ALTER TABLE "User" ADD COLUMN     "payrollEmployeesId" TEXT;

-- CreateTable
CREATE TABLE "Payroll" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "cycle" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "auto" BOOLEAN NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payroll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayrollEmployees" (
    "id" TEXT NOT NULL,
    "payrollId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "grossPay" INTEGER NOT NULL,
    "commission" INTEGER NOT NULL,
    "bonus" INTEGER NOT NULL,
    "deduction" INTEGER NOT NULL,

    CONSTRAINT "PayrollEmployees_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_payrollEmployeesId_fkey" FOREIGN KEY ("payrollEmployeesId") REFERENCES "PayrollEmployees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayrollEmployees" ADD CONSTRAINT "PayrollEmployees_payrollId_fkey" FOREIGN KEY ("payrollId") REFERENCES "Payroll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
