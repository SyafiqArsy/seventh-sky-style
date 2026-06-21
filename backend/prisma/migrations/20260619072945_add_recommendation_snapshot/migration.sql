-- CreateTable
CREATE TABLE "public"."recommendations" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."recommendation_items" (
    "id" TEXT NOT NULL,
    "recommendationId" TEXT NOT NULL,
    "outfitId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recommendation_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."recommendations" ADD CONSTRAINT "recommendations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."recommendation_items" ADD CONSTRAINT "recommendation_items_recommendationId_fkey" FOREIGN KEY ("recommendationId") REFERENCES "public"."recommendations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."recommendation_items" ADD CONSTRAINT "recommendation_items_outfitId_fkey" FOREIGN KEY ("outfitId") REFERENCES "public"."outfits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
