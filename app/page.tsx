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
import FluidGradient from "@/components/fluid-gradient"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const mainRef = useRef<HTMLElement>(null)
  const { isMobile, reducedMotion } = useMobileOptimization()

  useEffect(() => {
    const lenis = initLenis()
    lenis.on("scroll", ScrollTrigger.update)
    
    gsap.set(".page-content", { opacity: 1, visibility: "visible" })
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

    // Force remove any extra spacing after animations complete
    gsap.set("body", { 
      margin: 0, 
      padding: 0,
      clearProps: "margin,padding" 
    })

    return () => {
      lenis.destroy()
    }
  }, [isMobile, reducedMotion])

  return (
    <div 
      className="relative z-0" 
      style={{ 
        margin: 0, 
        padding: 0,
        minHeight: '100vh',
        overflow: 'hidden'
      }}
    >
      {!isMobile && <CursorFollower />}
      <BlobBackground />
      
      <main
        ref={mainRef}
        className="page-content relative z-10"
        style={{ 
          opacity: 1, 
          visibility: "visible",
          margin: 0,
          padding: 0,
          minHeight: '100vh'
        }}
      >
        <div className="relative -translate-x-3 sm:-translate-x-2">
          <ParallaxHero />
        </div>
        
        <SectionTransition delay={0.1}>
          <Stats />
        </SectionTransition>
        
        <SectionTransition delay={0.2}>
          <About />
        </SectionTransition>
        
        <SectionTransition delay={0.4}>
          <Teams />
        </SectionTransition>
        
        {/* Remove SectionTransition wrapper and add explicit controls */}
        <div 
          className="relative"
          style={{ 
            margin: 0, 
            padding: 0,
            marginBottom: 0,
            paddingBottom: 0
          }}
        >
          <Leadership />
        </div>
      </main>
    </div>
  )
}