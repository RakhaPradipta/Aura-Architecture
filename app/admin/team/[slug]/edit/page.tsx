"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TeamForm from "@/components/admin/TeamForm";
import { authFetch } from "@/lib/auth";

export default function EditTeamMemberPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await authFetch<{ data: typeof member }>(`/api/team/${slug}`);
        setMember(res.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load team member");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) return <div className="text-ink-500">Loading team member...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!member) return <div className="text-ink-500">Team member not found</div>;

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink-900 mb-8">Edit Team Member</h1>
      <TeamForm mode="edit" memberSlug={slug} initialData={member} />
    </div>
  );
}
