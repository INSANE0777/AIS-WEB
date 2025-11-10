"use client"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState, useMemo, useId } from "react"
import { gsap } from "gsap"
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin"
import MagneticButton from "./magnetic-button"
import { useMobileOptimization, getOptimizedDuration, getOptimizedEase } from "./mobile-optimized-animations"
import React, { HTMLAttributes } from 'react';
import { Newspaper } from "lucide-react"

interface CustomStarProps {
  width?: string | number;
  height?: string | number;
}

const CustomStar = React.forwardRef<SVGSVGElement, CustomStarProps>(({ width = "14", height = "14" }, ref) => (
  <svg 
    ref={ref}
    width={width}
    height={height}
    viewBox="0 0 200 200"
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      id="custom-star-path"
      d="M100 0L101.384 87.0669C101.44 90.5691 105.651 92.3134 108.167 89.8763L170.711 29.2893L110.124 91.8335C107.687 94.3493 109.431 98.5604 112.933 98.6161L200 100L112.933 101.384C109.431 101.44 107.687 105.651 110.124 108.167L170.711 170.711L108.167 110.124C105.651 107.687 101.44 109.431 101.384 112.933L100 200L98.6161 112.933C98.5604 109.431 94.3493 107.687 91.8335 110.124L29.2893 170.711L89.8763 108.167C92.3134 105.651 90.5691 101.44 87.0669 101.384L0 100L87.0669 98.6161C90.5691 98.5604 92.3134 94.3493 89.8763 91.8335L29.2893 29.2893L91.8335 89.8763C94.3493 92.3134 98.5604 90.5691 98.6161 87.0669L100 0Z" 
      fill="white"
    />
  </svg>
));
CustomStar.displayName = 'CustomStar';

