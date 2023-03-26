/*
  Warnings:

  - The `status` column on the `PaymentLink` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PaymentLinkStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "PaymentLink" DROP COLUMN "status",
ADD COLUMN     "status" "PaymentLinkStatus" DEFAULT 'ACTIVE';
