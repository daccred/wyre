/*
  Warnings:

  - You are about to drop the column `bankName` on the `Bank` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `Bank` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `CryptoWallet` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `MobileMoney` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[personnelId]` on the table `Bank` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[personnelId]` on the table `CryptoWallet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[personnelId]` on the table `MobileMoney` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Bank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personnelId` to the `Bank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personnelId` to the `CryptoWallet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personnelId` to the `MobileMoney` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bank" DROP CONSTRAINT "Bank_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "CryptoWallet" DROP CONSTRAINT "CryptoWallet_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "FailedWyreRequest" DROP CONSTRAINT "FailedWyreRequest_owner_fkey";

-- DropForeignKey
ALTER TABLE "MobileMoney" DROP CONSTRAINT "MobileMoney_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "OutBoundTransaction" DROP CONSTRAINT "OutBoundTransaction_inboundTransactionId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- DropIndex
DROP INDEX "Bank_employeeId_key";

-- DropIndex
DROP INDEX "CryptoWallet_employeeId_key";

-- DropIndex
DROP INDEX "MobileMoney_employeeId_key";

-- AlterTable
ALTER TABLE "Bank" DROP COLUMN "bankName",
DROP COLUMN "employeeId",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "personnelId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CryptoWallet" DROP COLUMN "employeeId",
ADD COLUMN     "personnelId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MobileMoney" DROP COLUMN "employeeId",
ADD COLUMN     "personnelId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Bank_personnelId_key" ON "Bank"("personnelId");

-- CreateIndex
CREATE UNIQUE INDEX "CryptoWallet_personnelId_key" ON "CryptoWallet"("personnelId");

-- CreateIndex
CREATE UNIQUE INDEX "MobileMoney_personnelId_key" ON "MobileMoney"("personnelId");

-- AddForeignKey
ALTER TABLE "CryptoWallet" ADD CONSTRAINT "CryptoWallet_personnelId_fkey" FOREIGN KEY ("personnelId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bank" ADD CONSTRAINT "Bank_personnelId_fkey" FOREIGN KEY ("personnelId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobileMoney" ADD CONSTRAINT "MobileMoney_personnelId_fkey" FOREIGN KEY ("personnelId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutBoundTransaction" ADD CONSTRAINT "OutBoundTransaction_inboundTransactionId_fkey" FOREIGN KEY ("inboundTransactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FailedWyreRequest" ADD CONSTRAINT "FailedWyreRequest_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
