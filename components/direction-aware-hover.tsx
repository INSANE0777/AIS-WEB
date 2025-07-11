"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface DirectionAwareHoverProps {
  children: React.ReactNode
  className?: string
}

export default function DirectionAwareHover({ children, className = "" }: DirectionAwareHoverProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const overlay = overlayRef.current
    if (!container || !overlay) return

    const getDirection = (e: MouseEvent, element: HTMLElement) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      const angle = Math.atan2(y, x) * (180 / Math.PI)

      if (angle >= -45 && angle < 45) return "right"
      if (angle >= 45 && angle < 135) return "bottom"
      if (angle >= 135 || angle < -135) return "left"
      return "top"
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const direction = getDirection(e, container)
      let fromX = 0,
        fromY = 0

      switch (direction) {
        case "top":
          fromY = -100
          break
        case "right":
          fromX = 100
          break
        case "bottom":
          fromY = 100
          break
        case "left":
          fromX = -100
          break
      }

      gsap.fromTo(
        overlay,
        { x: fromX, y: fromY, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
      )
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const direction = getDirection(e, container)
      let toX = 0,
        toY = 0

      switch (direction) {
        case "top":
          toY = -100
          break
        case "right":
          toX = 100
          break
        case "bottom":
          toY = 100
          break
        case "left":
          toX = -100
          break
      }

      gsap.to(overlay, { x: toX, y: toY, opacity: 0, duration: 0.3, ease: "power2.in" })
    }

    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-br from-black/20 to-white/20 opacity-0 pointer-events-none"
      />
      {children}
    </div>
  )
}
