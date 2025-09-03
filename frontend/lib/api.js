// Centralized API client (client-side). Reads external API base URL from NEXT_PUBLIC_API_URL.
export const API_BASE =
  (typeof window !== "undefined" && window.__API_BASE__) ||
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1` ||
  ""

export async function apiFetch(path, opts = {}) {
  const url = opts.skipBase ? path : `${API_BASE}${path}`
  const res = await fetch(url, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
    cache: "no-store",
  })
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`Request failed: ${res.status} ${res.statusText} ${text}`)
  }
  return await res.json()
}

// API helpers
export const getHealth = () => apiFetch("/health")
export const getProfile = () => apiFetch("/profile")
export const getTopSkills = () => apiFetch("/skills/top")
export const getProjects = (skill) =>
  apiFetch(`/projects${skill ? `?skill=${encodeURIComponent(skill)}` : ""}`)
export const searchAll = (q) =>
  apiFetch(`/search?q=${encodeURIComponent(q)}`)

export const createProfile = (payload) =>
  apiFetch("/profile", { method: "POST", body: JSON.stringify(payload) })

export const updateProfile = (payload) =>
  apiFetch("/profile", { method: "PUT", body: JSON.stringify(payload) })

export async function deleteProfile() {
  const res = await fetch(`${API_BASE}/profile`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  })
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`Request failed: ${res.status} ${res.statusText} ${text}`)
  }
  return
}