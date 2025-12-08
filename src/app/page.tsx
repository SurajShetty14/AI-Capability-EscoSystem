import type { Metadata } from "next"
import { MobbinNavBar } from "@/components/landing/MobbinNavBar"
import { ModernHero } from "@/components/landing/ModernHero"
import { GlassFeatureCards } from "@/components/landing/GlassFeatureCards"
import { AnimatedComparison } from "@/components/landing/AnimatedComparison"
import { TestimonialMarquee } from "@/components/landing/TestimonialMarquee"
import { ModernPricing } from "@/components/landing/ModernPricing"
import { FAQ } from "@/components/landing/FAQ"
import { BoldFinalCTA } from "@/components/landing/BoldFinalCTA"
import { ModernFooter } from "@/components/landing/ModernFooter"

export const metadata: Metadata = {
  title: "AssessAI - AI-Powered Technical Assessments | Hire Developers 10x Faster",
  description:
    "Transform technical hiring with AI-generated coding tests, cloud labs, and ML challenges. Trusted by 500+ companies. Start free trial.",
  keywords: [
    "technical assessment",
    "coding tests",
    "developer screening",
    "AI proctoring",
    "cloud labs",
    "technical hiring",
  ],
}

export default function LandingPage() {
  return (
    <>
      <MobbinNavBar />
      <main className="overflow-hidden bg-black">
        <ModernHero />
        <GlassFeatureCards />
        <AnimatedComparison />
        <TestimonialMarquee />
        <ModernPricing />
        <FAQ />
        <BoldFinalCTA />
      </main>
      <ModernFooter />
    </>
  )
}
