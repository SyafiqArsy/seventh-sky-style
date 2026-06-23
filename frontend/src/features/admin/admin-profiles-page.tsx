"use client";

import { useState } from "react";
import { useAdminProfiles } from "./use-admin-profiles";

export default function AdminProfilesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;

  const query = useAdminProfiles(page, limit, search);

  if (query.isLoading) {
    return <div className="p-10">Loading...</div>;
  }

  const result = query.data;
  const profiles = result?.data ?? [];
  const totalPages = result?.totalPages ?? 0;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">User Profiles</h1>

      <div className="mt-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by user name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl border px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          onClick={() => setPage(1)}
          className="rounded-xl bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="border-b bg-zinc-50">
              <th className="p-3 text-left font-semibold text-zinc-700">User</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Email</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Gender</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Age</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Height</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Weight</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Skin Tone</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Budget</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Favorite Color</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Preferred Style</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Created</th>
            </tr>
          </thead>
          <tbody>
            {profiles.length > 0 ? (
              profiles.map((profile: any) => (
                <tr key={profile.id} className="border-b hover:bg-zinc-50/50">
                  <td className="p-3 font-medium">{profile.user?.name || "-"}</td>
                  <td className="p-3">{profile.user?.email || "-"}</td>
                  <td className="p-3">{profile.gender}</td>
                  <td className="p-3">{profile.age}</td>
                  <td className="p-3">{profile.height}</td>
                  <td className="p-3">{profile.weight}</td>
                  <td className="p-3">{profile.skinTone}</td>
                  <td className="p-3">{profile.budgetRange}</td>
                  <td className="p-3">{profile.favoriteColor?.name || "-"}</td>
                  <td className="p-3">{profile.preferredStyle?.name || "-"}</td>
                  <td className="p-3 text-sm text-zinc-500">
                    {new Date(profile.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className="p-8 text-center text-zinc-500">
                  No profiles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-xl border px-4 py-2 text-sm font-medium disabled:opacity-50 hover:bg-zinc-50"
            >
              Previous
            </button>
            <span className="text-sm text-zinc-600 px-2">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-xl border px-4 py-2 text-sm font-medium disabled:opacity-50 hover:bg-zinc-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
