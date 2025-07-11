"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Code, Megaphone, Crown } from "lucide-react"
import DirectionAwareHover from "./direction-aware-hover"
import MorphicHoverCard from "./morphic-hover-card"

const teamData = {
  executives: {
    icon: Crown,
    title: "Executive Leadership",
    members: [
      {
        name: "Samaksh Tyagi",
        role: "President",
        specialty: "AI Strategy & Vision",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "Aviral Jain",
        role: "Vice President",
        specialty: "Operations & Growth",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "Mann Acharya",
        role: "Mentor / Ex-Chairperson",
        specialty: "Strategic Guidance",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  technical: {
    icon: Code,
    title: "Technical Departments",
    departments: {
      "Natural Language Processing": ["Madhav Gupta", "Sanya Wadhawan"],
      "Reinforcement Learning": ["Afjal Hussein", "Gyanendra Prakash"],
      "Computer Vision": ["Mayank Kumar", "Sukant Aryan"],
      "Generative AI": ["Aniya Tyagi", "Archit Ojha"],
    },
  },
  community: {
    icon: Megaphone,
    title: "Community Outreach",
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
    // Enhanced entrance animations
    gsap.fromTo(
      ".team-card",
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
        rotationY: 45,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Floating animations
    gsap.to(".team-card", {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.3,
    })

    // Particle effects
    gsap.to(".particle", {
      y: -50,
      opacity: 0,
      duration: 2,
      repeat: -1,
      ease: "power2.out",
      stagger: {
        amount: 2,
        from: "random",
      },
    })
  }, [])

  return (
    <section ref={sectionRef} className="py-32 px-4 relative overflow-hidden">
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-black/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-black mb-6">
            Meet Our
            <br />
            <span className="text-black/60">Dream Team</span>
          </h2>
          <p className="text-xl text-black/70 max-w-2xl mx-auto">
            Passionate individuals driving innovation and excellence in artificial intelligence
          </p>
        </div>

        {/* Executive Leadership */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-black mb-8 text-center">Executive Leadership</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {teamData.executives.members.map((member, index) => (
              <MorphicHoverCard key={index} className="team-card">
                <DirectionAwareHover className="bg-white p-8 rounded-2xl border border-black/10 hover:border-black hover:shadow-2xl transition-all group text-center relative overflow-hidden">
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Avatar with 3D effect */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-black group-hover:border-white transition-colors relative">
                      <img
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-black group-hover:bg-white border-2 border-white group-hover:border-black rounded-full flex items-center justify-center transition-all">
                      <Crown size={16} className="text-white group-hover:text-black transition-colors" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-black mb-2 group-hover:text-black/80 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-lg text-black/60 mb-3 font-semibold">{member.role}</p>
                  <p className="text-sm text-black/50">{member.specialty}</p>

                  {/* Animated underline */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-black group-hover:w-full transition-all duration-500" />
                </DirectionAwareHover>
              </MorphicHoverCard>
            ))}
          </div>
        </div>

        {/* Technical Departments */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-black mb-8 text-center">Technical Departments</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(teamData.technical.departments).map(([dept, members], index) => (
              <MorphicHoverCard key={dept} className="team-card">
                <DirectionAwareHover className="bg-white p-8 rounded-2xl border border-black/10 hover:border-black hover:shadow-2xl transition-all group relative overflow-hidden">
                  {/* Animated particles */}
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${20 + i * 10}%`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-black group-hover:bg-white border-2 border-black rounded-full flex items-center justify-center transition-all">
                      <Code size={20} className="text-white group-hover:text-black transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-black group-hover:text-black/80 transition-colors">{dept}</h3>
                  </div>

                  <div className="space-y-3">
                    {members.map((member, i) => (
                      <div key={i} className="flex items-center space-x-3 group/member">
                        <div className="w-2 h-2 bg-black rounded-full group-hover/member:scale-150 transition-transform" />
                        <span className="text-black/70 font-medium group-hover/member:text-black transition-colors">
                          {member}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Morphing border effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-black/20 transition-all duration-500" />
                </DirectionAwareHover>
              </MorphicHoverCard>
            ))}
          </div>
        </div>

        {/* Community Outreach */}
        <div>
          <h3 className="text-3xl font-bold text-black mb-8 text-center">Community Outreach</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(teamData.community.departments).map(([dept, members], index) => (
              <MorphicHoverCard key={dept} className="team-card">
                <DirectionAwareHover className="bg-white p-8 rounded-2xl border border-black/10 hover:border-black hover:shadow-2xl transition-all group relative overflow-hidden">
                  {/* Glowing effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-black group-hover:bg-white border-2 border-black rounded-full flex items-center justify-center transition-all relative">
                      <Megaphone size={20} className="text-white group-hover:text-black transition-colors" />
                      {/* Pulse effect */}
                      <div className="absolute inset-0 rounded-full bg-black/20 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    </div>
                    <h3 className="text-xl font-bold text-black group-hover:text-black/80 transition-colors">{dept}</h3>
                  </div>

                  <div className="space-y-3">
                    {members.map((member, i) => (
                      <div key={i} className="flex items-center space-x-3 group/member">
                        <div className="w-2 h-2 bg-black rounded-full group-hover/member:scale-150 group-hover/member:bg-blue-500 transition-all" />
                        <span className="text-black/70 font-medium group-hover/member:text-black group-hover/member:translate-x-1 transition-all">
                          {member}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Animated corner accents */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-l-8 border-b-8 border-transparent border-r-black/0 group-hover:border-r-black/20 transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 w-0 h-0 border-r-8 border-t-8 border-transparent border-l-black/0 group-hover:border-l-black/20 transition-all duration-300" />
                </DirectionAwareHover>
              </MorphicHoverCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
