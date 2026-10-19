"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authFetch } from "@/lib/auth";

interface TeamMember {
  slug: string;
  name: string;
  role: string;
  bias: string;
}

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMembers = async () => {
    try {
      setLoading(true);
      const res = await authFetch<{ data: TeamMember[] }>("/api/team");
      setMembers(res.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load team members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;

    try {
      await authFetch(`/api/team/${slug}`, { method: "DELETE" });
      setMembers(members.filter((m) => m.slug !== slug));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete team member");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl text-ink-900">Team Members</h1>
        <Link
          href="/admin/team/new"
          className="btn-primary text-xs py-2 px-4"
        >
          + Add Member
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-ink-500">Loading team members...</div>
      ) : (
        <div className="bg-paper border border-ink-950/10">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-950/10">
                <th className="text-left p-4 label-sm text-ink-500">Name</th>
                <th className="text-left p-4 label-sm text-ink-500">Role</th>
                <th className="text-left p-4 label-sm text-ink-500">Bias</th>
                <th className="text-right p-4 label-sm text-ink-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.slug} className="border-b border-ink-100 hover:bg-ink-50">
                  <td className="p-4">
                    <Link
                      href={`/team/${member.slug}`}
                      className="text-ink-900 font-medium hover:text-blueprint-700 transition-colors"
                      target="_blank"
                    >
                      {member.name}
                    </Link>
                  </td>
                  <td className="p-4 text-ink-600 text-sm">{member.role}</td>
                  <td className="p-4 text-ink-600 text-sm">{member.bias}</td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/admin/team/${member.slug}/edit`}
                      className="text-xs text-ink-500 hover:text-blueprint-700 transition-colors mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(member.slug)}
                      className="text-xs text-red-500 hover:text-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {members.length === 0 && (
            <div className="p-8 text-center text-ink-500">
              No team members found. Click &quot;+ Add Member&quot; to create one.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
