/*
  Warnings:

  - You are about to drop the `Worker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Worker" DROP CONSTRAINT "Worker_payrollId_fkey";

-- DropTable
DROP TABLE "Worker";

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "jobRole" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "signBonus" TEXT NOT NULL,
    "status" BOOLEAN,
    "category" "WorkerType" NOT NULL DEFAULT 'EMPLOYEE',
    "payrollId" TEXT,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_payrollId_fkey" FOREIGN KEY ("payrollId") REFERENCES "Payroll"("id") ON DELETE SET NULL ON UPDATE CASCADE;
