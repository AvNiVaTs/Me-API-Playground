"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export function SearchInput({ placeholder = "Search projects, skills..." }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [q, setQ] = useState(searchParams.get("q") ?? "")

  function submit(e) {
    e.preventDefault()
    const sp = new URLSearchParams(searchParams.toString())
    if (q) sp.set("q", q)
    else sp.delete("q")
    router.push(`/projects?${sp.toString()}`)
  }

  return (
    <form onSubmit={submit} className="flex w-full items-center gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none placeholder:text-foreground/60 focus:ring-2 focus:ring-ring"
        placeholder={placeholder}
        aria-label="Search"
      />
      <button
        type="submit"
        className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Search
      </button>
    </form>
  )
}