"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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
} from "lucide-react"
import { gsap } from "gsap"

const navItems = [
  { name: "Home", href: "/", icon: Home, position: "top" },
  { name: "Projects", href: "/projects", icon: FolderOpen, position: "top-right" },
  { name: "About Us", href: "#about", icon: Info, position: "left" },
  { name: "Team", href: "#team", icon: Users, position: "right" },
  { name: "Events", href: "/events", icon: Calendar, position: "bottom-left" },
  { name: "Join Us", href: "/join", icon: Career, position: "bottom-right" },
]

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export default function SpaceshipNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (isOpen) {
      // Animate overlay entrance
      gsap.fromTo(
        ".nav-overlay",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" },
      )

      // Animate grid pattern
      gsap.fromTo(".grid-line", { opacity: 0 }, { opacity: 0.3, duration: 1, stagger: 0.05, ease: "power2.out" })

      // Animate central hub
      gsap.fromTo(
        ".central-hub",
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)", delay: 0.2 },
      )

      // Animate navigation items
      gsap.fromTo(
        ".nav-item",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)", delay: 0.4 },
      )

      // Animate social icons
      gsap.fromTo(
        ".social-icon",
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out", delay: 0.6 },
      )
    }
  }, [isOpen])

  const toggleMenu = () => {
    if (isOpen) {
      // Animate out
      gsap.to(".nav-overlay", {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => setIsOpen(false),
      })
    } else {
      setIsOpen(true)
    }
  }

  const getItemPosition = (position: string) => {
    const positions = {
      top: "top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
      "top-right": "top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2",
      right: "top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2",
      "bottom-right": "bottom-1/3 right-1/4 transform translate-x-1/2 translate-y-1/2",
      bottom: "bottom-1/4 left-1/2 transform -translate-x-1/2 translate-y-1/2",
      "bottom-left": "bottom-1/3 left-1/4 transform -translate-x-1/2 translate-y-1/2",
      left: "top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2",
    }
    return positions[position as keyof typeof positions] || positions.top
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-8 right-8 z-50 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
      >
        <Menu size={24} />
      </button>

      {/* Spaceship Navigation Overlay */}
      {isOpen && (
        <div className="nav-overlay fixed inset-0 z-40 bg-black">
          {/* Grid Pattern Background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Vertical Lines */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`v-${i}`}
                className="grid-line absolute top-0 bottom-0 w-px bg-white/20"
                style={{ left: `${(i + 1) * 5}%` }}
              />
            ))}
            {/* Horizontal Lines */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`h-${i}`}
                className="grid-line absolute left-0 right-0 h-px bg-white/20"
                style={{ top: `${(i + 1) * 8.33}%` }}
              />
            ))}
          </div>

          {/* Close Button */}
          <button
            onClick={toggleMenu}
            className="absolute top-8 left-8 z-50 w-12 h-12 text-white hover:scale-110 transition-transform"
          >
            <X size={32} />
          </button>

          {/* Social Icons */}
          <div className="absolute top-8 right-8 flex space-x-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              return (
                <a
                  key={index}
                  href={social.href}
                  className="social-icon w-10 h-10 text-white hover:text-gray-300 transition-colors"
                >
                  <Icon size={24} />
                </a>
              )
            })}
          </div>

          {/* Central Hub */}
          <div className="central-hub absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center relative">
              <div className="w-8 h-8 bg-black rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>

              {/* Directional Arrows */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-white"></div>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-white"></div>
              </div>
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
                <div className="w-0 h-0 border-t-2 border-b-2 border-r-4 border-transparent border-r-white"></div>
              </div>
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                <div className="w-0 h-0 border-t-2 border-b-2 border-l-4 border-transparent border-l-white"></div>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          {navItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Link
                key={index}
                href={item.href}
                onClick={toggleMenu}
                className={`nav-item absolute ${getItemPosition(item.position)} group`}
              >
                <div className="flex flex-col items-center space-y-2 text-white hover:text-gray-300 transition-colors">
                  <div className="w-16 h-16 border border-white/30 rounded-lg flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-all">
                    <Icon size={24} />
                  </div>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
              </Link>
            )
          })}

          {/* Large Background Circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white/10 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>

          {/* Bottom Text */}
          <div className="absolute bottom-8 left-8 text-white/60 text-xs">COPYRIGHT© 2024 ALL RIGHTS RESERVED</div>
          <div className="absolute bottom-8 right-8 flex space-x-6 text-white/60 text-xs">
            <span>COOKIE SETTINGS</span>
            <span>PRIVACY POLICY</span>
            <span>LEGAL DISCLAIMER</span>
          </div>
        </div>
      )}
    </>
  )
}
