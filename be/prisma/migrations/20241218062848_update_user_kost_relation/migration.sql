/*
  Warnings:

  - You are about to drop the column `kostId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `kostId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Kost` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_kostId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_kostId_fkey";

-- AlterTable
ALTER TABLE "LaundryDelivery" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "kostId",
ADD COLUMN     "kostName" TEXT,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "kostId",
ADD COLUMN     "kostName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Kost_name_key" ON "Kost"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_kostName_fkey" FOREIGN KEY ("kostName") REFERENCES "Kost"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_kostName_fkey" FOREIGN KEY ("kostName") REFERENCES "Kost"("name") ON DELETE SET NULL ON UPDATE CASCADE;
