"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authFetch } from "@/lib/auth";
import ImageUpload from "./ImageUpload";

interface TeamFormData {
  slug: string;
  name: string;
  role: string;
  bias: string;
  biasDescription: string;
  bio: string;
  education: string;
  experience: string;
  notableProjects: string[];
  image: string;
  social: { linkedin: string; instagram: string };
}

interface TeamFormProps {
  initialData?: Partial<TeamFormData>;
  mode: "create" | "edit";
  memberSlug?: string;
}

const emptyForm: TeamFormData = {
  slug: "",
  name: "",
  role: "",
  bias: "",
  biasDescription: "",
  bio: "",
  education: "",
  experience: "",
  notableProjects: [""],
  image: "",
  social: { linkedin: "", instagram: "" },
};

export default function TeamForm({ initialData, mode, memberSlug }: TeamFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<TeamFormData>({ ...emptyForm, ...initialData });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = (field: keyof TeamFormData, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateSocial = (field: "linkedin" | "instagram", value: string) => {
    setForm((prev) => ({ ...prev, social: { ...prev.social, [field]: value } }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const body = {
        ...form,
        notableProjects: form.notableProjects.filter((p) => p.trim()),
        social: {
          linkedin: form.social.linkedin.trim() || null,
          instagram: form.social.instagram.trim() || null,
        },
      };

      const endpoint = mode === "edit" ? `/api/team/${memberSlug}` : "/api/team";
      const method = mode === "edit" ? "PUT" : "POST";

      await authFetch(endpoint, { method, body: JSON.stringify(body) });
      router.push("/admin/team");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save team member");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4">{error}</div>
      )}

      {/* Basic Info */}
      <section>
        <h2 className="font-serif text-xl text-ink-900 mb-4">Basic Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mode === "create" && (
            <div>
              <label className="label-sm text-ink-600 mb-1 block">Slug (URL) *</label>
              <input required value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder="e.g. john-doe" className="w-full border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500" />
            </div>
          )}
          <div>
            <label className="label-sm text-ink-600 mb-1 block">Name *</label>
            <input required value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500" />
          </div>
          <div>
            <label className="label-sm text-ink-600 mb-1 block">Role *</label>
            <input required value={form.role} onChange={(e) => update("role", e.target.value)} className="w-full border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500" />
          </div>
          <div>
            <label className="label-sm text-ink-600 mb-1 block">Experience</label>
            <input value={form.experience} onChange={(e) => update("experience", e.target.value)} placeholder="e.g. 10+ years" className="w-full border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500" />
          </div>
          <div>
            <label className="label-sm text-ink-600 mb-1 block">Education</label>
            <input value={form.education} onChange={(e) => update("education", e.target.value)} className="w-full border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500" />
          </div>
        </div>
      </section>

      {/* Image */}
      <section>
        <h2 className="font-serif text-xl text-ink-900 mb-4">Photo</h2>
        <ImageUpload label="Headshot" value={form.image} onChange={(url) => update("image", url)} />
      </section>

      {/* Bias & Bio */}
      <section>
        <h2 className="font-serif text-xl text-ink-900 mb-4">Architectural Bias</h2>
        <div className="space-y-4">
          <div>
            <label className="label-sm text-ink-600 mb-1 block">Bias Name *</label>
            <input required value={form.bias} onChange={(e) => update("bias", e.target.value)} placeholder="e.g. Tropical Bioclimatic Design" className="w-full border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500" />
          </div>
          <div>
            <label className="label-sm text-ink-600 mb-1 block">Bias Description *</label>
            <textarea required rows={4} value={form.biasDescription} onChange={(e) => update("biasDescription", e.target.value)} className="w-full border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500" />
          </div>
          <div>
            <label className="label-sm text-ink-600 mb-1 block">Bio *</label>
            <textarea required rows={4} value={form.bio} onChange={(e) => update("bio", e.target.value)} className="w-full border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500" />
          </div>
        </div>
      </section>

      {/* Notable Projects */}
      <section>
        <h2 className="font-serif text-xl text-ink-900 mb-4">Notable Projects</h2>
        {form.notableProjects.map((project, i) => (
          <div key={i} className="flex gap-1 mb-2">
            <input value={project} onChange={(e) => {
              const list = [...form.notableProjects];
              list[i] = e.target.value;
              update("notableProjects", list);
            }} placeholder="Project name" className="flex-1 border border-ink-950/10 px-2 py-1.5 text-sm focus:outline-none focus:border-blueprint-500" />
            {form.notableProjects.length > 1 && (
              <button type="button" onClick={() => update("notableProjects", form.notableProjects.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600 text-xs px-1">✕</button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => update("notableProjects", [...form.notableProjects, ""])} className="text-xs text-blueprint-700 hover:text-blueprint-800">+ Add Project</button>
      </section>

      {/* Social Links */}
      <section>
        <h2 className="font-serif text-xl text-ink-900 mb-4">Social Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label-sm text-ink-600 mb-1 block">LinkedIn URL</label>
            <input value={form.social.linkedin} onChange={(e) => updateSocial("linkedin", e.target.value)} placeholder="https://linkedin.com/in/..." className="w-full border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500" />
          </div>
          <div>
            <label className="label-sm text-ink-600 mb-1 block">Instagram URL</label>
            <input value={form.social.instagram} onChange={(e) => updateSocial("instagram", e.target.value)} placeholder="https://instagram.com/..." className="w-full border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500" />
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex gap-4 pt-4 border-t border-ink-950/10">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
          {saving ? "Saving..." : mode === "edit" ? "Update Member" : "Create Member"}
        </button>
        <button type="button" onClick={() => router.push("/admin/team")} className="btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
}
