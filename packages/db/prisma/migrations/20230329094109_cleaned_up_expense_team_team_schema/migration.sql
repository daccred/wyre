/*
  Warnings:

  - You are about to drop the column `userId` on the `Bank` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `CryptoWallet` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumbe` on the `MobileMoney` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `MobileMoney` table. All the data in the column will be lost.
  - You are about to drop the column `bankId` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `cryptoId` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `expenseId` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `momoId` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `payrollMethodId` on the `Team` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[employeeId]` on the table `Bank` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[employeeId]` on the table `CryptoWallet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[expenseId]` on the table `ExpenseAttchment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Invitation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[employeeId]` on the table `MobileMoney` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employeeId` to the `Bank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `CryptoWallet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expenseId` to the `ExpenseAttchment` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Invitation` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `employeeId` to the `MobileMoney` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `MobileMoney` table without a default value. This is not possible if the table is not empty.
  - Made the column `payrollMethod` on table `Team` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_attachmentId_fkey";

-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_userId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_bankId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_cryptoId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_momoId_fkey";

-- DropIndex
DROP INDEX "Team_bankId_key";

-- DropIndex
DROP INDEX "Team_cryptoId_key";

-- DropIndex
DROP INDEX "Team_momoId_key";

-- AlterTable
ALTER TABLE "Bank" DROP COLUMN "userId",
ADD COLUMN     "employeeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CryptoWallet" DROP COLUMN "userId",
ADD COLUMN     "employeeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ExpenseAttchment" ADD COLUMN     "expenseId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Invitation" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "MobileMoney" DROP COLUMN "phoneNumbe",
DROP COLUMN "userId",
ADD COLUMN     "employeeId" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "bankId",
DROP COLUMN "cryptoId",
DROP COLUMN "expenseId",
DROP COLUMN "momoId",
DROP COLUMN "payrollMethodId",
ALTER COLUMN "payrollMethod" SET NOT NULL,
ALTER COLUMN "payrollMethod" SET DEFAULT 'BANK';

-- CreateIndex
CREATE UNIQUE INDEX "Bank_employeeId_key" ON "Bank"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "CryptoWallet_employeeId_key" ON "CryptoWallet"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseAttchment_expenseId_key" ON "ExpenseAttchment"("expenseId");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_userId_key" ON "Invitation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MobileMoney_employeeId_key" ON "MobileMoney"("employeeId");

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseAttchment" ADD CONSTRAINT "ExpenseAttchment_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CryptoWallet" ADD CONSTRAINT "CryptoWallet_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bank" ADD CONSTRAINT "Bank_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobileMoney" ADD CONSTRAINT "MobileMoney_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
