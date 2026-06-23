"use client";

import { useState, useEffect } from "react";
import { useAdminFashionItems } from "./use-admin-fashion-items";
import { useCreateFashionItem, useUpdateFashionItem, useDeleteFashionItem } from "./use-mutations";
import { useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";

export default function AdminFashionItemsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("MALE");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [styleId, setStyleId] = useState("");
  const [colorId, setColorId] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Reference data
  const [categories, setCategories] = useState<any[]>([]);
  const [styles, setStyles] = useState<any[]>([]);
  const [colors, setColors] = useState<any[]>([]);

  const updateMutation = useUpdateFashionItem();
  const deleteMutation = useDeleteFashionItem();
  const createMutation = useCreateFashionItem();
  const queryClient = useQueryClient();
  const limit = 10;

  const query = useAdminFashionItems(page, limit, search);

  // Load reference data
  useEffect(() => {
    const loadRefs = async () => {
      try {
        const [cats, stylesData, colorsData] = await Promise.all([
          adminService.getCategories(1, 100),
          adminService.getStyles(1, 100),
          adminService.getColors(1, 100),
        ]);
        setCategories(cats?.data || []);
        setStyles(stylesData?.data || []);
        setColors(colorsData?.data || []);
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
  const items = result?.data ?? [];
  const totalPages = result?.totalPages ?? 0;

  async function handleSave() {
    if (!name.trim() || !price || !categoryId || !styleId || !colorId) {
      alert("Name, Price, Category, Style, and Color are required");
      return;
    }

    const payload = {
      name: name.trim(),
      description: description.trim() || undefined,
      gender,
      price: parseFloat(price),
      imageUrl: imageUrl.trim() || undefined,
      categoryId,
      styleId,
      colorId,
      isActive,
    };

    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, payload });
        alert("Fashion item updated");
      } else {
        await createMutation.mutateAsync(payload);
        alert("Fashion item created");
      }

      resetForm();
      await queryClient.invalidateQueries({ queryKey: ["admin-fashion-items"] });
    } catch (error) {
      console.error(error);
      alert("Failed to save fashion item");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this fashion item?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      await queryClient.invalidateQueries({ queryKey: ["admin-fashion-items"] });
      alert("Fashion item deleted");
    } catch (error) {
      console.error(error);
      alert("Failed to delete fashion item");
    }
  }

  function resetForm() {
    setName("");
    setDescription("");
    setGender("MALE");
    setPrice("");
    setImageUrl("");
    setCategoryId("");
    setStyleId("");
    setColorId("");
    setIsActive(true);
    setEditingId(null);
  }

  function handleEdit(item: any) {
    setEditingId(item.id);
    setName(item.name);
    setDescription(item.description || "");
    setGender(item.gender);
    setPrice(item.price.toString());
    setImageUrl(item.imageUrl || "");
    setCategoryId(item.categoryId);
    setStyleId(item.styleId);
    setColorId(item.colorId);
    setIsActive(item.isActive);
  }

  function handleCancelEdit() {
    resetForm();
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Fashion Items Management</h1>

      <div className="mt-6 rounded-2xl border p-6 bg-white shadow-sm">
        <h2 className="text-xl font-semibold">
          {editingId ? "Edit Fashion Item" : "Create Fashion Item"}
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
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price *"
            type="number"
            step="0.01"
            className="rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL"
            className="rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Select Category *</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <select
            value={styleId}
            onChange={(e) => setStyleId(e.target.value)}
            className="rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Select Style *</option>
            {styles.map((style) => (
              <option key={style.id} value={style.id}>{style.name}</option>
            ))}
          </select>
          <select
            value={colorId}
            onChange={(e) => setColorId(e.target.value)}
            className="rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Select Color *</option>
            {colors.map((color) => (
              <option key={color.id} value={color.id}>{color.name}</option>
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
                ? "Update Item"
                : "Create Item"}
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
              <th className="p-3 text-left font-semibold text-zinc-700">Category</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Style</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Color</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Gender</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Price</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Active</th>
              <th className="p-3 text-left font-semibold text-zinc-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item: any) => (
                <tr key={item.id} className="border-b hover:bg-zinc-50/50">
                  <td className="p-3 text-sm text-zinc-500">{item.id.slice(0, 8)}...</td>
                  <td className="p-3 font-medium">{item.name}</td>
                  <td className="p-3">{item.category?.name || "-"}</td>
                  <td className="p-3">{item.style?.name || "-"}</td>
                  <td className="p-3">{item.color?.name || "-"}</td>
                  <td className="p-3">{item.gender}</td>
                  <td className="p-3">${item.price}</td>
                  <td className="p-3">{item.isActive ? "✅" : "❌"}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="rounded-lg border border-zinc-300 px-3 py-1 text-sm font-medium hover:bg-zinc-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
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
                <td colSpan={9} className="p-8 text-center text-zinc-500">
                  No fashion items found.
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
