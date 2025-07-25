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
  const numberRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Ensure elements are visible
    gsap.set([textRef.current, ".feature-card"], { opacity: 1, visibility: "visible" })

    // Continuous floating animation for icons
    gsap.to(".floating-icon", {
      y: -8,
      duration: 1.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.2
    })

    // Rotate animation for brain icon
    gsap.to(".rotating-brain", {
      rotation: 360,
      duration: 10,
      ease: "none",
      repeat: -1
    })

    // Number counter animation
    if (numberRef.current) {
      gsap.fromTo(
        numberRef.current,
        { innerHTML: 0 },
        {
          innerHTML: 150,
          duration: 2,
          ease: "power2.out",
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          onUpdate: function () {
            const current = Math.ceil(this.targets()[0].innerHTML)
            this.targets()[0].innerHTML = current + "+"
          },
        }
      )
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    })

    // Enhanced text animation with 3D effects
    tl.fromTo(
      textRef.current,
      { 
        x: -150, 
        opacity: 0,
        rotationY: 45,
        scale: 0.8
      },
      {
        x: 0,
        opacity: 1,
        rotationY: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.4)",
      },
    )
    // Staggered card animations with bounce and rotation
    .fromTo(
      ".feature-card",
      { 
        x: 120, 
        opacity: 0,
        rotation: 10,
        scale: 0.7
      },
      {
        x: 0,
        opacity: 1,
        rotation: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "elastic.out(1, 0.6)",
      },
      "-=0.4",
    )
    // Add a subtle shake to the title
    .to(".title-shake", {
      x: 5,
      duration: 0.1,
      yoyo: true,
      repeat: 3,
      ease: "power2.inOut"
    }, "-=0.2")

    // Particle effects
    const createParticles = () => {
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div')
        particle.className = 'absolute w-2 h-2 bg-black/20 rounded-full pointer-events-none'
        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100}%`
        sectionRef.current?.appendChild(particle)
        
        gsap.to(particle, {
          y: -80,
          x: Math.random() * 100 - 50,
          opacity: 0,
          scale: 0,
          duration: Math.random() * 2 + 2,
          ease: "power2.out",
          repeat: -1,
          delay: Math.random() * 3
        })
      }
    }
    
    createParticles()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div ref={textRef} className="space-y-8" style={{ opacity: 1, visibility: "visible" }}>
            <div className="space-y-6">
              <h2 className="title-shake text-5xl md:text-6xl font-black text-black leading-tight">
                What is
                <br />
                <span className="text-black/60 inline-block hover:text-black transition-colors duration-300">AI Society?</span>
              </h2>
              <div className="w-24 h-1 bg-black transform hover:scale-x-150 hover:bg-gray-700 transition-all duration-300 origin-left"></div>
            </div>

            <div className="space-y-6 text-lg text-black/70 leading-relaxed">
              <p className="transform hover:translate-x-2 transition-transform duration-300">
                The Artificial Intelligence Society (AIS) at Bennett University stands as one of the most
                research-focused and collaborative student communities on campus.
              </p>
              <p className="transform hover:translate-x-2 transition-transform duration-300">
                Our mission transcends traditional learning boundaries—we foster deep understanding of AI applications
                by uniting passionate individuals eager to publish research, share knowledge, and pioneer innovative
                projects.
              </p>
              <p className="transform hover:translate-x-2 transition-transform duration-300">
                We believe in collective growth, mentoring future leaders, and creating an inclusive ecosystem where
                every member can flourish and contribute to the AI revolution.
              </p>
            </div>

            <div className="flex items-center space-x-4 group">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <span ref={numberRef} className="text-white font-bold">150+</span>
              </div>
              <span className="text-black font-semibold group-hover:text-gray-700 transition-colors duration-300">Active researchers and developers</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="feature-card relative p-8 rounded-2xl bg-white border border-black/10 hover:border-black hover:shadow-2xl transition-all duration-500 interactive group hover:scale-105 hover:-translate-y-2"
                  style={{ opacity: 1, visibility: "visible" }}
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gray-100 opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-sm"></div>
                  
                  <div className="relative">
                    <div className={`w-14 h-14 bg-black group-hover:bg-white border-2 border-black rounded-full flex items-center justify-center mb-6 transition-all duration-300 shadow-lg group-hover:shadow-xl ${index === 0 ? 'floating-icon rotating-brain' : 'floating-icon'} group-hover:rotate-12`}>
                      <Icon size={24} className="text-white group-hover:text-black transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-black mb-3 group-hover:text-gray-800 transition-colors duration-300">{feature.title}</h3>
                    <p className="text-black/60 leading-relaxed group-hover:text-black/80 transition-colors duration-300">{feature.description}</p>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-black/5 group-hover:bg-black/10 transition-colors duration-300 rounded-bl-2xl rounded-tr-2xl"></div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}