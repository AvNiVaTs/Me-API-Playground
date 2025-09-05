export const API_BASE =
  (typeof window !== "undefined" && window.__API_BASE__) ||
  process.env.NEXT_PUBLIC_API_URL ||
  "";

async function apiFetch(path, opts = {}) {
  const url = opts.skipBase ? path : `${API_BASE}/api/v1${path}`;

  if (!API_BASE && !opts.skipBase) {
    throw new Error("NEXT_PUBLIC_API_URL environment variable is not set. Please configure your API base URL.");
  }

  console.log("[v0] API Request:", { url, method: opts.method || "GET" });

  try {
    const res = await fetch(url, {
      ...opts,
      headers: {
        "Content-Type": "application/json",
        ...(opts.headers || {}),
      },
      cache: "no-store",
    });

    console.log("[v0] API Response:", {
      status: res.status,
      statusText: res.statusText,
      contentType: res.headers.get("content-type"),
    });

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.log("[v0] Non-JSON response received:", text.substring(0, 200));
      throw new Error(`Expected JSON response but received: ${contentType}. Response: ${text.substring(0, 100)}...`);
    }

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Request failed");
    }
    
    console.log("[v0] API Success:", data);
    return data.data;
  } catch (error) {
    console.error("[v0] API Error:", error);
    throw error;
  }
}

// All API methods now call the hosted backend.
export const getHealth = async () => apiFetch('/health');

export const getProfile = async () => apiFetch('/profile');

export const createProfile = async (payload) => apiFetch('/profile', {
  method: 'POST',
  body: JSON.stringify(payload),
});

export const updateProfile = async (payload) => apiFetch('/profile', {
  method: 'PUT',
  body: JSON.stringify(payload),
});

export const deleteProfile = async () => apiFetch('/profile', {
  method: 'DELETE',
});

export const getProjects = async (skill) => apiFetch(skill ? `/projects?skill=${encodeURIComponent(skill)}` : '/projects');

export const createProject = async (payload) => apiFetch('/projects', {
  method: 'POST',
  body: JSON.stringify(payload),
});

export const getTopSkills = async () => apiFetch('/skills/top');

// This function has been updated to use the correct path.
export const searchAll = async (q) => apiFetch(`/search/projects?q=${encodeURIComponent(q)}`);