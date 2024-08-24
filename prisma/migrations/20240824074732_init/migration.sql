-- CreateEnum
CREATE TYPE "Role" AS ENUM ('NEW_CUSTOMER', 'GENERAL_CUSTOMER', 'ACTIVE_CUSTOMER', 'MANAGER', 'ADMIN', 'SUPERADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "short_id" SERIAL NOT NULL,
    "name" TEXT,
    "f_name" TEXT,
    "phoneNo" INTEGER NOT NULL,
    "address_village" TEXT,
    "address_home" TEXT NOT NULL,
    "hash_password" TEXT,
    "role" "Role" NOT NULL DEFAULT 'NEW_CUSTOMER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNo_key" ON "User"("phoneNo");
