/*
  Warnings:

  - The `currency` column on the `PaymentLink` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PaymentCurrency" AS ENUM ('NGN', 'GHS', 'USD', 'EUR');

-- AlterTable
ALTER TABLE "PaymentLink" DROP COLUMN "currency",
ADD COLUMN     "currency" "PaymentCurrency" DEFAULT 'NGN';
