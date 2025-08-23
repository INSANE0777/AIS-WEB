"use client"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import MagneticButton from "./magnetic-button"
import { useMobileOptimization, getOptimizedDuration, getOptimizedEase } from "./mobile-optimized-animations"
import React, { HTMLAttributes } from 'react';

// Custom Star SVG Component
const CustomStar = () => (
  <svg 
    width="14" 
    height="14" 
    viewBox="0 0 59 59" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300 ease-in-out group-hover:rotate-180"
  >
    <path 
      d="M58.147 25.5731L39.4389 25.2451C38.5681 25.3114 37.8993 24.1946 38.4135 23.2797L49.2314 8.1522L47.0451 6.27509L33.7286 19.2573C32.902 19.904 31.9871 19.3898 31.6306 18.5412L28.4757 0.0980231L25.5732 0.318877L25.2232 18.7368C25.2894 19.6075 24.1726 20.2764 23.2577 19.7621L8.15229 9.23453L6.27518 11.4208L18.9671 24.7594C19.6139 25.586 19.0997 26.5009 18.251 26.8574L0.0981148 29.9902L0.318969 32.8927L19.0271 33.2207C19.8979 33.1544 20.5667 34.2712 20.0525 35.1861L9.52487 50.2915L11.7112 52.1687L25.0277 39.1864C25.8542 38.5397 26.7691 39.0539 27.1256 39.9026L29.9903 58.3678L32.8928 58.147L33.2208 39.4388C33.1545 38.568 34.2713 37.8992 35.1862 38.4134L50.3137 49.2313L52.1908 47.045L39.2086 33.7285C38.5619 32.9019 39.0761 31.987 39.9248 31.6305L58.3679 28.4756L58.147 25.5731Z" 
      fill="white"
    />
  </svg>
);

// Tech Logo Components
interface TechLogoProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}
const TechLogo = ({ children, className = "", ...props }: TechLogoProps) => ( <div className={`tech-logo ${className}`} {...props}>{children}</div> );

// Using img tags for most logos
const GitHubLogo = () => ( <img src="/icons8-github.svg" alt="GitHub Logo" className="w-7 h-7" /> );
const HuggingFaceLogo = () => ( <img src="/icons8-hugging-face.svg" alt="Hugging Face Logo" className="w-6 h-6" /> );
const TensorFlowLogo = () => ( <img src="/icons8-tensorflow.svg" alt="TensorFlow Logo" className="w-6 h-6" /> );
const PyTorchLogo = () => ( <img src="/icons8-pytorch.svg" alt="PyTorch Logo" className="w-6 h-6" /> );

