-- CreateEnum
CREATE TYPE "ProviderName" AS ENUM ('google');

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provider" (
    "id" SERIAL NOT NULL,
    "provider" "ProviderName" NOT NULL,
    "providerId" TEXT NOT NULL,
    "accountId" INTEGER NOT NULL,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
