// Centralized API client (client-side). Reads external API base URL from NEXT_PUBLIC_API_URL.
export const API_BASE =
  (typeof window !== "undefined" && (window as any).__API_BASE__) || // helpful for quick overrides in preview
  process.env.NEXT_PUBLIC_API_URL ||
  ""

type FetchOpts = RequestInit & { skipBase?: boolean }

export async function apiFetch<T = any>(path: string, opts: FetchOpts = {}) {
  const url = opts.skipBase ? path : `${API_BASE}${path}`
  const res = await fetch(url, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
    // CORS must be allowed by your backend; credentials off by default
    cache: "no-store",
  })
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`Request failed: ${res.status} ${res.statusText} ${text}`)
  }
  return (await res.json()) as T
}

// Typed helpers you can align to your backend later.
export type Profile = {
  name: string
  email: string
  headline?: string
  summary?: string
  location?: string
  education?: string[]
  skills?: string[]
  links?: {
    github?: string
    linkedin?: string
    portfolio?: string
    website?: string
  }
  work?: { company: string; role: string; from?: string; to?: string }[]
}

export type Project = {
  id: string | number
  title: string
  description?: string
  links?: { demo?: string; repo?: string }
  skills?: string[]
}

export const getHealth = () => apiFetch<{ status: string }>("/health")
export const getProfile = () => apiFetch<Profile>("/profile")
export const getTopSkills = () => apiFetch<string[]>("/skills/top")
export const getProjects = (skill?: string) =>
  apiFetch<Project[]>(`/projects${skill ? `?skill=${encodeURIComponent(skill)}` : ""}`)
export const searchAll = (q: string) =>
  apiFetch<{ projects: Project[]; skills: string[]; profile?: Profile }>(`/search?q=${encodeURIComponent(q)}`)

export const createProfile = (payload: Profile) =>
  apiFetch<Profile>("/profile", { method: "POST", body: JSON.stringify(payload) })

export const updateProfile = (payload: Profile) =>
  apiFetch<Profile>("/profile", { method: "PUT", body: JSON.stringify(payload) })

export async function deleteProfile(): Promise<void> {
  // Use a raw fetch to tolerate empty/204 responses from DELETE
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
