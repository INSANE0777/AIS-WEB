"use client"

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, Lightbulb, Target, Rocket } from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// --- Main About Component ---

const features = [
  { icon: Brain, title: "Research Excellence", description: "Cutting-edge AI research with published papers and innovative solutions." },
  { icon: Lightbulb, title: "Innovation Hub", description: "Fostering creativity and breakthrough ideas in artificial intelligence." },
  { icon: Target, title: "Skill Development", description: "Comprehensive training programs and mentorship opportunities." },
  { icon: Rocket, title: "Industry Impact", description: "Real-world applications and industry collaborations." },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  // GSAP animations for elements
  useEffect(() => {
    // Number counter animation (runs once on scroll)
    if (numberRef.current) {
      gsap.fromTo( numberRef.current, { innerHTML: 0 }, {
          innerHTML: 150, duration: 2, ease: "power2.out", snap: { innerHTML: 1 },
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
          onUpdate: function () { this.targets()[0].innerHTML = Math.ceil(this.targets()[0].innerHTML) + "+" }
      });
    }

    // Entrance animations for text and cards (run once on scroll)
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%", end: "bottom 20%", toggleActions: "play none none reverse" },
    });

    tl.fromTo( textRef.current, { x: -150, opacity: 0, rotationY: 45, scale: 0.8 }, { x: 0, opacity: 1, rotationY: 0, scale: 1, duration: 0.8, ease: "back.out(1.4)" } )
      .fromTo( ".feature-card", { opacity: 0, scale: 0.5, y: 100 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "elastic.out(1, 0.6)" }, "-=0.4" );
  }, []);

  return (
    <section 
      ref={sectionRef} 
      // Reverted class to original state
      className="relative py-32 px-4 overflow-hidden bg-white"
    >
       <style jsx global>{`
          .feature-card {
            position: relative;
            background-color: white;
            border-radius: 1.25rem; /* 20px */
            border: 1px solid rgba(0,0,0,0.05);
            /* CHANGED: Removed the box-shadow property that was creating the line */
            transition: transform 0.4s ease; /* CHANGED: Removed box-shadow from transition */
            overflow: hidden; /* Crucial for the corner effect */
          }
          .feature-card:hover {
            transform: translateY(-8px); /* Subtle lift effect */
            /* CHANGED: Removed the hover box-shadow */
          }
          
          /* The content of the card */
          .card-content {
            position: relative;
            z-index: 2; /* Ensure content is on top of the peel */
          }

          /* The peeling corner effect (the gray triangle) */
          .feature-card::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            border-style: solid;
            border-width: 0 0 0 0;
            border-color: transparent transparent #e0e0e0 transparent; /* The color of the peeled back corner */
            transition: border-width 0.3s ease-out;
            z-index: 1; /* Below content */
          }
          .feature-card:hover::before {
             border-width: 0 0 70px 70px;
          }

          /* The shadow that appears under the peeling corner */
          .feature-card::after {
            content: '';
            position: absolute;
            top: 0px;
            right: 0px;
            width: 0px;
            height: 0px;
            background: radial-gradient(circle at top right, rgba(0,0,0,0.25) 0%, transparent 60%);
            transition: width 0.3s ease-out, height 0.3s ease-out;
            z-index: 0; /* Farthest back */
          }
           .feature-card:hover::after {
            width: 70px;
            height: 70px;
          }
        `}</style>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div ref={textRef} className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-black text-black leading-tight">
                What is <br/>
                <span className="text-black/60">AI Society?</span>
              </h2>
              <div className="w-24 h-1 bg-black"></div>
            </div>
            <div className="space-y-6 text-lg text-black/70 leading-relaxed">
              <p>The AI Specialization Club (AIS) at Bennett University is dedicated to cultivating a strong passion for Artificial Intelligence. The club focuses on end-to-end project development, excels in hackathons, organizes insightful workshops, and helps members upskill through guidance from senior mentors and experienced faculty. We also actively contribute to open-source development.</p>
              <p>To empower students with practical AI knowledge, collaborative opportunities, and innovative thinking to shape impactful solutions for the future</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-lg">
                <span ref={numberRef} className="text-white font-bold">150</span>
              </div>
              <span className="text-black font-semibold">Active researchers and developers</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="feature-card group">
                  <div className="card-content p-8">
                    <div className={`w-14 h-14 bg-black rounded-full flex items-center justify-center mb-6 shadow-md 
                                  group-hover:bg-white transition-colors duration-300`}>
                      <Icon size={24} className="text-white group-hover:text-black transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-black mb-3">{feature.title}</h3>
                    <p className="text-black/60 leading-relaxed">{feature.description}</p>
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