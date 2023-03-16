-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "contractorId" TEXT;

-- CreateTable
CREATE TABLE "Contractor" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "jobRole" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "signBonus" TEXT NOT NULL,
    "status" BOOLEAN DEFAULT true,
    "category" "WorkerType" NOT NULL DEFAULT 'CONTRACTOR',
    "payrollId" TEXT,
    "expenseId" TEXT,

    CONSTRAINT "Contractor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contractor_email_key" ON "Contractor"("email");

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contractor" ADD CONSTRAINT "Contractor_payrollId_fkey" FOREIGN KEY ("payrollId") REFERENCES "Payroll"("id") ON DELETE SET NULL ON UPDATE CASCADE;
