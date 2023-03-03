/*
  Warnings:

  - You are about to drop the column `dueDate` on the `Payroll` table. All the data in the column will be lost.
  - Added the required column `payday` to the `Payroll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payroll" DROP COLUMN "dueDate",
ADD COLUMN     "payday" TIMESTAMP(3) NOT NULL;
