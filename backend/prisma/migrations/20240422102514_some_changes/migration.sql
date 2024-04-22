/*
  Warnings:

  - Changed the type of `km_price` on the `Pricing` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Pricing" DROP COLUMN "km_price",
ADD COLUMN     "km_price" INTEGER NOT NULL;
