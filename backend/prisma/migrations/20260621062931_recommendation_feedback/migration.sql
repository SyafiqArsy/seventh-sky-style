-- CreateEnum
CREATE TYPE "public"."FeedbackType" AS ENUM ('LIKE', 'NEUTRAL', 'DISLIKE');

-- CreateTable
CREATE TABLE "public"."recommendation_feedbacks" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "recommendationItemId" TEXT NOT NULL,
    "feedback" "public"."FeedbackType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recommendation_feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recommendation_feedbacks_userId_recommendationItemId_key" ON "public"."recommendation_feedbacks"("userId", "recommendationItemId");

-- AddForeignKey
ALTER TABLE "public"."recommendation_feedbacks" ADD CONSTRAINT "recommendation_feedbacks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."recommendation_feedbacks" ADD CONSTRAINT "recommendation_feedbacks_recommendationItemId_fkey" FOREIGN KEY ("recommendationItemId") REFERENCES "public"."recommendation_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
