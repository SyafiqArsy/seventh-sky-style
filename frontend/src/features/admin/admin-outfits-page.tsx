"use client";

import { useState, useEffect } from "react";
import { useAdminOutfits } from "./use-admin-outfits";
import { useCreateOutfit, useUpdateOutfit, useDeleteOutfit } from "./use-mutations";
import { useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";

export default function AdminOutfitsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("MALE");
  const [budgetRange, setBudgetRange] = useState("LESS_THAN_250K");
  const [imageUrl, setImageUrl] = useState("");
  const [styleId, setStyleId] = useState("");
  const [occasionId, setOccasionId] = useState("");
  const [bodyTypeId, setBodyTypeId] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [styles, setStyles] = useState<any[]>([]);
  const [occasions, setOccasions] = useState<any[]>([]);
  const [bodyTypes, setBodyTypes] = useState<any[]>([]);

  const updateMutation = useUpdateOutfit();
  const deleteMutation = useDeleteOutfit();
  const createMutation = useCreateOutfit();
  const queryClient = useQueryClient();
  const limit = 10;

  const query = useAdminOutfits(page, limit, search);

  useEffect(() => {
    const loadRefs = async () => {
      try {
        const [stylesData, occasionsData, bodyTypesData] = await Promise.all([
          adminService.getStyles(1, 100),
          adminService.getOccasions(1, 100),
          adminService.getBodyTypes(1, 100),
        ]);
        setStyles(stylesData?.data || []);
        setOccasions(occasionsData?.data || []);
        setBodyTypes(bodyTypesData?.data || []);
      } catch (error) {
        console.error("Failed to load reference data", error);
      }
    };
    loadRefs();
  }, []);

  if (query.isLoading) {
    return <div className="p-10">Loading...</div>;
  }

  const result = query.data;
  const outfits = result?.data ?? [];
  const totalPages = result?.totalPages ?? 0;

  async function handleSave() {
    if (!name.trim() || !styleId || !occasionId || !bodyTypeId) {
      alert("Name, Style, Occasion, and Body Type are required");
      return;
    }

    const payload = {
      name: name.trim(),
      description: description.trim() || undefined,
      gender,
      budgetRange,
      imageUrl: imageUrl.trim() || undefined,
      styleId,
      occasionId,
      bodyTypeId,
      isActive,
    };

    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, payload });
        alert("Outfit updated");
      } else {
        await createMutation.mutateAsync(payload);
        alert("Outfit created");
      }

      resetForm();
      await queryClient.invalidateQueries({ queryKey: ["admin-outfits"] });
    } catch (error) {
      console.error(error);
      alert("Failed to save outfit");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this outfit?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      await queryClient.invalidateQueries({ queryKey: ["admin-outfits"] });
      alert("Outfit deleted");
    } catch (error) {
      console.error(error);
      alert("Failed to delete outfit");
    }
  }

  function resetForm() {
    setName("");
    setDescription("");
    setGender("MALE");
    setBudgetRange("LESS_THAN_250K");
    setImageUrl("");
    setStyleId("");
    setOccasionId("");
    setBodyTypeId("");
    setIsActive(true);
    setEditingId(null);
  }

  function handleEdit(item: any) {
    setEditingId(item.id);
    setName(item.name);
    setDescription(item.description || "");
    setGender(item.gender);
    setBudgetRange(item.budgetRange);
    setImageUrl(item.imageUrl || "");
    setStyleId(item.styleId);
    setOccasionId(item.occasionId);
    setBodyTypeId(item.bodyTypeId);
    setIsActive(item.isActive);
  }

  function handleCancelEdit() {
    resetForm();
  }

  const budgetOptions = [
    "LESS_THAN_250K",
    "BETWEEN_250K_500K",
    "BETWEEN_500K_1M",
    "ABOVE_1M",
  ];

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Outfits Management</h1>

      <div className="mt-6 rounded-2xl border p-6 bg-white shadow-sm">
        <h2 className="text-xl font-semibold">
          {editingId ? "Edit Outfit" : "Create Outfit"}
        </h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name *"
            className="rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={2}
            className="rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-y"
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          <select
            value={budgetRange}
            onChange={(e) => setBudgetRange(e.target.value)}
            className="rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          >
            {budgetOptions.map((opt) => (
              <option key={opt} value={opt}>{opt.replace(/_/g, " ")}</option>
            ))}
          </select>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL"
            className="rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <select
            value={styleId}
            onChange={(e) => setStyleId(e.target.value)}
            className="rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Select Style *</option>
            {styles.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <select
            value={occasionId}
            onChange={(e) => setOccasionId(e.target.value)}
            className="rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Select Occasion *</option>
            {occasions.map((o) => (
              <option key={o.id} value={o.id}>{o.name}</option>
            ))}
          </select>
          <select
            value={bodyTypeId}
            onChange={(e) => setBodyTypeId(e.target.value)}
            className="rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Select Body Type *</option>
            {bodyTypes.map((bt) => (
              <option key={bt.id} value={bt.id}>{bt.name}</option>
            ))}
          </select>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-5 h-5"
            />
            Active
          </label>
          <div className="flex gap-2 col-span-2">
            <button
              onClick={handleSave}
              disabled={createMutation.isPending || updateMutation.isPending}
              className="rounded-xl bg-black px-4 py-2 text-white font-medium hover:bg-zinc-800 disabled:opacity-50"
            >
              {createMutation.isPending || updateMutation.isPending
                ? "Saving..."
                : editingId
                ? "Update Outfit"
                : "Create Outfit"}
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
              <th className="p-3 text-left font-semibold text-zinc-700">Name</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Gender</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Budget</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Style</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Occasion</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Body Type</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Active</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {outfits.length > 0 ? (
              outfits.map((outfit: any) => (
                <tr key={outfit.id} className="border-b hover:bg-zinc-50/50">
                  <td className="p-3 font-medium">{outfit.name}</td>
                  <td className="p-3">{outfit.gender}</td>
                  <td className="p-3">{outfit.budgetRange.replace(/_/g, " ")}</td>
                  <td className="p-3">{outfit.style?.name || "-"}</td>
                  <td className="p-3">{outfit.occasion?.name || "-"}</td>
                  <td className="p-3">{outfit.bodyType?.name || "-"}</td>
                  <td className="p-3">{outfit.isActive ? "✅" : "❌"}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(outfit)}
                        className="rounded-lg border border-zinc-300 px-3 py-1 text-sm font-medium hover:bg-zinc-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(outfit.id)}
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
                <td colSpan={8} className="p-8 text-center text-zinc-500">
                  No outfits found.
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