// KerasLogo is now an inline SVG to control its color
const KerasLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#D00000"> {/* Official Keras Red */}
    <path d="M17,3H7C4.8,3,3,4.8,3,7v10c0,2.2,1.8,4,4,4h10c2.2,0,4-1.8,4-4V7C21,4.8,19.2,3,17,3z M15.54,18 c-0.33,0-0.65-0.17-0.83-0.45l-3.23-4.83L10,14.6V17c0,0.55-0.3,1-0.67,1H8.67C8.3,18,8,17.55,8,17V7c0-0.55,0.3-1,0.67-1h0.66 C9.7,6,10,6.45,10,7v3.83l3.7-4.47C13.888,6.132,14.168,6,14.464,6l0.289,0c0.838-0.001,1.306,0.968,0.783,1.624L12.93,10.89 l3.709,5.555C17.083,17.109,16.607,18,15.808,18H15.54z"/>
  </svg>
);

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
    // --- GSAP ANIMATION CODE ---
    // (Collapsed for readability, with opacity changes highlighted in comments)
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current, logoRef.current], { opacity: 1, visibility: "visible", }); if (reducedMotion) return; const tl = gsap.timeline({ delay: 0.5 }); if (logoRef.current) { tl.fromTo( logoRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: getOptimizedDuration(0.8, isMobile, reducedMotion), ease: getOptimizedEase(isMobile), }, 0 ) } if (titleRef.current) { const chars = titleRef.current.textContent?.split("") || []; titleRef.current.innerHTML = chars .map( (char, i) => `<span class="char inline-block" style="opacity: 0; transform: translate3d(0, 0, 0);">${char === " " ? "&nbsp;" : char}</span>`, ) .join(""); gsap.set(".char", { y: () => gsap.utils.random(-200, -50), x: () => gsap.utils.random(-100, 100), rotation: () => gsap.utils.random(-45, 45), scale: () => gsap.utils.random(0.5, 1.5), opacity: 0.3, }); tl.to(".char", { y: 0, x: 0, rotation: 0, scale: 1, opacity: 1, duration: getOptimizedDuration(1.2, isMobile, reducedMotion), stagger: { amount: 0.8, from: "random" }, ease: "power3.out", onComplete: () => { gsap.to(".char", { y: -5, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: { amount: 0.5, repeat: -1, yoyo: true } }) } }) } tl.fromTo( subtitleRef.current, { y: isMobile ? 30 : 50, opacity: 0 }, { y: 0, opacity: 1, duration: getOptimizedDuration(0.6, isMobile, reducedMotion), ease: getOptimizedEase(isMobile), }, "-=0.1", ).fromTo( ctaRef.current, { y: isMobile ? 20 : 30, opacity: 0 }, { y: 0, opacity: 1, duration: getOptimizedDuration(0.5, isMobile, reducedMotion), ease: getOptimizedEase(isMobile), }, "-=0.2", ); if (techLogosRef.current) { tl.fromTo( ".tech-logo", { scale: 0, opacity: 0, rotation: 180 }, { scale: 1, opacity: 1, rotation: 0, duration: getOptimizedDuration(0.8, isMobile, reducedMotion), stagger: 0.1, ease: "back.out(1.7)", }, "-=0.5" ) } if (!isMobile) { if (parallaxLayer1Ref.current) { gsap.to(parallaxLayer1Ref.current, { yPercent: -20, ease: "none", scrollTrigger: { trigger: heroRef.current, start: "top bottom", end: "bottom top", scrub: 1, }, }) } if (parallaxLayer2Ref.current) { gsap.to(parallaxLayer2Ref.current, { yPercent: -40, ease: "none", scrollTrigger: { trigger: heroRef.current, start: "top bottom", end: "bottom top", scrub: 2, }, }) } if (parallaxLayer3Ref.current) { gsap.to(parallaxLayer3Ref.current, { yPercent: -60, ease: "none", scrollTrigger: { trigger: heroRef.current, start: "top bottom", end: "bottom top", scrub: 3, }, }) } if (backgroundRef.current) { gsap.to(backgroundRef.current, { yPercent: -30, ease: "none", scrollTrigger: { trigger: heroRef.current, start: "top bottom", end: "bottom top", scrub: 1, }, }) } } if (!isMobile && techLogosRef.current) { gsap.to(".tech-logo-github", { y: -20, x: 15, rotation: 360, duration: getOptimizedDuration(4, isMobile, reducedMotion), repeat: -1, yoyo: true, ease: "sine.inOut", }); gsap.to(".tech-logo-hf", { y: -25, x: -12, rotation: -15, duration: getOptimizedDuration(3.5, isMobile, reducedMotion), repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5, }); gsap.to(".tech-logo-tf", { y: -18, x: 20, rotation: 10, duration: getOptimizedDuration(4.5, isMobile, reducedMotion), repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1, }); gsap.to(".tech-logo-pytorch", { y: -22, x: -18, rotation: -20, duration: getOptimizedDuration(3.8, isMobile, reducedMotion), repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5, }); gsap.to(".tech-logo-keras", { y: -16, x: 10, rotation: 25, duration: getOptimizedDuration(4.2, isMobile, reducedMotion), repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2, }); } if (!isMobile) { gsap.to(".float-1", { y: -15, x: 8, rotation: 10, duration: getOptimizedDuration(2.5, isMobile, reducedMotion), repeat: -1, yoyo: true, ease: "sine.inOut", }); gsap.to(".float-2", { y: -20, x: -10, rotation: -15, duration: getOptimizedDuration(3, isMobile, reducedMotion), repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5, }); } gsap.to(".stat-item", { scale: isMobile ? 1.02 : 1.05, duration: getOptimizedDuration(1.5, isMobile, reducedMotion), repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.2, }); document.querySelectorAll('.tech-logo').forEach((logo) => { logo.addEventListener('mouseenter', () => { gsap.to(logo, { scale: 1.2, opacity: 1, duration: 0.3, ease: "power2.out" }) }); logo.addEventListener('mouseleave', () => { gsap.to(logo, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }) }); });
  }, [isMobile, reducedMotion, router]);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden parallax-container bg-white"
    >
      <div 
        ref={logoRef}
        className="absolute z-20 w-full top-6 flex justify-center sm:items-center sm:gap-8"
        style={{ opacity: 1, visibility: "visible" }}
      >
        <img src="/images/cabinet-logo.png" alt="Student Cabinet Logo" className="hidden sm:block object-contain w-28 h-28" />
        <img src="/images/BIAS.svg" alt="AI Society Logo" className="object-contain drop-shadow-lg w-24 h-24 sm:w-16 sm:h-16" />
        <img src="/images/bennett-logo.webp" alt="Bennett University Logo" className="hidden sm:block object-contain w-28 h-28" />
      </div>

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

      {!isMobile && (
        <div ref={techLogosRef} className="absolute inset-0 pointer-events-none">
          <TechLogo className="tech-logo-github absolute top-20 left-20"><GitHubLogo /></TechLogo>
          <TechLogo className="tech-logo-hf absolute top-32 right-32"><HuggingFaceLogo /></TechLogo>
          <TechLogo className="tech-logo-tf absolute bottom-40 left-32"><TensorFlowLogo /></TechLogo>
          <TechLogo className="tech-logo-pytorch absolute bottom-32 right-24"><PyTorchLogo /></TechLogo>
          <TechLogo className="tech-logo-keras absolute top-1/2 left-16"><KerasLogo /></TechLogo>
        </div>
      )}

      <div ref={backgroundRef} className="absolute inset-0 parallax-element">
        <div className="absolute top-20 left-2 sm:left-10 w-1 h-1 sm:w-2 sm:h-2 bg-black rounded-full opacity-20 animate-pulse float-1"></div>
        <div className="absolute top-40 right-2 sm:right-20 w-2 h-2 sm:w-3 sm:h-3 bg-black rounded-full opacity-15 animate-bounce float-2"></div>
        <div className="absolute bottom-40 left-2 sm:left-1/4 w-1 h-1 bg-black rounded-full opacity-25 animate-ping"></div>
        <div className="absolute bottom-20 right-2 sm:right-10 w-1 h-1 sm:w-2 sm:h-2 bg-black rounded-full opacity-10 animate-pulse"></div>
      </div>

      <div className={`
        relative z-10 text-center w-full max-w-6xl mx-auto px-3 sm:px-4
        ${isMobile ? 'pt-28 sm:pt-32 translate-x-2' : 'pt-20'}
      `}>
        <div className="sm:hidden flex items-center justify-center gap-8 mb-8">
          <img src="/images/cabinet-logo.png" alt="Student Cabinet Logo" className="w-24 h-24 object-contain" />
          <img src="/images/bennett-logo.webp" alt="Bennett University Logo" className="w-24 h-24 object-contain" />
        </div>
        
        <div className="mb-4 sm:mb-8">
          <div className="inline-flex items-center space-x-2 bg-black text-white px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium animate-fade-in-up group">
            <CustomStar />
            <span>Training Minds, One Epoch at a Time</span>
          </div>
        </div>

        <h1
          ref={titleRef}
          className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-black mb-4 sm:mb-8 leading-none"
          style={{ opacity: 1, visibility: "visible", perspective: "1000px" }}
        >
          AI SOCIETY
        </h1>

        <p
          ref={subtitleRef}
          className="text-sm xs:text-base sm:text-xl md:text-2xl text-black/70 max-w-4xl mx-auto mb-6 sm:mb-12"
          style={{ opacity: 1, visibility: "visible" }}
        >
         Bennett University's hub for research, collaboration, and innovation in Artificial Intelligence.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-center sm:space-y-0 sm:space-x-6 mb-8 sm:mb-16"
          style={{ opacity: 1, visibility: "visible" }}
        >
          <MagneticButton
            onClick={() => router.push("/projects")}
            className="group bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-lg"
          >
            Explore Our Work
          </MagneticButton>

          <MagneticButton
            onClick={() => window.open("https://chat.whatsapp.com/JNWPTs2NwBf1sTaHMF4t3Y", "_blank")}
            className="group border-2 border-black text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-lg hover:bg-black hover:text-white transition-colors"
          >
            Join Community
          </MagneticButton>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-8 max-w-xs sm:max-w-2xl mx-auto mb-8 sm:mb-16">
          <div className="stat-item text-center">
            <div className="text-xl xs:text-2xl sm:text-3xl font-black text-black mb-1 sm:mb-2">150+</div>
            <div className="text-black/60 text-xs sm:text-sm">Members</div>
          </div>
          <div className="stat-item text-center">
            <div className="text-xl xs:text-2xl sm:text-3xl font-black text-black mb-1 sm:mb-2">50+</div>
            <div className="text-black/60 text-xs sm:text-sm">Projects</div>
          </div>
          <div className="stat-item text-center">
            <div className="text-xl xs:text-2xl sm:text-3xl font-black text-black mb-1 sm:mb-2">25+</div>
            <div className="text-black/60 text-xs sm:text-sm">Awards</div>
          </div>
        </div>
      </div>

      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-black/10 to-transparent"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-black/10 to-transparent"></div>
          <div className="absolute inset-0">
            <div className="absolute top-1/3 left-1/3 w-32 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent rotate-45"></div>
            <div className="absolute bottom-1/3 right-1/3 w-32 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent -rotate-45"></div>
          </div>
        </div>
      )}
    </section>
  )
}