// components/custom-cursor.tsx

"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image" // Use Next.js Image for your SVG
import { useMobileOptimization } from "./mobile-optimized-animations"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const { isMobile } = useMobileOptimization()

  // Hide the component on mobile devices where it's not needed
  if (isMobile) {
    return null
  }

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // GSAP animation for smooth mouse following
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power2.out",
      })
    }

    // GSAP animations for interactive states
    const handleMouseDown = () => gsap.to(cursor, { scale: 0.85, duration: 0.2, ease: "power2.out" })
    const handleMouseUp = () => gsap.to(cursor, { scale: 1, duration: 0.2, ease: "power2.out" })

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Scale up if hovering over an interactive element
      if (target.closest('a, button, [role="button"], [style*="cursor: pointer"]')) {
        gsap.to(cursor, { scale: 1.5, duration: 0.3, ease: "power2.out" })
      }
    }
    
    const handleMouseLeave = (e: MouseEvent) => {
       const target = e.target as HTMLElement;
       if (target.closest('a, button, [role="button"], [style*="cursor: pointer"]')) {
        gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" })
      }
    }

    // Add event listeners
    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseover", handleMouseEnter)
    document.addEventListener("mouseout", handleMouseLeave)

    // Cleanup function to remove listeners
    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseover", handleMouseEnter)
      document.removeEventListener("mouseout", handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      // This div positions the cursor. Adjust w-10 h-10 if you want to change the cursor size.
      className="fixed top-0 left-0 w-10 h-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999]"
    >
      <Image
        src="/cursor-1.svg" // This points to your file in the /public folder
        alt="Custom Cursor"
        width={36} // Should match the width of the container (w-10 = 40px)
        height={36} // Should match the height of the container (h-10 = 40px)
        className="w-full h-full"
      />
    </div>
  )
}