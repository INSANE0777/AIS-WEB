"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import {
  Megaphone,
  Calendar,
  Clock,
  Star,
  AlertCircle,
  Trophy,
  Zap,
} from "lucide-react"
import TextReveal from "@/components/text-reveal"
import InteractiveCard from "@/components/InteractiveCard"
import FluidGradient from "@/components/fluid-gradient"

const announcements = [
  { id: 1, type: "urgent", title: "HackAI 2025 Registration Extended", description: "Due to overwhelming response, we've extended the registration deadline for HackAI 2025 by one week.", date: "2025-01-15", time: "11:59 PM", icon: Trophy, color: "from-red-500 to-orange-500" },
  { id: 2, type: "event", title: "Guest Lecture: Future of AI", description: "Join us for an exclusive lecture by Dr. Sarah Chen, AI Research Director at Google DeepMind.", date: "2025-01-20", time: "3:00 PM", icon: Star, color: "from-blue-500 to-purple-500" },
  { id: 3, type: "opportunity", title: "Research Internship Applications Open", description: "Apply for summer research internships with our partner companies and research institutions.", date: "2025-01-25", time: "5:00 PM", icon: Zap, color: "from-green-500 to-teal-500" },
  { id: 4, type: "general", title: "New AI Lab Equipment Arrival", description: "State-of-the-art GPU clusters and quantum computing simulators now available for member projects.", date: "2025-01-10", time: "9:00 AM", icon: AlertCircle, color: "from-purple-500 to-pink-500" },
]

const spillColorMap: { [key: string]: string } = {
  urgent: "rgba(239, 68, 68, 0.15)",
  event: "rgba(59, 130, 246, 0.15)",
  opportunity: "rgba(16, 185, 129, 0.15)",
  general: "rgba(168, 85, 247, 0.15)",
}

export default function Announcements() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      ".page-header",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
    ).fromTo(
      ".announcement-card",
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)" },
      "-=0.8",
    )

    gsap.to(".float-element", {
      y: -20,
      rotation: 10,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.5,
    })
  }, [])

  return (
    <div ref={pageRef} className="pt-32 pb-20 px-4 min-h-screen relative overflow-hidden">
      <FluidGradient />

      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 cursor-pointer hover:scale-110 transition-transform duration-300">
        <img src="/images/BIAS.png" alt="AI Society Logo" className="w-12 h-12 sm:w-16 sm:h-16 object-contain drop-shadow-lg" />
      </div>

      {/* --- FLOATING FLOWERS (OPACITY REMOVED) --- */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <Image src="/images/fleur-rouge.png" alt="Red Flower" width={200} height={200} className="float-element absolute top-[10%] left-[5%] w-24 h-24 sm:w-40 sm:h-40" style={{ animationDelay: '0s' }} />
        <Image src="/images/fleur-jaune.png" alt="Yellow Flower" width={200} height={200} className="float-element absolute top-[20%] right-[10%] w-20 h-20 sm:w-32 sm:h-32" style={{ animationDelay: '0.5s' }}/>
        <Image src="/images/fleur-verte.png" alt="Green Flower" width={200} height={200} className="float-element absolute bottom-[15%] left-[15%] w-28 h-28 sm:w-48 sm:h-48" style={{ animationDelay: '1s' }}/>
        <Image src="/images/fleur-violet.png" alt="Violet Flower" width={200} height={200} className="float-element absolute bottom-[5%] right-[5%] w-24 h-24 sm:w-40 sm:h-40" style={{ animationDelay: '1.5s' }}/>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="page-header text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium mb-8">
            <Megaphone size={16} />
            <span>Stay Updated</span>
          </div>
          <TextReveal className="text-6xl md:text-7xl font-black text-black mb-6">
            Announcements
          </TextReveal>
          <div className="w-24 h-1 bg-black mx-auto mb-8"></div>
          <p className="text-xl text-black/70 max-w-3xl mx-auto leading-relaxed">
            Stay informed about the latest updates, opportunities, and events from the AI Society community.
          </p>
        </div>

        <div className="space-y-8">
          {announcements.map((announcement) => {
            const Icon = announcement.icon
            return (
              <InteractiveCard
                key={announcement.id}
                spillColor={spillColorMap[announcement.type]}
                className="announcement-card bg-white/90 backdrop-blur-sm rounded-2xl border border-black/10 transition-all duration-300 group-hover:border-black/30 group-hover:shadow-xl"
              >
                <div className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${announcement.color} rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${
                          announcement.type === "urgent" ? "bg-red-100 text-red-800"
                          : announcement.type === "event" ? "bg-blue-100 text-blue-800"
                          : announcement.type === "opportunity" ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                        }`}>{announcement.type}</span>
                        <div className="flex items-center space-x-4 text-black/60 text-sm">
                          <div className="flex items-center space-x-1"><Calendar size={14} /><span>{announcement.date}</span></div>
                          <div className="flex items-center space-x-1"><Clock size={14} /><span>{announcement.time}</span></div>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-black mb-3">{announcement.title}</h3>
                      <p className="text-black/70 leading-relaxed">{announcement.description}</p>
                    </div>
                    {announcement.type === "urgent" && (
                      <div className="flex-shrink-0"><div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div></div>
                    )}
                  </div>
                </div>
              </InteractiveCard>
            )
          })}
        </div>

        <div className="mt-20 text-center">
          <InteractiveCard className="bg-black text-white p-12 rounded-2xl" spillColor="rgba(59, 130, 246, 0.2)">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Megaphone size={24} className="text-blue-400" />
              <h2 className="text-3xl font-bold">Never Miss an Update</h2>
              <Star size={24} className="text-yellow-400" />
            </div>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Subscribe to our announcement feed and get instant notifications about important updates, deadlines, and opportunities.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-white" />
              <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors">
                Subscribe
              </button>
            </div>
          </InteractiveCard>
        </div>
      </div>
    </div>
  )
}