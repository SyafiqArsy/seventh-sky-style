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

  const navItems = [
    { label: "Users", href: "/admin/users", count: stats?.users ?? 0 },
    { label: "Profiles", href: "/admin/profiles", count: stats?.profiles ?? 0 },
    { label: "Outfits", href: "/admin/outfits", count: stats?.outfits ?? 0 },
    { label: "Recommendations", href: "/admin/recommendations", count: stats?.recommendations ?? 0 },
    { label: "Styles", href: "/admin/styles", count: stats?.styles ?? 0 },
    { label: "Colors", href: "/admin/colors", count: stats?.colors ?? 0 },
    { label: "Categories", href: "/admin/categories", count: stats?.categories ?? 0 },
    { label: "Occasions", href: "/admin/occasions", count: stats?.occasions ?? 0 },
    { label: "Body Types", href: "/admin/body-types", count: stats?.bodyTypes ?? 0 },
    { label: "Fashion Items", href: "/admin/fashion-items", count: stats?.fashionItems ?? 0 },
  ];

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
        lg:grid-cols-3
        xl:grid-cols-4
        "
      >

        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="block rounded-2xl border p-6 transition hover:shadow-lg"
          >
            <p className="text-zinc-500">
              {item.label}
            </p>

            <p className="mt-2 text-4xl font-bold">
              {item.count}
            </p>
          </Link>
        ))}

      </div>

      <div className="mt-10 flex gap-4 flex-wrap">

        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="
            rounded-xl
            border
            px-4
            py-2
            hover:bg-zinc-50
            transition
            "
          >
            {item.label}
          </Link>
        ))}

      </div>

    </div>
  );
}