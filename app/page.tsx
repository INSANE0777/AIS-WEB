"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import About from "@/components/about"
import Teams from "@/components/teams"
import Leadership from "@/components/leadership"
import Stats from "@/components/stats"
import Timeline from "@/components/timeline"
import SectionTransition from "@/components/section-transition"
import { initLenis } from "@/lib/lenis"
import CursorFollower from "@/components/cursor-follower"
import BlobBackground from "@/components/blob-background"
import ParallaxHero from "@/components/parallax-hero"
import { useMobileOptimization } from "@/components/mobile-optimized-animations"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const mainRef = useRef<HTMLElement>(null)
  const { isMobile, reducedMotion } = useMobileOptimization()

  useEffect(() => {
    const lenis = initLenis()
    lenis.on("scroll", ScrollTrigger.update)

    // Optimized content visibility
    gsap.set(".page-content", { opacity: 1, visibility: "visible" })

    // Faster initial animation
    gsap.fromTo(
      ".page-content",
      { opacity: 0 },
      {
        opacity: 1,
        duration: reducedMotion ? 0.01 : isMobile ? 0.4 : 0.6,
        ease: "power2.out",
        delay: reducedMotion ? 0 : 0.1,
      },
    )

    return () => {
      lenis.destroy()
    }
  }, [isMobile, reducedMotion])

  return (
    <>
      {!isMobile && <CursorFollower />}
      <BlobBackground />
      <main ref={mainRef} className="page-content relative z-10" style={{ opacity: 1, visibility: "visible" }}>
        <ParallaxHero />

        <SectionTransition delay={0.1}>
          <Stats />
        </SectionTransition>

        <SectionTransition delay={0.2}>
          <About />
        </SectionTransition>

        <SectionTransition delay={0.3}>
          <Timeline />
        </SectionTransition>

        <SectionTransition delay={0.4}>
          <Teams />
        </SectionTransition>

        <SectionTransition delay={0.5}>
          <Leadership />
        </SectionTransition>
      </main>
    </>
  )
}
