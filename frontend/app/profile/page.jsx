"use client"

import useSWR from "swr"
import Link from "next/link" // add edit/create navigation
import { Nav } from "@/components/nav"
import { getProfile } from "@/lib/api"
import { GlassCard } from "@/components/glass-card"
import { SkillBadges } from "@/components/skill-badges"
import { Button } from "@/components/ui/button" // use button styling

export default function ProfilePage() {
  const { data, error, isLoading } = useSWR("profile", getProfile)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Profile</h1>
          <Button asChild size="sm">
            <Link href="/profile/edit">Edit</Link>
          </Button>
        </div>

        {isLoading ? (
          <p className="text-foreground/80">Loading...</p>
        ) : error ? (
          <>
            <GlassCard className="p-4 text-destructive">
              No Profile Found
            </GlassCard>
            <GlassCard className="p-4">
              <div className="mt-3">
                <Button asChild>
                  <Link href="/profile/edit">Create Profile</Link>
                </Button>
              </div>
            </GlassCard>
          </>
        ) : data ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <GlassCard className="p-5">
              <h2 className="text-lg font-semibold text-primary">{data.name}</h2>
              <p className="text-sm text-foreground/80">{data.email}</p>
              {data.links ? (
                <div className="mt-3 flex flex-wrap gap-3">
                  {data.links.github && (
                    <a
                      className="text-sm text-primary underline underline-offset-4"
                      href={data.links.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                  )}
                  {data.links.linkedin && (
                    <a
                      className="text-sm text-primary underline underline-offset-4"
                      href={data.links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>
                  )}
                  {data.links.portfolio && (
                    <a
                      className="text-sm text-primary underline underline-offset-4"
                      href={data.links.portfolio}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Portfolio
                    </a>
                  )}
                </div>
              ) : null}
              {data.skills && (
                <div className="mt-4">
                  <h3 className="mb-2 text-sm font-medium">Skills</h3>
                  <SkillBadges skills={data.skills} />
                </div>
              )}
            </GlassCard>

            <GlassCard className="p-5">
              <h3 className="text-base font-semibold text-primary">Education</h3>
              <ul className="mt-2 list-inside list-disc text-sm leading-6 text-foreground/80">
                {data.education?.map((e, i) => <li key={i}>{e}</li>) || <li>No education entries</li>}
              </ul>
            </GlassCard>

            <GlassCard className="p-5 md:col-span-2">
              <h3 className="text-base font-semibold text-primary">Work</h3>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-foreground/80">
                {data.work?.length
                  ? data.work.map((w, i) => (
                      <li key={i} className="flex flex-wrap items-center gap-2">
                        <span className="font-medium">{w.role}</span>
                        <span className="text-foreground/60">at</span>
                        <span>{w.company}</span>
                        {(w.from || w.to) && (
                          <span className="text-foreground/60">
                            ({w.from || "?"} – {w.to || "Present"})
                          </span>
                        )}
                      </li>
                    ))
                  : [<li key="none">No work entries</li>]}
              </ul>
            </GlassCard>
          </div>
        ) : null}
      </section>
    </main>
  )
}
