"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Award, Users, Rocket, Globe, Trophy } from "lucide-react"

const timelineData = [
  {
    year: "2020",
    title: "Foundation",
    description: "AI Society established with 20 founding members passionate about artificial intelligence.",
    icon: Rocket,
    color: "bg-blue-500",
  },
  {
    year: "2021",
    title: "First Hackathon Win",
    description: "Secured first place in National AI Challenge with innovative healthcare solution.",
    icon: Trophy,
    color: "bg-green-500",
  },
  {
    year: "2022",
    title: "Research Publications",
    description: "Published 5 research papers in international conferences and journals.",
    icon: Award,
    color: "bg-purple-500",
  },
  {
    year: "2023",
    title: "Industry Partnerships",
    description: "Established collaborations with leading tech companies and startups.",
    icon: Users,
    color: "bg-orange-500",
  },
  {
    year: "2024",
    title: "Global Recognition",
    description: "Recognized as top student AI community in Asia-Pacific region.",
    icon: Globe,
    color: "bg-red-500",
  },
]

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Ensure elements are visible
    gsap.set([".timeline-header", ".timeline-item", ".timeline-line"], {
      opacity: 1,
      visibility: "visible",
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    })

    tl.fromTo(".timeline-header", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
      .fromTo(".timeline-line", { scaleY: 0 }, { scaleY: 1, duration: 1.5, ease: "power3.out", transformOrigin: "top" })
      .fromTo(
        ".timeline-item",
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.3, ease: "power3.out" },
        "-=1",
      )
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-black/5" style={{ opacity: 1, visibility: "visible" }}>
      <div className="max-w-4xl mx-auto">
        <div className="timeline-header text-center mb-16" style={{ opacity: 1, visibility: "visible" }}>
          <h2 className="text-5xl md:text-6xl font-black text-black mb-6">Our Journey</h2>
          <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
          <p className="text-xl text-black/70 max-w-2xl mx-auto">
            From humble beginnings to global recognition - the evolution of AI Society
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="timeline-line absolute left-8 top-0 w-0.5 h-full bg-black origin-top"
            style={{ opacity: 1, visibility: "visible" }}
          ></div>

          <div className="space-y-12">
            {timelineData.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="timeline-item relative flex items-start space-x-8"
                  style={{ opacity: 1, visibility: "visible" }}
                >
                  {/* Timeline dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center shadow-lg`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs font-bold text-black">
                      {item.year}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white p-8 rounded-2xl border border-black/10 hover:border-black/30 transition-all hover:shadow-xl group">
                    <h3 className="text-2xl font-bold text-black mb-3 group-hover:text-black/80 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-black/70 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
