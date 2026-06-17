/*
  Warnings:

  - Added the required column `favoriteColorId` to the `user_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preferredStyleId` to the `user_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_profiles" ADD COLUMN     "favoriteColorId" TEXT NOT NULL,
ADD COLUMN     "preferredStyleId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_favoriteColorId_fkey" FOREIGN KEY ("favoriteColorId") REFERENCES "colors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_preferredStyleId_fkey" FOREIGN KEY ("preferredStyleId") REFERENCES "styles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
