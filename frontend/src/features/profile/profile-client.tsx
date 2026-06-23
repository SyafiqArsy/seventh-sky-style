"use client";

import { useState, useEffect } from "react";

import {useQuery,useMutation,useQueryClient,} from "@tanstack/react-query";

import { profileService } from "@/services/profile.service";

import { masterService } from "@/services/master.service";

import Navbar from "@/components/common/navbar";

export default function ProfileClient() {
const queryClient = useQueryClient();

const profileQuery = useQuery({
  queryKey: ["profile"],
  queryFn: profileService.getMyProfile,
});

const colorsQuery = useQuery({
  queryKey: ["colors"],
  queryFn: masterService.getColors,
});

const stylesQuery = useQuery({
  queryKey: ["styles"],
  queryFn: masterService.getStyles,
});

const updateProfileMutation =
  useMutation({
    mutationFn:
      profileService.updateProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });

      alert(
        "Profile updated successfully",
      );
    },

        onError: (error: any) => {
        console.error(error);

        alert(
            error?.response?.data?.message ||
            "Failed to update profile",
        );
        },
  });

const profile = profileQuery.data;

const colors = colorsQuery.data;
const styles = stylesQuery.data;

const [form, setForm] = useState({
  gender: "",
  age: 0,
  height: 0,
  weight: 0,
  skinTone: "",
  budgetRange: "",
  favoriteColorId: "",
  preferredStyleId: "",
});

useEffect(() => {
  if (!profile) return;

  setForm({
    gender: profile.gender,
    age: profile.age,
    height: profile.height,
    weight: profile.weight,
    skinTone: profile.skinTone,
    budgetRange: profile.budgetRange,
    favoriteColorId:
      profile.favoriteColorId,
    preferredStyleId:
      profile.preferredStyleId,
  });
}, [profile]);

function handleSave() {
  updateProfileMutation.mutate(
    form,
  );
}

if (
  profileQuery.isLoading ||
  colorsQuery.isLoading ||
  stylesQuery.isLoading
) {
  return (
    <div className="p-10">
      Loading...
    </div>
  );
}

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-3xl px-6 py-16">

        <h1 className="text-4xl font-bold">
          Profile
        </h1>

        <div className="mt-8 space-y-6">

        <div>
        <label className="mb-2 block font-medium">
            Gender
        </label>

        <select
            className="border p-3 w-full rounded-xl"
            value={form.gender}
            onChange={(e) =>
            setForm({
                ...form,
                gender: e.target.value,
            })
            }
        >
            <option value="MALE">
            Male
            </option>

            <option value="FEMALE">
            Female
            </option>
        </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Age
          </label>

          <input
            className="border p-3 w-full rounded-xl"
            type="number"
            value={form.age}
            onChange={(e) =>
              setForm({
                ...form,
                age: Number(
                  e.target.value,
                ),
              })
            }
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Height (cm)
          </label>

          <input
            className="border p-3 w-full rounded-xl"
            type="number"
            value={form.height}
            onChange={(e) =>
              setForm({
                ...form,
                height: Number(
                  e.target.value,
                ),
              })
            }
          />
        </div>

        <div>
        <label className="mb-2 block font-medium">
            Weight (kg)
        </label>

        <input
            className="border p-3 w-full rounded-xl"
            type="number"
            value={form.weight}
            onChange={(e) =>
            setForm({
                ...form,
                weight: Number(
                e.target.value,
                ),
            })
            }
        />
        </div>

        <div>
        <label className="mb-2 block font-medium">
            Skin Tone
        </label>

        <select
            className="border p-3 w-full rounded-xl"
            value={form.skinTone}
            onChange={(e) =>
            setForm({
                ...form,
                skinTone: e.target.value,
            })
            }
        >
            <option value="FAIR">
            Fair
            </option>

            <option value="LIGHT">
            Light
            </option>

            <option value="MEDIUM">
            Medium
            </option>

            <option value="TAN">
            Tan
            </option>

            <option value="DEEP">
            Deep
            </option>
        </select>
        </div>

        <div>
        <label className="mb-2 block font-medium">
            Budget Range
        </label>

        <select
            className="border p-3 w-full rounded-xl"
            value={form.budgetRange}
            onChange={(e) =>
            setForm({
                ...form,
                budgetRange:
                e.target.value,
            })
            }
        >
            <option value="LESS_THAN_250K">
            &lt; 250K
            </option>

            <option value="BETWEEN_250K_500K">
            250K - 500K
            </option>

            <option value="BETWEEN_500K_1M">
            500K - 1M
            </option>

            <option value="ABOVE_1M">
            &gt; 1M
            </option>
        </select>
        </div>

        <div>
        <label className="mb-2 block font-medium">
            Favorite Color
        </label>

        <select
            className="border p-3 w-full rounded-xl"
            value={form.favoriteColorId}
            onChange={(e) =>
            setForm({
                ...form,
                favoriteColorId:
                e.target.value,
            })
            }
        >
            {colors?.map((color: any) => (
            <option
                key={color.id}
                value={color.id}
            >
                {color.name}
            </option>
            ))}
        </select>
        </div>

        <div>
        <label className="mb-2 block font-medium">
            Preferred Style
        </label>

        <select
            className="border p-3 w-full rounded-xl"
            value={form.preferredStyleId}
            onChange={(e) =>
            setForm({
                ...form,
                preferredStyleId:
                e.target.value,
            })
            }
        >
            {styles?.map((style: any) => (
            <option
                key={style.id}
                value={style.id}
            >
                {style.name}
            </option>
            ))}
        </select>
        </div>

        </div>

        <button
        onClick={handleSave}
        disabled={
            updateProfileMutation.isPending
        }
        className="
            mt-8
            rounded-xl
            bg-black
            px-6
            py-3
            text-white
            disabled:opacity-50
        "
        >
        {updateProfileMutation.isPending
            ? "Saving..."
            : "Save Changes"}
        </button>

      </div>
    </>
  );
}