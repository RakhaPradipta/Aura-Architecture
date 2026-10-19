const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface LoginResponse {
  token: string;
  username: string;
  role: string;
  expiresAt: string;
}

export interface AuthUser {
  username: string;
  role: string;
}

// ─── Token storage ────────────────────────────────────────────────
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("aura_admin_token");
}

export function setToken(token: string): void {
  localStorage.setItem("aura_admin_token", token);
}

export function removeToken(): void {
  localStorage.removeItem("aura_admin_token");
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("aura_admin_user");
  return data ? JSON.parse(data) : null;
}

export function setStoredUser(user: AuthUser): void {
  localStorage.setItem("aura_admin_user", JSON.stringify(user));
}

export function clearAuth(): void {
  removeToken();
  localStorage.removeItem("aura_admin_user");
}

export function isAuthenticated(): boolean {
  return getToken() !== null;
}

// ─── Authenticated fetch ──────────────────────────────────────────
export async function authFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    clearAuth();
    throw new Error("Session expired. Please log in again.");
  }

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Request failed");
  }

  return json as T;
}

// ─── Login ────────────────────────────────────────────────────────
export async function login(username: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const json = await res.json();

  if (!res.ok || !json.data) {
    throw new Error(json.message || "Login failed");
  }

  const data: LoginResponse = json.data;
  setToken(data.token);
  setStoredUser({ username: data.username, role: data.role });

  return data;
}
