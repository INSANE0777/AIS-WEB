"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Sparkles, Users, Award } from "lucide-react"
import MagneticButton from "./magnetic-button"
import { useMobileOptimization, getOptimizedDuration, getOptimizedEase } from "./mobile-optimized-animations"

export default function ParallaxHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const { isMobile, reducedMotion } = useMobileOptimization()

  useEffect(() => {
    // Ensure elements are visible
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 1,
      visibility: "visible",
    })

    if (reducedMotion) return

    // Optimized hero entrance animation
    const tl = gsap.timeline({ delay: 0.3 })

    // Faster title animation
    if (titleRef.current) {
      const chars = titleRef.current.textContent?.split("") || []
      titleRef.current.innerHTML = chars
        .map(
          (char, i) => `<span class="char inline-block" style="opacity: 1;">${char === " " ? "&nbsp;" : char}</span>`,
        )
        .join("")

      tl.fromTo(
        ".char",
        { y: isMobile ? 50 : 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: getOptimizedDuration(0.5, isMobile, reducedMotion),
          stagger: isMobile ? 0.01 : 0.02,
          ease: getOptimizedEase(isMobile),
        },
      )
    }

    // Faster other elements animation
    tl.fromTo(
      subtitleRef.current,
      { y: isMobile ? 30 : 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: getOptimizedDuration(0.6, isMobile, reducedMotion),
        ease: getOptimizedEase(isMobile),
      },
      "-=0.3",
    ).fromTo(
      ctaRef.current,
      { y: isMobile ? 20 : 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: getOptimizedDuration(0.5, isMobile, reducedMotion),
        ease: getOptimizedEase(isMobile),
      },
      "-=0.2",
    )

    // Optimized parallax effects (disabled on mobile for performance)
    if (!isMobile && backgroundRef.current) {
      gsap.to(backgroundRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })
    }

    // Optimized floating animations
    if (!isMobile) {
      gsap.to(".float-1", {
        y: -15,
        x: 8,
        rotation: 10,
        duration: getOptimizedDuration(2.5, isMobile, reducedMotion),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      gsap.to(".float-2", {
        y: -20,
        x: -10,
        rotation: -15,
        duration: getOptimizedDuration(3, isMobile, reducedMotion),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      })
    }

    // Optimized stats animation
    gsap.to(".stat-item", {
      scale: isMobile ? 1.02 : 1.05,
      duration: getOptimizedDuration(1.5, isMobile, reducedMotion),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2,
    })
  }, [isMobile, reducedMotion])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden parallax-container"
    >
      {/* Optimized Parallax Background Elements */}
      <div ref={backgroundRef} className="absolute inset-0 parallax-element">
        <div className="absolute top-20 left-4 sm:left-10 w-1 h-1 sm:w-2 sm:h-2 bg-black rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-4 sm:right-20 w-2 h-2 sm:w-3 sm:h-3 bg-black rounded-full opacity-15 animate-bounce"></div>
        <div className="absolute bottom-40 left-4 sm:left-1/4 w-1 h-1 bg-black rounded-full opacity-25 animate-ping"></div>
        <div className="absolute bottom-20 right-4 sm:right-10 w-1 h-1 sm:w-2 sm:h-2 bg-black rounded-full opacity-10 animate-pulse"></div>
      </div>

      {/* Optimized Floating Elements */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-element float-1 absolute top-1/4 left-10 w-12 h-12 sm:w-16 sm:h-16 border border-black/10 rounded-full flex items-center justify-center backdrop-blur-sm bg-white/5">
            <Users size={20} className="sm:w-6 sm:h-6 text-black/30" />
          </div>
          <div className="floating-element float-2 absolute top-1/3 right-20 w-16 h-16 sm:w-20 sm:h-20 border border-black/10 rounded-full flex items-center justify-center backdrop-blur-sm bg-white/5">
            <Award size={24} className="sm:w-7 sm:h-7 text-black/30" />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 pt-16 sm:pt-20">
        {/* Enhanced Badge */}
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center space-x-2 bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8 animate-fade-in-up hover:scale-105 transition-transform group">
            <Sparkles size={14} className="sm:w-4 sm:h-4 group-hover:rotate-180 transition-transform duration-500" />
            <span>Training Minds, One Epoch at a Time</span>
          </div>
        </div>

        {/* Main Title with enhanced effects */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-black mb-6 sm:mb-8 leading-none hover:text-black/80 transition-colors"
          style={{ opacity: 1, visibility: "visible" }}
        >
          AI SOCIETY
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-base sm:text-xl md:text-2xl text-black/70 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed hover:text-black/90 transition-colors px-4"
          style={{ opacity: 1, visibility: "visible" }}
        >
          Bennett University's most research-focused and collaborative student community dedicated to fostering deep
          understanding of Artificial Intelligence and its revolutionary applications.
        </p>

        {/* Enhanced CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12 sm:mb-16"
          style={{ opacity: 1, visibility: "visible" }}
        >
          <MagneticButton className="group bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:scale-105 transition-all interactive relative overflow-hidden w-full sm:w-auto">
            <span className="relative z-10 group-hover:scale-110 transition-transform">Explore Our Work</span>
          </MagneticButton>
          <MagneticButton className="group border-2 border-black text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-black hover:text-white transition-all interactive relative overflow-hidden w-full sm:w-auto">
            <span className="relative z-10 group-hover:scale-110 transition-transform">Join Community</span>
          </MagneticButton>
        </div>

        {/* Enhanced Stats Preview */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="stat-item text-center group cursor-pointer">
            <div className="text-2xl sm:text-3xl font-black text-black mb-1 sm:mb-2 group-hover:text-4xl transition-all duration-300">
              150+
            </div>
            <div className="text-black/60 text-xs sm:text-sm group-hover:text-black transition-colors">Members</div>
          </div>
          <div className="stat-item text-center group cursor-pointer">
            <div className="text-2xl sm:text-3xl font-black text-black mb-1 sm:mb-2 group-hover:text-4xl transition-all duration-300">
              50+
            </div>
            <div className="text-black/60 text-xs sm:text-sm group-hover:text-black transition-colors">Projects</div>
          </div>
          <div className="stat-item text-center group cursor-pointer">
            <div className="text-2xl sm:text-3xl font-black text-black mb-1 sm:mb-2 group-hover:text-4xl transition-all duration-300">
              25+
            </div>
            <div className="text-black/60 text-xs sm:text-sm group-hover:text-black transition-colors">Awards</div>
          </div>
        </div>
      </div>

      {/* Enhanced Decorative Lines - Hidden on mobile */}
      {!isMobile && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent animate-pulse"></div>
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent animate-pulse"></div>
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-black/10 to-transparent animate-pulse"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-black/10 to-transparent animate-pulse"></div>
        </div>
      )}
    </section>
  )
}
