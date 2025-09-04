import Link from "next/link"
import { Nav } from "@/components/nav"
import { GlassCard } from "@/components/glass-card"
import { SearchInput } from "@/components/search-input"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-6">
          <h1 className="text-balance text-3xl font-bold">Me-API Playground</h1>
          <p className="mt-2 max-w-2xl text-foreground/80">
            Explore your profile, projects and skills.
          </p>
        </div>

        <GlassCard className="p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-primary">Quick search</h2>
              <p className="text-sm text-foreground/70">Find projects by keyword or skill.</p>
            </div>
            <div className="w-full md:max-w-md">
              <SearchInput />
            </div>
          </div>
        </GlassCard>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <GlassCard className="p-5">
            <h3 className="text-base font-semibold text-primary">Projects</h3>
            <p className="mt-1 text-sm text-foreground/80">Browse and filter by skill.</p>
            <Link
              href="/projects"
              className="mt-3 inline-block rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Open Projects
            </Link>
          </GlassCard>

          <GlassCard className="p-5">
            <h3 className="text-base font-semibold text-primary">Profile</h3>
            <p className="mt-1 text-sm text-foreground/80">Your bio, skills, links and work.</p>
            <Link
              href="/profile"
              className="mt-3 inline-block rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              View Profile
            </Link>
          </GlassCard>

          <GlassCard className="p-5">
            <h3 className="text-base font-semibold text-primary">Health</h3>
            <p className="mt-1 text-sm text-foreground/80">Check Health.</p>
            <Link
              href="/health"
              className="mt-3 inline-block rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Health Check
            </Link>
          </GlassCard>
        </div>
      </section>
    </main>
  )
}