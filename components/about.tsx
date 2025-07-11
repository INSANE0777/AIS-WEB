"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Brain, Lightbulb, Target, Rocket } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Research Excellence",
    description: "Cutting-edge AI research with published papers and innovative solutions.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Hub",
    description: "Fostering creativity and breakthrough ideas in artificial intelligence.",
  },
  {
    icon: Target,
    title: "Skill Development",
    description: "Comprehensive training programs and mentorship opportunities.",
  },
  {
    icon: Rocket,
    title: "Industry Impact",
    description: "Real-world applications and industry collaborations.",
  },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Ensure elements are visible
    gsap.set([textRef.current, ".feature-card"], { opacity: 1, visibility: "visible" })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    })

    tl.fromTo(
      textRef.current,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      },
    ).fromTo(
      ".feature-card",
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      },
      "-=0.5",
    )
  }, [])

  return (
    <section ref={sectionRef} className="py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div ref={textRef} className="space-y-8" style={{ opacity: 1, visibility: "visible" }}>
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-black text-black leading-tight">
                What is
                <br />
                <span className="text-black/60">AI Society?</span>
              </h2>
              <div className="w-24 h-1 bg-black"></div>
            </div>

            <div className="space-y-6 text-lg text-black/70 leading-relaxed">
              <p>
                The Artificial Intelligence Society (AIS) at Bennett University stands as one of the most
                research-focused and collaborative student communities on campus.
              </p>
              <p>
                Our mission transcends traditional learning boundaries—we foster deep understanding of AI applications
                by uniting passionate individuals eager to publish research, share knowledge, and pioneer innovative
                projects.
              </p>
              <p>
                We believe in collective growth, mentoring future leaders, and creating an inclusive ecosystem where
                every member can flourish and contribute to the AI revolution.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <span className="text-white font-bold">150+</span>
              </div>
              <span className="text-black font-semibold">Active researchers and developers</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="feature-card p-8 rounded-2xl bg-white border border-black/10 hover:border-black hover:shadow-2xl transition-all duration-300 interactive group"
                  style={{ opacity: 1, visibility: "visible" }}
                >
                  <div className="w-14 h-14 bg-black group-hover:bg-white border-2 border-black rounded-full flex items-center justify-center mb-6 transition-all">
                    <Icon size={24} className="text-white group-hover:text-black transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">{feature.title}</h3>
                  <p className="text-black/60 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
