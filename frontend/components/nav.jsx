"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/profile", label: "Profile" },
  { href: "/health", label: "Health" },
]

export function Nav() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto max-w-5xl px-4 py-3">
        <nav
          className={cn(
            "flex items-center justify-between gap-4 rounded-xl border border-border",
            "bg-card backdrop-blur-xl ring-1 ring-inset ring-ring px-4 py-2",
          )}
          aria-label="Primary"
        >
          <Link href="/" className="font-semibold text-primary">
            Me-API
          </Link>
          <ul className="flex items-center gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm transition-colors",
                    pathname === l.href ? "bg-primary/20 text-primary" : "text-foreground/80 hover:text-foreground",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}