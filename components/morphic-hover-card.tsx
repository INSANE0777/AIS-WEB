"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface MorphicHoverCardProps {
  children: React.ReactNode
  className?: string
}

export default function MorphicHoverCard({ children, className = "" }: MorphicHoverCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const morphRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const morph = morphRef.current
    if (!card || !morph) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: "power2.out",
      })

      // Morphic blob effect
      gsap.to(morph, {
        x: (x - centerX) * 0.1,
        y: (y - centerY) * 0.1,
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      })

      gsap.to(morph, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      })
    }

    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div ref={cardRef} className={`relative transform-gpu ${className}`} style={{ transformStyle: "preserve-3d" }}>
      <div
        ref={morphRef}
        className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/10 rounded-2xl blur-xl"
      />
      {children}
    </div>
  )
}
