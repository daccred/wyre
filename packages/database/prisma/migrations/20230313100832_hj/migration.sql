/*
  Warnings:

  - You are about to drop the `OTPs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OTPs" DROP CONSTRAINT "OTPs_userId_fkey";

-- DropTable
DROP TABLE "OTPs";

-- CreateTable
CREATE TABLE "Otps" (
    "id" TEXT NOT NULL,
    "otp" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Otps_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Otps" ADD CONSTRAINT "Otps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
