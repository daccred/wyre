/*
  Warnings:

  - You are about to drop the column `file` on the `ExpenseAttchment` table. All the data in the column will be lost.
  - Added the required column `url` to the `ExpenseAttchment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExpenseAttchment" DROP COLUMN "file",
ADD COLUMN     "url" TEXT NOT NULL;
