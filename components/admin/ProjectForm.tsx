"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authFetch } from "@/lib/auth";
import ImageUpload from "./ImageUpload";

interface ProjectFormData {
  id: string;
  title: string;
  category: string;
  year: string;
  location: string;
  client: string;
  area: string;
  description: string;
  beforeDescription: string;
  afterDescription: string;
  designChallenge: string;
  designSolution: string;
  materials: string[];
  features: string[];
  tags: string[];
  stats: { label: string; value: string }[];
  teamMembers: string[];
  testimonial: { quote: string; author: string; role: string } | null;
  image: string;
  images: string[];
}

interface ProjectFormProps {
  initialData?: Partial<ProjectFormData>;
  mode: "create" | "edit";
  projectId?: string;
}

const emptyForm: ProjectFormData = {
  id: "",
  title: "",
  category: "Residential",
  year: new Date().getFullYear().toString(),
  location: "",
  client: "",
  area: "",
  description: "",
  beforeDescription: "",
  afterDescription: "",
  designChallenge: "",
  designSolution: "",
  materials: [""],
  features: [""],
  tags: [""],
  stats: [
    { label: "Area", value: "" },
    { label: "Build Time", value: "" },
  ],
  teamMembers: [],
  testimonial: null,
  image: "",
  images: ["", "", "", ""],
};

