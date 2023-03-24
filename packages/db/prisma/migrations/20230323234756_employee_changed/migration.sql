/*
  Warnings:

  - You are about to drop the column `category` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PayrollMethod" AS ENUM ('CRYPTO', 'BANK', 'MOBILEMONEY');

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "category",
DROP COLUMN "name",
ADD COLUMN     "country" TEXT,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "payrollMethod" "PayrollMethod",
ADD COLUMN     "payrollMethodId" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "teamCategory" "WorkerType" NOT NULL DEFAULT 'EMPLOYEE';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;
