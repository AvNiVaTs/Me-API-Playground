"use client"

import useSWR from "swr"
import { deleteProfile, getProfile } from "@/lib/api"
import { ProfileForm } from "@/components/profile-form"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/glass-card"
import { useRouter } from "next/navigation"
import { useState } from "react"

const fetcher = () => getProfile()

export default function ProfileEditPage() {
  const { data } = useSWR("profile", fetcher)
  const router = useRouter()
  const [removing, setRemoving] = useState(false)

  async function onDelete() {
    if (!confirm("Delete profile? This cannot be undone.")) return
    setRemoving(true)
    try {
      await deleteProfile()
      router.push("/profile")
    } finally {
      setRemoving(false)
    }
  }

  return (
    <main className="container mx-auto max-w-2xl p-4 md:p-6 space-y-6">
      <GlassCard className="p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-semibold text-primary text-balance">
              {data ? "Edit Profile" : "Create Profile"}
            </h1>
            <p className="text-sm text-muted-foreground">
              Fill in your details and press Save. You can add skills quickly by typing and pressing Enter.
            </p>
          </div>
          {data && (
            <Button
              variant="destructive"
              onClick={onDelete}
              disabled={removing}
              className="self-start sm:self-center shrink-0"
            >
              {removing ? "Deleting…" : "Delete"}
            </Button>
          )}
        </div>

        <ProfileForm mode={data ? "edit" : "create"} />
      </GlassCard>

      <GlassCard className="p-4">
        <p className="text-xs text-muted-foreground">
          This UI talks to your backend at{" "}
          <code className="bg-muted/50 px-1 py-0.5 rounded text-xs">
            {process.env.NEXT_PUBLIC_API_URL || "NEXT_PUBLIC_API_URL"}
          </code>{" "}
          using REST endpoints. Adjust in lib/api.js if needed.
        </p>
      </GlassCard>
    </main>
  )
}
