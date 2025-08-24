// components/custom-cursor.tsx

"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import { useMobileOptimization } from "./mobile-optimized-animations"

export default function CustomCursor() {
  // --- THE FIX: All hooks are now called at the top, unconditionally ---
  const cursorRef = useRef<HTMLDivElement>(null)
  const { isMobile } = useMobileOptimization()

  useEffect(() => {
    // We protect the logic *inside* the hook, but the hook itself always runs.
    if (isMobile || !cursorRef.current) {
      return; // Do nothing on mobile or if the ref isn't ready
    }

    const cursor = cursorRef.current

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power2.out",
      })
    }

    const handleMouseDown = () => gsap.to(cursor, { scale: 0.85, duration: 0.2, ease: "power2.out" })
    const handleMouseUp = () => gsap.to(cursor, { scale: 1, duration: 0.2, ease: "power2.out" })

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
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

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseover", handleMouseEnter)
    document.addEventListener("mouseout", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseover", handleMouseEnter)
      document.removeEventListener("mouseout", handleMouseLeave)
    }
  }, [isMobile]) // Add isMobile as a dependency

  // The conditional return is now SAFELY placed AFTER all hook calls.
  if (isMobile) {
    return null
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-10 h-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999]"
    >
      <Image
        src="/cursor-1.svg"
        alt="Custom Cursor"
        width={24}
        height={24}
        className="w-full h-full"
      />
    </div>
  )
}