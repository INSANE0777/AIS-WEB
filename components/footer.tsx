"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Github, Instagram, Linkedin, Mail, MapPin, ExternalLink, Heart, Zap } from "lucide-react"
import MagneticButton from "./magnetic-button"

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

const quickLinks = [
  { name: "About Us", href: "#about" },
  { name: "Projects", href: "/projects" },
  { name: "Events", href: "/events" },
  { name: "Research", href: "#research" },
  { name: "Join Us", href: "/join" },
]

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Ensure footer is visible
    gsap.set(".footer-content", { opacity: 1, visibility: "visible" })

    gsap.fromTo(
      ".footer-content",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Floating animation for social icons
    gsap.to(".social-icon", {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2,
    })
  }, [])

  return (
    <footer
      ref={footerRef}
      className="bg-black text-white py-20 px-4 relative overflow-hidden"
      style={{ opacity: 1, visibility: "visible" }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/10 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white/10 rounded-full animate-bounce"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="footer-content lg:col-span-2" style={{ opacity: 1, visibility: "visible" }}>
            <div className="flex items-center space-x-3 mb-6">
              <h3 className="text-4xl font-black">AI Society</h3>
              <div className="flex items-center space-x-1">
                <Heart size={20} className="text-red-500 animate-pulse" />
                <Zap size={20} className="text-yellow-500 animate-bounce" />
              </div>
            </div>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-md">
              Training minds, one epoch at a time. Bennett University's premier artificial intelligence research
              community pushing the boundaries of innovation.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 group">
                <MapPin size={20} className="text-white/60 group-hover:text-white transition-colors" />
                <span className="text-white/80 group-hover:text-white transition-colors">
                  Bennett University, Greater Noida, India
                </span>
              </div>
              <div className="flex items-center space-x-3 group">
                <Mail size={20} className="text-white/60 group-hover:text-white transition-colors" />
                <a
                  href="mailto:ais@bennett.edu.in"
                  className="text-white/80 hover:text-white transition-colors interactive"
                >
                  ais@bennett.edu.in
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-content" style={{ opacity: 1, visibility: "visible" }}>
            <h4 className="text-xl font-bold mb-6 flex items-center space-x-2">
              <span>Quick Links</span>
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            </h4>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-white/70 hover:text-white transition-colors interactive flex items-center space-x-2 group"
                >
                  <span className="group-hover:translate-x-2 transition-transform">{link.name}</span>
                  <ExternalLink
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:rotate-45"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Connect Section */}
          <div className="footer-content" style={{ opacity: 1, visibility: "visible" }}>
            <h4 className="text-xl font-bold mb-6">Connect With Us</h4>
            <div className="flex space-x-4 mb-8">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <MagneticButton
                    key={index}
                    className="social-icon w-12 h-12 bg-white/10 hover:bg-white hover:text-black rounded-full flex items-center justify-center transition-all interactive group"
                  >
                    <Icon size={20} className="group-hover:scale-110 transition-transform" />
                  </MagneticButton>
                )
              })}
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-white/30 transition-all group">
              <h5 className="font-semibold mb-3 flex items-center space-x-2">
                <span>Join Our Community</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </h5>
              <p className="text-white/70 text-sm mb-4">Get updates on events, workshops, and opportunities.</p>
              <MagneticButton className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors interactive group">
                <span className="group-hover:scale-105 transition-transform inline-block">Subscribe Now</span>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className="footer-content border-t border-white/20 mt-16 pt-8"
          style={{ opacity: 1, visibility: "visible" }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm flex items-center space-x-2">
              <span>© 2025 AI Society, Specialization Club of Bennett University Under SCSET BU</span>
              <Heart size={16} className="text-red-500 animate-pulse" />
            </p>
            <div className="flex items-center space-x-6 text-sm text-white/60">
              <a href="#" className="hover:text-white transition-colors interactive group">
                <span className="group-hover:underline">Privacy Policy</span>
              </a>
              <a href="#" className="hover:text-white transition-colors interactive group">
                <span className="group-hover:underline">Terms of Service</span>
              </a>
              <a href="#" className="hover:text-white transition-colors interactive group">
                <span className="group-hover:underline">Code of Conduct</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
