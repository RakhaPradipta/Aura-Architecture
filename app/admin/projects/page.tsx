"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authFetch, type ApiResponse } from "@/lib/auth";

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  location: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await authFetch<ApiResponse<Project[]>>("/api/projects");
      setProjects(res.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await authFetch(`/api/projects/${id}`, { method: "DELETE" });
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete project");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl text-ink-900">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="btn-primary text-xs py-2 px-4"
        >
          + Add Project
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-ink-500">Loading projects...</div>
      ) : (
        <div className="bg-paper border border-ink-950/10">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-950/10">
                <th className="text-left p-4 label-sm text-ink-500">Title</th>
                <th className="text-left p-4 label-sm text-ink-500">Category</th>
                <th className="text-left p-4 label-sm text-ink-500">Year</th>
                <th className="text-left p-4 label-sm text-ink-500">Location</th>
                <th className="text-right p-4 label-sm text-ink-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-ink-100 hover:bg-ink-50">
                  <td className="p-4">
                    <Link
                      href={`/projects/${project.id}`}
                      className="text-ink-900 font-medium hover:text-blueprint-700 transition-colors"
                      target="_blank"
                    >
                      {project.title}
                    </Link>
                  </td>
                  <td className="p-4 text-ink-600 text-sm">{project.category}</td>
                  <td className="p-4 text-ink-600 text-sm">{project.year}</td>
                  <td className="p-4 text-ink-600 text-sm">{project.location}</td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="text-xs text-ink-500 hover:text-blueprint-700 transition-colors mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-xs text-red-500 hover:text-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {projects.length === 0 && (
            <div className="p-8 text-center text-ink-500">
              No projects found. Click &quot;+ Add Project&quot; to create one.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
