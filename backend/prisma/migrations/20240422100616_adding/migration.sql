/*
  Warnings:

  - The `km_price` column on the `Pricing` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `itemPrice` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "itemPrice" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Pricing" DROP COLUMN "km_price",
ADD COLUMN     "km_price" INTEGER[] DEFAULT ARRAY[100, 1500]::INTEGER[],
ALTER COLUMN "fix_price" SET DEFAULT 100;
