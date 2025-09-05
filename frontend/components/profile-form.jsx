"use client"

import React from "react"

import { useState, useEffect } from "react"
import useSWR, { mutate } from "swr"
import { cn } from "@/lib/utils"
import { createProfile, updateProfile, getProfile } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { GlassCard } from "@/components/glass-card"
import { SkillBadges } from "@/components/skill-badges"

const fetcher = () => getProfile()

export function ProfileForm({ className, mode = "edit" }) {
  const { data } = useSWR("profile", fetcher)
  const [saving, setSaving] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    headline: "",
    summary: "",
    location: "",
    links: {},
    skills: [],
    education: [],
    work: [],
  })

  useEffect(() => {
    if (data && !initialized && mode === "edit") {
      setForm({ ...data })
      setInitialized(true)
    }
  }, [data, initialized, mode])

  async function onSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      const action = mode === "create" && !data ? createProfile : updateProfile
      const saved = await action(form)
      await mutate("profile", saved, { revalidate: false })
    } finally {
      setSaving(false)
    }
  }

  function handleSkillAdd(e) {
    const target = e.target
    if (e.key === "Enter" && target.value.trim()) {
      e.preventDefault()
      const newSkill = target.value.trim()
      if (!form.skills?.includes(newSkill)) {
        setForm((f) => ({ ...f, skills: [...(f.skills || []), newSkill] }))
      }
      target.value = ""
    }
  }

  function removeSkill(s) {
    setForm((f) => ({ ...f, skills: (f.skills || []).filter((x) => x !== s) }))
  }

  function addEducation() {
    const education = form.education || []
    setForm((f) => ({ ...f, education: [...education, ""] }))
  }

  function updateEducation(index, value) {
    const education = [...(form.education || [])]
    education[index] = value
    setForm((f) => ({ ...f, education }))
  }

  function removeEducation(index) {
    const education = [...(form.education || [])]
    education.splice(index, 1)
    setForm((f) => ({ ...f, education }))
  }

  function addWorkExperience() {
    const work = form.work || []
    setForm((f) => ({ ...f, work: [...work, { company: "", role: "", from: "", to: "" }] }))
  }

  function updateWorkExperience(index, field, value) {
    const work = [...(form.work || [])]
    work[index] = { ...work[index], [field]: value }
    setForm((f) => ({ ...f, work }))
  }

  function removeWorkExperience(index) {
    const work = [...(form.work || [])]
    work.splice(index, 1)
    setForm((f) => ({ ...f, work }))
  }

  return (
    <GlassCard className="p-4 md:p-6">
      <form onSubmit={onSubmit} className={cn("space-y-6", className)}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-semibold text-primary text-balance">
            {mode === "create" ? "Create Your Profile" : "Edit Profile"}
          </h2>
          <Button type="submit" disabled={saving} className="min-w-24">
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Name</label>
            <Input
              required
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your full name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <Input
              type="email"
              required
              value={form.email || ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Headline</label>
          <Input
            value={form.headline || ""}
            onChange={(e) => setForm({ ...form, headline: e.target.value })}
            placeholder="e.g., Backend Engineer • APIs • Databases"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Summary</label>
          <Textarea
            value={form.summary || ""}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
            placeholder="Short professional summary"
            rows={4}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Location</label>
            <Input
              value={form.location || ""}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="City, Country"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">GitHub</label>
            <Input
              value={form.links?.github || ""}
              onChange={(e) => setForm({ ...form, links: { ...form.links, github: e.target.value } })}
              placeholder="https://github.com/you"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">LinkedIn</label>
            <Input
              value={form.links?.linkedin || ""}
              onChange={(e) => setForm({ ...form, links: { ...form.links, linkedin: e.target.value } })}
              placeholder="https://linkedin.com/in/you"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Portfolio</label>
            <Input
              value={form.links?.portfolio || ""}
              onChange={(e) => setForm({ ...form, links: { ...form.links, portfolio: e.target.value } })}
              placeholder="https://your.site"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Website</label>
            <Input
              value={form.links?.website || ""}
              onChange={(e) => setForm({ ...form, links: { ...form.links, website: e.target.value } })}
              placeholder="https://blog.you.dev"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Skills</label>
          <div className="flex items-center gap-2">
            <Input onKeyDown={handleSkillAdd} placeholder="Type a skill and press Enter" />
          </div>
          <div className="pt-1">
            <SkillBadges skills={form.skills} onClick={removeSkill} />
          </div>
          {form.skills && form.skills.length > 0 && (
            <p className="text-xs text-muted-foreground">Click on a skill to remove it</p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground">Education</label>
            <Button type="button" variant="outline" size="sm" onClick={addEducation}>
              Add Education
            </Button>
          </div>
          <div className="space-y-3">
            {(form.education || []).map((edu, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={edu}
                  onChange={(e) => updateEducation(index, e.target.value)}
                  placeholder="e.g., Bachelor of Computer Science - University Name"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(index)}
                  className="text-destructive hover:text-destructive"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground">Work Experience</label>
            <Button type="button" variant="outline" size="sm" onClick={addWorkExperience}>
              Add Experience
            </Button>
          </div>
          <div className="space-y-4">
            {(form.work || []).map((job, index) => (
              <div key={index} className="space-y-3 p-4 border border-border/50 rounded-lg bg-background/20">
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Company</label>
                    <Input
                      value={job.company}
                      onChange={(e) => updateWorkExperience(index, "company", e.target.value)}
                      placeholder="Company Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Role</label>
                    <Input
                      value={job.role}
                      onChange={(e) => updateWorkExperience(index, "role", e.target.value)}
                      placeholder="Job Title"
                    />
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">From</label>
                    <Input
                      value={job.from || ""}
                      onChange={(e) => updateWorkExperience(index, "from", e.target.value)}
                      placeholder="Jan 2020"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">To</label>
                    <Input
                      value={job.to || ""}
                      onChange={(e) => updateWorkExperience(index, "to", e.target.value)}
                      placeholder="Present"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeWorkExperience(index)}
                      className="text-destructive hover:text-destructive w-full"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </GlassCard>
  )
}
