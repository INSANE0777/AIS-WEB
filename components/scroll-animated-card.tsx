"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface ScrollAnimatedCardProps {
  children: React.ReactNode
  className?: string
  index?: number
}

export default function ScrollAnimatedCard({ children, className = "", index = 0 }: ScrollAnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    // Scroll-triggered entrance animation
    gsap.fromTo(
      card,
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
        rotationX: 45,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        delay: index * 0.1,
      },
    )

    // Parallax effect while scrolling
    gsap.to(card, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    })

    // Hover animations
    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.05,
        rotationY: 5,
        z: 50,
        duration: 0.5,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        rotationY: 0,
        z: 0,
        duration: 0.5,
        ease: "power2.out",
      })
    }

    card.addEventListener("mouseenter", handleMouseEnter)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [index])

  return (
    <div ref={cardRef} className={`transform-gpu ${className}`} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  )
}
