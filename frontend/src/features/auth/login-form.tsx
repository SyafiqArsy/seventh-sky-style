"use client";

import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  return (
    <form className="space-y-4">
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
        className="border px-4 py-2"
      >
        Login
      </button>
    </form>
  );
}