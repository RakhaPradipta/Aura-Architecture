"use client";

import TeamForm from "@/components/admin/TeamForm";

export default function NewTeamMemberPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl text-ink-900 mb-8">New Team Member</h1>
      <TeamForm mode="create" />
    </div>
  );
}
