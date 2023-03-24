/*
  Warnings:

  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EmployeeToExpense` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_payrollId_fkey";

-- DropForeignKey
ALTER TABLE "_EmployeeToExpense" DROP CONSTRAINT "_EmployeeToExpense_A_fkey";

-- DropForeignKey
ALTER TABLE "_EmployeeToExpense" DROP CONSTRAINT "_EmployeeToExpense_B_fkey";

-- DropTable
DROP TABLE "Employee";

-- DropTable
DROP TABLE "_EmployeeToExpense";

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "country" TEXT,
    "email" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "jobRole" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "signBonus" TEXT NOT NULL,
    "status" BOOLEAN DEFAULT true,
    "teamCategory" "WorkerType" NOT NULL DEFAULT 'EMPLOYEE',
    "payrollId" TEXT,
    "expenseId" TEXT,
    "payrollMethod" "PayrollMethod",
    "payrollMethodId" TEXT,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CryptoWallet" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "network" TEXT NOT NULL,
    "allocation" TEXT NOT NULL,

    CONSTRAINT "CryptoWallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bank" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "bankCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "swiftCode" TEXT NOT NULL,
    "routingNumber" TEXT NOT NULL,
    "accountType" TEXT NOT NULL,
    "allocation" INTEGER NOT NULL,

    CONSTRAINT "Bank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MobileMoney" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "phoneNumbe" TEXT NOT NULL,
    "allocation" INTEGER NOT NULL,

    CONSTRAINT "MobileMoney_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExpenseToTeam" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_email_key" ON "Team"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ExpenseToTeam_AB_unique" ON "_ExpenseToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_ExpenseToTeam_B_index" ON "_ExpenseToTeam"("B");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_payrollId_fkey" FOREIGN KEY ("payrollId") REFERENCES "Payroll"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CryptoWallet" ADD CONSTRAINT "CryptoWallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bank" ADD CONSTRAINT "Bank_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobileMoney" ADD CONSTRAINT "MobileMoney_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExpenseToTeam" ADD CONSTRAINT "_ExpenseToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "Expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExpenseToTeam" ADD CONSTRAINT "_ExpenseToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
