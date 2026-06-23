"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { profileService } from "@/services/profile.service";
import { masterService } from "@/services/master.service";
import { recommendationService } from "@/services/recommendation.service";

// Pastikan path store ini sesuai dengan struktur folder proyekmu
import { useStyleOnStore } from "@/store/style-on.store"; 

import { ProfilePreview } from "@/components/common/profile-preview";
import Navbar from "@/components/common/navbar";

export default function StyleOnPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

    const occasionId =
    useStyleOnStore(
        (state) => state.occasionId,
    );

    const setOccasionId =
    useStyleOnStore(
        (state) => state.setOccasionId,
    );

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: profileService.getMyProfile,
  });

  const occasionQuery = useQuery({
    queryKey: ["occasions"],
    queryFn: masterService.getOccasions,
  });

  if (profileQuery.isLoading || occasionQuery.isLoading) {
    return <div className="p-20">Loading...</div>;
  }

  const profile = profileQuery.data;
  const occasions = occasionQuery.data;

  async function handleGenerate() {
    if (!occasionId) {
        alert(
            "Please select an occasion",
        );

        return;
        }
    try {
      setLoading(true);

      const result = await recommendationService.generate(
        occasionId || undefined,
      );

      const recommendationId = result.recommendation.id;

      router.push(`/recommendation/${recommendationId}`);
    } catch (error: any) {
        console.error(error);

        console.log(
          "BACKEND RESPONSE:",
          error?.response?.data,
        );

        alert(
          JSON.stringify(
            error?.response?.data,
            null,
            2,
          ),
        );
      }
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-5xl font-bold">Style On</h1>

      <p className="mt-4 text-zinc-500">
        Let AI find your perfect outfit.
      </p>

      {profile && (
        <div className="mt-10">
          <ProfilePreview profile={profile} />
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-xl font-semibold">Select Occasion</h2>

        {/* List Pilihan Occasion */}
        <div className="mt-6 flex flex-wrap gap-4">
          {occasions?.map((occasion: any) => (
            <button
            key={occasion.id}
            onClick={() =>
                setOccasionId(
                occasion.id,
                )
            }
            className={`rounded-full border px-6 py-3 ${
                occasionId === occasion.id
                ? "bg-zinc-100 border-black"
                : ""
            }`}
            >
            {occasion.name}
            </button>
          ))}
        </div>

        {/* FIX: Tombol utama dipindahkan ke luar loop .map agar tidak ikut berulang */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-8 px-6 py-3 rounded-xl bg-black text-white disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Outfit"}
        </button>
      </div>
    </div>
    </>
  );
}