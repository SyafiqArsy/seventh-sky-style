"use client";

import { useState } from "react";
import { useAdminColors } from "./use-admin-colors";
import { useCreateColor, useUpdateColor, useDeleteColor } from "./use-mutations";
import { useQueryClient } from "@tanstack/react-query";

export default function AdminColorsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [hexCode, setHexCode] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const updateMutation = useUpdateColor();
  const deleteMutation = useDeleteColor();
  const createMutation = useCreateColor();
  const queryClient = useQueryClient();
  const limit = 10;

  const query = useAdminColors(page, limit, search);

  if (query.isLoading) {
    return <div className="p-10">Loading...</div>;
  }

  const result = query.data;
  const colors = result?.data ?? [];
  const totalPages = result?.totalPages ?? 0;

  async function handleSave() {
    if (!name.trim() || !hexCode.trim()) {
      alert("Name and Hex Code are required");
      return;
    }

    try {
      if (editingId) {
        await updateMutation.mutateAsync({
          id: editingId,
          payload: { name, hexCode },
        });
        alert("Color updated");
      } else {
        await createMutation.mutateAsync({ name, hexCode });
        alert("Color created");
      }

      setName("");
      setHexCode("");
      setEditingId(null);
      await queryClient.invalidateQueries({ queryKey: ["admin-colors"] });
    } catch (error) {
      console.error(error);
      alert("Failed to save color");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this color?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      await queryClient.invalidateQueries({ queryKey: ["admin-colors"] });
      alert("Color deleted");
    } catch (error) {
      console.error(error);
      alert("Failed to delete color");
    }
  }

  function handleCancelEdit() {
    setName("");
    setHexCode("");
    setEditingId(null);
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Colors Management</h1>

      <div className="mt-6 rounded-2xl border p-6 bg-white shadow-sm">
        <h2 className="text-xl font-semibold">
          {editingId ? "Edit Color" : "Create Color"}
        </h2>
        <div className="mt-4 flex flex-col gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Color Name"
            className="rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <div className="flex gap-4 items-center">
            <input
              value={hexCode}
              onChange={(e) => setHexCode(e.target.value)}
              placeholder="Hex Code (e.g. #FF0000)"
              className="rounded-xl border px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-black"
            />
            {hexCode && (
              <div
                className="w-10 h-10 rounded-full border border-gray-300"
                style={{ backgroundColor: hexCode }}
              />
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={createMutation.isPending || updateMutation.isPending}
              className="rounded-xl bg-black px-4 py-2 text-white font-medium hover:bg-zinc-800 disabled:opacity-50"
            >
              {createMutation.isPending || updateMutation.isPending
                ? "Saving..."
                : editingId
                ? "Update Color"
                : "Create Color"}
            </button>
            {editingId && (
              <button
                onClick={handleCancelEdit}
                className="rounded-xl border border-zinc-300 px-4 py-2 text-zinc-700 font-medium hover:bg-zinc-50"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <input
          type="text"
          placeholder="Search by name..."
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
              <th className="p-3 text-left font-semibold text-zinc-700">ID</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Name</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Hex Code</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Preview</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Created</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {colors.length > 0 ? (
              colors.map((color: any) => (
                <tr key={color.id} className="border-b hover:bg-zinc-50/50">
                  <td className="p-3 text-sm text-zinc-500">{color.id}</td>
                  <td className="p-3 font-medium">{color.name}</td>
                  <td className="p-3 text-zinc-600">{color.hexCode}</td>
                  <td className="p-3">
                    <div
                      className="w-8 h-8 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.hexCode }}
                    />
                  </td>
                  <td className="p-3 text-sm text-zinc-500">
                    {new Date(color.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(color.id);
                          setName(color.name);
                          setHexCode(color.hexCode);
                        }}
                        className="rounded-lg border border-zinc-300 px-3 py-1 text-sm font-medium hover:bg-zinc-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(color.id)}
                        className="rounded-lg border border-red-200 text-red-500 px-3 py-1 text-sm font-medium hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-zinc-500">
                  No colors found.
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
