"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import { authFetch } from "@/lib/auth";

export default function EditProjectPage() {
  const params = useParams();
  const id = params.id as string;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await authFetch<{ data: typeof project }>(`/api/projects/${id}`);
        setProject(res.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load project");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div className="text-ink-500">Loading project...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!project) return <div className="text-ink-500">Project not found</div>;

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink-900 mb-8">Edit Project</h1>
      <ProjectForm mode="edit" projectId={id} initialData={project} />
    </div>
  );
}
