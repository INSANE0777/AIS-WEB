"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Mail, MapPin, Github, Instagram, Linkedin, Send, MessageCircle, Calendar, Globe } from "lucide-react"
import MagneticButton from "@/components/magnetic-button"

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: "ais@bennett.edu.in",
    description: "General inquiries and collaboration opportunities",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: "Bennett University",
    description: "Greater Noida, Uttar Pradesh, India",
  },
  {
    icon: MessageCircle,
    title: "Join Community",
    details: "Discord & Slack",
    description: "Connect with fellow AI enthusiasts",
  },
  {
    icon: Calendar,
    title: "Office Hours",
    details: "Mon-Fri, 10AM-6PM",
    description: "Drop by for mentorship and guidance",
  },
]

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub", color: "hover:bg-gray-900" },
  { icon: Instagram, href: "#", label: "Instagram", color: "hover:bg-pink-500" },
  { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:bg-blue-600" },
]

const departments = [
  "General Inquiry",
  "Technical Team",
  "Research Collaboration",
  "Event Partnership",
  "Mentorship Program",
  "Media & Press",
]

export default function Contact() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    subject: "",
    message: "",
  })

  useEffect(() => {
    // Ensure elements are visible
    gsap.set([".page-header", ".contact-section"], { opacity: 1, visibility: "visible" })

    const tl = gsap.timeline()

    tl.fromTo(".page-header", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }).fromTo(
      ".contact-section",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" },
      "-=0.8",
    )
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div ref={pageRef} className="pt-32 pb-20 px-4 min-h-screen" style={{ opacity: 1, visibility: "visible" }}>
      <div className="max-w-7xl mx-auto">
        <div
          className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ opacity: 1, visibility: "visible" }}
        >
          <img
            src="/images/BIAS.png"
            alt="AI Society Logo"
            className="w-12 h-12 sm:w-16 sm:h-16 object-contain drop-shadow-lg hover:drop-shadow-xl transition-all duration-300"
          />
        </div>
        {/* Header */}
        <div className="page-header text-center mb-20" style={{ opacity: 1, visibility: "visible" }}>
          <div className="inline-flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium mb-8">
            <MessageCircle size={16} />
            <span>Let's Connect</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-black mb-6">
            Get In
            <br />
            <span className="text-black/60">Touch</span>
          </h1>
          <div className="w-24 h-1 bg-black mx-auto mb-8"></div>
          <p className="text-xl text-black/70 max-w-3xl mx-auto leading-relaxed">
            Ready to join our AI community or have questions about our programs? We'd love to hear from you and help you
            start your AI journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="contact-section" style={{ opacity: 1, visibility: "visible" }}>
            <h2 className="text-4xl font-bold text-black mb-8">Let's Connect</h2>

            <div className="space-y-6 mb-12">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-6 bg-white rounded-xl border border-black/10 hover:border-black hover:shadow-lg transition-all group"
                  >
                    <div className="w-12 h-12 bg-black group-hover:bg-white border-2 border-black rounded-full flex items-center justify-center flex-shrink-0 transition-all">
                      <Icon size={20} className="text-white group-hover:text-black transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-black mb-1">{info.title}</h3>
                      <p className="text-black font-medium mb-1">{info.details}</p>
                      <p className="text-black/60 text-sm">{info.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Social Links */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-black mb-6">Follow Our Journey</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <MagneticButton
                      key={index}
                      className={`w-14 h-14 bg-black text-white rounded-full flex items-center justify-center transition-all ${social.color}`}
                    >
                      <Icon size={20} />
                    </MagneticButton>
                  )
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-black text-white p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
                <Globe size={20} />
                <span>Community Stats</span>
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center group">
                  <div className="text-3xl font-black mb-2 group-hover:scale-110 transition-transform">150+</div>
                  <div className="text-white/70 text-sm">Active Members</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl font-black mb-2 group-hover:scale-110 transition-transform">50+</div>
                  <div className="text-white/70 text-sm">Projects</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl font-black mb-2 group-hover:scale-110 transition-transform">25+</div>
                  <div className="text-white/70 text-sm">Awards</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl font-black mb-2 group-hover:scale-110 transition-transform">100+</div>
                  <div className="text-white/70 text-sm">Events</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-section" style={{ opacity: 1, visibility: "visible" }}>
            <div className="bg-white p-8 rounded-2xl border border-black/10 hover:border-black/20 transition-all">
              <h2 className="text-3xl font-bold text-black mb-8 flex items-center space-x-3">
                <Send size={28} />
                <span>Send us a Message</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-black mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-black mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-semibold text-black mb-2">
                    Department *
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40"
                  >
                    <option value="">Select a department</option>
                    {departments.map((dept, index) => (
                      <option key={index} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-black mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40"
                    placeholder="Brief subject of your message"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-black mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <MagneticButton
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-black/90 transition-colors flex items-center justify-center space-x-2 group"
                >
                  <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                  <span>Send Message</span>
                </MagneticButton>
              </form>

              <div className="mt-8 p-6 bg-black/5 rounded-lg">
                <p className="text-black/70 text-sm text-center">
                  <strong>Response Time:</strong> We typically respond within 24-48 hours during business days. For
                  urgent matters, please email us directly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h2 className="text-4xl font-bold text-black mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How can I join AI Society?",
                answer:
                  "We welcome students from all backgrounds! Attend our orientation sessions or reach out to us directly to learn about membership requirements and opportunities.",
              },
              {
                question: "Do I need prior AI experience?",
                answer:
                  "Not at all! We have programs for beginners to advanced learners. Our mentorship program helps newcomers get started with AI fundamentals.",
              },
              {
                question: "What programming languages should I know?",
                answer:
                  "Python is most commonly used, but we work with various languages. We provide resources and workshops to help you learn the necessary skills.",
              },
              {
                question: "Are there any membership fees?",
                answer:
                  "Basic membership is free for Bennett University students. Some specialized workshops or events may have nominal fees to cover materials and resources.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="text-left p-6 bg-white rounded-xl border border-black/10 hover:border-black/30 transition-all group"
              >
                <h3 className="text-lg font-semibold text-black mb-3 group-hover:text-black/80 transition-colors">
                  {faq.question}
                </h3>
                <p className="text-black/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
