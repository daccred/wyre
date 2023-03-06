-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_verifyId_fkey";

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_verifyId_fkey" FOREIGN KEY ("verifyId") REFERENCES "VerificationToken"("id") ON DELETE CASCADE ON UPDATE CASCADE;
