"use client";

import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl text-ink-900 mb-8">New Project</h1>
      <ProjectForm mode="create" />
    </div>
  );
}
