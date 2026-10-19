"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authFetch } from "@/lib/auth";

interface Stats {
  projects: number;
  teamMembers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const projectsRes = await authFetch<{ data: unknown[] }>("/api/projects");
        const teamRes = await authFetch<{ data: unknown[] }>("/api/team");
        setStats({
          projects: projectsRes.data?.length ?? 0,
          teamMembers: teamRes.data?.length ?? 0,
        });
      } catch {
        console.error("Failed to load dashboard data");
      }
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink-900 mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Link
          href="/admin/projects"
          className="bg-paper border border-ink-950/10 p-6 hover:border-blueprint-300 transition-colors"
        >
          <p className="label-sm text-ink-600">Projects</p>
          <p className="font-serif text-4xl text-ink-900 mt-2">
            {stats?.projects ?? "-"}
          </p>
          <p className="text-sm text-ink-500 mt-1">Total projects</p>
        </Link>

        <Link
          href="/admin/team"
          className="bg-paper border border-ink-950/10 p-6 hover:border-blueprint-300 transition-colors"
        >
          <p className="label-sm text-ink-600">Team Members</p>
          <p className="font-serif text-4xl text-ink-900 mt-2">
            {stats?.teamMembers ?? "-"}
          </p>
          <p className="text-sm text-ink-500 mt-1">Team members</p>
        </Link>

        <div className="bg-paper border border-ink-950/10 p-6">
          <p className="label-sm text-ink-600">API Status</p>
          <p className="font-serif text-4xl text-sage-500 mt-2">Live</p>
          <p className="text-sm text-ink-500 mt-1">C# Backend running</p>
        </div>

        <div className="bg-paper border border-ink-950/10 p-6">
          <p className="label-sm text-ink-600">Frontend</p>
          <p className="font-serif text-4xl text-sage-500 mt-2">Live</p>
          <p className="text-sm text-ink-500 mt-1">Next.js running</p>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="font-serif text-xl text-ink-900 mb-6">Quick Actions</h2>
      <div className="flex flex-wrap gap-4">
        <Link
          href="/admin/projects"
          className="btn-primary"
        >
          Manage Projects
        </Link>
        <Link
          href="/admin/team"
          className="btn-secondary"
        >
          Manage Team
        </Link>
        <a
          href="/"
          className="btn-secondary"
          target="_blank"
        >
          View Website
        </a>
      </div>
    </div>
  );
}
