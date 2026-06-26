"use client";

import Image from "next/image";

import {useRecommendationDetail,} from "./use-recommendation-detail";

import {FeedbackButtons,} from "@/components/recommendation/feedback-buttons";

interface Props {
  id: string;
}

export default function RecommendationDetailClient({
  id,
}: Props) {
  const query =
    useRecommendationDetail(id);

  if (query.isLoading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  const data =
    query.data;

  if (!data) {
    return (
      <div className="p-10">
        Recommendation not found
      </div>
    );
  }

  const firstItem =
    data.items[0];

  return (
    <div className="container mx-auto max-w-6xl px-6 py-16">

      <h1 className="text-4xl font-bold">
        AI Recommendation
      </h1>

      <div className="mt-10 grid gap-10 md:grid-cols-2">

        <div>
          <Image
            src={
              firstItem.aiResult?.imageUrl ||
              "/recommendation/limit.jpg"
            }
            alt="AI Outfit"
            width={600}
            height={800}
            className="rounded-2xl"
          />
        </div>

        <div>

          <h2 className="text-3xl font-semibold">
            {firstItem.outfit.name}
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">

            <span
                className="
                rounded-full
                bg-black
                text-white
                px-3
                py-1
                text-sm
                "
            >
                Score {firstItem.score}
            </span>

            <span
                className="
                rounded-full
                border
                px-3
                py-1
                text-sm
                "
            >
                {firstItem.outfit.style.name}
            </span>

            <span
                className="
                rounded-full
                border
                px-3
                py-1
                text-sm
                "
            >
                {firstItem.outfit.occasion.name}
            </span>

            <span
                className="
                rounded-full
                border
                px-3
                py-1
                text-sm
                "
            >
                {firstItem.outfit.bodyType.name}
            </span>

            </div>

          <div className="mt-4">
            <h3 className="font-semibold">
            Why AI Selected This
            </h3>

            <ul className="list-disc pl-5">
              {firstItem.reasons.map(
                (reason) => (
                    <li key={reason}>
                    ✓ {reason}
                    </li>
                ),
              )}
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold">
              Advice
            </h3>

            <p>
              {
                firstItem.aiResult
                  ?.advice
              }
            </p>
          </div>

          <div className="mt-8">

            <div className="mt-10">

                <h3 className="font-semibold text-lg">
                    Outfit Composition
                </h3>

                <div className="mt-4 space-y-4">

                    {firstItem.outfit.outfitItems.map(
                    (item) => (
                        <div
                        key={item.fashionItem.name}
                        className="
                        rounded-xl
                        border
                        p-4
                        "
                        >
                        <p className="text-sm text-zinc-500">
                            {item.role}
                        </p>

                        <p className="font-medium">
                            {item.fashionItem.name}
                        </p>
                        </div>
                    ),
                    )}

                </div>

                </div>

            <h3 className="font-semibold">
              Explanation
            </h3>

            <p>
              {
                firstItem.aiResult
                  ?.explanation
              }
            </p>
          </div>

          <FeedbackButtons
            recommendationItemId={
                firstItem.id
            }
        />

          <p className="mt-4 text-sm text-zinc-500">
            Generated at:

            {" "}

            {new Date(
                data.generatedAt,
            ).toLocaleString()}
            </p>

        </div>

      </div>

    </div>
  );
}