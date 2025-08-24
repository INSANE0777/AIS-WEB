"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Home,
  Calendar,
  Github,
  Instagram,
  Linkedin,
  FolderOpen,
  Car,
  Megaphone,
  Youtube,
} from "lucide-react"
import { gsap } from "gsap"
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin"

// A simple hook to detect mobile screen sizes with debouncing
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()
  
  useEffect(() => {
    const checkScreenSize = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setIsMobile(window.innerWidth < breakpoint)
      }, 100)
    }
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize, { passive: true })
    return () => {
      window.removeEventListener("resize", checkScreenSize)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [breakpoint])
  return isMobile
}

const navItems = [
  { name: "Home", href: "/", icon: Home, angle: -90 },
  { name: "Projects", href: "/projects", icon: FolderOpen, angle: -18 },
  { name: "Events", href: "/event", icon: Calendar, angle: 54 },
  { name: "Join Us", href: "/join", icon: Car, angle: 126 },
  { name: "Announcements", href: "/announcements", icon: Megaphone, angle: 198 },
]

const socialLinks = [
  { icon: Github, href: "https://github.com/AIS-B", label: "GitHub" },
  { icon: Instagram, href: "https://www.instagram.com/ais.bennett/", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/ais-bennett/", label: "LinkedIn" },
  { icon: Youtube, href: "https://www.youtube.com/channel/UCyYIP23AO1ngKVqTPlP0fJA", label: "YouTube" },
]

const MAX_DRAG_RADIUS = 40;
const NAVIGATION_HOLD_TIME = 1000;

export default function SpaceshipNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const router = useRouter()
  const isMobile = useIsMobile();

  const [isDragging, setIsDragging] = useState(false)
  const [hubPosition, setHubPosition] = useState({ x: 0, y: 0 })
  const navContainerRef = useRef<HTMLDivElement>(null)
  const hubPositionRef = useRef({ x: 0, y: 0 });
  const navigationTimerRef = useRef<NodeJS.Timeout | null>(null);

  const navIconRef = useRef<SVGSVGElement>(null);
  const rippleTimeline = useRef<gsap.core.Timeline | null>(null);

  const INITIAL_SHAPE = "M100 0H0V100H100V200H200V100H100V0Z";
  const HOVER_SHAPE = "M0 0H50V50H0V0ZM100 50H50V100H0V150H50V200H100V150H150V200H200V150H150V100H200V50H150V0H100V50ZM100 100H150V50H100V100ZM100 100V150H50V100H100Z";
  const OPEN_SHAPE = "M0 0H66.6667V66.6667H0V0ZM133.333 66.6667H66.6667V133.333H0V200H66.6667V133.333H133.333V200H200V133.333H133.333V66.6667ZM133.333 66.6667H200V0H133.333V66.6667Z";

  const dimensions = useMemo(() => ({
    navSize: isMobile ? 340 : 500,
    navItemRadius: isMobile ? 120 : 180,
    pieOuterRadius: isMobile ? 170 : 250,
    pieInnerRadius: isMobile ? 60 : 80,
    hubSize: isMobile ? 70 : 80,
    iconSize: isMobile ? 22 : 28,
    itemSize: isMobile ? 40 : 48,
    textSize: isMobile ? 'text-xs' : 'text-sm',
    socialIconSize: isMobile ? 20 : 24,
    rippleScale: isMobile ? 4.5 : 6
  }), [isMobile])

  const getItemPosition = useCallback((angle: number, radius: number) => ({
    left: `calc(50% + ${radius * Math.cos(angle*Math.PI/180)}px)`,
    top: `calc(50% + ${radius * Math.sin(angle*Math.PI/180)}px)`,
    transform: 'translate(-50%, -50%)',
    willChange: 'transform'
  }), [])

  const createPieSlice = useCallback((angle: number, rO: number, rI: number) => {
    const s = angle - 36, e = angle + 36
    const sr = (s * Math.PI) / 180, er = (e * Math.PI) / 180
    const x1 = rO * Math.cos(sr), y1 = rO * Math.sin(sr)
    const x2 = rO * Math.cos(er), y2 = rO * Math.sin(er)
    const x3 = rI * Math.cos(er), y3 = rI * Math.sin(er)
    const x4 = rI * Math.cos(sr), y4 = rI * Math.sin(sr)
    return `M ${x1} ${y1} A ${rO} ${rO} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${rI} ${rI} 0 0 0 ${x4} ${y4} Z`
  }, [])

  useEffect(() => {
    gsap.registerPlugin(MorphSVGPlugin);
    const iconPath = navIconRef.current?.querySelector("#nav-icon-path");
    const buttonElement = navIconRef.current?.parentElement;

    if (!iconPath || !buttonElement) return;

    gsap.set(iconPath, { force3D: true });

    // Timeline for the hover animation (only when closed)
    const hoverTimeline = gsap.timeline({ paused: true })
      .to(iconPath, {
        morphSVG: HOVER_SHAPE,
        fill: '#4B5563', // Dark gray on hover
        duration: 0.4,
        ease: 'power2.out'
      });
      
    const handleMouseEnter = () => {
      if (!isOpen) hoverTimeline.play();
    };
    const handleMouseLeave = () => {
      hoverTimeline.reverse();
    };
    
    buttonElement.addEventListener('mouseenter', handleMouseEnter);
    buttonElement.addEventListener('mouseleave', handleMouseLeave);
    
    rippleTimeline.current = gsap.timeline({ paused: true, repeat: -1 });
    rippleTimeline.current.fromTo(".ripple-circle", 
        { scale: 1, opacity: 0.5, force3D: true },
        { 
            scale: dimensions.rippleScale,
            opacity: 0, 
            duration: 5,
            stagger: 1.5,
            ease: "power1.out",
            force3D: true
        }
    );

    return () => {
        buttonElement.removeEventListener('mouseenter', handleMouseEnter);
        buttonElement.removeEventListener('mouseleave', handleMouseLeave);
    }
  }, [isOpen, dimensions.rippleScale, HOVER_SHAPE]);

  useEffect(() => {
    const iconPath = navIconRef.current?.querySelector("#nav-icon-path");
    if (!iconPath) return;
    
    // THE FIX: Use explicit animations instead of a reversible timeline
    if (isOpen) {
      // Pause any ongoing hover animation before opening
      gsap.getTweensOf(iconPath).forEach(tween => tween.pause());
      
      gsap.to(iconPath, {
        morphSVG: OPEN_SHAPE,
        fill: '#FFFFFF',
        duration: 0.6,
        ease: 'power3.inOut'
      });

      rippleTimeline.current?.play(0);
      setHubPosition({ x: 0, y: 0 });
      hubPositionRef.current = { x: 0, y: 0 };
      
      gsap.set([".nav-overlay", ".grid-line", ".central-hub", ".nav-item", ".social-icon"], { force3D: true });
      
      gsap.to(".nav-overlay", { autoAlpha: 1, duration: 0.5, ease: "power3.out" });
      gsap.fromTo(".grid-line", { opacity: 0 }, { opacity: 0.1, duration: 1, stagger: 0.05, ease: "power2.out" });
      gsap.fromTo(".central-hub", { scale: 0, rotation: -180 }, { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)", delay: 0.2 });
      gsap.fromTo(".nav-item", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)", delay: 0.4 });
      gsap.fromTo(".social-icon", { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out", delay: 0.6 });
    } else {
      gsap.to(iconPath, {
        morphSVG: INITIAL_SHAPE, // Always return to the initial shape
        fill: 'black',
        duration: 0.6,
        ease: 'power3.inOut'
      });

      rippleTimeline.current?.pause().progress(0);
      gsap.to(".nav-overlay", { autoAlpha: 0, duration: 0.3, ease: "power3.in" });
    }
  }, [isOpen, INITIAL_SHAPE, OPEN_SHAPE]);

  const clearNavigationTimer = useCallback(() => {
    if (navigationTimerRef.current) clearTimeout(navigationTimerRef.current);
    navigationTimerRef.current = null;
    gsap.killTweensOf(".timer-slice");
    gsap.set(".timer-slice", { opacity: 0 });
  }, [])

  const handleAutoNavigate = useCallback((href: string) => {
    if (!isOpen) return;
    setIsOpen(false);
    setTimeout(() => router.push(href), 300);
  }, [isOpen, router]);

  const toggleMenu = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    gsap.killTweensOf(hubPositionRef.current);
  }, []);

  const handleDragMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !navContainerRef.current) return;

    requestAnimationFrame(() => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const rect = navContainerRef.current!.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const angle = Math.atan2(deltaY, deltaX);

      let newX = deltaX, newY = deltaY;
      if (distance > MAX_DRAG_RADIUS) {
        newX = MAX_DRAG_RADIUS * Math.cos(angle);
        newY = MAX_DRAG_RADIUS * Math.sin(angle);
      }
      setHubPosition({ x: newX, y: newY });
      hubPositionRef.current = { x: newX, y: newY };

      const dragAngleDegrees = angle * (180 / Math.PI);
      let closestIndex = 0, minDiff = 360;
      navItems.forEach((item, index) => {
        let diff = Math.abs(dragAngleDegrees - item.angle);
        if (diff > 180) diff = 360 - diff;
        if (diff < minDiff) { minDiff = diff; closestIndex = index; }
      });
      
      if (hoveredItem !== closestIndex) {
        setHoveredItem(closestIndex);
        clearNavigationTimer();
        navigationTimerRef.current = setTimeout(() => {
          handleAutoNavigate(navItems[closestIndex].href);
        }, NAVIGATION_HOLD_TIME);
        gsap.fromTo(`.timer-slice-${closestIndex}`, { opacity: 0 }, { opacity: 1, duration: NAVIGATION_HOLD_TIME / 1000, ease: "power1.inOut" });
      }
    });
  }, [isDragging, hoveredItem, clearNavigationTimer, handleAutoNavigate]);
  
  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    clearNavigationTimer();
    setHoveredItem(null);
    gsap.to(hubPositionRef.current, { 
      x: 0, y: 0, 
      duration: 0.6, 
      ease: "elastic.out(1, 0.5)", 
      onUpdate: () => setHubPosition({ ...hubPositionRef.current }),
      force3D: true
    });
  }, [isDragging, clearNavigationTimer]);

  useEffect(() => {
    const moveHandler = handleDragMove as any;
    const endHandler = handleDragEnd as any;
    if (isDragging) {
      window.addEventListener("mousemove", moveHandler, { passive: false });
      window.addEventListener("touchmove", moveHandler, { passive: false });
      window.addEventListener("mouseup", endHandler, { passive: true });
      window.addEventListener("touchend", endHandler, { passive: true });
    }
    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("touchmove", moveHandler);
      window.removeEventListener("mouseup", endHandler);
      window.removeEventListener("touchend", endHandler);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  const gridLines = useMemo(() => (
    <>
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={`v-${i}`} className="grid-line absolute top-0 bottom-0 w-px bg-white/10" style={{ left: `${(i + 1) * 5}%` }}/>
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={`h-${i}`} className="grid-line absolute left-0 right-0 h-px bg-white/10" style={{ top: `${(i + 1) * 8.33}%` }}/>
      ))}
    </>
  ), [])

  const socialIcons = useMemo(() => (
    socialLinks.map((social, index) => {
      const Icon = social.icon;
      return (
        <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="social-icon w-8 h-8 sm:w-10 sm:h-10 text-white hover:text-gray-300 transition-colors focus:outline-none flex items-center justify-center">
          <Icon size={dimensions.socialIconSize} />
        </a>
      )
    })
  ), [dimensions.socialIconSize])

  return (
    <>
      <button onClick={toggleMenu} className="fixed top-4 right-4 sm:top-8 sm:right-8 z-50 w-16 h-16 flex items-center justify-center focus:outline-none group" aria-label="Toggle Navigation">
        <svg ref={navIconRef} width="32" height="32" viewBox="0 0 200 200" className="overflow-visible" style={{ willChange: 'transform' }}>
          <path id="nav-icon-path" d={INITIAL_SHAPE} fill="black" />
        </svg>
      </button>

      <div className="nav-overlay fixed inset-0 z-40 bg-black/75 backdrop-blur-2xl invisible" style={{ willChange: 'auto' }}>
        <div className="absolute inset-0 overflow-hidden">
          {gridLines}
        </div>

        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 flex space-x-2 sm:space-x-4">
          {socialIcons}
        </div>

        <div ref={navContainerRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: dimensions.navSize, height: dimensions.navSize, willChange: 'transform' }}>
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox={`-${dimensions.navSize/2} -${dimensions.navSize/2} ${dimensions.navSize} ${dimensions.navSize}`}>
              {navItems.map((item, index) => (
                <path key={`highlight-${index}`} d={createPieSlice(item.angle, dimensions.pieOuterRadius, dimensions.pieInnerRadius)} fill="rgba(255, 255, 255, 1)" className={`transition-opacity duration-300 ${hoveredItem === index ? 'opacity-100' : 'opacity-0'}`} />
              ))}
              {navItems.map((item, index) => (
                <path key={`timer-${index}`} className={`timer-slice timer-slice-${index}`} d={createPieSlice(item.angle, dimensions.pieOuterRadius, dimensions.pieInnerRadius)} fill="rgb(115, 115, 115)" style={{ opacity: 0 }} pointerEvents="none" />
              ))}
            </svg>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="ripple-circle absolute border-2 border-white/50 rounded-full opacity-0" style={{ width: dimensions.hubSize, height: dimensions.hubSize, willChange: 'transform, opacity' }}></div>
            <div className="ripple-circle absolute border-2 border-white/50 rounded-full opacity-0" style={{ width: dimensions.hubSize, height: dimensions.hubSize, willChange: 'transform, opacity' }}></div>
            <div className="ripple-circle absolute border-2 border-white/50 rounded-full opacity-0" style={{ width: dimensions.hubSize, height: dimensions.hubSize, willChange: 'transform, opacity' }}></div>
          </div>
          
          <div className="central-hub absolute top-1/2 left-1/2 z-10" style={{ transform: `translate(calc(-50% + ${hubPosition.x}px), calc(-50% + ${hubPosition.y}px))`, cursor: isDragging ? 'grabbing' : 'grab', willChange: 'transform' }} onMouseDown={handleDragStart} onTouchStart={handleDragStart}>
              <div className="bg-white rounded-full flex items-center justify-center relative pointer-events-none" style={{ width: dimensions.hubSize, height: dimensions.hubSize }}>
                <div className="relative z-10 w-6 h-6 bg-black rounded-sm flex items-center justify-center"><div className="w-1.5 h-1.5 bg-white rounded-full"></div></div>
                <div className="absolute z-10 -top-1 left-1/2 -translate-x-1/2"><div className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[6px] border-transparent border-b-black"></div></div>
                <div className="absolute z-10 -bottom-1 left-1/2 -translate-x-1/2"><div className="w-0 h-0 border-l-[3px] border-r-[3px] border-t-[6px] border-transparent border-t-black"></div></div>
                <div className="absolute z-10 -left-1 top-1/2 -translate-y-1/2"><div className="w-0 h-0 border-t-[3px] border-b-[3px] border-r-[6px] border-transparent border-r-black"></div></div>
                <div className="absolute z-10 -right-1 top-1/2 -translate-y-1/2"><div className="w-0 h-0 border-t-[3px] border-b-[3px] border-l-[6px] border-transparent border-l-black"></div></div>
              </div>
          </div>
            
          {navItems.map((item, index) => { 
            const Icon = item.icon
            const position = getItemPosition(item.angle, dimensions.navItemRadius)
            const isHovered = hoveredItem === index
            return (
              <Link key={index} href={item.href} className="nav-item absolute z-20 cursor-pointer focus:outline-none" style={position} onClick={(e) => { e.preventDefault(); handleAutoNavigate(item.href); }} onMouseEnter={() => { if (!isDragging) setHoveredItem(index) }} onMouseLeave={() => { if (!isDragging) setHoveredItem(null) }}> 
                <div className="flex flex-col items-center space-y-1 text-center"> 
                  <div className={`relative flex items-center justify-center rounded-full transition-colors duration-300 ${isHovered ? 'bg-white' : 'bg-transparent'}`} style={{width: dimensions.itemSize, height: dimensions.itemSize, willChange: 'background-color'}}>
                    <Icon size={dimensions.iconSize} className={`transition-colors duration-300 ${isHovered ? 'text-black' : 'text-white'}`}/>
                  </div> 
                  <span className={`font-medium transition-colors duration-300 ${isHovered ? 'text-black' : 'text-white'} ${dimensions.textSize}`}>{item.name}</span> 
                </div> 
              </Link>
            )
          })}

          <div className="absolute inset-0 border border-white/20 rounded-full pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/10 rounded-full pointer-events-none" style={{width: dimensions.navItemRadius * 2, height: dimensions.navItemRadius * 2}}></div>
        </div>

        <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 text-white/60 text-[10px] sm:text-xs">COPYRIGHT© 2025 ALL RIGHTS RESERVED</div>
        <div className="hidden sm:flex absolute bottom-8 right-8 space-x-6 text-white/60 text-xs"><span>COOKIE SETTINGS</span><span>PRIVACY POLICY</span><span>LEGAL DISCLAIMER</span></div>
      </div>
    </>
  )
}