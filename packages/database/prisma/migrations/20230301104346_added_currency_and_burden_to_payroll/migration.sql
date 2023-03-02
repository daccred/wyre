/*
  Warnings:

  - You are about to drop the column `extendedTo` on the `Payroll` table. All the data in the column will be lost.
  - Added the required column `burden` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Payroll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payroll" DROP COLUMN "extendedTo",
ADD COLUMN     "burden" INTEGER NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL;
