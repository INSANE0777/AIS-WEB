"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Github, Code, Brain, Zap, Users } from "lucide-react"
import MagneticButton from "@/components/magnetic-button"
import OptimizedScrollCard from "@/components/optimized-scroll-card"
import DirectionAwareHover from "@/components/direction-aware-hover"
import FluidGradient from "@/components/fluid-gradient"
import { useMobileOptimization, getOptimizedDuration, getOptimizedEase } from "@/components/mobile-optimized-animations"
import { data } from "@/data/projects" // Import the new data

export default function Projects() {
  const pageRef = useRef<HTMLDivElement>(null)
  const { isMobile, reducedMotion } = useMobileOptimization()

  useEffect(() => {
    // Optimized floating animations
    if (!reducedMotion) {
      gsap.to(".float-icon", {
        y: isMobile ? -10 : -20,
        rotation: isMobile ? 5 : 10,
        duration: getOptimizedDuration(3, isMobile, reducedMotion),
        repeat: -1,
        yoyo: true,
        ease: getOptimizedEase(isMobile),
        stagger: 0.3,
      })
    }
  }, [isMobile, reducedMotion])

  return (
    <div ref={pageRef} className="pt-20 sm:pt-32 pb-10 sm:pb-20 px-4 min-h-screen relative">
      <FluidGradient />

      {/* Optimized Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Code className="float-icon absolute top-20 left-4 sm:left-10 w-6 h-6 sm:w-8 sm:h-8 text-black/10" />
        <Brain className="float-icon absolute top-40 right-4 sm:right-20 w-8 h-8 sm:w-10 sm:h-10 text-black/10" />
        <Zap className="float-icon absolute bottom-40 left-4 sm:left-20 w-5 h-5 sm:w-6 sm:h-6 text-black/10" />
        <Users className="float-icon absolute bottom-20 right-8 sm:right-40 w-6 h-6 sm:w-8 sm:h-8 text-black/10" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Mobile-Optimized Header */}
        <div className="text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center space-x-2 bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8">
            <Code size={14} className="sm:w-4 sm:h-4" />
            <span>Innovation in Action</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-black mb-4 sm:mb-6 leading-tight">
            Our
            
            <span className="text-black"> Projects</span>
          </h1>

          <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-black mx-auto mb-6 sm:mb-8"></div>
          <p className="text-lg sm:text-xl text-black/70 max-w-3xl mx-auto leading-relaxed px-4">
            Innovative AI solutions that push the boundaries of technology and create real-world impact across various
            domains.
          </p>
        </div>

        {/* Optimized Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {data.projects.map((project, index) => (
            <OptimizedScrollCard key={project.id} index={index}>
              <DirectionAwareHover className="bg-white/90 backdrop-blur-sm p-4 sm:p-8 rounded-xl sm:rounded-2xl border border-black/10 hover:border-black hover:shadow-2xl transition-all group">
                {/* Mobile-Optimized Project Image */}
                <div className="mb-4 sm:mb-6 overflow-hidden rounded-lg sm:rounded-xl">
                  <img
                    src={project.imagePath || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-32 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Mobile-Optimized Project Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 sm:px-3 py-1 bg-black text-white text-xs sm:text-sm rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-black group-hover:text-black/80 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex space-x-2 sm:ml-4">
                    {project.githubLink && (
                      <MagneticButton
                        className="w-8 h-8 sm:w-10 sm:h-10 bg-black/5 hover:bg-black hover:text-white rounded-full flex items-center justify-center transition-all"
                        onClick={() => window.open(project.githubLink, "_blank")}
                      >
                        <Github size={14} className="sm:w-4 sm:h-4" />
                      </MagneticButton>
                    )}
                    {/* Assuming there might be a live link, if not, remove this button */}
                    {/* <MagneticButton className="w-8 h-8 sm:w-10 sm:h-10 bg-black/5 hover:bg-black hover:text-white rounded-full flex items-center justify-center transition-all">
                      <ExternalLink size={14} className="sm:w-4 sm:h-4" />
                    </MagneticButton> */}
                  </div>
                </div>

                {/* Mobile-Optimized Project Description */}
                <p className="text-sm sm:text-base text-black/70 leading-relaxed mb-4 sm:mb-6">{project.description}</p>

                {/* Contributors */}
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-black/60 uppercase tracking-wider mb-2 sm:mb-3">
                    Contributors
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.contributors.map((contributor, i) => (
                      <span
                        key={i}
                        className="px-2 sm:px-3 py-1 bg-black/5 text-black text-xs sm:text-sm rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer"
                      >
                        {contributor}
                      </span>
                    ))}
                  </div>
                </div>
              </DirectionAwareHover>
            </OptimizedScrollCard>
          ))}
        </div>

        {/* Mobile-Optimized CTA Section */}
        <div className="text-center mt-12 sm:mt-20">
          <OptimizedScrollCard className="bg-black text-white p-6 sm:p-12 rounded-xl sm:rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black"></div>
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
                <Brain size={20} className="sm:w-6 sm:h-6 text-blue-400" />
                <h2 className="text-2xl sm:text-3xl font-bold text-center">Have a Project Idea?</h2>
                <Zap size={20} className="sm:w-6 sm:h-6 text-yellow-400" />
              </div>
              <p className="text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base px-4">
                Join our community and bring your AI vision to life. We're always looking for innovative projects and
                passionate collaborators.
              </p>
              <MagneticButton className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white/90 transition-colors text-sm sm:text-base">
                Propose a Project
              </MagneticButton>
            </div>
          </OptimizedScrollCard>
        </div>
      </div>
    </div>
  )
}