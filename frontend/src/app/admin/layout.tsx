"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAdmin = user?.role === "ADMIN";
  const isLoggedIn = !!accessToken;

  useEffect(() => {
    if (!isLoggedIn || !isAdmin) {
      router.push("/");
    }
  }, [isLoggedIn, isAdmin, router]);

  const navItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Users", href: "/admin/users" },
    { label: "Profiles", href: "/admin/profiles" },
    { label: "Outfits", href: "/admin/outfits" },
    { label: "Recommendations", href: "/admin/recommendations" },
    { label: "Styles", href: "/admin/styles" },
    { label: "Colors", href: "/admin/colors" },
    { label: "Categories", href: "/admin/categories" },
    { label: "Occasions", href: "/admin/occasions" },
    { label: "Body Types", href: "/admin/body-types" },
    { label: "Fashion Items", href: "/admin/fashion-items" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/admin"
                className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
              >
                Admin Panel
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Back to Site
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Sub-navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto py-2 scrollbar-hide">
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/admin" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`
                    px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors
                    ${isActive 
                      ? "bg-blue-100 text-blue-700" 
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}
