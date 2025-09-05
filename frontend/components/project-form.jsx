"use client"

import React from "react"

import { useState } from "react"
import { mutate } from "swr"
import { useRouter } from "next/navigation"
import { createProject } from "@/lib/api"
import { GlassCard } from "./glass-card"
import { Button } from "./ui/button"

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 20 }, (_, i) => (currentYear - i).toString())

export function ProjectForm({ onClose }) {
  const router = useRouter()
  const [form, setForm] = useState({
    title: "",
    description: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    skills: [],
    demoLink: "",
    repoLink: "",
  })
  const [skillInput, setSkillInput] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const addSkill = () => {
    const skill = skillInput.trim()
    if (skill && !form.skills.includes(skill)) {
      setForm((prev) => ({ ...prev, skills: [...prev.skills, skill] }))
      setSkillInput("")
    }
  }

  const removeSkill = (skillToRemove) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) {
      setError("Project title is required")
      return
    }

    setSaving(true)
    setError("")

    try {
      const projectData = {
        title: form.title,
        description: form.description || undefined,
        startMonth: form.startMonth || undefined,
        startYear: form.startYear || undefined,
        endMonth: form.endMonth || undefined,
        endYear: form.endYear || undefined,
        skills: form.skills.length > 0 ? form.skills : undefined,
        links: {
          demo: form.demoLink || undefined,
          repo: form.repoLink || undefined,
        },
      }

      const saved = await createProject(projectData)

      // Update SWR cache
      mutate("projects", undefined, { revalidate: true })

      onClose()
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project")
    } finally {
      setSaving(false)
    }
  }

  return (
    <GlassCard className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-primary">Add New Project</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          ✕
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Project Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            placeholder="Enter project title"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Start Month</label>
            <select
              value={form.startMonth}
              onChange={(e) => setForm((prev) => ({ ...prev, startMonth: e.target.value }))}
              className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select month</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Start Year</label>
            <select
              value={form.startYear}
              onChange={(e) => setForm((prev) => ({ ...prev, startYear: e.target.value }))}
              className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">End Month</label>
            <select
              value={form.endMonth}
              onChange={(e) => setForm((prev) => ({ ...prev, endMonth: e.target.value }))}
              className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select month</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">End Year</label>
            <select
              value={form.endYear}
              onChange={(e) => setForm((prev) => ({ ...prev, endYear: e.target.value }))}
              className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            placeholder="Describe your project"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Skills Used</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addSkill()
                }
              }}
              className="flex-1 rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              placeholder="Add a skill and press Enter"
            />
            <Button type="button" onClick={addSkill} size="sm">
              Add
            </Button>
          </div>
          {form.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {form.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1 text-xs text-primary"
                >
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)} className="hover:text-primary/70">
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Demo Link</label>
          <input
            type="url"
            value={form.demoLink}
            onChange={(e) => setForm((prev) => ({ ...prev, demoLink: e.target.value }))}
            className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            placeholder="https://your-demo-link.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Repository Link</label>
          <input
            type="url"
            value={form.repoLink}
            onChange={(e) => setForm((prev) => ({ ...prev, repoLink: e.target.value }))}
            className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            placeholder="https://github.com/username/repo"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={saving} className="flex-1">
            {saving ? "Creating..." : "Create Project"}
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </GlassCard>
  )
}