// Tech Logo Components
interface TechLogoProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}
const TechLogo = ({ children, className = "", ...props }: TechLogoProps) => ( <div className={`tech-logo ${className}`} {...props}>{children}</div> );
const GitHubLogo = ({ isMobile = false }) => ( <img src="/icons8-github.svg" alt="GitHub Logo" className={`${isMobile ? 'w-7 h-7' : 'w-7 h-7'}`} /> );
const HuggingFaceLogo = ({ isMobile = false }) => ( <img src="/icons8-hugging-face.svg" alt="Hugging Face Logo" className={`${isMobile ? 'w-6 h-6' : 'w-6 h-6'}`} /> );
const TensorFlowLogo = ({ isMobile = false }) => ( <img src="/icons8-tensorflow.svg" alt="TensorFlow Logo" className={`${isMobile ? 'w-6 h-6' : 'w-6 h-6'}`} /> );
const PyTorchLogo = ({ isMobile = false }) => ( <img src="/icons8-pytorch.svg" alt="PyTorch Logo" className={`${isMobile ? 'w-6 h-6' : 'w-6 h-6'}`} /> );
const KerasLogo = ({ isMobile = false }) => (
  <svg width={isMobile ? "24" : "24"} height={isMobile ? "24" : "24"} viewBox="0 0 24 24" fill="#D00000">
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
  const customStarRef = useRef<SVGSVGElement>(null);
  const newsletterButtonRef = useRef<HTMLButtonElement>(null);
  const { isMobile, reducedMotion } = useMobileOptimization()
  const router = useRouter()

  useEffect(() => {
    gsap.registerPlugin(MorphSVGPlugin);

    if (!reducedMotion) {
      const starPath = customStarRef.current?.querySelector('#custom-star-path');
      const starSVG = customStarRef.current;

      if (starPath && starSVG) {
        const starMorphTargets = [
          "M100 0L101.384 87.0669C101.44 90.5691 105.651 92.3134 108.167 89.8763L170.711 29.2893L110.124 91.8335C107.687 94.3493 109.431 98.5604 112.933 98.6161L200 100L112.933 101.384C109.431 101.44 107.687 105.651 110.124 108.167L170.711 170.711L108.167 110.124C105.651 107.687 101.44 109.431 101.384 112.933L100 200L98.6161 112.933C98.5604 109.431 94.3493 107.687 91.8335 110.124L29.2893 170.711L89.8763 108.167C92.3134 105.651 90.5691 101.44 87.0669 101.384L0 100L87.0669 98.6161C90.5691 98.5604 92.3134 94.3493 89.8763 91.8335L29.2893 29.2893L91.8335 89.8763C94.3493 92.3134 98.5604 90.5691 98.6161 87.0669L100 0Z",
          "M100 0L103.215 92.2394L170.711 29.2893L107.761 96.7855L200 100L107.761 103.215L170.711 170.711L103.215 107.761L100 200L96.7855 107.761L29.2893 170.711L92.2394 103.215L0 100L92.2394 96.7855L29.2893 29.2893L96.7855 92.2394L100 0Z",
          "M100 0L101.459 91.7276L134.202 6.03074L104.2 92.7254L164.279 23.3956L106.435 94.6006L186.603 50L107.893 97.127L198.481 82.6352L108.4 100L198.481 117.365L107.893 102.873L186.603 150L106.435 105.399L164.279 176.604L104.2 107.275L134.202 193.969L101.459 108.272L100 200L98.5414 108.272L65.798 193.969L95.8 107.275L35.7212 176.604L93.5652 105.399L13.3975 150L92.1066 102.873L1.51923 117.365L91.6 100L1.51923 82.6352L92.1066 97.127L13.3975 50L93.5652 94.6006L35.7212 23.3956L95.8 92.7254L65.798 6.03074L98.5414 91.7276L100 0Z",
          "M100 0L102.665 74.6397L120.791 2.18524L107.88 75.7481L140.674 8.64545L112.75 77.9164L158.779 19.0983L117.063 81.0498L174.314 33.0869L120.63 85.0115L186.603 50L123.295 89.6282L195.106 69.0983L124.943 94.6982L199.452 89.5471L125.5 100L199.452 110.453L124.943 105.302L195.106 130.902L123.295 110.372L186.603 150L120.63 114.989L174.314 166.913L117.063 118.95L158.779 180.902L112.75 122.084L140.674 191.355L107.88 124.252L120.791 197.815L102.665 125.36L100 200L97.3345 125.36L79.2088 197.815L92.1201 124.252L59.3263 191.355L87.25 122.084L41.2215 180.902L82.9372 118.95L25.6855 166.913L79.3701 114.989L13.3975 150L76.7046 110.372L4.89435 130.902L75.0572 105.302L0.547813 110.453L74.5 100L0.547813 89.5471L75.0572 94.6982L4.89435 69.0983L76.7046 89.6282L13.3975 50L79.3701 85.0115L25.6855 33.0869L82.9372 81.0498L41.2215 19.0983L87.25 77.9164L59.3263 8.64545L92.1201 75.7481L79.2088 2.18524L97.3345 74.6397L100 0Z"
        ];
        
        // THE FIX: Faster animation settings
        const morphTl = gsap.timeline({ 
            repeat: -1, 
            yoyo: true,
            defaults: { duration: 2.0, ease: "sine.inOut" } // Faster morph
        });
        
        starMorphTargets.forEach(target => {
          morphTl.to(starPath, { morphSVG: target });
        });
        
        gsap.to(starSVG, {
          rotation: 360,
          duration: 20, // Faster rotation
          repeat: -1,
          ease: 'none'
        });
      }
    }
    
    // --- Rest of the animations ---
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current, logoRef.current], { opacity: 1, visibility: "visible" }); 
    if (reducedMotion) return; 

    const tl = gsap.timeline({ delay: 0.5 }); 
    if (logoRef.current) tl.fromTo( logoRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: getOptimizedDuration(0.8, isMobile, reducedMotion), ease: getOptimizedEase(isMobile) }, 0 );
    if (titleRef.current) { 
      const chars = titleRef.current.textContent?.split("") || []; 
      titleRef.current.innerHTML = chars.map( (char) => `<span class="char inline-block" style="opacity: 0; transform: translate3d(0, 0, 0);">${char === " " ? "&nbsp;" : char}</span>` ).join(""); 
      gsap.set(".char", { y: () => gsap.utils.random(-200, -50), x: () => gsap.utils.random(-100, 100), rotation: () => gsap.utils.random(-45, 45), scale: () => gsap.utils.random(0.5, 1.5), opacity: 0.3 }); 
      tl.to(".char", { y: 0, x: 0, rotation: 0, scale: 1, opacity: 1, duration: getOptimizedDuration(1.2, isMobile, reducedMotion), stagger: { amount: 0.8, from: "random" }, ease: "power3.out", onComplete: () => { gsap.to(".char", { y: -5, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: { amount: 0.5, repeat: -1, yoyo: true } }) } });
    } 
    tl.fromTo( subtitleRef.current, { y: isMobile ? 30 : 50, opacity: 0 }, { y: 0, opacity: 1, duration: getOptimizedDuration(0.6, isMobile, reducedMotion), ease: getOptimizedEase(isMobile) }, "-=0.1" ).fromTo( ctaRef.current, { y: isMobile ? 20 : 30, opacity: 0 }, { y: 0, opacity: 1, duration: getOptimizedDuration(0.5, isMobile, reducedMotion), ease: getOptimizedEase(isMobile) }, "-=0.2" ); 
    if (techLogosRef.current) tl.fromTo( ".tech-logo", { scale: 0, opacity: 0, rotation: 180 }, { scale: 1, opacity: 1, rotation: 0, duration: getOptimizedDuration(0.8, isMobile, reducedMotion), stagger: 0.1, ease: "back.out(1.7)" }, "-=0.5" );
    if (!isMobile) { 
      if (parallaxLayer1Ref.current) gsap.to(parallaxLayer1Ref.current, { yPercent: -20, ease: "none", scrollTrigger: { trigger: heroRef.current, start: "top bottom", end: "bottom top", scrub: 1 } });
      if (parallaxLayer2Ref.current) gsap.to(parallaxLayer2Ref.current, { yPercent: -40, ease: "none", scrollTrigger: { trigger: heroRef.current, start: "top bottom", end: "bottom top", scrub: 2 } });
      if (parallaxLayer3Ref.current) gsap.to(parallaxLayer3Ref.current, { yPercent: -60, ease: "none", scrollTrigger: { trigger: heroRef.current, start: "top bottom", end: "bottom top", scrub: 3 } });
      if (backgroundRef.current) gsap.to(backgroundRef.current, { yPercent: -30, ease: "none", scrollTrigger: { trigger: heroRef.current, start: "top bottom", end: "bottom top", scrub: 1 } });
    } 
    if (techLogosRef.current && !isMobile) {
        gsap.to(".tech-logo-github", { y: -20, x: 15, rotation: 360, duration: getOptimizedDuration(4, isMobile, reducedMotion), repeat: -1, yoyo: true, ease: "sine.inOut" }); 
        gsap.to(".tech-logo-hf", { y: -25, x: -12, rotation: -15, duration: getOptimizedDuration(3.5, isMobile, reducedMotion), repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 }); 
        gsap.to(".tech-logo-tf", { y: -18, x: 20, rotation: 10, duration: getOptimizedDuration(4.5, isMobile, reducedMotion), repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 }); 
        gsap.to(".tech-logo-pytorch", { y: -22, x: -18, rotation: -20, duration: getOptimizedDuration(3.8, isMobile, reducedMotion), repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5 }); 
        gsap.to(".tech-logo-keras", { y: -16, x: 10, rotation: 25, duration: getOptimizedDuration(4.2, isMobile, reducedMotion), repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 });
    } 
    if (!isMobile) { 
      gsap.to(".float-1", { y: -15, x: 8, rotation: 10, duration: getOptimizedDuration(2.5, isMobile, reducedMotion), repeat: -1, yoyo: true, ease: "sine.inOut" }); 
      gsap.to(".float-2", { y: -20, x: -10, rotation: -15, duration: getOptimizedDuration(3, isMobile, reducedMotion), repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 }); 
    } 
    document.querySelectorAll('.tech-logo').forEach((logo) => { 
      logo.addEventListener('mouseenter', () => { gsap.to(logo, { scale: 1.2, duration: 0.3, ease: "power2.out" }) }); 
      logo.addEventListener('mouseleave', () => { gsap.to(logo, { scale: 1, duration: 0.3, ease: "power2.out" }) }); 
    });

    // Newsletter button animation with pop effect and attention-grabbing animation
    if (newsletterButtonRef.current && !reducedMotion) {
      gsap.set(newsletterButtonRef.current, { opacity: 0, scale: 0, x: -20, y: -20 });
      
      // Pop-in animation
      const popIn = gsap.timeline({ delay: 1.5 });
      popIn.to(newsletterButtonRef.current, {
        opacity: 1,
        scale: 1.15,
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "back.out(2.5)"
      })
      .to(newsletterButtonRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });

      // Continuous subtle pulse to draw attention
      if (!isMobile) {
        gsap.to(newsletterButtonRef.current, {
          scale: 1.05,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 2.2
        });
      }
    }
  }, [isMobile, reducedMotion, router]);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden parallax-container bg-white"
    >
      {!isMobile && (
        <div 
          ref={logoRef}
          className="absolute z-20 w-full top-6 flex justify-center items-center gap-8"
        >
          <img src="/images/cabinet-logo.png" alt="Student Cabinet Logo" className="object-contain w-32 h-32" />
          <img src="/images/BIAS.svg" alt="AI Society Logo" className="object-contain drop-shadow-lg w-20 h-20" />
          <img src="/images/bennett-logo.webp" alt="Bennett University Logo" className="object-contain w-32 h-32" />
        </div>
      )}

      {/* Newsletter Button */}
      <div className="fixed z-[100] top-0 left-0">
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <clipPath id="curved-button-clip" clipPathUnits="objectBoundingBox">
              <path d="M 0,0.3 Q 0,0 0.3,0 L 1,0 L 1,1 L 0,1 Z" />
            </clipPath>
            <linearGradient id="button-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#000000" />
              <stop offset="50%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
          </defs>
        </svg>

        {/* Attractive Button with Multiple Effects */}
        <button
          ref={newsletterButtonRef}
          onClick={() => router.push("/announcements")}
          className="group relative flex items-center gap-2 
                     px-4 py-2.5 
                     shadow-2xl hover:shadow-black/50
                     transition-all duration-500 ease-out
                     hover:scale-110 hover:-translate-y-1 hover:rotate-1
                     active:scale-95
                     overflow-hidden
                     border-2 border-white/30"
          style={{
            clipPath: 'url(#curved-button-clip)',
            borderRadius: '0 0 12px 0',
            background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }}
          aria-label="Watch our newsletter"
        >
          {/* Animated background gradient shimmer */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s infinite'
            }}
          ></div>
          
          {/* Pulsing glow effect */}
          <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 animate-pulse"></div>
          
          {/* Icon with special effects */}
          <div className="relative z-10">
            <div className="absolute inset-0 bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
           
            {/* Sparkle effect */}
            <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
            <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100"></div>
          </div>
          
          {/* Text with glow */}
          <span className="relative z-10 text-xs font-bold tracking-wide text-white drop-shadow-lg">
            Newsletter
          </span>
          
          {/* Arrow indicator */}
          <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
      </div>

      {isMobile && (
          <div className="absolute z-20 top-5 left-8">
            <img src="/images/BIAS.svg" alt="AI Society Logo" className="object-contain drop-shadow-lg w-16 h-16" />
          </div>
      )}

      <div ref={parallaxLayer1Ref} className="absolute inset-0 parallax-layer-1"><div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-black/5 to-black/10 rounded-full blur-xl"></div><div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-black/8 to-black/15 rounded-full blur-xl"></div></div>
      <div ref={parallaxLayer2Ref} className="absolute inset-0 parallax-layer-2"><div className="absolute top-1/3 right-10 w-24 h-24 bg-gradient-to-br from-black/10 to-black/20 rounded-full blur-lg"></div><div className="absolute bottom-1/3 left-20 w-28 h-28 bg-gradient-to-br from-black/12 to-black/18 rounded-full blur-lg"></div></div>
      <div ref={parallaxLayer3Ref} className="absolute inset-0 parallax-layer-3"><div className="absolute top-20 right-1/3 w-20 h-20 bg-gradient-to-br from-black/15 to-black/25 rounded-full blur-md"></div><div className="absolute bottom-40 left-1/3 w-16 h-16 bg-gradient-to-br from-black/18 to-black/28 rounded-full blur-md"></div></div>
      {!isMobile && (<div ref={techLogosRef} className="absolute inset-0 pointer-events-none"><TechLogo className="tech-logo-github absolute top-20 left-20"><GitHubLogo isMobile={false} /></TechLogo><TechLogo className="tech-logo-hf absolute top-32 right-32"><HuggingFaceLogo isMobile={false} /></TechLogo><TechLogo className="tech-logo-tf absolute bottom-40 left-32"><TensorFlowLogo isMobile={false} /></TechLogo><TechLogo className="tech-logo-pytorch absolute bottom-32 right-24"><PyTorchLogo isMobile={false} /></TechLogo><TechLogo className="tech-logo-keras absolute top-1/2 left-16"><KerasLogo isMobile={false} /></TechLogo></div>)}
      <div ref={backgroundRef} className="absolute inset-0 parallax-element"><div className="absolute top-20 left-2 sm:left-10 w-1 h-1 sm:w-2 sm:h-2 bg-black rounded-full opacity-20 animate-pulse float-1"></div><div className="absolute top-40 right-2 sm:right-20 w-2 h-2 sm:w-3 sm:h-3 bg-black rounded-full opacity-15 animate-bounce float-2"></div><div className="absolute bottom-40 left-2 sm:left-1/4 w-1 h-1 bg-black rounded-full opacity-25 animate-ping"></div><div className="absolute bottom-20 right-2 sm:right-10 w-1 h-1 sm:w-2 sm:h-2 bg-black rounded-full opacity-10 animate-pulse"></div></div>

      <div className={`relative z-10 text-center w-full max-w-6xl mx-auto ${isMobile ? 'pl-8 pr-4 pt-20' : 'px-4 pt-20'}`}>
        
        <div ref={logoRef} className="sm:hidden w-full flex justify-center items-center gap-6 mb-4">
          <img src="/images/cabinet-logo.png" alt="Student Cabinet Logo" className="object-contain w-24 h-24" />
          <img src="/images/bennett-logo.webp" alt="Bennett University Logo" className="object-contain w-24 h-24" />
        </div>
        
        <div className="mb-6">
          <div className="inline-flex items-center space-x-3 bg-black text-white px-4 py-2 rounded-full text-xs sm:text-sm font-medium animate-fade-in-up group">
            <CustomStar ref={customStarRef} width="24" height="24" />
            <span>Training Minds, One Epoch at a Time</span>
          </div>
        </div>

        <h1 ref={titleRef} className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-black mb-6 leading-none" style={{ perspective: "1000px" }}>
          AI SOCIETY
        </h1>

        <p ref={subtitleRef} className="text-base sm:text-xl md:text-2xl text-black/70 max-w-4xl mx-auto mb-8">
         Bennett University's hub for research, collaboration, and innovation in Artificial Intelligence.
        </p>

        <div ref={ctaRef} className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-center sm:space-y-0 sm:space-x-6 mb-8">
          <MagneticButton onClick={() => router.push("/projects")} className="group bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-lg">
            Explore Our Work
          </MagneticButton>
          <MagneticButton onClick={() => window.open("https://chat.whatsapp.com/JNWPTs2NwBf1sTaHMF4t3Y", "_blank")} className="group border-2 border-black text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-lg hover:bg-black hover:text-white transition-colors">
            Join Community
          </MagneticButton>
        </div>

        {isMobile && (
          <div ref={techLogosRef} className="flex justify-center items-center space-x-6 mt-8">
            <TechLogo className="tech-logo-github"><GitHubLogo isMobile={true} /></TechLogo>
            <TechLogo className="tech-logo-hf"><HuggingFaceLogo isMobile={true} /></TechLogo>
            <TechLogo className="tech-logo-tf"><TensorFlowLogo isMobile={true} /></TechLogo>
            <TechLogo className="tech-logo-pytorch"><PyTorchLogo isMobile={true} /></TechLogo>
            <TechLogo className="tech-logo-keras"><KerasLogo isMobile={true} /></TechLogo>
          </div>
        )}
      </div>

      {!isMobile && (<div className="absolute inset-0 pointer-events-none overflow-hidden"><div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent"></div><div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent"></div><div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-black/10 to-transparent"></div><div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-black/10 to-transparent"></div><div className="absolute inset-0"><div className="absolute top-1/3 left-1/3 w-32 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent rotate-45"></div><div className="absolute bottom-1/3 right-1/3 w-32 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent -rotate-45"></div></div></div>)}
    </section>
  )
}