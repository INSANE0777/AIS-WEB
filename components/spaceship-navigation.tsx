"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Menu,
  X,
  Home,
  Calendar,
  Users,
  Github,
  Instagram,
  Linkedin,
  FolderOpen,
  Info,
  CarIcon as Career,
  Megaphone,
  Youtube,
} from "lucide-react"
import { gsap } from "gsap"

const navItems = [
  { name: "Home", href: "/", icon: Home, angle: -90 },
  { name: "Projects", href: "/projects", icon: FolderOpen, angle: -18 },
  { name: "Events", href: "/events", icon: Calendar, angle: 54 },
  { name: "Join Us", href: "/join", icon: Career, angle: 126 },
  { name: "Announcements", href: "/announcements", icon: Megaphone, angle: 198 },
]

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

const MAX_DRAG_RADIUS = 40;
const NAVIGATION_HOLD_TIME = 1000; // Timer set to 1 second

export default function SpaceshipNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const router = useRouter()

  const [isDragging, setIsDragging] = useState(false)
  const [hubPosition, setHubPosition] = useState({ x: 0, y: 0 })
  const navContainerRef = useRef<HTMLDivElement>(null)
  const hubPositionRef = useRef({ x: 0, y: 0 });
  const navigationTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      setHubPosition({ x: 0, y: 0 });
      hubPositionRef.current = { x: 0, y: 0 };
      gsap.fromTo(".nav-overlay", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" });
      gsap.fromTo(".grid-line", { opacity: 0 }, { opacity: 0.3, duration: 1, stagger: 0.05, ease: "power2.out" });
      gsap.fromTo(".central-hub", { scale: 0, rotation: -180 }, { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)", delay: 0.2 });
      gsap.fromTo(".nav-item", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)", delay: 0.4 });
      gsap.fromTo(".social-icon", { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out", delay: 0.6 });
    }
  }, [isOpen])

  const clearNavigationTimer = () => {
    if (navigationTimerRef.current) {
      clearTimeout(navigationTimerRef.current);
      navigationTimerRef.current = null;
    }
    gsap.killTweensOf(".timer-slice");
    gsap.set(".timer-slice", { opacity: 0 });
  }

  const handleAutoNavigate = (href: string) => {
    if (!isOpen) return;
    clearNavigationTimer();
    
    gsap.to(".nav-overlay", {
      opacity: 0, scale: 0.8, duration: 0.3, ease: "power3.in",
      onComplete: () => {
        router.push(href);
        setIsOpen(false);
        setHoveredItem(null);
      },
    });
  };

  const toggleMenu = () => {
    if (isOpen) {
      gsap.to(".nav-overlay", {
        opacity: 0, scale: 0.8, duration: 0.3, ease: "power3.in",
        onComplete: () => {
          setIsOpen(false);
          setHoveredItem(null);
          clearNavigationTimer();
        },
      })
    } else {
      setIsOpen(true);
    }
  }

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    gsap.killTweensOf(hubPositionRef.current);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !navContainerRef.current) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const rect = navContainerRef.current.getBoundingClientRect();
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
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });
    
    if (hoveredItem !== closestIndex) {
      setHoveredItem(closestIndex);
      clearNavigationTimer();

      navigationTimerRef.current = setTimeout(() => {
        handleAutoNavigate(navItems[closestIndex].href);
      }, NAVIGATION_HOLD_TIME);
      
      gsap.fromTo(`.timer-slice-${closestIndex}`, 
        { opacity: 0 }, 
        { opacity: 1, duration: NAVIGATION_HOLD_TIME / 1000, ease: "power1.inOut" }
      );
    }
  };
  
  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    clearNavigationTimer();

    gsap.to(hubPositionRef.current, {
      x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)",
      onUpdate: () => setHubPosition({ ...hubPositionRef.current }),
    });
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleDragMove as any);
      window.addEventListener("touchmove", handleDragMove as any);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchend", handleDragEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleDragMove as any);
      window.removeEventListener("touchmove", handleDragMove as any);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, hoveredItem]);

  const getItemPosition = (angle: number, radius: number = 180) => ({ left: `calc(50% + ${radius * Math.cos(angle*Math.PI/180)}px)`, top: `calc(50% + ${radius * Math.sin(angle*Math.PI/180)}px)`, transform: 'translate(-50%, -50%)' });
  const createPieSlice = (angle: number) => { const s=angle-36,e=angle+36,sr=(s*Math.PI)/180,er=(e*Math.PI)/180,rO=250,rI=80,x1=rO*Math.cos(sr),y1=rO*Math.sin(sr),x2=rO*Math.cos(er),y2=rO*Math.sin(er),x3=rI*Math.cos(er),y3=rI*Math.sin(er),x4=rI*Math.cos(sr),y4=rI*Math.sin(sr);return`M ${x1} ${y1} A ${rO} ${rO} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${rI} ${rI} 0 0 0 ${x4} ${y4} Z` };

  return (
    <>
      {!isOpen && ( <button onClick={toggleMenu} className="fixed top-8 right-8 z-50 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg focus:outline-none"><Menu size={24} /></button> )}

      {isOpen && (
        <div className="nav-overlay fixed inset-0 z-40 bg-black">
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (<div key={`v-${i}`} className="grid-line absolute top-0 bottom-0 w-px bg-white/20" style={{ left: `${(i + 1) * 5}%` }}/>))}
            {Array.from({ length: 12 }).map((_, i) => (<div key={`h-${i}`} className="grid-line absolute left-0 right-0 h-px bg-white/20" style={{ top: `${(i + 1) * 8.33}%` }}/>))}
          </div>

          <button onClick={toggleMenu} className="absolute top-8 left-8 z-50 w-12 h-12 text-white hover:scale-110 transition-transform focus:outline-none"><X size={32} /></button>
          <div className="absolute top-8 right-8 flex space-x-4">
            {socialLinks.map((social, index) => { const Icon = social.icon; return (<a key={index} href={social.href} className="social-icon w-10 h-10 text-white hover:text-gray-300 transition-colors focus:outline-none"><Icon size={24} /></a>)})}
          </div>

          <div ref={navContainerRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]">
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-[500px] h-[500px]" viewBox="-250 -250 500 500">
                {/* Layer 1: White Highlight Slices */}
                {navItems.map((item, index) => (
                  <path key={index} d={createPieSlice(item.angle)} fill={hoveredItem === index ? "rgba(255, 255, 255, 1)" : "transparent"} className="transition-all duration-300"/>
                ))}
                {/* Layer 2: Grey Timer Overlay Slices */}
                {navItems.map((item, index) => (
                  <path
                    key={`timer-${index}`}
                    className={`timer-slice timer-slice-${index}`}
                    d={createPieSlice(item.angle)}
                    fill="rgb(115, 115, 115)" // FIX: A true neutral grey color
                    style={{ opacity: 0 }}
                    pointerEvents="none"
                  />
                ))}
              </svg>
            </div>
            
            <div className="central-hub absolute top-1/2 left-1/2 z-10" style={{ transform: `translate(calc(-50% + ${hubPosition.x}px), calc(-50% + ${hubPosition.y}px))`, cursor: isDragging ? 'grabbing' : 'grab' }} onMouseDown={handleDragStart} onTouchStart={handleDragStart}>
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center relative pointer-events-none">
                <div className="relative z-10 w-6 h-6 bg-black rounded-sm flex items-center justify-center"><div className="w-1.5 h-1.5 bg-white rounded-full"></div></div>
                <div className="absolute z-10 -top-1 left-1/2 -translate-x-1/2"><div className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[6px] border-transparent border-b-black"></div></div>
                <div className="absolute z-10 -bottom-1 left-1/2 -translate-x-1/2"><div className="w-0 h-0 border-l-[3px] border-r-[3px] border-t-[6px] border-transparent border-t-black"></div></div>
                <div className="absolute z-10 -left-1 top-1/2 -translate-y-1/2"><div className="w-0 h-0 border-t-[3px] border-b-[3px] border-r-[6px] border-transparent border-r-black"></div></div>
                <div className="absolute z-10 -right-1 top-1/2 -translate-y-1/2"><div className="w-0 h-0 border-t-[3px] border-b-[3px] border-l-[6px] border-transparent border-l-black"></div></div>
              </div>
            </div>
              
            {navItems.map((item, index) => { const Icon = item.icon, position = getItemPosition(item.angle), isHovered = hoveredItem === index; return ( <Link key={index} href={item.href} className="nav-item absolute z-20 cursor-pointer focus:outline-none" style={position} onClickCapture={(e) => { if (isDragging) e.preventDefault() }} onClick={toggleMenu} onMouseEnter={() => { if (!isDragging) setHoveredItem(index) }} onMouseLeave={() => { if (!isDragging) setHoveredItem(null) }}> <div className="flex flex-col items-center space-y-2 text-center p-4"> <div className="relative w-12 h-12 flex items-center justify-center"><Icon size={28} className={`transition-colors duration-300 ${isHovered ? 'text-black' : 'text-white'}`}/></div> <span className={`text-sm font-medium transition-colors duration-300 ${isHovered ? 'text-black' : 'text-white'}`}>{item.name}</span> </div> </Link> )})}

            <div className="absolute inset-0 border border-white/20 rounded-full pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] border border-white/10 rounded-full pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          </div>

          <div className="absolute bottom-8 left-8 text-white/60 text-xs">COPYRIGHT© 2024 ALL RIGHTS RESERVED</div>
          <div className="absolute bottom-8 right-8 flex space-x-6 text-white/60 text-xs"><span>COOKIE SETTINGS</span><span>PRIVACY POLICY</span><span>LEGAL DISCLAIMER</span></div>
        </div>
      )}
    </>
  )
}