/*
  Warnings:

  - Changed the type of `allocation` on the `CryptoWallet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_payrollId_fkey";

-- AlterTable
ALTER TABLE "CryptoWallet" DROP COLUMN "allocation",
ADD COLUMN     "allocation" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_TeamPayroll" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TeamPayroll_AB_unique" ON "_TeamPayroll"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamPayroll_B_index" ON "_TeamPayroll"("B");

-- AddForeignKey
ALTER TABLE "_TeamPayroll" ADD CONSTRAINT "_TeamPayroll_A_fkey" FOREIGN KEY ("A") REFERENCES "Payroll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamPayroll" ADD CONSTRAINT "_TeamPayroll_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
