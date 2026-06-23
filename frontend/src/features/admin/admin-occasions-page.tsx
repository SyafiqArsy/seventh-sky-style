"use client";

import { useState } from "react";
import { useAdminOccasions } from "./use-admin-occasions";
import { useCreateOccasion, useUpdateOccasion, useDeleteOccasion } from "./use-mutations";
import { useQueryClient } from "@tanstack/react-query";

export default function AdminOccasionsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const updateMutation = useUpdateOccasion();
  const deleteMutation = useDeleteOccasion();
  const createMutation = useCreateOccasion();
  const queryClient = useQueryClient();
  const limit = 10;

  const query = useAdminOccasions(page, limit, search);

  if (query.isLoading) {
    return <div className="p-10">Loading...</div>;
  }

  const result = query.data;
  const occasions = result?.data ?? [];
  const totalPages = result?.totalPages ?? 0;

  async function handleSave() {
    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    try {
      if (editingId) {
        await updateMutation.mutateAsync({
          id: editingId,
          payload: { name, description },
        });
        alert("Occasion updated");
      } else {
        await createMutation.mutateAsync({ name, description });
        alert("Occasion created");
      }

      setName("");
      setDescription("");
      setEditingId(null);
      await queryClient.invalidateQueries({ queryKey: ["admin-occasions"] });
    } catch (error) {
      console.error(error);
      alert("Failed to save occasion");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this occasion?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      await queryClient.invalidateQueries({ queryKey: ["admin-occasions"] });
      alert("Occasion deleted");
    } catch (error) {
      console.error(error);
      alert("Failed to delete occasion");
    }
  }

  function handleCancelEdit() {
    setName("");
    setDescription("");
    setEditingId(null);
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Occasions Management</h1>

      <div className="mt-6 rounded-2xl border p-6 bg-white shadow-sm">
        <h2 className="text-xl font-semibold">
          {editingId ? "Edit Occasion" : "Create Occasion"}
        </h2>
        <div className="mt-4 flex flex-col gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Occasion Name"
            className="rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={3}
            className="rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-y"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={createMutation.isPending || updateMutation.isPending}
              className="rounded-xl bg-black px-4 py-2 text-white font-medium hover:bg-zinc-800 disabled:opacity-50"
            >
              {createMutation.isPending || updateMutation.isPending
                ? "Saving..."
                : editingId
                ? "Update Occasion"
                : "Create Occasion"}
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
              <th className="p-3 text-left font-semibold text-zinc-700">Slug</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Description</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Created</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {occasions.length > 0 ? (
              occasions.map((occasion: any) => (
                <tr key={occasion.id} className="border-b hover:bg-zinc-50/50">
                  <td className="p-3 text-sm text-zinc-500">{occasion.id}</td>
                  <td className="p-3 font-medium">{occasion.name}</td>
                  <td className="p-3 text-zinc-600">{occasion.slug}</td>
                  <td className="p-3 text-zinc-600 max-w-xs truncate">
                    {occasion.description || "-"}
                  </td>
                  <td className="p-3 text-sm text-zinc-500">
                    {new Date(occasion.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(occasion.id);
                          setName(occasion.name);
                          setDescription(occasion.description || "");
                        }}
                        className="rounded-lg border border-zinc-300 px-3 py-1 text-sm font-medium hover:bg-zinc-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(occasion.id)}
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
                  No occasions found.
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
