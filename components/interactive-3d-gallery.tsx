"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Calendar, MapPin, Users } from "lucide-react"
import { useMobileOptimization, getOptimizedDuration } from "./mobile-optimized-animations"

interface Event {
  id: number
  title: string
  date: string
  location: string
  attendees: number
  image: string
  description: string
}

const pastEvents: Event[] = [
  {
    id: 1,
    title: "AI Workshop 2024",
    date: "Dec 15, 2024",
    location: "Innovation Lab",
    attendees: 120,
    image: "/placeholder.svg?height=300&width=400",
    description: "Comprehensive AI workshop covering machine learning fundamentals",
  },
  {
    id: 2,
    title: "HackAI Championship",
    date: "Nov 20, 2024",
    location: "Main Auditorium",
    attendees: 500,
    image: "/placeholder.svg?height=300&width=400",
    description: "48-hour hackathon with AI challenges and innovations",
  },
  {
    id: 3,
    title: "Research Symposium",
    date: "Oct 10, 2024",
    location: "University Hall",
    attendees: 200,
    image: "/placeholder.svg?height=300&width=400",
    description: "Annual research presentation and networking event",
  },
  {
    id: 4,
    title: "Industry Connect",
    date: "Sep 5, 2024",
    location: "Campus Center",
    attendees: 150,
    image: "/placeholder.svg?height=300&width=400",
    description: "Networking with AI industry professionals",
  },
  {
    id: 5,
    title: "Ethics Panel",
    date: "Aug 15, 2024",
    location: "Virtual + Campus",
    attendees: 300,
    image: "/placeholder.svg?height=300&width=400",
    description: "Discussion on AI ethics and societal impact",
  },
  {
    id: 6,
    title: "Startup Pitch Day",
    date: "Jul 20, 2024",
    location: "Innovation Hub",
    attendees: 80,
    image: "/placeholder.svg?height=300&width=400",
    description: "AI startup pitches to investors and mentors",
  },
]

export default function Interactive3DGallery() {
  const galleryRef = useRef<HTMLDivElement>(null)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const { isMobile, reducedMotion } = useMobileOptimization()

  useEffect(() => {
    const cards = document.querySelectorAll(".gallery-card")

    cards.forEach((card, index) => {
      // Initial 3D positioning (simplified for performance)
      gsap.set(card, {
        rotationY: isMobile ? 0 : (index % 3) * 15 - 15,
        rotationX: isMobile ? 0 : Math.sin(index) * 5,
        z: isMobile ? 0 : index * -50,
        transformPerspective: 1000,
        willChange: "transform", // Add will-change for performance
      })

      if (reducedMotion) return

      // Hover animations
      const handleMouseEnter = () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          z: isMobile ? 0 : 100,
          scale: isMobile ? 1.05 : 1.1,
          duration: getOptimizedDuration(0.6, isMobile, reducedMotion),
          ease: "power3.out",
        })

        // Move other cards away
        cards.forEach((otherCard, otherIndex) => {
          if (otherIndex !== index) {
            gsap.to(otherCard, {
              opacity: 0.3,
              scale: 0.9,
              duration: getOptimizedDuration(0.3, isMobile, reducedMotion),
              ease: "power2.out",
            })
          }
        })
      }

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotationY: isMobile ? 0 : (index % 3) * 15 - 15,
          rotationX: isMobile ? 0 : Math.sin(index) * 5,
          z: isMobile ? 0 : index * -50,
          scale: 1,
          duration: getOptimizedDuration(0.6, isMobile, reducedMotion),
          ease: "power3.out",
        })

        // Restore other cards
        cards.forEach((otherCard) => {
          gsap.to(otherCard, {
            opacity: 1,
            scale: 1,
            duration: getOptimizedDuration(0.3, isMobile, reducedMotion),
            ease: "power2.out",
          })
        })
      }

      card.addEventListener("mouseenter", handleMouseEnter)
      card.addEventListener("mouseleave", handleMouseLeave)
    })

    // Floating animation
    if (!reducedMotion) {
      gsap.to(".gallery-card", {
        y: isMobile ? -5 : -10,
        duration: getOptimizedDuration(2, isMobile, reducedMotion),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      })
    }
  }, [isMobile, reducedMotion])

  return (
    <div className="py-12 sm:py-20 px-4 bg-black text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6">
            Past
            <br />
            <span className="text-white/60">Events</span>
          </h2>
          <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-white mx-auto mb-6 sm:mb-8"></div>
          <p className="text-base sm:text-xl text-white/70 max-w-2xl mx-auto px-4">
            Relive the moments that shaped our AI community through immersive 3D gallery
          </p>
        </div>

        <div
          ref={galleryRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        >
          {pastEvents.map((event, index) => (
            <div
              key={event.id}
              className="gallery-card bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 cursor-pointer transform-gpu will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
              onClick={() => setSelectedEvent(event)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-40 sm:h-48 object-cover transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-2">{event.title}</h3>
                  <p className="text-white/80 text-sm sm:text-sm">{event.description}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-white/70">
                    <Calendar size={16} />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/70">
                    <MapPin size={16} />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/70">
                    <Users size={16} />
                    <span className="text-sm">{event.attendees} attendees</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for selected event */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedEvent.image || "/placeholder.svg"}
              alt={selectedEvent.title}
              className="w-full h-64 object-cover rounded-xl mb-6"
              loading="lazy"
            />
            <h3 className="text-3xl font-bold text-white mb-4">{selectedEvent.title}</h3>
            <p className="text-white/80 text-base mb-6">{selectedEvent.description}</p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <Calendar className="w-6 h-6 mx-auto mb-2 text-white/60" />
                <div className="text-white font-semibold">{selectedEvent.date}</div>
              </div>
              <div>
                <MapPin className="w-6 h-6 mx-auto mb-2 text-white/60" />
                <div className="text-white font-semibold">{selectedEvent.location}</div>
              </div>
              <div>
                <Users className="w-6 h-6 mx-auto mb-2 text-white/60" />
                <div className="text-white font-semibold">{selectedEvent.attendees}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
