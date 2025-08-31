import { GlassCard } from "./glass-card"
import type { Project } from "@/lib/api"
import { SkillBadges } from "./skill-badges"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <GlassCard className="p-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-pretty text-base font-semibold">{project.title}</h3>
          <div className="flex gap-2">
            {project.links?.demo && (
              <a
                className="rounded-md bg-accent/30 px-2 py-1 text-xs text-accent-foreground hover:bg-accent/40"
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
              >
                Demo
              </a>
            )}
            {project.links?.repo && (
              <a
                className="rounded-md bg-primary/25 px-2 py-1 text-xs text-primary hover:bg-primary/35"
                href={project.links.repo}
                target="_blank"
                rel="noreferrer"
              >
                Repo
              </a>
            )}
          </div>
        </div>
        {project.description ? <p className="text-sm leading-6 text-foreground/80">{project.description}</p> : null}
        <SkillBadges skills={project.skills || []} />
      </div>
    </GlassCard>
  )
}
