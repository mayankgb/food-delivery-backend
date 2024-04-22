-- CreateEnum
CREATE TYPE "ItemtType" AS ENUM ('perishable', 'non_perishable');

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "type" "ItemtType" NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pricing" (
    "id" SERIAL NOT NULL,
    "zone" TEXT NOT NULL,
    "base_distance_in_km" INTEGER NOT NULL DEFAULT 5,
    "km_price" INTEGER NOT NULL,
    "fix_price" INTEGER NOT NULL DEFAULT 10,
    "item_id" INTEGER NOT NULL,
    "orgId" INTEGER NOT NULL,

    CONSTRAINT "Pricing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pricing_item_id_orgId_key" ON "Pricing"("item_id", "orgId");

-- AddForeignKey
ALTER TABLE "Pricing" ADD CONSTRAINT "Pricing_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pricing" ADD CONSTRAINT "Pricing_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
