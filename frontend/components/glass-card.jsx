import { cn } from "@/lib/utils"

// Simple glass container
export function GlassCard({ children, className }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card backdrop-blur-xl",
        "shadow-[0_8px_30px_rgba(0,0,0,0.12)] ring-1 ring-inset ring-ring",
        "text-card-foreground",
        className,
      )}
    >
      {children}
    </div>
  )
}
