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

      {/* --- FLOATING STAR SHAPES --- */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {/* Red Star */}
        <svg className="float-element absolute top-[10%] left-[5%] w-24 h-24 sm:w-40 sm:h-40" style={{ animationDelay: '0s' }} viewBox="0 0 200 200" fill="none">
          <path d="M146.171 100C161.187 97.0302 175.962 89.6912 184.977 80.047L195.212 69.0981L180.496 66.2558C167.534 63.7521 151.267 66.5 137.373 72.9237C147.776 61.6944 155.416 47.0726 157.04 33.9716L158.885 19.0981L145.309 25.4484C133.351 31.0419 121.806 42.826 114.34 56.1898C116.156 40.9907 113.743 24.6707 107.356 13.1167L100.106 0L92.8553 13.1167C86.4688 24.6707 84.0554 40.9907 85.8712 56.1898C78.406 42.826 66.8609 31.0414 54.9028 25.4484L41.327 19.0981L43.1712 33.9716C44.7958 47.0726 52.4358 61.6944 62.8386 72.9237C48.9446 66.5 32.6772 63.7526 19.7153 66.2558L5 69.0981L15.2344 80.047C24.2493 89.6912 39.0242 97.0298 54.0409 100C39.0247 102.97 24.2493 110.308 15.2344 119.953L5 130.902L19.7153 133.744C32.6772 136.248 48.9442 133.5 62.8386 127.076C52.4358 138.306 44.7958 152.927 43.1712 166.028L41.327 180.901L54.9023 174.552C66.8605 168.958 78.4056 157.174 85.8707 143.81C84.0549 159.009 86.4684 175.329 92.8549 186.883L100.105 200L107.355 186.883C113.742 175.329 116.155 159.009 114.34 143.81C121.805 157.174 133.35 168.959 145.308 174.552L158.883 180.901L157.039 166.028C155.414 152.927 147.774 138.306 137.372 127.076C151.266 133.5 167.533 136.247 180.495 133.744L195.21 130.902L184.976 119.953C175.962 110.309 161.187 102.97 146.171 100Z" fill="url(#paint0_red)"/>
          <defs>
            <linearGradient id="paint0_red" x1="100.106" y1="0" x2="100.106" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EF4444"/>
              <stop offset="1" stopColor="#FCA5A5"/>
            </linearGradient>
          </defs>
        </svg>

        {/* Yellow Star */}
        <svg className="float-element absolute top-[20%] right-[10%] w-20 h-20 sm:w-32 sm:h-32" style={{ animationDelay: '0.5s' }} viewBox="0 0 200 200" fill="none">
          <path d="M146.171 100C161.187 97.0302 175.962 89.6912 184.977 80.047L195.212 69.0981L180.496 66.2558C167.534 63.7521 151.267 66.5 137.373 72.9237C147.776 61.6944 155.416 47.0726 157.04 33.9716L158.885 19.0981L145.309 25.4484C133.351 31.0419 121.806 42.826 114.34 56.1898C116.156 40.9907 113.743 24.6707 107.356 13.1167L100.106 0L92.8553 13.1167C86.4688 24.6707 84.0554 40.9907 85.8712 56.1898C78.406 42.826 66.8609 31.0414 54.9028 25.4484L41.327 19.0981L43.1712 33.9716C44.7958 47.0726 52.4358 61.6944 62.8386 72.9237C48.9446 66.5 32.6772 63.7526 19.7153 66.2558L5 69.0981L15.2344 80.047C24.2493 89.6912 39.0242 97.0298 54.0409 100C39.0247 102.97 24.2493 110.308 15.2344 119.953L5 130.902L19.7153 133.744C32.6772 136.248 48.9442 133.5 62.8386 127.076C52.4358 138.306 44.7958 152.927 43.1712 166.028L41.327 180.901L54.9023 174.552C66.8605 168.958 78.4056 157.174 85.8707 143.81C84.0549 159.009 86.4684 175.329 92.8549 186.883L100.105 200L107.355 186.883C113.742 175.329 116.155 159.009 114.34 143.81C121.805 157.174 133.35 168.959 145.308 174.552L158.883 180.901L157.039 166.028C155.414 152.927 147.774 138.306 137.372 127.076C151.266 133.5 167.533 136.247 180.495 133.744L195.21 130.902L184.976 119.953C175.962 110.309 161.187 102.97 146.171 100Z" fill="url(#paint0_yellow)"/>
          <defs>
            <linearGradient id="paint0_yellow" x1="100.106" y1="0" x2="100.106" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EAB308"/>
              <stop offset="1" stopColor="#FDE047"/>
            </linearGradient>
          </defs>
        </svg>

        {/* Green Star */}
        <svg className="float-element absolute bottom-[15%] left-[15%] w-28 h-28 sm:w-48 sm:h-48" style={{ animationDelay: '1s' }} viewBox="0 0 200 200" fill="none">
          <path d="M146.171 100C161.187 97.0302 175.962 89.6912 184.977 80.047L195.212 69.0981L180.496 66.2558C167.534 63.7521 151.267 66.5 137.373 72.9237C147.776 61.6944 155.416 47.0726 157.04 33.9716L158.885 19.0981L145.309 25.4484C133.351 31.0419 121.806 42.826 114.34 56.1898C116.156 40.9907 113.743 24.6707 107.356 13.1167L100.106 0L92.8553 13.1167C86.4688 24.6707 84.0554 40.9907 85.8712 56.1898C78.406 42.826 66.8609 31.0414 54.9028 25.4484L41.327 19.0981L43.1712 33.9716C44.7958 47.0726 52.4358 61.6944 62.8386 72.9237C48.9446 66.5 32.6772 63.7526 19.7153 66.2558L5 69.0981L15.2344 80.047C24.2493 89.6912 39.0242 97.0298 54.0409 100C39.0247 102.97 24.2493 110.308 15.2344 119.953L5 130.902L19.7153 133.744C32.6772 136.248 48.9442 133.5 62.8386 127.076C52.4358 138.306 44.7958 152.927 43.1712 166.028L41.327 180.901L54.9023 174.552C66.8605 168.958 78.4056 157.174 85.8707 143.81C84.0549 159.009 86.4684 175.329 92.8549 186.883L100.105 200L107.355 186.883C113.742 175.329 116.155 159.009 114.34 143.81C121.805 157.174 133.35 168.959 145.308 174.552L158.883 180.901L157.039 166.028C155.414 152.927 147.774 138.306 137.372 127.076C151.266 133.5 167.533 136.247 180.495 133.744L195.21 130.902L184.976 119.953C175.962 110.309 161.187 102.97 146.171 100Z" fill="url(#paint0_green)"/>
          <defs>
            <linearGradient id="paint0_green" x1="100.106" y1="0" x2="100.106" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#22C55E"/>
              <stop offset="1" stopColor="#86EFAC"/>
            </linearGradient>
          </defs>
        </svg>

        {/* Violet Star */}
        <svg className="float-element absolute bottom-[5%] right-[5%] w-24 h-24 sm:w-40 sm:h-40" style={{ animationDelay: '1.5s' }} viewBox="0 0 200 200" fill="none">
          <path d="M146.171 100C161.187 97.0302 175.962 89.6912 184.977 80.047L195.212 69.0981L180.496 66.2558C167.534 63.7521 151.267 66.5 137.373 72.9237C147.776 61.6944 155.416 47.0726 157.04 33.9716L158.885 19.0981L145.309 25.4484C133.351 31.0419 121.806 42.826 114.34 56.1898C116.156 40.9907 113.743 24.6707 107.356 13.1167L100.106 0L92.8553 13.1167C86.4688 24.6707 84.0554 40.9907 85.8712 56.1898C78.406 42.826 66.8609 31.0414 54.9028 25.4484L41.327 19.0981L43.1712 33.9716C44.7958 47.0726 52.4358 61.6944 62.8386 72.9237C48.9446 66.5 32.6772 63.7526 19.7153 66.2558L5 69.0981L15.2344 80.047C24.2493 89.6912 39.0242 97.0298 54.0409 100C39.0247 102.97 24.2493 110.308 15.2344 119.953L5 130.902L19.7153 133.744C32.6772 136.248 48.9442 133.5 62.8386 127.076C52.4358 138.306 44.7958 152.927 43.1712 166.028L41.327 180.901L54.9023 174.552C66.8605 168.958 78.4056 157.174 85.8707 143.81C84.0549 159.009 86.4684 175.329 92.8549 186.883L100.105 200L107.355 186.883C113.742 175.329 116.155 159.009 114.34 143.81C121.805 157.174 133.35 168.959 145.308 174.552L158.883 180.901L157.039 166.028C155.414 152.927 147.774 138.306 137.372 127.076C151.266 133.5 167.533 136.247 180.495 133.744L195.21 130.902L184.976 119.953C175.962 110.309 161.187 102.97 146.171 100Z" fill="url(#paint0_violet)"/>
          <defs>
            <linearGradient id="paint0_violet" x1="100.106" y1="0" x2="100.106" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8B5CF6"/>
              <stop offset="1" stopColor="#C4B5FD"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="page-header text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium mb-8">
            <Megaphone size={16} />
            <span>Stay Updated</span>
          </div>
          <TextReveal className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black mb-6 leading-tight">
            Announcements
          </TextReveal>
          <div className="w-24 h-1 bg-black mx-auto mb-8"></div>
          <p className="text-lg sm:text-xl text-black/70 max-w-3xl mx-auto leading-relaxed px-4">
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
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${announcement.color} rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1 w-full sm:w-auto">
                      <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-x-4 gap-y-2 mb-3">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${
                          announcement.type === "urgent" ? "bg-red-100 text-red-800"
                          : announcement.type === "event" ? "bg-blue-100 text-blue-800"
                          : announcement.type === "opportunity" ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                        }`}>{announcement.type}</span>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-black/60 text-sm">
                          <div className="flex items-center space-x-1"><Calendar size={14} /><span>{announcement.date}</span></div>
                          <div className="flex items-center space-x-1"><Clock size={14} /><span>{announcement.time}</span></div>
                        </div>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-black mb-3 break-words">{announcement.title}</h3>
                      <p className="text-black/70 leading-relaxed text-sm sm:text-base">{announcement.description}</p>
                    </div>
                    {announcement.type === "urgent" && (
                      <div className="flex-shrink-0 self-start sm:self-center"><div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div></div>
                    )}
                  </div>
                </div>
              </InteractiveCard>
            )
          })}
        </div>

        <div className="mt-20 text-center">
          <InteractiveCard className="bg-black text-white p-8 sm:p-12 rounded-2xl" spillColor="rgba(59, 130, 246, 0.2)">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
              <Megaphone size={24} className="text-blue-400" />
              <h2 className="text-2xl sm:text-3xl font-bold text-center">Never Miss an Update</h2>
              <Star size={24} className="text-yellow-400" />
            </div>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto text-sm sm:text-base px-4">
              Subscribe to our announcement feed and get instant notifications about important updates, deadlines, and opportunities.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base" />
              <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors text-sm sm:text-base whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </InteractiveCard>
        </div>
      </div>
    </div>
  )
}