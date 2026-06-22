"use client";

import Link from "next/link";
import Image from "next/image";

import {
  useRecommendationHistory,
} from "./use-recommendation-history";

export default function RecommendationHistoryClient() {
  const query =
    useRecommendationHistory();

  if (query.isLoading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  const recommendations =
    query.data ?? [];

    if (!recommendations.length) {
      return (
        <div className="container mx-auto max-w-5xl px-6 py-16">

          <h1 className="text-4xl font-bold">
            Recommendation History
          </h1>

          <div
            className="
            mt-10
            rounded-3xl
            border
            p-12
            text-center
            "
          >
            <h2 className="text-2xl font-semibold">
              No recommendations yet
            </h2>

            <p className="mt-3 text-zinc-500">
              Generate your first AI outfit and let AI
              create personalized recommendations for you.
            </p>

            <Link
              href="/style-on"
              className="
              inline-block
              mt-6
              rounded-xl
              bg-black
              px-5
              py-3
              text-white
              "
            >
              Style On
            </Link>
          </div>

        </div>
      );
    }

  return (
    <div className="container mx-auto max-w-5xl px-6 py-16">

      <h1 className="text-4xl font-bold">
        Recommendation History
      </h1>

      <div className="mt-10 space-y-6">

        {recommendations.map(
          (recommendation: any) => {
            const firstItem =
              recommendation.items[0];

            return (
              <div
                key={recommendation.id}
                className="
                rounded-2xl
                border
                p-6
                "
              >
                <div className="flex gap-6">

                  <div>
                    <Image
                      src={
                        firstItem?.aiResult?.imageUrl ||
                        "/fashion/fashion-1.jpg"
                      }
                      alt="Recommendation"
                      width={160}
                      height={200}
                      className="rounded-xl object-cover w-[160px] h-[200px]"
                    />
                  </div>

                  <div className="flex-1">

                    <h2 className="text-xl font-semibold">
                      {
                        firstItem?.outfit
                          ?.name
                      }
                    </h2>

                    <p className="text-zinc-500">
                    BMI:
                    {" "}
                    {recommendation.bmi ?? "-"}
                    </p>

                    <p className="text-zinc-500">
                    Body Type:
                    {" "}
                    {recommendation.bodyType ?? "-"}
                    </p>

                    <p className="text-zinc-500">
                      {new Date(
                        recommendation.generatedAt,
                      ).toLocaleString()}
                    </p>

                    <Link
                      href={`/recommendation/${recommendation.id}`}
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
                      View Detail
                    </Link>

                  </div>
                </div>
              </div>
            );
          },
        )}

      </div>
    </div>
  );
}