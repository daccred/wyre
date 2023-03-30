/*
  Warnings:

  - The values [Failed,Success] on the enum `ExpenseStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `_ExpenseToTeam` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[employeeId]` on the table `Expense` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employeeId` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ExpenseStatus_new" AS ENUM ('Approved', 'Pending', 'Disapproved');
ALTER TABLE "Expense" ALTER COLUMN "status" TYPE "ExpenseStatus_new" USING ("status"::text::"ExpenseStatus_new");
ALTER TYPE "ExpenseStatus" RENAME TO "ExpenseStatus_old";
ALTER TYPE "ExpenseStatus_new" RENAME TO "ExpenseStatus";
DROP TYPE "ExpenseStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "_ExpenseToTeam" DROP CONSTRAINT "_ExpenseToTeam_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExpenseToTeam" DROP CONSTRAINT "_ExpenseToTeam_B_fkey";

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "attachment" TEXT,
ADD COLUMN     "employeeId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ExpenseToTeam";

-- CreateIndex
CREATE UNIQUE INDEX "Expense_employeeId_key" ON "Expense"("employeeId");

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
