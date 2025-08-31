"use client"

import useSWR from "swr"
import { useSearchParams, useRouter } from "next/navigation"
import { getProjects, getTopSkills, searchAll, type Project } from "@/lib/api"
import { Nav } from "@/components/nav"
import { GlassCard } from "@/components/glass-card"
import { SearchInput } from "@/components/search-input"
import { SkillBadges } from "@/components/skill-badges"
import { ProjectCard } from "@/components/project-card"

export default function ProjectsPage() {
  const params = useSearchParams()
  const router = useRouter()
  const q = params.get("q") ?? ""
  const skill = params.get("skill") ?? ""

  const { data: skills } = useSWR("skills-top", getTopSkills)
  const {
    data: projects,
    error,
    isLoading,
  } = useSWR<Project[]>(["projects", q || skill], async () => {
    if (q) {
      const res = await searchAll(q)
      return res.projects || []
    }
    return getProjects(skill || undefined)
  })

  function setSkill(next: string) {
    const sp = new URLSearchParams(params.toString())
    if (next) sp.set("skill", next)
    else sp.delete("skill")
    sp.delete("q")
    router.push(`/projects?${sp.toString()}`)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-4 flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-primary">Projects</h1>
          <GlassCard className="p-4">
            <SearchInput />
          </GlassCard>
          <GlassCard className="p-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-medium text-primary">Filter by skill</h2>
              <button className="text-xs text-foreground/70 underline underline-offset-4" onClick={() => setSkill("")}>
                Clear
              </button>
            </div>
            <div className="mt-3">
              <SkillBadges skills={skills || []} active={skill || null} onClick={setSkill} />
            </div>
          </GlassCard>
        </div>

        {isLoading ? (
          <p className="text-foreground/80">Loading...</p>
        ) : error ? (
          <GlassCard className="p-4 text-destructive">
            Failed to load projects: {String(error.message || error)}
          </GlassCard>
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <GlassCard className="p-4">No results.</GlassCard>
        )}
      </section>
    </main>
  )
}
