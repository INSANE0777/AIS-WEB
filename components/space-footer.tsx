"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Github, Instagram, Linkedin, ArrowRight, Zap, Rocket } from "lucide-react"
import MagneticButton from "./magnetic-button"
import { useMobileOptimization, getOptimizedDuration } from "./mobile-optimized-animations"

gsap.registerPlugin(ScrollTrigger)

export default function SpaceFooter() {
  const footerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState("")
  const { isMobile, reducedMotion } = useMobileOptimization()

  useEffect(() => {
    const footer = footerRef.current
    const title = titleRef.current
    if (!footer || !title || reducedMotion) return

    // Optimized parallax effect
    if (!isMobile) {
      gsap.to(footer, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: footer,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })
    }

    // Optimized 3D text effect
    gsap.set(title, { transformPerspective: 1000 })
    gsap.to(title, {
      rotationX: isMobile ? 2 : 3,
      rotationY: isMobile ? -1 : -1.5,
      duration: getOptimizedDuration(3, isMobile, reducedMotion),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    // Optimized floating animations
    gsap.to(".grid-dot", {
      scale: isMobile ? 1.2 : 1.5,
      opacity: 0.6,
      duration: getOptimizedDuration(1.5, isMobile, reducedMotion),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        amount: 1,
        from: "random",
      },
    })

    gsap.to(".social-float", {
      y: isMobile ? -5 : -8,
      rotation: isMobile ? 3 : 4,
      duration: getOptimizedDuration(2, isMobile, reducedMotion),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.15,
    })
  }, [isMobile, reducedMotion])

  return (
    <footer ref={footerRef} className="relative bg-black text-white py-12 sm:py-20 px-4 overflow-hidden">
      {/* Optimized Animated Grid Background */}
      <div className="absolute inset-0 opacity-10 sm:opacity-20">
        {Array.from({ length: isMobile ? 36 : 100 }).map((_, i) => (
          <div
            key={i}
            className="grid-dot absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white rounded-full"
            style={{
              left: `${(i % (isMobile ? 6 : 10)) * (100 / (isMobile ? 6 : 10))}%`,
              top: `${Math.floor(i / (isMobile ? 6 : 10)) * (100 / (isMobile ? 6 : 10))}%`,
            }}
          />
        ))}
      </div>

      {/* Optimized Vertical Grid Lines */}
      <div className="absolute inset-0 opacity-5 sm:opacity-10">
        {Array.from({ length: isMobile ? 8 : 20 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute top-0 bottom-0 w-px bg-white/10"
            style={{ left: `${i * (100 / (isMobile ? 8 : 20))}%` }}
          />
        ))}
        {Array.from({ length: isMobile ? 6 : 12 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute left-0 right-0 h-px bg-white/10"
            style={{ top: `${i * (100 / (isMobile ? 6 : 12))}%` }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Left Section - Brand */}
          <div className="lg:col-span-2 text-center lg:text-left">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-bold tracking-wider">AI SOCIETY</h3>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 text-xs sm:text-sm text-white/60">
                <div>HOME</div>
                <div>ABOUT</div>
                <div>PROJECTS</div>
                <div>CONTACT</div>
                <div>EVENTS</div>
              </div>
            </div>
          </div>

          {/* Center Section - Large Text */}
          <div className="lg:col-span-8 text-center order-first lg:order-none">
            <div
              ref={titleRef}
              className="text-3xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #cccccc 50%, #ffffff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AI SOCIETY
            </div>
          </div>

          {/* Right Section - Newsletter */}
          <div className="lg:col-span-2 text-center lg:text-right">
            <div className="space-y-3 sm:space-y-4">
              <div className="text-center lg:text-right">
                <div className="text-sm sm:text-lg font-bold mb-1 sm:mb-2">SIGN UP</div>
                <div className="text-sm sm:text-lg font-bold">TO OUR</div>
                <div className="text-sm sm:text-lg font-bold">NEWSLETTER</div>
              </div>
              <div className="relative max-w-xs mx-auto lg:mx-0 lg:ml-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="YOUR EMAIL"
                  className="w-full bg-gradient-to-r from-green-400 to-green-300 text-black px-3 sm:px-4 py-2 sm:py-3 rounded-full font-semibold placeholder-black/70 focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
                />
                <MagneticButton className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <ArrowRight size={12} className="sm:w-4 sm:h-4 text-white" />
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/20">
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center">
            {/* Copyright */}
            <div className="text-xs sm:text-sm text-white/60 text-center lg:text-left">
              © AI SOCIETY / ALL RIGHTS RESERVED
            </div>

            {/* Legal Links - Hidden on mobile for space */}
            <div className="hidden sm:flex space-x-4 lg:space-x-6 text-xs sm:text-sm text-white/60 justify-center">
              <span>SHIPPING HANDLING DISCLAIMER</span>
              <span>PUBLIC OFFER</span>
            </div>

            {/* Social Links */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex space-x-4 text-xs sm:text-sm">
                <span className="text-green-400 font-semibold">FACEBOOK</span>
                <span className="text-green-400 font-semibold">INSTAGRAM</span>
              </div>
              <div className="flex items-center space-x-2">
                <Github className="social-float w-4 h-4 sm:w-5 sm:h-5 text-white hover:text-green-400 transition-colors cursor-pointer" />
                <Instagram className="social-float w-4 h-4 sm:w-5 sm:h-5 text-white hover:text-green-400 transition-colors cursor-pointer" />
                <Linkedin className="social-float w-4 h-4 sm:w-5 sm:h-5 text-white hover:text-green-400 transition-colors cursor-pointer" />
              </div>
            </div>

            {/* Design Credit */}
            <div className="text-xs sm:text-sm text-white/60 text-center lg:text-right">
              DESIGN BY <span className="underline">AI SOCIETY TEAM</span>
            </div>
          </div>
        </div>

        {/* Optimized Floating Elements */}
        <div className="absolute top-6 sm:top-10 right-6 sm:right-10">
          <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-white/30 animate-bounce" />
        </div>
        <div className="absolute bottom-12 sm:bottom-20 left-6 sm:left-10">
          <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-white/30 animate-pulse" />
        </div>
      </div>
    </footer>
  )
}
