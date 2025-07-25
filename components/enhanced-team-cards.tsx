

"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code, Megaphone, Crown } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const teamData = {
  executives: {
    members: [
      {
        name: "Samaksh Tyagi",
        role: "President",
        specialty: "AI Strategy & Vision",
        avatar: "/placeholder.svg?height=128&width=128&query=professional+man+in+suit",
      },
      {
        name: "Aviral Jain",
        role: "Vice President",
        specialty: "Operations & Growth",
        avatar: "/placeholder.svg?height=128&width=128&query=professional+man+with+glasses",
      },
      {
        name: "Mann Acharya",
        role: "Mentor / Ex-Chairperson",
        specialty: "Strategic Guidance",
        avatar: "/placeholder.svg?height=128&width=128&query=experienced+wise+mentor",
      },
    ],
  },
  technical: {
    departments: {
      "Natural Language Processing": ["Madhav Gupta", "Sanya Wadhawan"],
      "Reinforcement Learning": ["Afjal Hussein", "Gyanendra Prakash"],
      "Computer Vision": ["Mayank Kumar", "Sukant Aryan"],
      "Generative AI": ["Aniya Tyagi", "Archit Ojha"],
    },
  },
  community: {
    departments: {
      "Social Media": ["Anvesh Mishra", "Palak Virk"],
      "Design Team": ["Dhruv Kumar", "Pragyan Pant"],
      "Event Management": ["Arisha Ali", "Anshika Agrahari"],
      "Content Creation": ["Shruti Pandey", "Raghav Karnatak"],
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

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-4 bg-white dark:bg-black relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(128,128,128,0.08)_0%,_transparent_50%)] dark:bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_60%)]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
            Meet Our
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-900 dark:from-gray-400 dark:to-white">
              Dream Team
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Passionate individuals driving innovation and excellence in artificial intelligence
          </p>
        </div>

        <div className="mb-16 md:mb-20">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Executive Leadership</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {teamData.executives.members.map((member) => (
              <div key={member.name} className="team-card will-change-transform">
                <div className="card-content w-full h-full bg-white/50 dark:bg-gray-900/50 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl backdrop-blur-md text-center relative overflow-hidden">
                   <div className="card-glare absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_var(--mx)_var(--my),rgba(255,255,255,0.6),rgba(255,255,255,0)_40%)] dark:bg-[radial-gradient(circle_at_var(--mx)_var(--my),rgba(255,255,255,0.15),rgba(255,255,255,0)_50%)] opacity-0 pointer-events-none"></div>
                   <div className="card-avatar relative mb-6">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-900 dark:border-white relative">
                      <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="card-icon absolute -top-2 -right-2 w-10 h-10 bg-gray-900 dark:bg-white border-2 border-white dark:border-gray-900 rounded-full flex items-center justify-center">
                      <Crown size={20} className="text-white dark:text-gray-900" />
                    </div>
                  </div>
                  <h3 className="card-title text-2xl font-bold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                  <p className="card-role text-lg text-gray-600 dark:text-gray-300 mb-3 font-semibold">{member.role}</p>
                  <p className="card-specialty text-sm text-gray-500 dark:text-gray-400">{member.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="mb-16 md:mb-0">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Technical Departments</h3>
                <div className="space-y-8">
                    {Object.entries(teamData.technical.departments).map(([dept, members]) => (
                        <div key={dept} className="team-card will-change-transform">
                            <div className="card-content w-full h-full bg-white/50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl backdrop-blur-md relative overflow-hidden">
                                <div className="card-glare absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_var(--mx)_var(--my),rgba(255,255,255,0.6),rgba(255,255,255,0)_40%)] dark:bg-[radial-gradient(circle_at_var(--mx)_var(--my),rgba(255,255,255,0.15),rgba(255,255,255,0)_50%)] opacity-0 pointer-events-none"></div>
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="card-icon w-12 h-12 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center flex-shrink-0">
                                        <Code size={20} className="text-white dark:text-gray-900" />
                                    </div>
                                    <h3 className="card-title text-xl font-bold text-gray-900 dark:text-white">{dept}</h3>
                                </div>
                                <div className="card-members grid grid-cols-2 gap-x-4 gap-y-2 pl-4">
                                    {members.map((member) => (
                                        <div key={member} className="flex items-center space-x-2.5">
                                            <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full" />
                                            <span className="text-gray-700 dark:text-gray-300 font-medium">{member}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Community Outreach</h3>
                <div className="space-y-8">
                    {Object.entries(teamData.community.departments).map(([dept, members]) => (
                        <div key={dept} className="team-card will-change-transform">
                             <div className="card-content w-full h-full bg-white/50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl backdrop-blur-md relative overflow-hidden">
                                <div className="card-glare absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_var(--mx)_var(--my),rgba(255,255,255,0.6),rgba(255,255,255,0)_40%)] dark:bg-[radial-gradient(circle_at_var(--mx)_var(--my),rgba(255,255,255,0.15),rgba(255,255,255,0)_50%)] opacity-0 pointer-events-none"></div>
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="card-icon w-12 h-12 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center flex-shrink-0">
                                        <Megaphone size={20} className="text-white dark:text-gray-900" />
                                    </div>
                                    <h3 className="card-title text-xl font-bold text-gray-900 dark:text-white">{dept}</h3>
                                </div>
                                <div className="card-members grid grid-cols-2 gap-x-4 gap-y-2 pl-4">
                                    {members.map((member) => (
                                        <div key={member} className="flex items-center space-x-2.5">
                                            <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full" />
                                            <span className="text-gray-700 dark:text-gray-300 font-medium">{member}</span>
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