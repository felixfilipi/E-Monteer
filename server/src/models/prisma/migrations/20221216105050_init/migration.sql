/*
  Warnings:

  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cust_address` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `cust_email` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `cust_id` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `cust_password` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `cust_phone` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `cust_photoUrl` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `cust_token` on the `Customer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Customer` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `password` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Customer_cust_email_key";

-- DropIndex
DROP INDEX "Customer_cust_phone_key";

-- AlterTable
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_pkey",
DROP COLUMN "cust_address",
DROP COLUMN "cust_email",
DROP COLUMN "cust_id",
DROP COLUMN "cust_password",
DROP COLUMN "cust_phone",
DROP COLUMN "cust_photoUrl",
DROP COLUMN "cust_token",
ADD COLUMN     "address" VARCHAR(255) NOT NULL,
ADD COLUMN     "email" VARCHAR(50) NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "password" VARCHAR(50) NOT NULL,
ADD COLUMN     "phone" VARCHAR(15) NOT NULL,
ADD COLUMN     "photoUrl" VARCHAR(255),
ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Mechanic" (
    "id" TEXT NOT NULL,
    "mech_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "photoUrl" VARCHAR(255),
    "identityUrl" VARCHAR(255) NOT NULL,
    "speciality" VARCHAR(10) NOT NULL,
    "is_available" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mechanic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owner" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "owner_name" VARCHAR(255) NOT NULL,
    "photoUrl" VARCHAR(255),
    "identityUrl" VARCHAR(255),
    "is_available" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Garage" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "rating_id" INTEGER NOT NULL,
    "garage_phone" VARCHAR(15) NOT NULL,
    "garage_name" VARCHAR(255) NOT NULL,
    "garage_photoUrl" VARCHAR(255) NOT NULL,
    "garage_avg_rating" DOUBLE PRECISION,
    "garage_totalRating" INTEGER,
    "garage_openHour" VARCHAR(255) NOT NULL,
    "garage_openDay" VARCHAR(255) NOT NULL,
    "garage_site" VARCHAR(15) NOT NULL,
    "garage_latitude" DOUBLE PRECISION NOT NULL,
    "garage_longitude" DOUBLE PRECISION NOT NULL,
    "garage_speciality" VARCHAR(15) NOT NULL,
    "garage_totalMech" INTEGER,

    CONSTRAINT "Garage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "hashedToken" TEXT NOT NULL,
    "cust_id" TEXT,
    "mech_id" TEXT,
    "owner_id" TEXT,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mechanic_id_key" ON "Mechanic"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Mechanic_email_key" ON "Mechanic"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Mechanic_phone_key" ON "Mechanic"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_id_key" ON "Owner"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_email_key" ON "Owner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Garage_id_key" ON "Garage"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Garage_owner_id_key" ON "Garage"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Garage_rating_id_key" ON "Garage"("rating_id");

-- CreateIndex
CREATE UNIQUE INDEX "Garage_garage_phone_key" ON "Garage"("garage_phone");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_id_key" ON "RefreshToken"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_id_key" ON "Customer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phone_key" ON "Customer"("phone");

-- AddForeignKey
ALTER TABLE "Garage" ADD CONSTRAINT "Garage_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_cust_id_fkey" FOREIGN KEY ("cust_id") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_mech_id_fkey" FOREIGN KEY ("mech_id") REFERENCES "Mechanic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
