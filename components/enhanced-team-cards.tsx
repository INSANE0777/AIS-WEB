"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code, Megaphone, Crown } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

// Custom Star SVG Component
const CustomStar = () => (
  <svg 
    width="32" 
    height="32" 
    viewBox="0 0 52 52" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300 ease-in-out group-hover:rotate-180"
  >
    <path 
      d="M44.2345 28.3441C41.7101 23.8868 37.3274 25.1485 32.388 25.1102C30.6796 25.0726 29.7887 22.9926 30.9403 21.7302C33.3549 19.4653 35.8065 17.646 36.7727 15.2322C38.2591 11.5187 37.1456 8.91865 33.432 7.43221C29.7185 5.94577 27.1185 7.05933 25.632 10.7729C24.6658 13.1867 25.1851 16.1951 25.1843 19.4262C25.1468 21.1346 23.0668 22.0254 21.8043 20.8738C18.2026 17.4933 16.0866 13.6303 11.1839 15.1147C9.43823 15.7085 8.10094 16.8967 7.43205 18.5678C5.9456 22.2813 7.05916 24.8813 10.7727 26.3678C13.1865 27.334 16.1949 26.8147 19.426 26.8155C21.1344 26.853 22.0252 28.933 20.8736 30.1955C18.6447 32.5347 16.1931 34.354 15.2269 36.7678C13.7405 40.4813 14.8541 43.0813 18.5676 44.5678C22.2812 46.0542 24.8812 44.9406 26.3676 41.2271C27.3338 38.8133 26.8146 35.8049 26.8153 32.5738C26.8529 30.8654 28.9329 29.9746 30.1953 31.1262C32.7202 33.4294 34.3538 35.8067 36.7676 36.7729C40.4812 38.2593 43.0812 37.1458 44.5676 33.4322C45.2365 31.7611 45.0884 29.9784 44.2345 28.3441Z" 
      fill="black"
    />
  </svg>
);

const teamData = {
  executives: {
    members: [
      // Top Tier
      {
        name: "Ayush Tandon",
        role: "Vice President",
        avatar: "/images/ayush.jpg",
      },
      {
        name: "Afjal Hussein",
        role: "President",
        avatar: "/images/AFJAL.jpg",
      },
      {
        name: "Devansh Tyagi",
        role: "General Secretary",
        avatar: "/images/DEVANSH.jpg",
      },
      {
        name: "Arisha Ali",
        role: "Advisor",
        avatar: "/images/arisha.jpg",
      },
     
      {
        name: "Kriti Sharma",
        role: "Chief Operating Officer",
        avatar: "/images/kriti.jpg",
      },
      {
        name: "Aviral Gupta",
        role: "Chief Marketing Officer",
        avatar: "/images/aviral.jpg",
      },
      {
        name: "Gyanendra Prakash",
        role: "Chief Technical Officer",
        avatar: "/images/gyanendra.jpg",
      },
    ],
  },
  technical: {
    departments: {
      "Natural Language Processing": ["Jackiv Garg", "Ohm Gupta"],
      "Reinforcement Learning": ["Saatvik Sharma", "Someone"],
      "Computer Vision": ["Himanshu Shekhar", "Tanish Ramgopal"],
      "Generative AI": ["Pranav Kumar", "Sneh Gupta"],
      "Research":["Avishi Mishra","Arpit Bhardwaj"]
    },
  },
  community: {
    departments: {
      "Social Media": ["Siddhi Sanap", "Someone"],
      "Design Team": ["Aditi Garg", "Aashima Makani"],
      "Management": ["Samridhi Agrawal", "Lakshay Khasa"],
      "Pr/Outreach": ["Ayushka Mandal", "Sarbojit Das", "Vamika Singh"],
      "Multimedia": ["Krishna Goyal", "Someone"],
    },
  },
}

