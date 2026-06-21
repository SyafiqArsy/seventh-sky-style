-- CreateTable
CREATE TABLE "public"."recommendation_ai_results" (
    "id" TEXT NOT NULL,
    "recommendationItemId" TEXT NOT NULL,
    "advice" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "modelPrompt" TEXT,
    "outfitPrompt" TEXT,
    "finalPrompt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recommendation_ai_results_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recommendation_ai_results_recommendationItemId_key" ON "public"."recommendation_ai_results"("recommendationItemId");

-- AddForeignKey
ALTER TABLE "public"."recommendation_ai_results" ADD CONSTRAINT "recommendation_ai_results_recommendationItemId_fkey" FOREIGN KEY ("recommendationItemId") REFERENCES "public"."recommendation_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
