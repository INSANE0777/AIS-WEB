"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function BlobBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const blobs = containerRef.current?.querySelectorAll(".blob")
    if (!blobs) return

    blobs.forEach((blob, index) => {
      // Random movement animation
      gsap.to(blob, {
        x: `random(-200, 200)`,
        y: `random(-200, 200)`,
        rotation: `random(0, 360)`,
        scale: `random(0.5, 1.5)`,
        duration: `random(20, 30)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 3,
      })

      // Pulsing animation
      gsap.to(blob, {
        scale: `random(0.8, 1.2)`,
        duration: `random(3, 5)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.5,
      })
    })
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large gradient blobs */}
      <div className="blob absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-black/20 via-black/10 to-transparent rounded-full blur-3xl" />
      <div className="blob absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-black/15 via-black/8 to-transparent rounded-full blur-3xl" />
      <div className="blob absolute bottom-20 left-1/4 w-72 h-72 bg-gradient-to-br from-black/25 via-black/12 to-transparent rounded-full blur-3xl" />
      <div className="blob absolute bottom-40 right-10 w-64 h-64 bg-gradient-to-br from-black/18 via-black/9 to-transparent rounded-full blur-3xl" />

      {/* Medium gradient blobs */}
      <div className="blob absolute top-1/3 left-1/2 w-48 h-48 bg-gradient-to-br from-black/12 via-black/6 to-transparent rounded-full blur-2xl" />
      <div className="blob absolute bottom-1/3 right-1/3 w-56 h-56 bg-gradient-to-br from-black/16 via-black/8 to-transparent rounded-full blur-2xl" />

      {/* Small gradient blobs */}
      <div className="blob absolute top-1/2 left-20 w-32 h-32 bg-gradient-to-br from-black/30 via-black/15 to-transparent rounded-full blur-xl" />
      <div className="blob absolute top-3/4 right-1/4 w-40 h-40 bg-gradient-to-br from-black/22 via-black/11 to-transparent rounded-full blur-xl" />

      {/* Additional floating blobs */}
      <div className="blob absolute top-10 left-1/3 w-24 h-24 bg-gradient-to-br from-black/35 via-black/18 to-transparent rounded-full blur-lg" />
      <div className="blob absolute bottom-10 left-2/3 w-28 h-28 bg-gradient-to-br from-black/28 via-black/14 to-transparent rounded-full blur-lg" />
    </div>
  )
}
