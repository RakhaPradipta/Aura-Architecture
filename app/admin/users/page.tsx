"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/auth";

interface AdminUser {
  id: number;
  username: string;
  role: string;
  displayName: string;
  isActive: boolean;
  createdAt: string;
  lastLoginAt: string | null;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);

  // Form state
  const [formUsername, setFormUsername] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formRole, setFormRole] = useState("Admin");
  const [formDisplayName, setFormDisplayName] = useState("");
  const [saving, setSaving] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await authFetch<ApiResponse<AdminUser[]>>("/api/admin/users");
      setUsers(res.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const openCreateForm = () => {
    setEditingUser(null);
    setFormUsername("");
    setFormPassword("");
    setFormRole("Admin");
    setFormDisplayName("");
    setShowForm(true);
  };

  const openEditForm = (user: AdminUser) => {
    setEditingUser(user);
    setFormUsername(user.username);
    setFormPassword("");
    setFormRole(user.role);
    setFormDisplayName(user.displayName);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (editingUser) {
        // Update existing user
        const body: Record<string, unknown> = {
          role: formRole,
          displayName: formDisplayName,
        };
        if (formPassword.trim()) {
          body.password = formPassword;
        }
        await authFetch(`/api/admin/users/${editingUser.id}`, {
          method: "PUT",
          body: JSON.stringify(body),
        });
      } else {
        // Create new user
        await authFetch("/api/admin/users", {
          method: "POST",
          body: JSON.stringify({
            username: formUsername,
            password: formPassword,
            role: formRole,
            displayName: formDisplayName,
          }),
        });
      }

      setShowForm(false);
      loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save user");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, username: string) => {
    if (!confirm(`Are you sure you want to delete user "${username}"?`)) return;

    try {
      await authFetch(`/api/admin/users/${id}`, { method: "DELETE" });
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user");
    }
  };

  const handleToggleActive = async (user: AdminUser) => {
    try {
      await authFetch(`/api/admin/users/${user.id}`, {
        method: "PUT",
        body: JSON.stringify({ isActive: !user.isActive }),
      });
      setUsers(users.map((u) =>
        u.id === user.id ? { ...u, isActive: !u.isActive } : u
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update user");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl text-ink-900">Admin Users</h1>
        <button onClick={openCreateForm} className="btn-primary text-xs py-2 px-4">
          + Add User
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 mb-6">
          {error}
        </div>
      )}

      {/* Create/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink-950/50" onClick={() => setShowForm(false)} />
          <div className="relative bg-paper border border-ink-950/10 p-8 w-full max-w-md">
            <h2 className="font-serif text-xl text-ink-900 mb-6">
              {editingUser ? "Edit User" : "Create User"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label-sm text-ink-600 mb-1 block">Username *</label>
                <input
                  required
                  value={formUsername}
                  onChange={(e) => setFormUsername(e.target.value)}
                  disabled={!!editingUser}
                  className="w-full border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500 disabled:bg-ink-100"
                />
              </div>
              <div>
                <label className="label-sm text-ink-600 mb-1 block">
                  Password {editingUser ? "(leave blank to keep current)" : "*"}
                </label>
                <input
                  type="password"
                  required={!editingUser}
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  className="w-full border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500"
                />
              </div>
              <div>
                <label className="label-sm text-ink-600 mb-1 block">Display Name</label>
                <input
                  value={formDisplayName}
                  onChange={(e) => setFormDisplayName(e.target.value)}
                  className="w-full border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500"
                />
              </div>
              <div>
                <label className="label-sm text-ink-600 mb-1 block">Role *</label>
                <select
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value)}
                  className="w-full border border-ink-950/10 px-3 py-2 text-sm focus:outline-none focus:border-blueprint-500"
                >
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                </select>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" disabled={saving} className="btn-primary text-xs py-2 px-4 disabled:opacity-50">
                  {saving ? "Saving..." : editingUser ? "Update" : "Create"}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-xs py-2 px-4">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Users Table */}
      {loading ? (
        <div className="text-ink-500">Loading users...</div>
      ) : (
        <div className="bg-paper border border-ink-950/10">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-950/10">
                <th className="text-left p-4 label-sm text-ink-500">Username</th>
                <th className="text-left p-4 label-sm text-ink-500">Display Name</th>
                <th className="text-left p-4 label-sm text-ink-500">Role</th>
                <th className="text-left p-4 label-sm text-ink-500">Status</th>
                <th className="text-left p-4 label-sm text-ink-500">Last Login</th>
                <th className="text-right p-4 label-sm text-ink-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-ink-100 hover:bg-ink-50">
                  <td className="p-4 font-medium text-ink-900">{user.username}</td>
                  <td className="p-4 text-ink-600 text-sm">{user.displayName || "-"}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 ${user.role === "Admin" ? "bg-blueprint-100 text-blueprint-700" : "bg-ink-100 text-ink-600"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleActive(user)}
                      className={`text-xs px-2 py-1 ${user.isActive ? "bg-sage-100 text-sage-700" : "bg-red-100 text-red-700"}`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="p-4 text-ink-500 text-sm">
                    {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : "Never"}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => openEditForm(user)}
                      className="text-xs text-ink-500 hover:text-blueprint-700 transition-colors mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id, user.username)}
                      className="text-xs text-red-500 hover:text-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <div className="p-8 text-center text-ink-500">
              No admin users found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
