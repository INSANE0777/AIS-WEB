// src/components/InteractiveCard.tsx
"use client"

import { useRef, type ReactNode } from "react"

interface InteractiveCardProps {
  children: ReactNode
  className?: string
  spillColor?: string
}

export default function InteractiveCard({
  children,
  className = "",
  spillColor = "rgba(255, 255, 255, 0.05)", // Default subtle white glow
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    card.style.setProperty("--mouse-x", `${x}px`)
    card.style.setProperty("--mouse-y", `${y}px`)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden group ${className}`}
      // Pass the spill color as a CSS custom property
      style={{ "--spill-color": spillColor } as React.CSSProperties}
    >
      {/* The Spill Effect Layer */}
      <div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(
            circle at var(--mouse-x) var(--mouse-y),
            var(--spill-color),
            transparent 80%
          )`,
        }}
      />
      
      {/* The actual card content, which needs to be on top */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}