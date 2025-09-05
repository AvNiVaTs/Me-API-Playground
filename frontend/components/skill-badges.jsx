"use client"

import { cn } from "@/lib/utils"

export function SkillBadges({
  skills,
  onClick,
  active,
}) {
  if (!skills?.length) return null
  return (
    <div className="flex flex-wrap items-center gap-2">
      {skills.map((s) => (
        <button
          key={s}
          type="button"
          onClick={onClick ? () => onClick(s) : undefined}
          className={cn(
            "rounded-full border border-border bg-input px-3 py-1 text-xs transition-colors",
            active === s ? "bg-primary/30 text-primary" : "text-foreground/80 hover:text-foreground",
          )}
          aria-pressed={active === s}
        >
          {s}
        </button>
      ))}
    </div>
  )
}
