"use client";

import {
  useDashboard,
} from "./use-dashboard";

export default function DashboardClient() {
  const query =
    useDashboard();

  if (query.isLoading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  const stats =
    query.data;

  if (!stats) {
    return (
      <div className="p-10">
        Failed to load dashboard
      </div>
    );
  }

  const cards = [
    {
      title: "Users",
      value: stats.users,
    },
    {
      title: "Profiles",
      value: stats.profiles,
    },
    {
      title: "Fashion Items",
      value: stats.fashionItems,
    },
    {
      title: "Outfits",
      value: stats.outfits,
    },
    {
      title: "Recommendations",
      value: stats.recommendations,
    },
  ];

  return (
    <div className="container mx-auto max-w-7xl px-6 py-16">

      <h1 className="text-4xl font-bold">
        Admin Dashboard
      </h1>

      <p className="mt-2 text-zinc-500">
        Seventh Style Administration
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {cards.map((card) => (
          <div
            key={card.title}
            className="
            rounded-2xl
            border
            p-6
            "
          >
            <p className="text-zinc-500">
              {card.title}
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              {card.value}
            </h2>
          </div>
        ))}

      </div>
    </div>
  );
}