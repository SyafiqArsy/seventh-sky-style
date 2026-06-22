"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authService } from "@/services/auth.service";

import { useAuthStore } from "@/store/auth.store";

export function LoginForm() {
  const router = useRouter();

  const setToken =
    useAuthStore(
      (state) => state.setToken,
    );

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent,
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await authService.login({
          email,
          password,
        });

      setToken(
        response.accessToken,
      );

      router.push("/style-on");
    } catch (error) {
      console.error(error);

      alert("Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        className="border p-2 w-full"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        className="border p-2 w-full"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value,
          )
        }
      />

      <button
        type="submit"
        disabled={loading}
        className="border px-4 py-2"
      >
        {loading
          ? "Loading..."
          : "Login"}
      </button>
    </form>
  );
}