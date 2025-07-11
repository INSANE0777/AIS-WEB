"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Home, Briefcase, Calendar, Mail, Users, Megaphone } from "lucide-react"
import { gsap } from "gsap"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Announcements", href: "/announcements", icon: Megaphone }, // Added Announcements
  { name: "Join Us", href: "/join", icon: Users },
  { name: "Contact", href: "/contact", icon: Mail },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Ensure navbar is visible
    gsap.set(".nav-container", { opacity: 1, visibility: "visible" })

    // Animate navigation on mount
    gsap.fromTo(
      ".nav-container",
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      },
    )

    // Floating animation
    gsap.to(".nav-container", {
      y: -5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)

    if (!isOpen) {
      gsap.to(".mobile-menu", {
        x: 0,
        duration: 0.5,
        ease: "power3.out",
      })
      gsap.from(".mobile-nav-item", {
        x: 50,
        opacity: 0,
        duration: 0.3,
        stagger: 0.1,
        delay: 0.2,
        ease: "power3.out",
      })
    } else {
      gsap.to(".mobile-menu", {
        x: "100%",
        duration: 0.5,
        ease: "power3.in",
      })
    }
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className="nav-container fixed top-8 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md border border-black/20 rounded-full px-8 py-4 shadow-2xl"
        style={{ opacity: 1, visibility: "visible" }}
      >
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className="text-2xl font-black text-black hover:scale-110 transition-transform interactive relative group"
          >
            <span className="relative z-10">AIS</span>
            <div className="absolute inset-0 bg-black rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              AIS
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center space-x-2 px-4 py-2 rounded-full transition-all interactive relative overflow-hidden ${
                    pathname === item.href ? "bg-black text-white" : "text-black hover:bg-black hover:text-white"
                  }`}
                >
                  <Icon size={16} className="relative z-10" />
                  <span className="font-medium relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-full hover:bg-black/10 transition-colors interactive relative group"
          >
            <div className="relative z-10">{isOpen ? <X size={24} /> : <Menu size={24} />}</div>
            <div className="absolute inset-0 bg-black rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="mobile-menu fixed top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-md border-l border-black/20 z-40 transform translate-x-full md:hidden shadow-2xl">
        <div className="p-8 pt-24">
          <div className="space-y-6">
            {navItems.map((item, index) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`mobile-nav-item group flex items-center space-x-4 p-4 rounded-lg transition-all interactive relative overflow-hidden ${
                    pathname === item.href ? "bg-black text-white" : "text-black hover:bg-black hover:text-white"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={20} className="relative z-10" />
                  <span className="text-lg font-medium relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden" onClick={() => setIsOpen(false)} />
      )}
    </>
  )
}
