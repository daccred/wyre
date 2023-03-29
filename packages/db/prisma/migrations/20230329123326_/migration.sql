/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `VerificationToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bank" DROP CONSTRAINT "Bank_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "CryptoWallet" DROP CONSTRAINT "CryptoWallet_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "ExpenseAttchment" DROP CONSTRAINT "ExpenseAttchment_expenseId_fkey";

-- DropForeignKey
ALTER TABLE "MobileMoney" DROP CONSTRAINT "MobileMoney_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_wyreRequestId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_verifyId_fkey";

-- DropForeignKey
ALTER TABLE "WyreRequest" DROP CONSTRAINT "WyreRequest_linkId_fkey";

-- DropIndex
DROP INDEX "VerificationToken_token_key";

-- AlterTable
ALTER TABLE "VerificationToken" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_userId_key" ON "VerificationToken"("userId");

-- AddForeignKey
ALTER TABLE "VerificationToken" ADD CONSTRAINT "VerificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseAttchment" ADD CONSTRAINT "ExpenseAttchment_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CryptoWallet" ADD CONSTRAINT "CryptoWallet_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bank" ADD CONSTRAINT "Bank_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobileMoney" ADD CONSTRAINT "MobileMoney_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
