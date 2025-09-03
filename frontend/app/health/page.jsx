"use client"

import useSWR from "swr"
import { getHealth } from "@/lib/api"
import { Nav } from "@/components/nav"
import { GlassCard } from "@/components/glass-card"

export default function HealthPage() {
  const { data, error, isLoading } = useSWR("health", getHealth)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-4 text-2xl font-bold">Health</h1>
        <GlassCard className="p-5">
          {isLoading ? (
            <p className="text-foreground/80">Checking...</p>
          ) : error ? (
            <p className="text-destructive">Health check failed</p>
          ) : (
            <div className="flex items-center gap-3">
              <span
                aria-label={data?.status || "unknown"}
                className={`inline-block h-3 w-3 rounded-full ${
                  data?.status === "ok" || data?.status === "healthy" ? "bg-primary" : "bg-accent"
                }`}
              />
              <span className="text-sm text-foreground/80">
                Status: <span className="font-medium text-foreground">{data?.status || "unknown"}</span>
              </span>
            </div>
          )}
        </GlassCard>
        <p className="mt-3 text-xs text-foreground/60">
          Get health details here.
        </p>
      </section>
    </main>
  )
}