export default function EnhancedTeamCards() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".team-card")

    gsap.fromTo(
      cards,
      {
        autoAlpha: 0,
        y: 50,
        scale: 0.9,
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    )

    cards.forEach((card) => {
      const q = gsap.utils.selector(card)
      const content = q(".card-content")
      const glare = q(".card-glare")
      
      const setX = gsap.quickSetter(card, "rotationY", "deg")
      const setY = gsap.quickSetter(card, "rotationX", "deg")
      const setGlareX = gsap.quickSetter(glare, "x", "%")
      const setGlareY = gsap.quickSetter(glare, "y", "%")

      gsap.set(card, { transformStyle: "preserve-3d", transformPerspective: 800 })
      gsap.set(content, { transformStyle: "preserve-3d" })
      gsap.set(q(".card-icon, .card-avatar"), { transform: "translateZ(80px) "})
      gsap.set(q(".card-title"), { transform: "translateZ(60px)" })
      gsap.set(q(".card-role, .card-members"), { transform: "translateZ(40px)" })
      gsap.set(q(".card-specialty"), { transform: "translateZ(20px)" })


      const onMouseMove = (e: MouseEvent) => {
        const { left, top, width, height } = card.getBoundingClientRect()
        const x = gsap.utils.clamp(-1, 1, (e.clientX - left) / width * 2 - 1)
        const y = gsap.utils.clamp(-1, 1, (e.clientY - top) / height * 2 - 1)
        
        setX(x * 12)
        setY(y * -12)
        setGlareX(x * 100)
        setGlareY(y * 100)
      }

      const onMouseEnter = () => {
        gsap.to(card, { scale: 1.05, duration: 0.4, ease: "power2.out" })
        gsap.to(glare, { autoAlpha: 1, duration: 0.3 })
      }

      const onMouseLeave = () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
        })
        gsap.to(glare, { autoAlpha: 0, duration: 0.5 })
      }

      card.addEventListener("mousemove", onMouseMove)
      card.addEventListener("mouseenter", onMouseEnter)
      card.addEventListener("mouseleave", onMouseLeave)
      
      return () => {
        card.removeEventListener("mousemove", onMouseMove)
        card.removeEventListener("mouseenter", onMouseEnter)
        card.removeEventListener("mouseleave", onMouseLeave)
      }
    })

  }, [])

  // Splitting executive members for layout purposes
  const topExecutives = teamData.executives.members.slice(0, 3);
  const centralOfficers = teamData.executives.members.slice(3);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-4 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.02)_0%,_transparent_50%)]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-20 group">
          <div className="flex items-center justify-center gap-4 mb-6">
            <CustomStar />
            <h2 className="text-5xl md:text-6xl font-black text-black">
              Meet Our
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-black">
                Dream Team
              </span>
            </h2>
            <CustomStar />
          </div>
          <p className="text-lg md:text-xl text-black max-w-2xl mx-auto">
            Passionate individuals driving innovation and excellence in artificial intelligence
          </p>
        </div>

        <div className="mb-16 md:mb-20">
          <h3 className="text-3xl font-bold text-black mb-8 text-center">Executive Leadership</h3>
          
          {/* Top Row of Executives */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {topExecutives.map((member) => (
              <div key={member.name} className="team-card will-change-transform">
                <div className="card-content w-full h-full bg-white/70 p-8 rounded-2xl border border-gray-300 backdrop-blur-md text-center relative overflow-hidden">
                   <div className="card-glare absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_var(--mx)_var(--my),rgba(0,0,0,0.1),rgba(0,0,0,0)_40%)] opacity-0 pointer-events-none"></div>
                   <div className="card-avatar relative mb-6">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-black relative">
                      <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="card-icon absolute -top-2 -right-2 w-10 h-10 bg-black border-2 border-white rounded-full flex items-center justify-center">
                      <Crown size={20} className="text-white" />
                    </div>
                  </div>
                  <h3 className="card-title text-2xl font-bold text-black mb-2">{member.name}</h3>
                  <p className="card-role text-lg text-black mb-3 font-semibold">{member.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Centered Row for Advisor, CMO, CTO, and COO */}
          <div className="mt-8 flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {centralOfficers.map((member) => (
                <div key={member.name} className="team-card will-change-transform">
                  <div className="card-content w-full h-full bg-white/70 p-8 rounded-2xl border border-gray-300 backdrop-blur-md text-center relative overflow-hidden">
                    <div className="card-glare absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_var(--mx)_var(--my),rgba(0,0,0,0.1),rgba(0,0,0,0)_40%)] opacity-0 pointer-events-none"></div>
                    <div className="card-avatar relative mb-6">
                      <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-black relative">
                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="card-icon absolute -top-2 -right-2 w-10 h-10 bg-black border-2 border-white rounded-full flex items-center justify-center">
                        <Crown size={20} className="text-white" />
                      </div>
                    </div>
                    <h3 className="card-title text-2xl font-bold text-black mb-2">{member.name}</h3>
                    <p className="card-role text-lg text-black mb-3 font-semibold">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="mb-16 md:mb-0">
                <h3 className="text-3xl font-bold text-black mb-8 text-center">Technical Departments</h3>
                <div className="space-y-8">
                    {Object.entries(teamData.technical.departments).map(([dept, members]) => (
                        <div key={dept} className="team-card will-change-transform">
                            <div className="card-content w-full h-full bg-white/70 p-6 rounded-2xl border border-gray-300 backdrop-blur-md relative overflow-hidden">
                                <div className="card-glare absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_var(--mx)_var(--my),rgba(0,0,0,0.1),rgba(0,0,0,0)_40%)] opacity-0 pointer-events-none"></div>
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="card-icon w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                        <Code size={20} className="text-white" />
                                    </div>
                                    <h3 className="card-title text-xl font-bold text-black">{dept}</h3>
                                </div>
                                <div className="card-members grid grid-cols-2 gap-x-4 gap-y-2 pl-4">
                                    {members.map((member) => (
                                        <div key={member} className="flex items-center space-x-2.5">
                                            <div className="w-1.5 h-1.5 bg-black rounded-full" />
                                            <span className="text-black font-medium">{member}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-3xl font-bold text-black mb-8 text-center">Community Outreach</h3>
                <div className="space-y-8">
                    {Object.entries(teamData.community.departments).map(([dept, members]) => (
                        <div key={dept} className="team-card will-change-transform">
                             <div className="card-content w-full h-full bg-white/70 p-6 rounded-2xl border border-gray-300 backdrop-blur-md relative overflow-hidden">
                                <div className="card-glare absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_var(--mx)_var(--my),rgba(0,0,0,0.1),rgba(0,0,0,0)_40%)] opacity-0 pointer-events-none"></div>
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="card-icon w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                        <Megaphone size={20} className="text-white" />
                                    </div>
                                    <h3 className="card-title text-xl font-bold text-black">{dept}</h3>
                                </div>
                                <div className="card-members grid grid-cols-2 gap-x-4 gap-y-2 pl-4">
                                    {members.map((member) => (
                                        <div key={member} className="flex items-center space-x-2.5">
                                            <div className="w-1.5 h-1.5 bg-black rounded-full" />
                                            <span className="text-black font-medium">{member}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}