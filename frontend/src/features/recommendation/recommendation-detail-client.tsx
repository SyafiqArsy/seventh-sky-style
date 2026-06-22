"use client";

import Image from "next/image";

import {
  useRecommendationDetail,
} from "./use-recommendation-detail";

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
          {firstItem.aiResult?.imageUrl && (
            <Image
              src={
                firstItem.aiResult.imageUrl
              }
              alt="AI Outfit"
              width={600}
              height={800}
              className="rounded-2xl"
            />
          )}
        </div>

        <div>

          <h2 className="text-3xl font-semibold">
            {firstItem.outfit.name}
          </h2>

          <p className="mt-4">
            Score:
            {" "}
            {firstItem.score}
          </p>

          <div className="mt-4">
            <h3 className="font-semibold">
              Reasons
            </h3>

            <ul className="list-disc pl-5">
              {firstItem.reasons.map(
                (reason) => (
                  <li key={reason}>
                    {reason}
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

        </div>

      </div>

    </div>
  );
}