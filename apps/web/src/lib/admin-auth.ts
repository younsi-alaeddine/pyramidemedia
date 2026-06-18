export const ADMIN_TOKEN_COOKIE = "admin_token";

export const API_URL = process.env.API_URL ?? "http://localhost:3001";

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export async function fetchAdminApi<T>(
  path: string,
  token: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `API error ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export async function loginAdmin(email: string, password: string) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid email or password");
  }

  return response.json() as Promise<{
    accessToken: string;
    user: AdminUser;
  }>;
}

export async function getAdminProfile(token: string) {
  return fetchAdminApi<AdminUser>("/api/auth/me", token);
}
