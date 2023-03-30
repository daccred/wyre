/*
  Warnings:

  - The `currency` column on the `PaymentLink` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `currency` on the `Payroll` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('NGN', 'KES', 'RWF', 'UGX', 'TZS', 'ZMW', 'ZAR', 'GHS', 'USD', 'EUR');

-- AlterTable
ALTER TABLE "PaymentLink" DROP COLUMN "currency",
ADD COLUMN     "currency" "Currency" DEFAULT 'NGN';

-- AlterTable
ALTER TABLE "Payroll" DROP COLUMN "currency",
ADD COLUMN     "currency" "Currency" NOT NULL;

-- DropEnum
DROP TYPE "PaymentCurrency";
