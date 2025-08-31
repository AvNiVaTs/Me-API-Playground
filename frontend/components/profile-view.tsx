"use client"

import useSWR from "swr"
import { getProfile, type Profile } from "@/lib/api"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const fetcher = () => getProfile()

export function ProfileView() {
  const { data, isLoading, error } = useSWR<Profile | null>("profile", fetcher)

  if (isLoading) {
    return (
      <GlassCard className="p-6">
        <p className="text-sm text-muted-foreground">Loading profile…</p>
      </GlassCard>
    )
  }

  if (error) {
    return (
      <GlassCard className="p-6">
        <p className="text-sm text-destructive">Failed to load profile.</p>
      </GlassCard>
    )
  }

  if (!data) {
    return (
      <GlassCard className="p-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">No profile yet</h2>
          <p className="text-sm text-muted-foreground">Create your profile to power queries and the rest of the UI.</p>
        </div>
        <Button asChild>
          <Link href="/profile/edit">Create</Link>
        </Button>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="p-6 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">{data.name}</h2>
          <p className="text-sm text-primary/90">{data.headline}</p>
          <p className="text-sm text-muted-foreground mt-2">{data.email}</p>
        </div>
        <Button asChild size="sm">
          <Link href="/profile/edit">Edit</Link>
        </Button>
      </div>
      {data.summary && <p className="text-pretty leading-relaxed">{data.summary}</p>}
      <div className="flex flex-wrap gap-2">
        {(data.skills || []).map((s) => (
          <span key={s} className="text-xs rounded-full px-2 py-1 bg-card/60 border border-border/80">
            {s}
          </span>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {data.links?.github && (
          <a
            className="underline-offset-4 hover:underline text-sm"
            href={data.links.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        )}
        {data.links?.linkedin && (
          <a
            className="underline-offset-4 hover:underline text-sm"
            href={data.links.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        )}
        {data.links?.portfolio && (
          <a
            className="underline-offset-4 hover:underline text-sm"
            href={data.links.portfolio}
            target="_blank"
            rel="noreferrer"
          >
            Portfolio
          </a>
        )}
        {data.links?.website && (
          <a
            className="underline-offset-4 hover:underline text-sm"
            href={data.links.website}
            target="_blank"
            rel="noreferrer"
          >
            Website
          </a>
        )}
      </div>
    </GlassCard>
  )
}
