"use client"

import type React from "react"

import { useState } from "react"
import useSWR, { mutate } from "swr"
import { cn } from "@/lib/utils"
import { createProfile, updateProfile, getProfile, type Profile } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { GlassCard } from "@/components/glass-card"
import { Badge } from "@/components/ui/badge"

const fetcher = () => getProfile()

type Props = {
  className?: string
  mode?: "create" | "edit"
}

export function ProfileForm({ className, mode = "edit" }: Props) {
  const { data } = useSWR("profile", fetcher)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<Profile>({
    name: data?.name || "",
    email: data?.email || "",
    headline: data?.headline || "",
    summary: data?.summary || "",
    location: data?.location || "",
    links: data?.links || {},
    skills: data?.skills || [],
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  if (data && !saving && mode === "edit") {
    if (form.name === "" && data.name) setForm({ ...data })
  }

  async function onSubmit(e: React.FormEvent) {
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

  function handleSkillAdd(e: React.KeyboardEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement
    if (e.key === "Enter" && target.value.trim()) {
      e.preventDefault()
      setForm((f) => ({ ...f, skills: [...(f.skills || []), target.value.trim()] }))
      target.value = ""
    }
  }

  function removeSkill(s: string) {
    setForm((f) => ({ ...f, skills: (f.skills || []).filter((x) => x !== s) }))
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
          <div className="flex flex-wrap gap-2 pt-1">
            {(form.skills || []).map((s) => (
              <Badge
                key={s}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => removeSkill(s)}
                title="Click to remove"
              >
                {s}
              </Badge>
            ))}
          </div>
        </div>
      </form>
    </GlassCard>
  )
}
