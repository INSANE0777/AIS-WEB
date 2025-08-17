"use client"
import { useRouter } from "next/navigation"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Sparkles, Users, Award, Github } from "lucide-react"
import MagneticButton from "./magnetic-button"
import { useMobileOptimization, getOptimizedDuration, getOptimizedEase } from "./mobile-optimized-animations"
import React, { HTMLAttributes } from 'react';

// Tech Logo Components
interface TechLogoProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const TechLogo = ({ children, className = "", ...props }: TechLogoProps) => (
  <div className={`tech-logo ${className}`} {...props}>
    {children}
  </div>
);


const HuggingFaceLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-13c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1V8c0-.55-.45-1-1-1zm4 0c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1V8c0-.55-.45-1-1-1z"/>
  </svg>
)

const TensorFlowLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-6.168 3.564.015-5.31zm21.416 5.311l-6.168-3.564v14.019L12.46 24V0l10.248 5.856v5.311z"/>
  </svg>
)

const PyTorchLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-17v6H5v2h6v6h2v-6h6v-2h-6V5h-2z"/>
  </svg>
)

const KerasLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9l-5.19 5.06L18.18 22 12 18.77 5.82 22l1.37-7.94L2 9l6.91-.74L12 2z"/>
  </svg>
)

export default function ParallaxHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const techLogosRef = useRef<HTMLDivElement>(null)
  const parallaxLayer1Ref = useRef<HTMLDivElement>(null)
  const parallaxLayer2Ref = useRef<HTMLDivElement>(null)
  const parallaxLayer3Ref = useRef<HTMLDivElement>(null)
  const { isMobile, reducedMotion } = useMobileOptimization()
  const router = useRouter()


  useEffect(() => {
    // Ensure elements are visible
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current, logoRef.current], {
      opacity: 1,
      visibility: "visible",
    })

    if (reducedMotion) return

    // Optimized hero entrance animation with extended timeline
    const tl = gsap.timeline({ delay: 0.5 })

    // Logo entrance animation
    if (logoRef.current) {
      tl.fromTo(
        logoRef.current,
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: getOptimizedDuration(0.8, isMobile, reducedMotion),
          ease: getOptimizedEase(isMobile),
        },
        0
      )
    }

    // Enhanced parallax title animation - "sleeping" effect
    if (titleRef.current) {
      const chars = titleRef.current.textContent?.split("") || []
      titleRef.current.innerHTML = chars
        .map(
          (char, i) => `<span class="char inline-block" style="opacity: 0; transform: translate3d(0, 0, 0);">${char === " " ? "&nbsp;" : char}</span>`,
        )
        .join("")

      // Initial scattered parallax positions (floating/awake state)
      gsap.set(".char", {
        y: () => gsap.utils.random(-200, -50),
        x: () => gsap.utils.random(-100, 100),
        rotation: () => gsap.utils.random(-45, 45),
        scale: () => gsap.utils.random(0.5, 1.5),
        opacity: 0.3,
      })

      // "Falling asleep" animation - letters settle into place
      tl.to(".char", {
        y: 0,
        x: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: getOptimizedDuration(1.2, isMobile, reducedMotion),
        stagger: {
          amount: 0.8,
          from: "random"
        },
        ease: "power3.out",
        onComplete: () => {
          // Add subtle breathing effect after settling
          gsap.to(".char", {
            y: -5,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: {
              amount: 0.5,
              repeat: -1,
              yoyo: true
            }
          })
        }
      })
    }

    // Other elements appear after title settles
    tl.fromTo(
      subtitleRef.current,
      { y: isMobile ? 30 : 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: getOptimizedDuration(0.6, isMobile, reducedMotion),
        ease: getOptimizedEase(isMobile),
      },
      "-=0.1", // Start shortly before title finishes
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

    // Tech logos entrance animation
    if (techLogosRef.current) {
      tl.fromTo(
        ".tech-logo",
        { scale: 0, opacity: 0, rotation: 180 },
        {
          scale: 1,
          opacity: 0.3,
          rotation: 0,
          duration: getOptimizedDuration(0.8, isMobile, reducedMotion),
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      )
    }

    // Advanced parallax effects (performance optimized)
    if (!isMobile) {
      // Multiple layer parallax with different speeds
      if (parallaxLayer1Ref.current) {
        gsap.to(parallaxLayer1Ref.current, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })
      }

      if (parallaxLayer2Ref.current) {
        gsap.to(parallaxLayer2Ref.current, {
          yPercent: -40,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        })
      }

      if (parallaxLayer3Ref.current) {
        gsap.to(parallaxLayer3Ref.current, {
          yPercent: -60,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 3,
          },
        })
      }

      // Background gradient shift on scroll
      if (backgroundRef.current) {
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
    }

    // Enhanced floating animations for tech logos
    if (!isMobile && techLogosRef.current) {
      // GitHub logo animation
      gsap.to(".tech-logo-github", {
        y: -20,
        x: 15,
        rotation: 360,
        duration: getOptimizedDuration(4, isMobile, reducedMotion),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      // HuggingFace logo animation
      gsap.to(".tech-logo-hf", {
        y: -25,
        x: -12,
        rotation: -15,
        duration: getOptimizedDuration(3.5, isMobile, reducedMotion),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      })

      // TensorFlow logo animation
      gsap.to(".tech-logo-tf", {
        y: -18,
        x: 20,
        rotation: 10,
        duration: getOptimizedDuration(4.5, isMobile, reducedMotion),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      })

      // PyTorch logo animation
      gsap.to(".tech-logo-pytorch", {
        y: -22,
        x: -18,
        rotation: -20,
        duration: getOptimizedDuration(3.8, isMobile, reducedMotion),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5,
      })

      // Keras logo animation
      gsap.to(".tech-logo-keras", {
        y: -16,
        x: 10,
        rotation: 25,
        duration: getOptimizedDuration(4.2, isMobile, reducedMotion),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      })
    }

    // Optimized floating animations for decorative elements
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
    
    // Tech logo hover effects - Black and White theme
    document.querySelectorAll('.tech-logo').forEach((logo) => {
      logo.addEventListener('mouseenter', () => {
        gsap.to(logo, {
          scale: 1.2,
          opacity: 0.8,
          duration: 0.3,
          ease: "power2.out"
        })
      })
      
      logo.addEventListener('mouseleave', () => {
        gsap.to(logo, {
          scale: 1,
          opacity: 0.3,
          duration: 0.3,
          ease: "power2.out"
        })
      })
    })

  }, [isMobile, reducedMotion])

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden parallax-container bg-white"
    >
      {/* Logo Container - Different layouts for mobile and desktop */}
      <div 
        ref={logoRef}
        className="absolute z-20 w-full top-6 flex justify-center sm:items-center sm:gap-8"
        style={{ opacity: 1, visibility: "visible" }}
      >
        {/* Cabinet Logo - DESKTOP ONLY */}
        <img 
          src="/images/cabinet-logo.png"
          alt="Student Cabinet Logo"
          className="hidden sm:block object-contain w-28 h-28 transition-all duration-300"
        />
        {/* AI Society Logo - Always visible, different sizes */}
        <img 
          src="/images/BIAS.svg" 
          alt="AI Society Logo" 
          className="object-contain drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 cursor-pointer hover:scale-110 w-24 h-24 sm:w-16 sm:h-16"
        />
        {/* Bennett Logo - DESKTOP ONLY */}
        <img 
          src="/images/bennett-logo.webp"
          alt="Bennett University Logo"
          className="hidden sm:block object-contain w-28 h-28 transition-all duration-300"
        />
      </div>


      {/* Advanced Multi-Layer Parallax Background - Black and White */}
      <div ref={parallaxLayer1Ref} className="absolute inset-0 parallax-layer-1">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-black/5 to-black/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-black/8 to-black/15 rounded-full blur-xl"></div>
      </div>

      <div ref={parallaxLayer2Ref} className="absolute inset-0 parallax-layer-2">
        <div className="absolute top-1/3 right-10 w-24 h-24 bg-gradient-to-br from-black/10 to-black/20 rounded-full blur-lg"></div>
        <div className="absolute bottom-1/3 left-20 w-28 h-28 bg-gradient-to-br from-black/12 to-black/18 rounded-full blur-lg"></div>
      </div>

      <div ref={parallaxLayer3Ref} className="absolute inset-0 parallax-layer-3">
        <div className="absolute top-20 right-1/3 w-20 h-20 bg-gradient-to-br from-black/15 to-black/25 rounded-full blur-md"></div>
        <div className="absolute bottom-40 left-1/3 w-16 h-16 bg-gradient-to-br from-black/18 to-black/28 rounded-full blur-md"></div>
      </div>

      {/* Floating Tech Logos - Black and White Theme - Hidden on mobile for performance */}
      {!isMobile && (
        <div ref={techLogosRef} className="absolute inset-0 pointer-events-none">
          {/* GitHub Logo */}
          <TechLogo className="tech-logo-github absolute top-20 left-20 text-black/30 hover:text-black/80 transition-colors cursor-pointer pointer-events-auto">
            <Github size={28} />
          </TechLogo>
          {/* HuggingFace Logo */}
          <TechLogo className="tech-logo-hf absolute top-32 right-32 text-black hover:text-black/80 transition-colors cursor-pointer pointer-events-auto">
            <HuggingFaceLogo />
          </TechLogo>
          {/* TensorFlow Logo */}
          <TechLogo className="tech-logo-tf absolute bottom-40 left-32 text-black hover:text-black/80 transition-colors cursor-pointer pointer-events-auto">
            <TensorFlowLogo />
          </TechLogo>
          {/* PyTorch Logo */}
          <TechLogo className="tech-logo-pytorch absolute bottom-32 right-24 text-black hover:text-black/80 transition-colors cursor-pointer pointer-events-auto">
            <PyTorchLogo />
          </TechLogo>
          {/* Keras Logo */}
          <TechLogo className="tech-logo-keras absolute top-1/2 left-16 text-black hover:text-black/80 transition-colors cursor-pointer pointer-events-auto">
            <KerasLogo />
          </TechLogo>
        </div>
      )}

      {/* Enhanced Parallax Background Elements */}
      <div ref={backgroundRef} className="absolute inset-0 parallax-element">
        <div className="absolute top-20 left-2 sm:left-10 w-1 h-1 sm:w-2 sm:h-2 bg-black rounded-full opacity-20 animate-pulse float-1"></div>
        <div className="absolute top-40 right-2 sm:right-20 w-2 h-2 sm:w-3 sm:h-3 bg-black rounded-full opacity-15 animate-bounce float-2"></div>
        <div className="absolute bottom-40 left-2 sm:left-1/4 w-1 h-1 bg-black rounded-full opacity-25 animate-ping"></div>
        <div className="absolute bottom-20 right-2 sm:right-10 w-1 h-1 sm:w-2 sm:h-2 bg-black rounded-full opacity-10 animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 text-center w-full max-w-6xl mx-auto px-3 sm:px-4 ${
        isMobile ? 'pt-28 sm:pt-32 translate-x-2' : 'pt-20'
      }`}>

        {/* Bennett and Cabinet Logos - MOBILE ONLY */}
        <div className="sm:hidden flex items-center justify-center gap-8 mb-8">
          <img 
            src="/images/cabinet-logo.png" 
            alt="Student Cabinet Logo" 
            className="w-24 h-24 object-contain"
          />
          <img 
            src="/images/bennett-logo.webp" 
            alt="Bennett University Logo" 
            className="w-24 h-24 object-contain"
          />
        </div>
        
        {/* Enhanced Badge */}
        <div className="mb-4 sm:mb-8">
          <div className="inline-flex items-center space-x-1 sm:space-x-2 bg-black text-white px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium animate-fade-in-up hover:scale-105 transition-transform group">
            <Sparkles size={12} className="sm:w-4 sm:h-4 group-hover:rotate-180 transition-transform duration-500" />
            <span className="whitespace-nowrap">Training Minds, One Epoch at a Time</span>
          </div>
        </div>

        {/* Main Title with enhanced parallax sleeping effect */}
        <h1
          ref={titleRef}
          className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-black mb-4 sm:mb-8 leading-none hover:text-black/80 transition-colors relative z-10 px-2"
          style={{ 
            opacity: 1, 
            visibility: "visible", 
            perspective: "1000px",
            wordBreak: "break-word",
            hyphens: "auto"
          }}
        >
          AI SOCIETY
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-sm xs:text-base sm:text-xl md:text-2xl text-black/70 max-w-4xl mx-auto mb-6 sm:mb-12 leading-relaxed hover:text-black/90 transition-colors px-3 sm:px-4"
          style={{ opacity: 1, visibility: "visible" }}
        >
          Bennett University's most research-focused and collaborative student community dedicated to fostering deep
          understanding of Artificial Intelligence and its revolutionary applications.
        </p>

        {/* Enhanced CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-center sm:space-y-0 sm:space-x-6 mb-8 sm:mb-16 px-3 sm:px-0"
          style={{ opacity: 1, visibility: "visible" }}
        >
         <MagneticButton
            onClick={() => router.push("/projects")}
            className="group bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-lg hover:scale-105 transition-all interactive relative overflow-hidden w-full sm:w-auto"
          >
            <span className="relative z-10 group-hover:scale-110 transition-transform">Explore Our Work</span>
          </MagneticButton>

          <MagneticButton
            onClick={() => window.open("https://chat.whatsapp.com/JNWPTs2NwBf1sTaHMF4t3Y", "_blank")}
            className="group border-2 border-black text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-lg hover:bg-black hover:text-white transition-all interactive relative overflow-hidden w-full sm:w-auto"
          >
            <span className="relative z-10 group-hover:scale-110 transition-transform">Join Community</span>
          </MagneticButton>
        </div>

        {/* Enhanced Stats Preview */}
        <div className="grid grid-cols-3 gap-2 sm:gap-8 max-w-xs sm:max-w-2xl mx-auto mb-8 sm:mb-16 px-3 sm:px-0">
          <div className="stat-item text-center group cursor-pointer">
            <div className="text-xl xs:text-2xl sm:text-3xl font-black text-black mb-1 sm:mb-2 group-hover:text-2xl sm:group-hover:text-4xl transition-all duration-300">
              150+
            </div>
            <div className="text-black/60 text-xs sm:text-sm group-hover:text-black transition-colors">Members</div>
          </div>
          <div className="stat-item text-center group cursor-pointer">
            <div className="text-xl xs:text-2xl sm:text-3xl font-black text-black mb-1 sm:mb-2 group-hover:text-2xl sm:group-hover:text-4xl transition-all duration-300">
              50+
            </div>
            <div className="text-black/60 text-xs sm:text-sm group-hover:text-black transition-colors">Projects</div>
          </div>
          <div className="stat-item text-center group cursor-pointer">
            <div className="text-xl xs:text-2xl sm:text-3xl font-black text-black mb-1 sm:mb-2 group-hover:text-2xl sm:group-hover:text-4xl transition-all duration-300">
              25+
            </div>
            <div className="text-black/60 text-xs sm:text-sm group-hover:text-black transition-colors">Awards</div>
          </div>
        </div>
      </div>

      {/* Enhanced Decorative Lines with Advanced Parallax - Hidden on mobile */}
      {!isMobile && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent animate-pulse"></div>
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent animate-pulse"></div>
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-black/10 to-transparent animate-pulse"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-black/10 to-transparent animate-pulse"></div>
          {/* Additional diagonal lines */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/3 left-1/3 w-32 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent rotate-45 animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/3 w-32 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent -rotate-45 animate-pulse"></div>
          </div>
        </div>
      )}
    </section>
  )
}