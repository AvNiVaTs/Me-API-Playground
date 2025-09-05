import Image from "next/image"
import { GlassCard } from "@/components/glass-card"

export function AssessmentRefs() {
  return (
    <GlassCard className="p-4 space-y-3">
      <h3 className="text-sm font-medium">Assessment References</h3>
      <div className="grid gap-3 md:grid-cols-3">
        <Image
          className="rounded-md border border-border"
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-29%20133730-kt6tH1jOzz6P0z2oqWT16GrC6aOBNN.png"
          alt="Track A requirements"
          width={512}
          height={448}
        />
        <Image
          className="rounded-md border border-border"
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-29%20133745-KigYdaBwOzGGT3Y8doHspiCwor9nsP.png"
          alt="Acceptance criteria"
          width={512}
          height={448}
        />
        <Image
          className="rounded-md border border-border"
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-29%20133848-Z79hkinH1gqCIebq3RgbQ1ogPXUAUX.png"
          alt="Submission checklist"
          width={512}
          height={448}
        />
      </div>
    </GlassCard>
  )
}
