-- AlterTable
ALTER TABLE "public"."recommendation_items" ADD COLUMN     "reasons" JSONB;

-- AlterTable
ALTER TABLE "public"."recommendations" ADD COLUMN     "bmi" DOUBLE PRECISION,
ADD COLUMN     "bodyType" TEXT,
ADD COLUMN     "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
