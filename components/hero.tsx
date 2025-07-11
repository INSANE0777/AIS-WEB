"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ArrowDown, Sparkles } from "lucide-react"
import MagneticButton from "./magnetic-button"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1 })

    // Split text animation
    const titleText = titleRef.current?.textContent || ""
    if (titleRef.current) {
      titleRef.current.innerHTML = titleText
        .split("")
        .map((char, i) => `<span class="char" style="display: inline-block;">${char === " " ? "&nbsp;" : char}</span>`)
        .join("")
    }

    tl.from(".char", {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.02,
      ease: "power3.out",
    })
      .from(
        subtitleRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5",
      )
      .from(
        ctaRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3",
      )

    // Floating animation
    gsap.to(heroRef.current, {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32 pb-20">
      <div ref={heroRef} className="text-center max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium mb-8">
            <Sparkles size={16} />
            <span>Training Minds, One Epoch at a Time</span>
          </div>
        </div>

        <h1 ref={titleRef} className="text-6xl md:text-8xl lg:text-9xl font-black text-black mb-8 leading-none">
          AI SOCIETY
        </h1>

        <p ref={subtitleRef} className="text-xl md:text-2xl text-black/70 max-w-3xl mx-auto mb-12 leading-relaxed">
          Bennett University's most research-focused and collaborative student community dedicated to fostering deep
          understanding of Artificial Intelligence and its revolutionary applications.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <MagneticButton className="bg-black text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform interactive">
            Explore Our Work
          </MagneticButton>
          <MagneticButton className="border-2 border-black text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-black hover:text-white transition-all interactive">
            Join Community
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <span className="text-black/60 text-sm font-medium">Scroll to explore</span>
          <ArrowDown size={20} className="text-black/60" />
        </div>
      </div>
    </section>
  )
}
