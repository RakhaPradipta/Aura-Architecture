"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, isAuthenticated } from "@/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  if (typeof window !== "undefined" && isAuthenticated()) {
    router.push("/admin");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username, password);
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl text-paper">
            <span className="text-blueprint-400">Aura</span> Architecture
          </h1>
          <p className="text-ink-400 text-sm mt-2">Admin Panel</p>
        </div>

        {/* Login Form */}
        <div className="bg-ink-900 border border-ink-800 p-8">
          <h2 className="font-serif text-xl text-paper mb-6">Sign In</h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="label-sm text-ink-400 mb-2 block">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-ink-800 border border-ink-700 px-4 py-3 text-paper placeholder:text-ink-400 focus:outline-none focus:border-blueprint-400 transition-colors"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="label-sm text-ink-400 mb-2 block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-ink-800 border border-ink-700 px-4 py-3 text-paper placeholder:text-ink-400 focus:outline-none focus:border-blueprint-400 transition-colors"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blueprint-600 text-paper py-3 text-sm uppercase tracking-[0.2em] font-medium hover:bg-blueprint-500 transition-colors disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-ink-800">
            <p className="text-xs text-ink-500">
              Default credentials: admin / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
