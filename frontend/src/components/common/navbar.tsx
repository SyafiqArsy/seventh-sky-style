"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/auth.store";

export function Navbar() {
  const router = useRouter();

  const user =
    useAuthStore(
      (state) => state.user,
    );

  const logout =
    useAuthStore(
      (state) => state.logout,
    );

  function handleLogout() {
    logout();

    router.push("/");
  }

  return (
    <header className="border-b">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">

        <Link href="/">
          Seventh Style AI
        </Link>

        <nav className="flex gap-6 items-center">

          <Link href="/style-on">
            Style On
          </Link>

          <Link href="/recommendation">
            History
          </Link>

          {user?.role === "ADMIN" && (
            <Link href="/admin">
              Admin
            </Link>
          )}

          {!user ? (
            <Link href="/login">
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

        </nav>

      </div>
    </header>
  );
}