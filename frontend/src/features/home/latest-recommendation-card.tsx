"use client";

import Link from "next/link";

import {
  useLatestRecommendation,
} from "./use-latest-recommendation";

export function LatestRecommendationCard() {
  const query =
    useLatestRecommendation();

  if (query.isLoading) {
    return (
      <div className="rounded-3xl border p-6">
        Loading recommendation...
      </div>
    );
  }

  const recommendation =
    query.data;

  if (!recommendation) {
    return (
      <div className="rounded-3xl border p-6">
        <h2 className="text-2xl font-semibold">
          No recommendations yet
        </h2>

        <p className="mt-2 text-zinc-500">
          Generate your first AI outfit.
        </p>

        <Link
          href="/style-on"
          className="
            inline-block
            mt-4
            rounded-xl
            bg-black
            px-4
            py-2
            text-white
          "
        >
          Style On
        </Link>
      </div>
    );
  }

  const firstItem =
    recommendation.items?.[0];

  return (
    <div className="rounded-3xl border p-6">

      <h2 className="text-2xl font-semibold">
        Latest Recommendation
      </h2>

      <div className="mt-4">

        <p className="text-lg font-medium">
          {
            firstItem?.outfit?.name ??
            "Unknown Outfit"
          }
        </p>

        <p className="mt-2 text-sm text-zinc-500">
          Generated:
          {" "}
          {new Date(
            recommendation.generatedAt,
          ).toLocaleString()}
        </p>

      </div>

      <Link
        href={`/recommendation/${recommendation.id}`}
        className="
          inline-block
          mt-6
          rounded-xl
          bg-black
          px-4
          py-2
          text-white
        "
      >
        View Detail
      </Link>

    </div>
  );
}