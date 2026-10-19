"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isAuthenticated, getStoredUser, clearAuth } from "@/lib/auth";
import { Crosshair } from "@/components/Technical";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin/login");
    } else {
      setAuthorized(true);
      setUser(getStoredUser());
    }
  }, [router]);

  const handleLogout = () => {
    clearAuth();
    router.push("/admin/login");
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="text-ink-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      {/* Admin Header */}
      <header className="bg-ink-950 text-paper relative overflow-hidden">
        <div className="px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="flex items-center gap-3">
              <Crosshair className="text-blueprint-400" />
              <span className="font-serif text-lg">
                <span className="text-blueprint-400">Aura</span> Admin
              </span>
              <span className="hidden md:inline font-mono text-[10px] tracking-[0.24em] uppercase text-ink-500">
                Drawing set
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/admin"
                className="text-sm text-ink-300 hover:text-paper transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/projects"
                className="text-sm text-ink-300 hover:text-paper transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/admin/team"
                className="text-sm text-ink-300 hover:text-paper transition-colors"
              >
                Team
              </Link>
              {user?.role === "Admin" && (
                <Link
                  href="/admin/users"
                  className="text-sm text-ink-300 hover:text-paper transition-colors"
                >
                  Users
                </Link>
              )}
              <a
                href="/"
                className="text-sm text-ink-300 hover:text-paper transition-colors"
                target="_blank"
              >
                View Site
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-ink-400">
              {user?.username} ({user?.role})
            </span>
            <button
              onClick={handleLogout}
              className="text-xs text-blueprint-400 hover:text-blueprint-300 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main className="p-6 md:p-12 grid-paper min-h-[calc(100vh-64px)]">{children}</main>
    </div>
  );
}
