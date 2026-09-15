import { useState, useEffect } from "react";
import { PlusIcon, EditIcon, Trash2Icon, XIcon } from "lucide-react";
import toast from "react-hot-toast";

import type { AdminCategory } from "../../types";
import Loading from "../../components/Loading";
import api from "../../config/api";

export default function AdminCategories() {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminCategory | null>(null);
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data.categories);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setName("");
    setImageFile(null);
    setImageUrl("");
    setModalOpen(true);
  };

  const openEdit = (category: AdminCategory) => {
    setEditing(category);
    setName(category.name);
    setImageFile(null);
    setImageUrl(category.image || "");
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setModalOpen(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter a category name");
      return;
    }
    setSaving(true);
    try {
      let finalImage = imageUrl;
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append("image", imageFile);
        const { data } = await api.post("/upload", uploadData);
        finalImage = data.url;
      }

      if (editing) {
        await api.put(`/categories/${editing.id}`, {
          name: name.trim(),
          image: finalImage,
        });
        toast.success("Category updated");
      } else {
        await api.post("/categories", {
          name: name.trim(),
          image: finalImage,
        });
        toast.success("Category created");
      }
      setModalOpen(false);
      fetchCategories();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save category");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (category: AdminCategory) => {
    if (
      !window.confirm(
        `Delete "${category.name}"? Products already using it keep their category value.`,
      )
    )
      return;
    try {
      await api.delete(`/categories/${category.id}`);
      toast.success("Category deleted");
      fetchCategories();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete category");
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-app-border overflow-hidden">
        <div className="px-6 py-5 border-b border-app-border flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-xl font-semibold text-zinc-900">Categories</h2>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 bg-app-green text-white rounded-xl hover:bg-green-950 transition-colors font-medium text-sm"
          >
            <PlusIcon className="size-4" /> Add Category
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-app-cream/50 text-zinc-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app-border">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-zinc-500">
                    No categories yet. Add your first one.
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr
                    key={category.id}
                    className="hover:bg-zinc-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-12 rounded-lg bg-app-cream overflow-hidden flex-center shrink-0">
                          {category.image ? (
                            <img
                              src={category.image}
                              alt={category.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-xs text-zinc-400">No image</span>
                          )}
                        </div>
                        <p className="font-semibold text-zinc-900">
                          {category.name}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-500 font-mono text-xs">
                      {category.slug}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(category)}
                          className="p-2 text-zinc-500 hover:text-app-orange bg-zinc-100 hover:bg-orange-50 rounded-lg transition-colors"
                        >
                          <EditIcon className="size-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(category)}
                          title="Delete"
                          className="p-2 text-zinc-500 hover:text-red-600 bg-zinc-100 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2Icon className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <>
          <div
            className="fixed inset-0 bg-app-cream/80 backdrop-blur z-50"
            onClick={closeModal}
          />
          <div className="fixed inset-0 z-50 flex-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="px-6 py-4 border-b border-app-border flex items-center justify-between">
                <h3 className="text-lg font-semibold text-zinc-900">
                  {editing ? "Edit Category" : "New Category"}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-lg hover:bg-app-cream transition-colors"
                >
                  <XIcon className="size-5" />
                </button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    Name
                  </label>
                  <input
                    required
                    autoFocus
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Cleaning Supplies"
                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 focus:border-app-green focus:ring-1 focus:ring-app-green outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    Image (optional)
                  </label>
                  <div className="flex items-center gap-4">
                    {(imageFile || imageUrl) && (
                      <div className="size-16 rounded-lg border border-zinc-200 overflow-hidden shrink-0 bg-app-cream">
                        <img
                          src={
                            imageFile ? URL.createObjectURL(imageFile) : imageUrl
                          }
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 focus:border-app-green outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-app-orange file:text-white hover:file:bg-orange-600 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={saving}
                    className="px-5 py-2.5 text-sm font-medium text-zinc-600 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2.5 bg-app-orange text-white font-medium rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
