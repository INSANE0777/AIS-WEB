"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Users, Code, Megaphone } from "lucide-react"
import EnhancedTeamCards from "./enhanced-team-cards"

const teamData = {
  executives: {
    icon: Users,
    title: "Executive Leadership",
    members: [
      { name: "Samaksh Tyagi", role: "President", specialty: "AI Strategy & Vision" },
      { name: "Aviral Jain", role: "Vice President", specialty: "Operations & Growth" },
      { name: "Mann Acharya", role: "Mentor / Ex-Chairperson", specialty: "Strategic Guidance" },
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

export default function Teams() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.from(".team-header", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    })
  }, [])

  return (
    <section ref={sectionRef} className="py-32 px-4" id="team">
      <EnhancedTeamCards  />
    </section>
  )
}
