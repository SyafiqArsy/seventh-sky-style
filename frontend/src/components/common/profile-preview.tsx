import { Profile } from "@/types/profile.types";

interface Props {
  profile: Profile;
}

export function ProfilePreview({
  profile,
}: Props) {
  return (
    <div className="rounded-3xl border p-6">
      <h3 className="font-semibold">
        Your Fashion Profile
      </h3>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div>
          Style:
          {" "}
          {profile.preferredStyle.name}
        </div>

        <div>
          Color:
          {" "}
          {profile.favoriteColor.name}
        </div>

        <div>
          Budget:
          {" "}
          {profile.budgetRange}
        </div>

        <div>
          Gender:
          {" "}
          {profile.gender}
        </div>
      </div>
    </div>
  );
}