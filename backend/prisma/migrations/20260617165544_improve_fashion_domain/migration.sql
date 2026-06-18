/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `fashion_items` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[outfitId,role]` on the table `outfit_items` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `outfits` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `fashion_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `outfits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."fashion_items" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."outfits" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "fashion_items_slug_key" ON "public"."fashion_items"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "outfit_items_outfitId_role_key" ON "public"."outfit_items"("outfitId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "outfits_slug_key" ON "public"."outfits"("slug");
