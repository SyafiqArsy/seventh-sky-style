"use client";

import Link from "next/link";

import {
  useAdminStats,
} from "@/features/admin/use-admin-stats";

export default function AdminPage() {
  const query =
    useAdminStats();

  if (query.isLoading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  const stats =
    query.data;

  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold">
        Admin Dashboard
      </h1>

      <div
        className="
        mt-8
        grid
        gap-6
        md:grid-cols-2
        lg:grid-cols-4
        "
      >

        <div className="rounded-2xl border p-6">
          <p className="text-zinc-500">
            Users
          </p>

          <p className="mt-2 text-4xl font-bold">
            {stats.users}
          </p>
        </div>

        <div className="rounded-2xl border p-6">
          <p className="text-zinc-500">
            Profiles
          </p>

          <p className="mt-2 text-4xl font-bold">
            {stats.profiles}
          </p>
        </div>

        <div className="rounded-2xl border p-6">
          <p className="text-zinc-500">
            Outfits
          </p>

          <p className="mt-2 text-4xl font-bold">
            {stats.outfits}
          </p>
        </div>

        <div className="rounded-2xl border p-6">
          <p className="text-zinc-500">
            Recommendations
          </p>

          <p className="mt-2 text-4xl font-bold">
            {stats.recommendations}
          </p>
        </div>

      </div>

      <div className="mt-10 flex gap-4">

        <Link
          href="/admin/users"
          className="
          rounded-xl
          border
          px-4
          py-2
          "
        >
          Users
        </Link>

      </div>

    </div>
  );
}