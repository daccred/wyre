/*
  Warnings:

  - The `emailVerified` column on the `Admin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `emailVerified` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "password" TEXT,
DROP COLUMN "emailVerified",
ADD COLUMN     "emailVerified" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT,
DROP COLUMN "emailVerified",
ADD COLUMN     "emailVerified" BOOLEAN DEFAULT false;
