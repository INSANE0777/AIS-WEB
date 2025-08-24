// projects/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
// Import GSAP premium plugins
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { Github, Code, Brain, Zap, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { data } from "@/data/projects";
import MagneticButton from "@/components/magnetic-button";
import OptimizedScrollCard from "@/components/optimized-scroll-card";

export default function Projects() {
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement>(null);
  const svgShape1Ref = useRef<SVGSVGElement>(null);
  const svgShape2Ref = useRef<SVGSVGElement>(null);
  const headerIconRef = useRef<SVGSVGElement>(null);
  const headerBadgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(DrawSVGPlugin, MorphSVGPlugin);
    
    const ctx = gsap.context(() => {
      // --- Page Load Animations ---
      const tl = gsap.timeline({
        defaults: { duration: 0.8, ease: "power3.out" },
      });

      tl.fromTo(
        ".header-content",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1 }
      );
      tl.fromTo(
        ".project-card",
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.1 },
        "-=0.5"
      );
      
      // --- Floating SVGs Continuous Animation ---
      const svgPaths = [
        svgShape1Ref.current?.querySelector('path'),
        svgShape2Ref.current?.querySelector('path')
      ].filter(Boolean);

      if (svgPaths.length > 0) {
        tl.from(svgPaths, {
            drawSVG: "0%",
            duration: 2.5,
            stagger: 0.3,
            ease: "power2.inOut",
          }, 0.2)
          .to(svgPaths, {
            fillOpacity: 0.5,
            stroke: 'none',
          }, "-=1.5");
      }

      // Basic floating movement
      gsap.to(svgShape1Ref.current, {
        y: -20, x: 15, rotation: 10,
        duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
      gsap.to(svgShape2Ref.current, {
        y: 25, x: -20, rotation: -15,
        duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5,
      });

      // Define the three shapes for the continuous morphing loop
      const morphShapes = [
        "M100.019 138.694C14.5644 254.761 -54.7168 185.48 61.3282 99.9966C-54.77 14.5263 14.5112 -54.7279 100.019 61.3122C185.473 -54.7678 254.754 14.5263 138.709 99.9966C254.701 185.48 185.42 254.761 100.019 138.694Z",
        "M139.997 139.994C220.001 220.002 -20.0011 220.002 60.0033 139.994C-20.0011 220.002 -20.0011 -19.9992 60.0033 59.9975C-20.0011 -19.9992 220.001 -19.9992 139.997 59.9975C220.001 -19.9992 220.001 220.002 139.997 139.994Z",
        "M100 173.738C24.3644 236.944 -36.9438 175.636 26.2621 100C-36.9438 24.3644 24.3644 -36.9438 100 26.2621C175.621 -36.9438 236.944 24.3644 173.738 100C236.944 175.578 175.621 236.944 100 173.738Z"
      ];
      
      // Function to create the continuous morphing timeline
      const setupContinuousMorph = (svgElement: SVGSVGElement | null, shapes: string[]) => {
        if (!svgElement) return;
        const path = svgElement.querySelector('path');
        if (!path) return;

        const morphTl = gsap.timeline({
            repeat: -1, // Loop forever
            yoyo: true, // Play forwards, then backwards for a smooth loop
            defaults: { duration: 2.5, ease: "sine.inOut" } // Duration for each morph step
        });
        
        // Add each shape to the timeline
        shapes.forEach(shape => {
            morphTl.to(path, { morphSVG: shape }, "+=1"); // "+=1" adds a 1-second pause between morphs
        });
      };
      
      // Start the animations for both SVGs
      setupContinuousMorph(svgShape1Ref.current, morphShapes);
      // Use a reversed array for the second SVG to de-synchronize them
      setupContinuousMorph(svgShape2Ref.current, [...morphShapes].reverse());


      // --- Header Icon Morphing Animation (on hover) ---
      const headerIcon = headerIconRef.current;
      const headerIconPath = headerIcon?.querySelector('#header-icon-path');
      const headerBadge = headerBadgeRef.current;
      const headerIconMorphTarget = "M200 0V60L200 200H140V130.033C139.982 168.678 108.649 200 70 200C31.3401 200 0 168.66 0 130C0 91.3401 31.3401 60 70 60C108.649 60 139.982 91.3222 140 129.967V60H70H0V0L140 0L200 0Z";
      
      if (headerIcon && headerIconPath && headerBadge) {
        const headerMorphTimeline = gsap.timeline({
          paused: true,
          defaults: { duration: 0.5, ease: "power2.inOut" }
        })
        .to(headerIconPath, { morphSVG: headerIconMorphTarget })
        .to(headerIcon, { scale: 1.1, rotate: 20 }, 0);

        const handleMouseEnter = () => headerMorphTimeline.play();
        const handleMouseLeave = () => headerMorphTimeline.reverse();

        headerBadge.addEventListener("mouseenter", handleMouseEnter);
        headerBadge.addEventListener("mouseleave", handleMouseLeave);
      }

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleProjectClick = (projectId: number) => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <div ref={pageRef} className="pt-20 sm:pt-32 pb-10 sm:pb-20 px-4 min-h-screen relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-50" />

      <img 
          src="/images/BIAS.png" 
          alt="AI Society Logo" 
          className="absolute top-4 left-4 sm:left-8 z-20 object-contain drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 cursor-pointer hover:scale-110 w-24 h-24 sm:w-16 sm:h-16"
      />
      
      <div className="relative w-full h-full">
        {/* THE FIX: pointer-events-none on container ensures no interference */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <svg 
            ref={svgShape1Ref}
            width="100" 
            height="100" 
            viewBox="0 0 200 200" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-20 right-20 opacity-50"
          >
            <path d="M123.344 200C100 200 100 143.969 76.6558 143.969C49.7872 143.969 0 150.205 0 123.338C0 99.9951 56.0242 99.995 56.0242 76.652C56.0242 49.7946 49.7872 0 76.6558 0C100 0 100 56.0313 123.344 56.0313C150.213 56.0313 200 49.7946 200 76.652C200 99.995 143.966 99.9951 143.966 123.338C143.966 150.205 150.213 200 123.344 200Z" fill="black"/>
          </svg>

          <svg 
            ref={svgShape2Ref}
            width="100" 
            height="100" 
            viewBox="0 0 200 200" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-40 left-20 opacity-50"
          >
            <path d="M100 173.738C24.3644 236.944 -36.9438 175.636 26.2621 100C-36.9438 24.3644 24.3644 -36.9438 100 26.2621C175.621 -36.9438 236.944 24.3644 173.738 100C236.944 175.578 175.621 236.944 100 173.738Z" fill="black"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="relative text-center mb-12 sm:mb-20 pt-12 sm:pt-16">
            <div className="relative z-10">
              <div ref={headerBadgeRef} className="header-content inline-flex items-center space-x-2 bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8 cursor-pointer">
                <svg
                  ref={headerIconRef}
                  width="20"
                  height="20"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_231_793)">
                    <path
                      id="header-icon-path"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M50 0H200V50V150L150 200L150 50H0L50 0ZM0 165.067V100L65.067 100L0 165.067ZM100 200H35.7777L100 135.778L100 200Z"
                      fill="#FFFFFF"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_231_793">
                      <rect width="200" height="200" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span>Innovation in Action</span>
              </div>
              <h1 className="header-content text-4xl sm:text-6xl md:text-7xl font-black text-black mb-4 sm:mb-6 leading-tight">
                Our
                <span className="text-black"> Projects</span>
              </h1>
              <div className="header-content w-16 sm:w-24 h-0.5 sm:h-1 bg-black mx-auto mb-6 sm:mb-8"></div>
              
              <p className="header-content text-lg sm:text-xl text-black font-medium max-w-3xl mx-auto leading-relaxed px-4">
                Innovative AI solutions that push the boundaries of technology and
                create real-world impact across various domains.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {data.projects.map((project, index) => (
              <Card
                key={project.id}
                className="project-card group cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-200/60 hover:border-gray-300/80 rounded-2xl"
                onClick={() => handleProjectClick(project.id)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 flex items-end justify-center pb-8">
                  <div className="text-white text-center px-6">
                    <div className="flex items-center justify-center space-x-2 text-sm font-medium">
                      <span>View Project Details</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img src={project.imagePath || "/placeholder.svg"} alt={project.title} className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  </div>
                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors px-3 py-1 rounded-full">{tag}</Badge>
                        ))}
                      </div>
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors leading-tight">{project.title}</h3>
                        {project.githubLink && (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="w-10 h-10 hover:bg-gray-100 hover:text-gray-900 transition-all shrink-0 ml-4 rounded-full"
                            onClick={(e) => { e.stopPropagation(); window.open(project.githubLink, "_blank"); }}
                          >
                            <Github size={18} />
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="border-l-4 border-gray-200 pl-4">
                      <p className="text-black leading-relaxed text-sm sm:text-base line-clamp-3">{project.description}</p>
                    </div>
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-black uppercase tracking-wider">Contributors</h4>
                        <div className="text-xs text-black/70">{project.contributors.length} member{project.contributors.length !== 1 ? "s" : ""}</div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.contributors.map((contributor, i) => (
                          <Badge key={i} variant="outline" className="text-xs bg-white border-gray-200 text-black hover:bg-gray-50 transition-colors px-3 py-1 rounded-full">{contributor}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

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
                  Join our community and bring your AI vision to life. We're always looking for innovative projects and passionate collaborators.
                </p>
                <MagneticButton className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white/90 transition-colors text-sm sm:text-base">
                  Propose a Project
                </MagneticButton>
              </div>
            </OptimizedScrollCard>
          </div>
        </div>
      </div>
    </div>
  );
}