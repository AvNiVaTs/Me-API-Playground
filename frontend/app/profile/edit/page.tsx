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
    <main className="container mx-auto max-w-3xl p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-primary text-balance">{data ? "Edit Profile" : "Create Profile"}</h1>
        {data && (
          <Button variant="destructive" onClick={onDelete} disabled={removing}>
            {removing ? "Deleting…" : "Delete"}
          </Button>
        )}
      </div>
      <p className="text-sm text-muted-foreground">
        Fill in your details and press Save. You can add skills quickly by typing and pressing Enter.
      </p>
      <ProfileForm mode={data ? "edit" : "create"} />
      <GlassCard className="p-4 text-xs text-muted-foreground">
        <p>
          This UI talks to your backend at <code>process.env.NEXT_PUBLIC_API_URL</code> using REST: GET/POST/PUT/DELETE
          /profile. Adjust endpoints in lib/api.ts if needed.
        </p>
      </GlassCard>
    </main>
  )
}
