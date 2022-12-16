-- CreateTable
CREATE TABLE "Customer" (
    "cust_id" SERIAL NOT NULL,
    "cust_email" VARCHAR(50) NOT NULL,
    "cust_name" VARCHAR(255) NOT NULL,
    "cust_phone" VARCHAR(15) NOT NULL,
    "cust_address" VARCHAR(255) NOT NULL,
    "cust_password" VARCHAR(50) NOT NULL,
    "cust_photoUrl" VARCHAR(255),
    "cust_token" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("cust_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_cust_email_key" ON "Customer"("cust_email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_cust_phone_key" ON "Customer"("cust_phone");
