"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface TextRevealProps {
  children: React.ReactNode
  className?: string
  stagger?: number
}

export default function TextReveal({ children, className = "", stagger = 0.05 }: TextRevealProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    // Split text into characters
    const text = element.textContent || ""
    element.innerHTML = text
      .split("")
      .map((char, i) => `<span class="char inline-block">${char === " " ? "&nbsp;" : char}</span>`)
      .join("")

    const chars = element.querySelectorAll(".char")

    gsap.fromTo(
      chars,
      {
        y: 100,
        opacity: 0,
        rotationX: 90,
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 0.8,
        stagger: stagger,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )
  }, [stagger])

  return (
    <div ref={textRef} className={`transform-gpu ${className}`} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  )
}
