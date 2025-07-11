"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Users, Trophy, BookOpen, Code } from "lucide-react"

const stats = [
  { icon: Users, value: "150+", label: "Active Members" },
  { icon: Trophy, value: "25+", label: "Hackathon Wins" },
  { icon: BookOpen, value: "50+", label: "Workshops Conducted" },
  { icon: Code, value: "100+", label: "Projects Completed" },
]

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Ensure elements are visible
    gsap.set(".stat-card", { opacity: 1, visibility: "visible" })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    })

    tl.fromTo(
      ".stat-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      },
    )

    // Counter animation
    stats.forEach((stat, index) => {
      const value = Number.parseInt(stat.value.replace("+", ""))
      const element = document.querySelector(`.stat-value-${index}`)

      if (element) {
        gsap.fromTo(
          element,
          { textContent: 0 },
          {
            textContent: value,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            onUpdate: function () {
              const current = Math.ceil(this.targets()[0].textContent)
              this.targets()[0].textContent = current + "+"
            },
          },
        )
      }
    })
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="stat-card text-center p-8 rounded-2xl bg-white border border-black/10 hover:border-black/30 transition-all hover:shadow-xl interactive"
                style={{ opacity: 1, visibility: "visible" }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4">
                  <Icon size={24} />
                </div>
                <div className={`stat-value-${index} text-4xl font-black text-black mb-2`}>{stat.value}</div>
                <div className="text-black/60 font-medium">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
