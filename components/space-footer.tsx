"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Github, Instagram, Linkedin, ArrowRight, Zap, Rocket } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import MagneticButton from "./magnetic-button"
import { useMobileOptimization, getOptimizedDuration } from "./mobile-optimized-animations"
import type { FormEvent } from "react";

gsap.registerPlugin(ScrollTrigger)

export default function SpaceFooter() {
  const footerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState("")
  const { isMobile, reducedMotion } = useMobileOptimization()
  const router = useRouter()

  useEffect(() => {
    // ... animation code remains the same ...
    const footer = footerRef.current
    const title = titleRef.current
    if (!footer || !title || reducedMotion) return

    if (!isMobile) {
      gsap.to(footer.querySelector('.footer-content-wrapper'), {
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
    gsap.set(title, { transformPerspective: 1000 })
    gsap.to(title, {
      rotationX: isMobile ? 2 : 3,
      rotationY: isMobile ? -1 : -1.5,
      duration: getOptimizedDuration(3, isMobile, reducedMotion),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })
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

  const handleNewsletterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer ref={footerRef} className="relative bg-black text-white pt-12 pb-8 px-4 overflow-hidden border-t border-white/20">
      
      {/* This DIV is the key. -mt-px pulls the content up to hide the footer's own top border. */}
      <div className="footer-content-wrapper -mt-px">

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
            {/* Left Section - Brand Logo */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-center lg:justify-start mb-2">
                  <Image
                    src="/images/ais-logo.png"
                    alt="AI Society Logo"
                    width={120}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 text-xs sm:text-sm text-white/60">
                  <Link href="/" className="hover:text-white transition-colors cursor-pointer">HOME</Link>
                  <Link href="/about" className="hover:text-white transition-colors cursor-pointer">ABOUT</Link>
                  <Link href="/projects" className="hover:text-white transition-colors cursor-pointer">PROJECTS</Link>
                  <Link href="/announcements" className="hover:text-white transition-colors cursor-pointer">ANNOUNCEMENTS</Link>
                  <Link href="/events" className="hover:text-white transition-colors cursor-pointer">EVENTS</Link>
                </div>
              </div>
            </div>

            {/* Center Section - Large Text & Partner Logos */}
            <div className="lg:col-span-8 text-center order-first lg:order-none">
              <div
                ref={titleRef}
                className="text-3xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #cccccc 50%, #ffffff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                onClick={() => router.push('/')}
              >
                AI SOCIETY
              </div>
              {/* Simple Partner Logos */}
              <div className="flex justify-center items-center gap-8 sm:gap-12 mt-4 sm:mt-6">
                <Image
                  src="/images/cabinet-logo.png"
                  alt="Student Cabinet Logo"
                  width={150}
                  height={50}
                  className="object-contain h-10 sm:h-12 w-auto"
                />
                <Image
                  src="/images/bennett-logo.webp"
                  alt="Bennett University Logo"
                  width={150}
                  height={50}
                  className="object-contain h-10 sm:h-12 w-auto"
                />
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
                <form onSubmit={handleNewsletterSubmit} className="relative max-w-xs mx-auto lg:mx-0 lg:ml-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="YOUR EMAIL"
                    className="w-full bg-white text-black px-3 sm:px-4 py-2 sm:py-3 rounded-full font-semibold placeholder-black/70 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm sm:text-base"
                    required
                  />
                  <MagneticButton 
                    type="submit"
                    className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-black border border-white rounded-full flex items-center justify-center hover:scale-110 hover:bg-white hover:text-black transition-all"
                  >
                    <ArrowRight size={12} className="sm:w-4 sm:h-4 text-white" />
                  </MagneticButton>
                </form>
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

              {/* Social Links */}
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex space-x-4 text-xs sm:text-sm">
                  <a href="https://chat.whatsapp.com/JNWPTs2NwBf1sTaHMF4t3Y" target="_blank" rel="noopener noreferrer" className="text-white font-semibold hover:text-white/70 transition-colors cursor-pointer underline">
                    WHATSAPP
                  </a>
                  <a href="https://www.instagram.com/ais.bennett/" target="_blank" rel="noopener noreferrer" className="text-white font-semibold hover:text-white/70 transition-colors cursor-pointer underline">
                    INSTAGRAM
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <a href="https://github.com/bennettai" target="_blank" rel="noopener noreferrer" className="social-float">
                    <Github className="w-4 h-4 sm:w-5 sm:h-5 text-white hover:text-white/70 transition-colors cursor-pointer" />
                  </a>
                  <a href="https://www.instagram.com/ais.bennett/" target="_blank" rel="noopener noreferrer" className="social-float">
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-white hover:text-white/70 transition-colors cursor-pointer" />
                  </a>
                  <a href="https://discord.com/invite/dEBJH4BqeS" target="_blank" rel="noopener noreferrer" className="social-float">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white hover:text-white/70 transition-colors cursor-pointer" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.291.076.076 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.076.076 0 0 1 .078.01c.11.08.226.161.351.256.23.177.475.362.728.553a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-white/60 text-center lg:text-right">
                DESIGN & DEVELOPED BY <Link href="/team" className="underline hover:text-white transition-colors cursor-pointer">AFJAL HUSSEIN</Link>

              </div>
            </div>
          </div>
          {/* Optimized Floating Elements */}
          <div className="absolute top-6 sm:top-10 right-6 sm:right-10">
            <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-white/30 animate-bounce cursor-pointer hover:text-white/70 transition-colors" />
          </div>
          <div className="absolute bottom-12 sm:bottom-20 left-6 sm:left-10">
            <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-white/30 animate-pulse cursor-pointer hover:text-white/70 transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  )
}