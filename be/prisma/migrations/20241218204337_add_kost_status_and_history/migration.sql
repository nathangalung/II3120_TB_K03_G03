-- CreateTable
CREATE TABLE "KostStatus" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kostId" TEXT NOT NULL,
    "monthlyPrice" DOUBLE PRECISION NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "delayDays" INTEGER,
    "continuousType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KostStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KostHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kostId" TEXT NOT NULL,
    "payment" DOUBLE PRECISION NOT NULL,
    "continuous" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KostHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KostStatus" ADD CONSTRAINT "KostStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KostStatus" ADD CONSTRAINT "KostStatus_kostId_fkey" FOREIGN KEY ("kostId") REFERENCES "Kost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KostHistory" ADD CONSTRAINT "KostHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KostHistory" ADD CONSTRAINT "KostHistory_kostId_fkey" FOREIGN KEY ("kostId") REFERENCES "Kost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
