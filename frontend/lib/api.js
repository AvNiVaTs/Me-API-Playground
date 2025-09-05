// Centralized API client (client-side). Reads external API base URL from NEXT_PUBLIC_API_URL.
export const API_BASE =
  (typeof window !== "undefined" && window.__API_BASE__) || // helpful for quick overrides in preview
  process.env.NEXT_PUBLIC_API_URL ||
  ""

// Simple fetch wrapper
export async function apiFetch(path, opts = {}) {
  const url = opts.skipBase ? path : `${API_BASE}${path}`

  if (!API_BASE && !opts.skipBase) {
    throw new Error("NEXT_PUBLIC_API_URL environment variable is not set. Please configure your API base URL.")
  }

  console.log("[v0] API Request:", { url, method: opts.method || "GET" })

  try {
    const res = await fetch(url, {
      ...opts,
      headers: {
        "Content-Type": "application/json",
        ...(opts.headers || {}),
      },
      cache: "no-store",
    })

    console.log("[v0] API Response:", {
      status: res.status,
      statusText: res.statusText,
      contentType: res.headers.get("content-type"),
    })

    if (!res.ok) {
      const contentType = res.headers.get("content-type")
      let errorMessage = `Request failed: ${res.status} ${res.statusText}`

      try {
        if (contentType && contentType.includes("application/json")) {
          const errorData = await res.json()
          errorMessage += ` - ${JSON.stringify(errorData)}`
        } else {
          const text = await res.text()
          errorMessage += ` - ${text.substring(0, 200)}${text.length > 200 ? "..." : ""}`
        }
      } catch (parseError) {
        console.log("[v0] Error parsing error response:", parseError)
      }

      throw new Error(errorMessage)
    }

    const contentType = res.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text()
      console.log("[v0] Non-JSON response received:", text.substring(0, 200))
      throw new Error(`Expected JSON response but received: ${contentType}. Response: ${text.substring(0, 100)}...`)
    }

    const data = await res.json()
    console.log("[v0] API Success:", data)
    return data
  } catch (error) {
    console.error("[v0] API Error:", error)
    throw error
  }
}

// ---- Demo storage using localStorage ----
const DEMO_STORAGE_KEYS = {
  profile: "demo_profile",
  projects: "demo_projects",
  health: "demo_health",
}

// Simulate API delay
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms))

// Helpers for localStorage
const getStorageData = (key, defaultValue) => {
  if (typeof window === "undefined") return defaultValue
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultValue
  } catch {
    return defaultValue
  }
}

const setStorageData = (key, data) => {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error("Failed to save to localStorage:", error)
  }
}

// ---- API Helpers ----
export const getHealth = async () => {
  await delay(200)
  return { status: "OK" }
}

export const getProfile = async () => {
  await delay()
  const profile = getStorageData(DEMO_STORAGE_KEYS.profile, null)
  if (!profile) throw new Error("Profile not found")
  return profile
}

export const getTopSkills = async () => {
  await delay(300)
  const projects = getStorageData(DEMO_STORAGE_KEYS.projects, [])
  const allSkills = projects.flatMap((p) => p.skills || [])
  const skillCounts = allSkills.reduce((acc, skill) => {
    acc[skill] = (acc[skill] || 0) + 1
    return acc
  }, {})

  return Object.entries(skillCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([skill]) => skill)
}

export const getProjects = async (skill) => {
  await delay()
  const projects = getStorageData(DEMO_STORAGE_KEYS.projects, [])
  if (!skill) return projects
  return projects.filter((p) => p.skills?.some((s) => s.toLowerCase().includes(skill.toLowerCase())))
}

export const searchAll = async (q) => {
  await delay()
  const projects = getStorageData(DEMO_STORAGE_KEYS.projects, [])
  const profile = getStorageData(DEMO_STORAGE_KEYS.profile, null)
  const query = q.toLowerCase()

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(query) ||
      p.description?.toLowerCase().includes(query) ||
      p.skills?.some((s) => s.toLowerCase().includes(query))
  )

  const allSkills = projects.flatMap((p) => p.skills || [])
  const matchingSkills = [...new Set(allSkills.filter((s) => s.toLowerCase().includes(query)))]

  return {
    projects: filteredProjects,
    skills: matchingSkills,
    profile:
      profile &&
      (profile.name.toLowerCase().includes(query) ||
        profile.headline?.toLowerCase().includes(query) ||
        profile.skills?.some((s) => s.toLowerCase().includes(query)))
        ? profile
        : undefined,
  }
}

export const createProfile = async (payload) => {
  await delay()
  setStorageData(DEMO_STORAGE_KEYS.profile, payload)
  return payload
}

export const updateProfile = async (payload) => {
  await delay()
  setStorageData(DEMO_STORAGE_KEYS.profile, payload)
  return payload
}

export const deleteProfile = async () => {
  await delay()
  if (typeof window !== "undefined") {
    localStorage.removeItem(DEMO_STORAGE_KEYS.profile)
  }
}

export const createProject = async (payload) => {
  await delay()
  const projects = getStorageData(DEMO_STORAGE_KEYS.projects, [])
  const newProject = { ...payload, id: Date.now().toString() }
  const updatedProjects = [...projects, newProject]
  setStorageData(DEMO_STORAGE_KEYS.projects, updatedProjects)
  return newProject
}