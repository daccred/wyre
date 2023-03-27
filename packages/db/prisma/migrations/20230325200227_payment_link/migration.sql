-- CreateTable
CREATE TABLE "PaymentLink" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT,
    "type" TEXT DEFAULT 'PUBLIC',
    "password" TEXT,
    "encryptedPassword" TEXT,
    "currency" TEXT DEFAULT 'NGN',
    "status" TEXT DEFAULT 'ACTIVE',
    "linkId" TEXT NOT NULL,
    "userId" TEXT,

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
CREATE UNIQUE INDEX "PaymentLink_linkId_key" ON "PaymentLink"("linkId");

-- AddForeignKey
ALTER TABLE "PaymentLink" ADD CONSTRAINT "PaymentLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WyreRequest" ADD CONSTRAINT "WyreRequest_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "PaymentLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WyreRequest" ADD CONSTRAINT "WyreRequest_to_fkey" FOREIGN KEY ("to") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_wyreRequestId_fkey" FOREIGN KEY ("wyreRequestId") REFERENCES "WyreRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutBoundTransaction" ADD CONSTRAINT "OutBoundTransaction_inboundTransactionId_fkey" FOREIGN KEY ("inboundTransactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FailedWyreRequest" ADD CONSTRAINT "FailedWyreRequest_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
