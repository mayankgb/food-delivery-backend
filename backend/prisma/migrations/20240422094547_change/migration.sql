/*
  Warnings:

  - You are about to drop the column `orgId` on the `Pricing` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[item_id,organization_id]` on the table `Pricing` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organization_id` to the `Pricing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pricing" DROP CONSTRAINT "Pricing_orgId_fkey";

-- DropIndex
DROP INDEX "Pricing_item_id_orgId_key";

-- AlterTable
ALTER TABLE "Pricing" DROP COLUMN "orgId",
ADD COLUMN     "organization_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pricing_item_id_organization_id_key" ON "Pricing"("item_id", "organization_id");

-- AddForeignKey
ALTER TABLE "Pricing" ADD CONSTRAINT "Pricing_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
