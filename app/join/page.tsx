"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Users, Sparkles, Award, Brain, Heart, Zap, Star, Rocket, ArrowRight, Send } from "lucide-react"
import MagneticButton from "@/components/magnetic-button"
import { useMobileOptimization, getOptimizedDuration, getOptimizedEase } from "@/components/mobile-optimized-animations"

const departments = {
  "Community Outreach": {
    icon: Users,
    description: "Social Media Managers: Manage socials and create engaging content (stories & reels on Instagram).",
    skills: ["Social Media Management", "Content Creation", "Community Building"],
  },
  Designers: {
    icon: Sparkles,
    description: "Proficient with Canva/Figma for creating designs. Focus on graphic and visual design.",
    skills: ["Canva/Figma", "Graphic Design", "Visual Identity"],
  },
  "Event Managers": {
    icon: Award,
    description: "Oversee administrative and logistical aspects. Coordinate meetings, events, and club activities.",
    skills: ["Event Planning", "Project Management", "Leadership"],
  },
  "Public Speakers (PR)": {
    icon: Brain,
    description: "Engage with external representatives and organizations. Build partnerships and collaborations.",
    skills: ["Public Speaking", "Networking", "Partnership Development"],
  },
  "Photographers / Video Editors": {
    icon: Zap,
    description: "Capture high-quality photos and videos during events. Edit and create engaging visual content.",
    skills: ["Photography", "Video Editing", "Creative Direction"],
  },
}

const additionalSkills = [
  "Researching",
  "Content Writing",
  "Designing (Canva/Figma/Photoshop etc.)",
  "Public Speaking",
  "Outreach and Sponsorship",
  "Social Media Management / Marketing",
  "Photography/Videography",
  "Managing Events",
  "3D softwares (Blender, Maya, etc)",
  "Video editing (Capcut/Kinemaster/After Effects, Da Vinci etc)",
]

