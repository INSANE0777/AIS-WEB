"use client"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { usePathname } from "next/navigation"

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const maskRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const [scrambledText, setScrambledText] = useState("AIS")

  const scrambleText = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const targetText = "AIS"
    let iteration = 0
    
    const interval = setInterval(() => {
      setScrambledText(
        targetText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return targetText[index]
            }
            return letters[Math.floor(Math.random() * letters.length)]
          })
          .join("")
      )
      
      if (iteration >= targetText.length) {
        clearInterval(interval)
      }
      
      iteration += 1 / 3
    }, 80)
  }

  useEffect(() => {
    const container = containerRef.current
    const mask = maskRef.current
    const text = textRef.current
    
    if (!container || !mask || !text) return

    // Start with random letters
    setScrambledText("XYZ")
    
    // Page entrance animation
    const tl = gsap.timeline()
    
    // Mask animation with text scrambling
    tl.fromTo(mask, { scaleX: 0, transformOrigin: "left center" }, { 
      scaleX: 1, 
      duration: 0.8, 
      ease: "power3.inOut",
      onStart: () => {
        // Show text and start scrambling
        gsap.set(text, { opacity: 1, scale: 1 })
        scrambleText()
      }
    })
    .to(mask, { 
      scaleX: 0, 
      transformOrigin: "right center", 
      duration: 0.8, 
      ease: "power3.inOut",
      onStart: () => {
        // Fade out text
        gsap.to(text, { opacity: 0, scale: 0.8, duration: 0.4, ease: "power2.out" })
      }
    }, "+=0.2")
    .fromTo(container, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")

    // Lightweight particle effects
    const particleEffect = () => {
      
      const hearts = Array.from({ length: 6 }).map((_, i) => {
        const heart = document.createElement("div")
        heart.innerHTML = "◆"
        heart.className = "absolute text-gray-300 text-2xl pointer-events-none"
        heart.style.left = `${Math.random() * 100}%`
        heart.style.top = `${Math.random() * 100}%`
        mask.appendChild(heart)
        
        gsap.fromTo(
          heart,
          { scale: 0, opacity: 0 },
          {
            scale: 1.2,
            opacity: 0.7,
            y: -80,
            duration: 1.5,
            delay: Math.random() * 0.5,
            ease: "power2.out",
            onComplete: () => heart.remove(),
          },
        )
      })


      const shapes = ['◆']
      Array.from({ length: 8 }).forEach((_, i) => {
        const shape = document.createElement("div")
        shape.innerHTML = shapes[Math.floor(Math.random() * shapes.length)]
        shape.className = "absolute text-xl pointer-events-none text-white"
        shape.style.left = `${Math.random() * 100}%`
        shape.style.top = `${Math.random() * 100}%`
        mask.appendChild(shape)
        
        gsap.fromTo(
          shape,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 0.8,
            duration: 1.5,
            delay: Math.random() * 0.8,
            ease: "power2.out",
            onComplete: () => shape.remove()
          },
        )
      })
    }
    
    particleEffect()
  }, [pathname])

  return (
    <div className="relative">
  
      <div
        ref={maskRef}
        className="fixed inset-0 bg-black z-50 pointer-events-none flex items-center justify-center"
        style={{ transformOrigin: "left center" }}
      >
     
        <div
          ref={textRef}
          className="text-white text-6xl font-bold tracking-widest opacity-0"
          style={{ fontFamily: "monospace" }}
        >
          {scrambledText}
        </div>
        
      
      </div>
      
      <div ref={containerRef} className="relative">
        {children}
      </div>
    </div>
  )
}
