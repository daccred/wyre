/*
  Warnings:

  - The `type` column on the `PaymentLink` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PaymentLinkType" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterTable
ALTER TABLE "PaymentLink" DROP COLUMN "type",
ADD COLUMN     "type" "PaymentLinkType" DEFAULT 'PUBLIC';
