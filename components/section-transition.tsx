"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface SectionTransitionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function SectionTransition({ children, className = "", delay = 0 }: SectionTransitionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Smooth section entrance
    gsap.fromTo(
      section,
      {
        opacity: 0,
        y: 30,
        scale: 0.98,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        delay,
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Add section separator animation
    const separator = section.querySelector(".section-separator")
    if (separator) {
      gsap.fromTo(
        separator,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: separator,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }
  }, [delay])

  return (
    <section ref={sectionRef} className={`transform-gpu ${className}`}>
      {children}
      <div className="section-separator w-24 h-0.5 bg-black/20 mx-auto mt-16 origin-left" />
    </section>
  )
}
