"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { usePathname } from "next/navigation"

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const maskRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const container = containerRef.current
    const mask = maskRef.current
    if (!container || !mask) return

    // Page entrance animation
    const tl = gsap.timeline()

    // Mask animation
    tl.fromTo(mask, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.8, ease: "power3.inOut" })
      .to(mask, { scaleX: 0, transformOrigin: "right center", duration: 0.8, ease: "power3.inOut" }, "+=0.2")
      .fromTo(container, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")

    // Pixel shader effect
    const pixelEffect = () => {
      const pixels = Array.from({ length: 100 }).map((_, i) => {
        const pixel = document.createElement("div")
        pixel.className = "absolute w-1 h-1 bg-black/20"
        pixel.style.left = `${Math.random() * 100}%`
        pixel.style.top = `${Math.random() * 100}%`
        container.appendChild(pixel)

        gsap.fromTo(
          pixel,
          { scale: 0, opacity: 1 },
          {
            scale: 1,
            opacity: 0,
            duration: 1,
            delay: Math.random() * 0.5,
            ease: "power2.out",
            onComplete: () => pixel.remove(),
          },
        )
      })
    }

    pixelEffect()
  }, [pathname])

  return (
    <div className="relative">
      {/* Transition Mask */}
      <div
        ref={maskRef}
        className="fixed inset-0 bg-black z-50 pointer-events-none"
        style={{ transformOrigin: "left center" }}
      />

      {/* Page Content */}
      <div ref={containerRef} className="relative">
        {children}
      </div>
    </div>
  )
}