export default function ProjectForm({ initialData, mode, projectId }: ProjectFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ProjectFormData>({ ...emptyForm, ...initialData });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [testimonialQuote, setTestimonialQuote] = useState(initialData?.testimonial?.quote || "");
  const [testimonialAuthor, setTestimonialAuthor] = useState(initialData?.testimonial?.author || "");
  const [testimonialRole, setTestimonialRole] = useState(initialData?.testimonial?.role || "");

  const update = (field: keyof ProjectFormData, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateListItem = (field: "materials" | "features" | "tags", index: number, value: string) => {
    setForm((prev) => {
      const list = [...prev[field]];
      list[index] = value;
      return { ...prev, [field]: list };
    });
  };

  const addListItem = (field: "materials" | "features" | "tags") => {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeListItem = (field: "materials" | "features" | "tags", index: number) => {
    setForm((prev) => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };

  const updateStat = (index: number, field: "label" | "value", value: string) => {
    setForm((prev) => {
      const stats = [...prev.stats];
      stats[index] = { ...stats[index], [field]: value };
      return { ...prev, stats };
    });
  };

  const addStat = () => {
    setForm((prev) => ({ ...prev, stats: [...prev.stats, { label: "", value: "" }] }));
  };

  const removeStat = (index: number) => {
    setForm((prev) => ({ ...prev, stats: prev.stats.filter((_, i) => i !== index) }));
  };

  const updateImage = (index: number, url: string) => {
    setForm((prev) => {
      const images = [...prev.images];
      images[index] = url;
      return { ...prev, images };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const body = {
        ...form,
        materials: form.materials.filter((m) => m.trim()),
        features: form.features.filter((f) => f.trim()),
        tags: form.tags.filter((t) => t.trim()),
        stats: form.stats.filter((s) => s.label.trim() && s.value.trim()),
        images: form.images.filter((i) => i.trim()),
        testimonial:
          testimonialQuote.trim()
            ? { quote: testimonialQuote, author: testimonialAuthor, role: testimonialRole }
            : null,
      };

      const endpoint = mode === "edit" ? `/api/projects/${projectId}` : "/api/projects";
      const method = mode === "edit" ? "PUT" : "POST";

      await authFetch(endpoint, {
        method,
        body: JSON.stringify(body),
      });

      router.push("/admin/projects");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <section>
        <h2 className="font-serif text-xl text-ink-900 mb-4">Basic Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mode === "create" && (
            <div>
              <label className="label-sm text-ink-600 mb-1 block">Slug (URL ID) *</label>
              <input
                required
                value={form.id}
                onChange={(e) => update("id", e.target.value)}
                placeholder="e.g. villa-serenity"
                className="w-full border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500"
              />
            </div>
          )}
          <div>
            <label className="label-sm text-ink-600 mb-1 block">Title *</label>
            <input required value={form.title} onChange={(e) => update("title", e.target.value)} className="w-full border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500" />
          </div>
          <div>
            <label className="label-sm text-ink-600 mb-1 block">Category *</label>
            <select value={form.category} onChange={(e) => update("category", e.target.value)} className="w-full border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500">
              <option>Residential</option>
              <option>Commercial</option>
              <option>Renovation</option>
            </select>
          </div>
          <div>
            <label className="label-sm text-ink-600 mb-1 block">Year *</label>
            <input required value={form.year} onChange={(e) => update("year", e.target.value)} className="w-full border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500" />
          </div>
          <div>
            <label className="label-sm text-ink-600 mb-1 block">Location *</label>
            <input required value={form.location} onChange={(e) => update("location", e.target.value)} className="w-full border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500" />
          </div>
          <div>
            <label className="label-sm text-ink-600 mb-1 block">Client *</label>
            <input required value={form.client} onChange={(e) => update("client", e.target.value)} className="w-full border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500" />
          </div>
          <div>
            <label className="label-sm text-ink-600 mb-1 block">Area *</label>
            <input required value={form.area} onChange={(e) => update("area", e.target.value)} className="w-full border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500" />
          </div>
        </div>
      </section>

      {/* Images */}
      <section>
        <h2 className="font-serif text-xl text-ink-900 mb-4">Images</h2>
        <div className="space-y-4">
          <ImageUpload label="Main Image" value={form.image} onChange={(url) => update("image", url)} />
          {form.images.map((img, i) => (
            <ImageUpload key={i} label={`Gallery Image ${i + 1}`} value={img} onChange={(url) => updateImage(i, url)} />
          ))}
          {form.images.length < 8 && (
            <button type="button" onClick={() => update("images", [...form.images, ""])} className="text-sm text-blueprint-700 hover:text-blueprint-800">
              + Add Gallery Image
            </button>
          )}
        </div>
      </section>

      {/* Descriptions */}
      <section>
        <h2 className="font-serif text-xl text-ink-900 mb-4">Descriptions</h2>
        <div className="space-y-4">
          <div>
            <label className="label-sm text-ink-600 mb-1 block">Overview *</label>
            <textarea required rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} className="w-full border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-sm text-ink-600 mb-1 block">Before</label>
              <textarea rows={3} value={form.beforeDescription} onChange={(e) => update("beforeDescription", e.target.value)} className="w-full border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500" />
            </div>
            <div>
              <label className="label-sm text-ink-600 mb-1 block">After</label>
              <textarea rows={3} value={form.afterDescription} onChange={(e) => update("afterDescription", e.target.value)} className="w-full border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-sm text-ink-600 mb-1 block">Design Challenge</label>
              <textarea rows={4} value={form.designChallenge} onChange={(e) => update("designChallenge", e.target.value)} className="w-full border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500" />
            </div>
            <div>
              <label className="label-sm text-ink-600 mb-1 block">Design Solution</label>
              <textarea rows={4} value={form.designSolution} onChange={(e) => update("designSolution", e.target.value)} className="w-full border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Materials, Features, Tags */}
      <section>
        <h2 className="font-serif text-xl text-ink-900 mb-4">Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(["materials", "features", "tags"] as const).map((field) => (
            <div key={field}>
              <label className="label-sm text-ink-600 mb-2 block capitalize">{field}</label>
              {form[field].map((item, i) => (
                <div key={i} className="flex gap-1 mb-2">
                  <input value={item} onChange={(e) => updateListItem(field, i, e.target.value)} className="flex-1 border border-ink-950/10 px-2 py-1.5 text-sm focus:outline-none focus:border-blueprint-500" />
                  {form[field].length > 1 && (
                    <button type="button" onClick={() => removeListItem(field, i)} className="text-red-400 hover:text-red-600 text-xs px-1">
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => addListItem(field)} className="text-xs text-blueprint-700 hover:text-blueprint-800">
                + Add
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section>
        <h2 className="font-serif text-xl text-ink-900 mb-4">Stats</h2>
        {form.stats.map((stat, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input value={stat.label} onChange={(e) => updateStat(i, "label", e.target.value)} placeholder="Label" className="w-1/2 border border-ink-950/10 px-2 py-1.5 text-sm focus:outline-none focus:border-blueprint-500" />
            <input value={stat.value} onChange={(e) => updateStat(i, "value", e.target.value)} placeholder="Value" className="w-1/2 border border-ink-950/10 px-2 py-1.5 text-sm focus:outline-none focus:border-blueprint-500" />
            {form.stats.length > 1 && (
              <button type="button" onClick={() => removeStat(i)} className="text-red-400 hover:text-red-600 text-xs px-1">✕</button>
            )}
          </div>
        ))}
        <button type="button" onClick={addStat} className="text-xs text-blueprint-700 hover:text-blueprint-800">+ Add Stat</button>
      </section>

      {/* Testimonial */}
      <section>
        <h2 className="font-serif text-xl text-ink-900 mb-4">Testimonial</h2>
        <div className="space-y-3">
          <textarea rows={3} value={testimonialQuote} onChange={(e) => setTestimonialQuote(e.target.value)} placeholder="Client quote..." className="w-full border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500" />
          <div className="grid grid-cols-2 gap-3">
            <input value={testimonialAuthor} onChange={(e) => setTestimonialAuthor(e.target.value)} placeholder="Author name" className="border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500" />
            <input value={testimonialRole} onChange={(e) => setTestimonialRole(e.target.value)} placeholder="Author role" className="border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500" />
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex gap-4 pt-4 border-t border-ink-950/10">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
          {saving ? "Saving..." : mode === "edit" ? "Update Project" : "Create Project"}
        </button>
        <button type="button" onClick={() => router.push("/admin/projects")} className="btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
}
