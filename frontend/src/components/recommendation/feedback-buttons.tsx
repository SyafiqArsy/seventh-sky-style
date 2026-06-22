"use client";

import { useState } from "react";

import { feedbackService } from "@/services/feedback.service";

interface Props {
  recommendationItemId: string;
}

export function FeedbackButtons({
  recommendationItemId,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  async function submitFeedback(
    feedback:
      | "LIKE"
      | "NEUTRAL"
      | "DISLIKE",
  ) {
    try {
      setLoading(true);

      await feedbackService.create({
        recommendationItemId,
        feedback,
      });

      alert("Feedback saved");
    } catch (error) {
      console.error(error);

      alert(
        "Failed to save feedback",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8">

      <h3 className="font-semibold">
        Was this recommendation helpful?
      </h3>

      <div className="mt-3 flex gap-3">

        <button
          disabled={loading}
          onClick={() =>
            submitFeedback("LIKE")
          }
          className="
          rounded-xl
          border
          px-4
          py-2
          hover:bg-zinc-100
          "
        >
          👍 Like
        </button>

        <button
          disabled={loading}
          onClick={() =>
            submitFeedback("NEUTRAL")
          }
          className="
          rounded-xl
          border
          px-4
          py-2
          hover:bg-zinc-100
          "
        >
          😐 Neutral
        </button>

        <button
          disabled={loading}
          onClick={() =>
            submitFeedback("DISLIKE")
          }
          className="
          rounded-xl
          border
          px-4
          py-2
          hover:bg-zinc-100
          "
        >
          👎 Dislike
        </button>

      </div>
    </div>
  );
}