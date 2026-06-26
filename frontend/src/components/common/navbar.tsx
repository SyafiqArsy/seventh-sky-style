"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const isLoggedIn = !!accessToken;
  const isAdmin = user?.role === "ADMIN";

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Style On", href: "/style-on" },
    { label: "History", href: "/recommendation" },
    { label: "Profile", href: "/profile" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
            >
              Seventh Sky Style
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn && isAdmin && (
              <Link
                href="/admin"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Admin Panel
              </Link>
            )}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-red-50"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/register"
                  className="text-green-600 hover:text-green-800 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-green-50"
                >
                  Register
                </Link>
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-blue-50"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Sub-navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 overflow-x-auto py-2 scrollbar-hide">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/" && pathname?.startsWith(item.href));
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
  );
}
