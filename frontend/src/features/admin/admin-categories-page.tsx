"use client";

import { useState } from "react";
import { useAdminCategories } from "./use-admin-categories";
import { useCreateCategory, useUpdateCategory, useDeleteCategory } from "./use-mutations";
import { useQueryClient } from "@tanstack/react-query";

export default function AdminCategoriesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();
  const createMutation = useCreateCategory();
  const queryClient = useQueryClient();
  const limit = 10;

  const query = useAdminCategories(page, limit, search);

  if (query.isLoading) {
    return <div className="p-10">Loading...</div>;
  }

  const result = query.data;
  const categories = result?.data ?? [];
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
        alert("Category updated");
      } else {
        await createMutation.mutateAsync({ name, description });
        alert("Category created");
      }

      setName("");
      setDescription("");
      setEditingId(null);
      await queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    } catch (error) {
      console.error(error);
      alert("Failed to save category");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this category?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      await queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      alert("Category deleted");
    } catch (error) {
      console.error(error);
      alert("Failed to delete category");
    }
  }

  function handleCancelEdit() {
    setName("");
    setDescription("");
    setEditingId(null);
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Categories Management</h1>

      <div className="mt-6 rounded-2xl border p-6 bg-white shadow-sm">
        <h2 className="text-xl font-semibold">
          {editingId ? "Edit Category" : "Create Category"}
        </h2>
        <div className="mt-4 flex flex-col gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category Name"
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
                ? "Update Category"
                : "Create Category"}
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
            {categories.length > 0 ? (
              categories.map((category: any) => (
                <tr key={category.id} className="border-b hover:bg-zinc-50/50">
                  <td className="p-3 text-sm text-zinc-500">{category.id}</td>
                  <td className="p-3 font-medium">{category.name}</td>
                  <td className="p-3 text-zinc-600">{category.slug}</td>
                  <td className="p-3 text-zinc-600 max-w-xs truncate">
                    {category.description || "-"}
                  </td>
                  <td className="p-3 text-sm text-zinc-500">
                    {new Date(category.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(category.id);
                          setName(category.name);
                          setDescription(category.description || "");
                        }}
                        className="rounded-lg border border-zinc-300 px-3 py-1 text-sm font-medium hover:bg-zinc-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
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
                  No categories found.
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
