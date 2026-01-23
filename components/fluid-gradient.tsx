"use client"

import { useEffect, useRef } from "react"

interface FluidGradientProps {
  className?: string
}

export default function FluidGradient({ className = "" }: FluidGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Fluid gradient animation
    let time = 0
    const animate = () => {
      time += 0.01

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2 + Math.sin(time) * 200,
        canvas.height / 2 + Math.cos(time * 0.7) * 150,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 2,
      )

      gradient.addColorStop(0, `rgba(0, 0, 0, ${0.3 + Math.sin(time) * 0.1})`)
      gradient.addColorStop(0.3, `rgba(255, 255, 255, ${0.1 + Math.cos(time * 0.5) * 0.05})`)
      gradient.addColorStop(0.6, `rgba(0, 0, 0, ${0.2 + Math.sin(time * 0.8) * 0.1})`)
      gradient.addColorStop(1, "rgba(255, 255, 255, 0.05)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add flowing shapes
      for (let i = 0; i < 3; i++) {
        const x = canvas.width / 2 + Math.sin(time + i * 2) * 300
        const y = canvas.height / 2 + Math.cos(time * 0.6 + i * 1.5) * 200
        const radius = 100 + Math.sin(time * 0.4 + i) * 50

        const shapeGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        shapeGradient.addColorStop(0, `rgba(${i % 2 === 0 ? "255, 255, 255" : "0, 0, 0"}, 0.1)`)
        shapeGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = shapeGradient
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className={`fixed inset-0 pointer-events-none z-0 ${className}`} />
}
