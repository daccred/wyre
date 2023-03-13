/*
  Warnings:

  - Made the column `companyPhone` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Company` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "companyPhone" SET NOT NULL,
ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL;