export default function JoinUs() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    degree: "",
    year: "",
    hostel: "",
    domain: "",
    department: "",
    additionalSkills: [] as string[],
    portfolioLinks: "",
    elaborateChoices: "",
    hobbies: "",
    fictionalCharacter: "",
    whyJoinUs: "",
  })
  const { isMobile, reducedMotion } = useMobileOptimization()

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      ".page-header",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: getOptimizedDuration(1.2, isMobile, reducedMotion),
        ease: getOptimizedEase(isMobile),
      },
    ).fromTo(
      ".form-section",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: getOptimizedDuration(0.8, isMobile, reducedMotion),
        stagger: 0.1,
        ease: getOptimizedEase(isMobile),
      },
      "-=0.8",
    )

    // Floating animations for decorative elements
    if (!reducedMotion) {
      gsap.to(".float-icon", {
        y: isMobile ? -10 : -20,
        rotation: isMobile ? 5 : 10,
        duration: getOptimizedDuration(3, isMobile, reducedMotion),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      })
    }
  }, [isMobile, reducedMotion])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      additionalSkills: prev.additionalSkills.includes(skill)
        ? prev.additionalSkills.filter((s) => s !== skill)
        : [...prev.additionalSkills, skill],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div ref={pageRef} className="pt-32 pb-20 px-4 min-h-screen relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <Users className="float-icon absolute top-20 left-10 w-8 h-8 text-black/10" />
        <Brain className="float-icon absolute top-40 right-20 w-10 h-10 text-black/10" />
        <Rocket className="float-icon absolute bottom-40 left-20 w-6 h-6 text-black/10" />
        <Star className="float-icon absolute bottom-20 right-40 w-8 h-8 text-black/10" />
        <Heart className="float-icon absolute top-1/2 left-1/4 w-6 h-6 text-black/10" />
        <Zap className="float-icon absolute top-3/4 right-1/3 w-8 h-8 text-black/10" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="page-header text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium mb-8">
            <Sparkles size={16} />
            <span>Join the AI Revolution</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-black mb-6">
            Registration
            <br />
            <span className="text-black/60">Form</span>
          </h1>
          <div className="w-24 h-1 bg-black mx-auto mb-8"></div>

          <div className="max-w-3xl mx-auto space-y-6 text-lg text-black/70 leading-relaxed">
            <p className="font-semibold text-black">Welcome to the AIS Core Selection Process!</p>
            <p>
              We are excited to announce that we are currently seeking dedicated, passionate, and skilled individuals to
              join our core team in <span className="font-semibold text-black">Multimedia, Design and Management</span>{" "}
              roles.
            </p>
          </div>
        </div>

        <div className="form-section mb-12">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">Our Organizational Structure</h2>
          <div className="bg-white p-4 rounded-2xl border border-black/10 hover:border-black/20 transition-all">
            <img
              src="/images/org-chart.avif"
              alt="AI Society Organizational Chart"
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>
        </div>

        {/* About AIS Section */}
        <div className="form-section bg-white p-8 rounded-2xl border border-black/10 hover:border-black/20 transition-all mb-12 group">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Brain size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-black">About AIS</h2>
          </div>
          <p className="text-black/70 leading-relaxed mb-4">
            The Artificial Intelligence Society (AIS) at Bennett University is one of the most research + open-source
            development focused student communities on campus. Our mission is to foster a deep understanding of AI and
            its applications by bringing together like-minded individuals who are eager to learn, share knowledge, and
            work on innovative projects.
          </p>
          <p className="text-black/70 leading-relaxed">
            We believe in building together, mentoring juniors, and creating an inclusive environment where everyone can
            grow.
            <span className="font-semibold text-black"> We are an exclusive group of productive individuals</span>, so
            keep that in mind while you fill the form honestly.
          </p>
        </div>

        {/* Departments Section */}
        <div className="form-section mb-12">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">Non-Technical Departments</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(departments).map(([dept, info]) => {
              const Icon = info.icon
              return (
                <div
                  key={dept}
                  className="bg-white p-6 rounded-xl border border-black/10 hover:border-black hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-black group-hover:bg-white border-2 border-black rounded-full flex items-center justify-center transition-all">
                      <Icon size={20} className="text-white group-hover:text-black transition-colors" />
                    </div>
                    <h3 className="font-bold text-black">{dept}</h3>
                  </div>
                  <p className="text-black/70 text-sm mb-4">{info.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {info.skills.map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-black/5 text-black text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Registration Form */}
        <div className="form-section bg-white p-8 rounded-2xl border border-black/10 hover:border-black/20 transition-all">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <Send size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-black">Registration Form</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40"
                  placeholder="Enter your legal full name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40"
                  placeholder="10-digit phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Degree Program <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40"
                  placeholder="Your current degree program"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Current Year <span className="text-red-500">*</span>
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40"
                >
                  <option value="">Select Year</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Hostel Accommodation <span className="text-red-500">*</span>
                </label>
                <select
                  name="hostel"
                  value={formData.hostel}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Domain <span className="text-red-500">*</span>
                </label>
                <select
                  name="domain"
                  value={formData.domain}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40"
                >
                  <option value="">Select Domain</option>
                  <option value="Tech">Tech</option>
                  <option value="Non-Tech">Non-Tech</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40"
              >
                <option value="">Select Department</option>
                {Object.keys(departments).map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Additional Skills */}
            <div>
              <label className="block text-sm font-semibold text-black mb-4">
                Additional Skills <span className="text-red-500">*</span>
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {additionalSkills.map((skill) => (
                  <label key={skill} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.additionalSkills.includes(skill)}
                      onChange={() => handleSkillToggle(skill)}
                      className="w-5 h-5 text-black border-2 border-black/20 rounded focus:ring-black focus:ring-2"
                    />
                    <span className="text-black/70 group-hover:text-black transition-colors text-sm">{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Portfolio Links */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">Portfolio/Task Links</label>
              <textarea
                name="portfolioLinks"
                value={formData.portfolioLinks}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40 resize-none"
                placeholder="Add all the links in Google docs. Make sure the link of doc file is public and accessible to all"
              />
            </div>

            {/* Text Areas */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Elaborate on Your Choices <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="elaborateChoices"
                  value={formData.elaborateChoices}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40 resize-none"
                  placeholder="Explain your department and skill choices"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Hobbies <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="hobbies"
                  value={formData.hobbies}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40 resize-none"
                  placeholder="Describe your hobbies in few lines"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Fictional Character <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fictionalCharacter"
                  value={formData.fictionalCharacter}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40"
                  placeholder="A fictional character that you resemble to"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Why Join Us? <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="whyJoinUs"
                  value={formData.whyJoinUs}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40 resize-none"
                  placeholder="Write concisely in 100-150 words, Don't use chatGPT (Your application might get filtered automatically)"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <MagneticButton
                type="submit"
                className="w-full bg-black text-white py-4 rounded-lg font-semibold text-lg hover:bg-black/90 transition-all interactive group flex items-center justify-center space-x-2"
              >
                <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                <span>Submit Application</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
            </div>
          </form>
        </div>

        {/* Why Join Us Section */}
        <div className="form-section mt-12 bg-black text-white p-8 rounded-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center space-x-3">
              <Heart className="text-red-500 animate-pulse" />
              <span>Why Join AIS?</span>
              <Rocket className="text-blue-400 animate-bounce" />
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Brain size={32} className="text-white" />
              </div>
              <h3 className="font-bold mb-2">Learn & Grow</h3>
              <p className="text-white/80 text-sm">Access to cutting-edge AI resources and mentorship</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users size={32} className="text-white" />
              </div>
              <h3 className="font-bold mb-2">Network</h3>
              <p className="text-white/80 text-sm">Connect with like-minded AI enthusiasts and industry experts</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Award size={32} className="text-white" />
              </div>
              <h3 className="font-bold mb-2">Achieve</h3>
              <p className="text-white/80 text-sm">Work on award-winning projects and research publications</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
