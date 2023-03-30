/*
  Warnings:

  - You are about to drop the column `expenseId` on the `ExpenseAttchment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[attachmentId]` on the table `Expense` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cryptoId]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bankId]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[momoId]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bankId` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cryptoId` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `momoId` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bank" DROP CONSTRAINT "Bank_userId_fkey";

-- DropForeignKey
ALTER TABLE "CryptoWallet" DROP CONSTRAINT "CryptoWallet_userId_fkey";

-- DropForeignKey
ALTER TABLE "ExpenseAttchment" DROP CONSTRAINT "ExpenseAttchment_expenseId_fkey";

-- DropForeignKey
ALTER TABLE "MobileMoney" DROP CONSTRAINT "MobileMoney_userId_fkey";

-- DropIndex
DROP INDEX "ExpenseAttchment_expenseId_key";

-- AlterTable
ALTER TABLE "ExpenseAttchment" DROP COLUMN "expenseId";

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "bankId" TEXT NOT NULL,
ADD COLUMN     "cryptoId" TEXT NOT NULL,
ADD COLUMN     "momoId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Expense_attachmentId_key" ON "Expense"("attachmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_cryptoId_key" ON "Team"("cryptoId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_bankId_key" ON "Team"("bankId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_momoId_key" ON "Team"("momoId");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_cryptoId_fkey" FOREIGN KEY ("cryptoId") REFERENCES "CryptoWallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "Bank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_momoId_fkey" FOREIGN KEY ("momoId") REFERENCES "MobileMoney"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "ExpenseAttchment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
