"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Crown, Award, Star } from "lucide-react"

const leaders = [
  {
    name: "Mann Acharya",
    role: "Mentor / Ex-Chairperson",
    icon: Crown,
    description: "Visionary leader who established the foundation of AI Society",
    achievements: ["Founded AI Society", "Published 10+ Papers", "Industry Mentor"],
  },
  {
    name: "Samaksh Tyagi",
    role: "President",
    icon: Award,
    description: "Current president driving innovation and community growth",
    achievements: ["Led 25+ Projects", "Hackathon Champion", "Research Leader"],
  },
  {
    name: "Aviral Jain",
    role: "Vice President",
    icon: Star,
    description: "Strategic operations leader and community builder",
    achievements: ["Operations Excellence", "Community Growth", "Partnership Development"],
  },
]

export default function Leadership() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    })

    tl.fromTo(".leadership-header", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
      .fromTo(
        ".leadership-card",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" },
        "-=0.5",
      );
  }, [])

  return (
    // This component now has standard, self-contained padding.
    <section 
      ref={sectionRef} 
      className="leadership-section bg-black text-white py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <div className="leadership-header text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Leadership
            <br />
            <span className="text-white/60">Excellence</span>
          </h2>
          <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Meet the visionary leaders shaping the future of AI education and research
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {leaders.map((leader, index) => {
            const Icon = leader.icon
            return (
              <div
                key={index}
                className="leadership-card bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:border-white hover:bg-white/10 transition-all group"
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-white group-hover:bg-black border-2 border-white rounded-full mx-auto mb-4 flex items-center justify-center transition-all">
                    <Icon size={32} className="text-black group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{leader.name}</h3>
                  <p className="text-lg text-white/60 mb-4">{leader.role}</p>
                  <p className="text-white/70 leading-relaxed">{leader.description}</p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider">Key Achievements</h4>
                  {leader.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-white/70 text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}