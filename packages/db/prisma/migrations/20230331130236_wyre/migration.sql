-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "PayrollMethod" AS ENUM ('CRYPTO', 'BANK', 'MOBILEMONEY');

-- CreateEnum
CREATE TYPE "WorkerType" AS ENUM ('EMPLOYEE', 'CONTRACTOR');

-- CreateEnum
CREATE TYPE "ExpensType" AS ENUM ('Reimbursement', 'Payment');

-- CreateEnum
CREATE TYPE "ExpenseStatus" AS ENUM ('Approved', 'Pending', 'Disapproved');

-- CreateEnum
CREATE TYPE "ExpensePaymentMethod" AS ENUM ('Bank_Transfer', 'Crypto');

-- CreateEnum
CREATE TYPE "PaymentLinkStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "PaymentLinkType" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "PaymentCurrency" AS ENUM ('NGN', 'GHS', 'USD', 'EUR');

-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL,
    "name" TEXT DEFAULT 'Example',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "type" "Role" NOT NULL DEFAULT 'USER',
    "emailVerified" BOOLEAN DEFAULT false,
    "verifyId" TEXT NOT NULL,
    "image" TEXT,
    "jobRole" TEXT,
    "category" TEXT,
    "companyId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyEmail" TEXT NOT NULL,
    "companyPhone" TEXT,
    "country" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invitation" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "description" TEXT,
    "token" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "expires" TIMESTAMP(3),
    "companyId" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "country" TEXT,
    "email" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "jobRole" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "signBonus" TEXT NOT NULL,
    "status" BOOLEAN DEFAULT true,
    "teamCategory" "WorkerType" NOT NULL DEFAULT 'EMPLOYEE',
    "payrollId" TEXT,
    "payrollMethod" "PayrollMethod" NOT NULL DEFAULT 'BANK',

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payroll" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "cycle" TEXT NOT NULL,
    "payday" TIMESTAMP(3) NOT NULL,
    "auto" BOOLEAN NOT NULL,
    "suspend" BOOLEAN NOT NULL DEFAULT false,
    "burden" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,

    CONSTRAINT "Payroll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpenseAttchment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "expenseId" TEXT NOT NULL,

    CONSTRAINT "ExpenseAttchment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "ExpensType" NOT NULL DEFAULT 'Payment',
    "status" "ExpenseStatus" NOT NULL,
    "attachmentId" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CryptoWallet" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "network" TEXT NOT NULL,
    "allocation" TEXT NOT NULL,

    CONSTRAINT "CryptoWallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bank" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "bankCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "swiftCode" TEXT NOT NULL,
    "routingNumber" TEXT NOT NULL,
    "accountType" TEXT NOT NULL,
    "allocation" INTEGER NOT NULL,

    CONSTRAINT "Bank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MobileMoney" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "allocation" INTEGER NOT NULL,
    "employeeId" TEXT NOT NULL,

    CONSTRAINT "MobileMoney_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentLink" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT,
    "type" "PaymentLinkType" DEFAULT 'PUBLIC',
    "password" TEXT,
    "encryptedPassword" TEXT,
    "currency" "PaymentCurrency" DEFAULT 'NGN',
    "status" "PaymentLinkStatus" DEFAULT 'ACTIVE',
    "linkId" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WyreRequest" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "linkId" TEXT,
    "amount" INTEGER,
    "requesterEmail" TEXT,
    "requesterPhoneNumber" TEXT,
    "requesterAccountNumber" TEXT,
    "bankName" TEXT,
    "requesterName" TEXT,
    "reference" TEXT,
    "to" TEXT,
    "status" TEXT DEFAULT 'PENDING',
    "description" TEXT,

    CONSTRAINT "WyreRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER,
    "currency" TEXT DEFAULT 'NGN',
    "status" TEXT DEFAULT 'PENDING',
    "reference" TEXT,
    "receiverEmail" TEXT,
    "description" TEXT,
    "receiverPhoneNumber" TEXT,
    "receiverName" TEXT,
    "userId" TEXT,
    "usdTransferCode" TEXT,
    "wyreRequestId" TEXT,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutBoundTransaction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT DEFAULT 'PENDING',
    "inboundTransactionId" TEXT,
    "reference" TEXT,

    CONSTRAINT "OutBoundTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FailedWyreRequest" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "linkId" TEXT,
    "requesterEmail" TEXT,
    "requesterPhoneNumber" TEXT,
    "requesterName" TEXT,
    "owner" TEXT,
    "attempts" INTEGER DEFAULT 0,

    CONSTRAINT "FailedWyreRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_verifyId_key" ON "User"("verifyId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_userId_key" ON "VerificationToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_id_token_key" ON "VerificationToken"("id", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyEmail_key" ON "Company"("companyEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_email_key" ON "Invitation"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_token_key" ON "Invitation"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_userId_key" ON "Invitation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_email_key" ON "Team"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseAttchment_expenseId_key" ON "ExpenseAttchment"("expenseId");

-- CreateIndex
CREATE UNIQUE INDEX "Expense_attachmentId_key" ON "Expense"("attachmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Expense_employeeId_key" ON "Expense"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "CryptoWallet_employeeId_key" ON "CryptoWallet"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "Bank_employeeId_key" ON "Bank"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "MobileMoney_employeeId_key" ON "MobileMoney"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentLink_linkId_key" ON "PaymentLink"("linkId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationToken" ADD CONSTRAINT "VerificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_payrollId_fkey" FOREIGN KEY ("payrollId") REFERENCES "Payroll"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseAttchment" ADD CONSTRAINT "ExpenseAttchment_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CryptoWallet" ADD CONSTRAINT "CryptoWallet_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bank" ADD CONSTRAINT "Bank_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobileMoney" ADD CONSTRAINT "MobileMoney_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentLink" ADD CONSTRAINT "PaymentLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WyreRequest" ADD CONSTRAINT "WyreRequest_to_fkey" FOREIGN KEY ("to") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutBoundTransaction" ADD CONSTRAINT "OutBoundTransaction_inboundTransactionId_fkey" FOREIGN KEY ("inboundTransactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FailedWyreRequest" ADD CONSTRAINT "FailedWyreRequest_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
