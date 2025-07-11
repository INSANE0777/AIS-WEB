"use client"

import { useEffect, useState } from "react"

export function useMobileOptimization() {
  const [isMobile, setIsMobile] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    const checkReducedMotion = () => {
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    }

    checkMobile()
    checkReducedMotion()

    window.addEventListener("resize", checkMobile)
    window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", checkReducedMotion)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  return { isMobile, reducedMotion }
}

export const getOptimizedDuration = (baseDuration: number, isMobile: boolean, reducedMotion: boolean) => {
  if (reducedMotion) return 0.01
  if (isMobile) return baseDuration * 0.7
  return baseDuration
}

export const getOptimizedEase = (isMobile: boolean) => {
  return isMobile ? "power2.out" : "power3.out"
}
