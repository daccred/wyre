-- AlterEnum
ALTER TYPE "PaymentMethod" ADD VALUE 'Mobile_Money';

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "method" "PaymentMethod" DEFAULT 'Bank_Transfer';
