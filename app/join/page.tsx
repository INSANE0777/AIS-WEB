"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { gsap } from "gsap"
import {
  Users,
  Sparkles,
  Award,
  Brain,
  Heart,
  Zap,
  Star,
  Rocket,
  ArrowRight,
  Send,
  LoaderIcon,
  CheckCircle,
  XCircle,
  Calendar,
  Clock,
  MessageCircle,
  AlertTriangle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Code,
  Megaphone,
  Globe,
  Eye,
  Cpu,
  MessageSquare,
  Bot,
} from "lucide-react"
import toast from "react-hot-toast"

// --- Mock Components ---
interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, ...props }) => <button {...props}>{children}</button>

// --- Mobile Optimization Hook ---
interface MobileOptimization {
  isMobile: boolean
  reducedMotion: boolean
}

const useMobileOptimization = (): MobileOptimization => {
  const [isMobile, setIsMobile] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    const checkMotionPreference = () => setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)

    checkMobile()
    checkMotionPreference()

    window.addEventListener("resize", checkMobile)
    window.addEventListener("change", checkMotionPreference)

    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("change", checkMotionPreference)
    }
  }, [])

  return { isMobile, reducedMotion }
}

// --- Animation Helpers ---
const getOptimizedDuration = (duration: number, isMobile?: boolean, reducedMotion?: boolean): number => {
  if (reducedMotion) return 0
  return isMobile ? duration * 0.7 : duration
}

const getOptimizedEase = (isMobile?: boolean): string => {
  return "power3.out"
}

// --- Appwrite Client ---
import { databases, ID } from "./appwrite/app"

// --- Zod Schema for Form Validation ---
const formSchema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^\d{10}$/, "Invalid 10-digit phone number"),
    degree: z.string().min(2, "Degree must be at least 2 characters"),
    year: z.enum(["1st", "2nd", "3rd", "4th", "Postgrad"], { required_error: "Please select your year" }),
    hostel: z.enum(["Yes", "No"], { required_error: "Please select an option" }),
    domain: z.enum(["Tech", "Non-Tech"], { required_error: "Please select a domain" }),
    department: z.string().min(1, "Department is required"),
    additionalSkills: z.array(z.string()).min(1, "At least one skill must be selected"),
    elaborateChoices: z.string().min(10, "Explanation must be at least 10 characters"),
    hobbies: z.string().min(2, "Hobbies are required"),
    fictionalCharacter: z.string().min(2, "Character name is required"),
    whyJoinUs: z.string().min(10, "Explanation must be at least 10 characters"),
    portfolioLinks: z.string().url("Must be a valid URL (e.g., a public Google Doc link)").optional().or(z.literal("")),
    linkedinLink: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
    githubLink: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  })
  .refine((data) => (data.domain === "Tech" ? !!data.githubLink && data.githubLink.length > 0 : true), {
    message: "GitHub link is required for the Tech domain",
    path: ["githubLink"],
  })

type FormData = z.infer<typeof formSchema>

// --- Department Interfaces ---
interface DepartmentInfo {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  description: string
  skills: string[]
}

interface TechDepartmentInfo {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  description: string
  skills: string[]
  projects: string[]
  requirements: string[]
}

interface Departments {
  [key: string]: DepartmentInfo
}

interface TechDepartments {
  [key: string]: TechDepartmentInfo
}

interface AllDepartments {
  Tech: string[]
  NonTech: string[]
}

// --- FAQ Interface ---
interface FAQItem {
  question: string
  answer: string
}

// --- Page Constants ---
const TECH_DEPARTMENTS: TechDepartments = {
  "Natural Language Processing (NLP)": {
    icon: MessageSquare,
    description: "Work with language models, text analysis, chatbots, and language understanding systems.",
    skills: ["Python", "Transformers", "NLTK", "spaCy", "Hugging Face", "LangChain", "OpenAI APIs"],
    projects: [
      "Conversational AI Chatbots",
      "Sentiment Analysis Systems",
      "Text Summarization Tools",
      "Language Translation Models",
      "Question-Answering Systems"
    ],
    requirements: [
      "Strong foundation in Python programming",
      "Understanding of language processing concepts",
      "Familiarity with machine learning basics",
      "Interest in linguistics and communication"
    ]
  },
  "Generative AI (GenAI)": {
    icon: Bot,
    description: "Create AI systems that generate content - text, images, code, and multimedia using cutting-edge generative models.",
    skills: ["Python", "PyTorch/TensorFlow", "Stable Diffusion", "GPT APIs", "LangChain", "Prompt Engineering"],
    projects: [
      "AI Art Generation Applications",
      "Code Generation Tools",
      "Creative Writing Assistants",
      "Music and Audio Generation",
      "Multi-modal Content Creation"
    ],
    requirements: [
      "Strong programming skills in Python",
      "Understanding of neural networks",
      "Creative mindset and artistic sensibility",
      "Interest in emerging AI technologies"
    ]
  },
  "Reinforcement Learning (RL)": {
    icon: Cpu,
    description: "Develop AI agents that learn through interaction with environments, perfect for game AI, robotics, and decision-making systems.",
    skills: ["Python", "OpenAI Gym", "Stable Baselines3", "PyTorch", "Unity ML-Agents", "Ray RLlib"],
    projects: [
      "Game AI Agents (Chess, Go, Atari)",
      "Autonomous Navigation Systems",
      "Trading and Finance Bots",
      "Robotics Control Systems",
      "Multi-agent Simulations"
    ],
    requirements: [
      "Strong mathematical background",
      "Programming experience in Python",
      "Interest in game theory and optimization",
      "Patience for iterative learning processes"
    ]
  },
  "Computer Vision (CV)": {
    icon: Eye,
    description: "Build AI systems that can see, understand, and interpret visual information from images and videos.",
    skills: ["Python", "OpenCV", "PyTorch/TensorFlow", "YOLO", "Detectron2", "Pillow", "Scikit-image"],
    projects: [
      "Object Detection and Recognition",
      "Face Recognition Systems",
      "Medical Image Analysis",
      "Autonomous Vehicle Vision",
      "Augmented Reality Applications"
    ],
    requirements: [
      "Strong programming skills",
      "Basic understanding of linear algebra",
      "Interest in image processing",
      "Attention to detail and visual patterns"
    ]
  }
}

const NON_TECH_DEPARTMENTS: Departments = {
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

const ALL_DEPARTMENTS: AllDepartments = {
  Tech: Object.keys(TECH_DEPARTMENTS),
  NonTech: Object.keys(NON_TECH_DEPARTMENTS),
}

const ADDITIONAL_SKILLS: string[] = [
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

const TIMELINE_ITEMS = [
  {
    icon: Send,
    title: "Fill the Form",
    subtitle: "Applications open till Monday 27th January 12 noon",
    description: "Applications: 128+",
    status: "ongoing",
    date: "Till 27th Jan",
  },
  {
    icon: Clock,
    title: "Form Shortlisting",
    subtitle: "Form review period where you will be judged by the form responses",
    description: "AI Generated Form Responses will be rejected.",
    status: "upcoming",
    date: "21st-27th Jan",
  },
  {
    icon: MessageCircle,
    title: "One-on-One Interview",
    subtitle: "Candidate is interviewed on technicalities and soft skills",
    description: "Interview Guidelines and Preparation",
    status: "upcoming",
    date: "26th-27th Jan",
  },
]

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "I missed the deadline, Can I apply now?",
    answer: "No. We might float volunteer forms later, But the Core Team intake has officially ended.",
  },
  {
    question: "Who can apply for the Junior Core positions?",
    answer:
      "If you a fresher, and are in B.Tech / BCA / MCA / M. Tech, you are eligible. If you are passionate about AI, have relevant experience, and are eager to contribute to the growth of our community, you can apply. We encourage individuals with leadership qualities and a vision for the future of AIS to take part.",
  },
  {
    question: "What is the selection criteria for the Junior Core positions?",
    answer:
      "Selection will be based on a combination of factors including your experience, skills, leadership qualities, past contributions in AI, and your vision for the role. We are looking for individuals who demonstrate a strong commitment to our mission and the ability to lead initiatives.",
  },
  {
    question: "What are the responsibilities of a Junior Core member?",
    answer:
      "As a Junior Core member, you'll be responsible for leading specific sub-domains within AIS, organizing events, mentoring juniors, and ensuring that our projects align with the society's goals. You'll play a key role in shaping the direction of AIS and its initiatives.",
  },
  {
    question: "How can I prepare for the selection process?",
    answer:
      "Check the interview guidelines given above. For Technical Teams, you need to complete two courses on AI and Python. For Community Outreach, You will showcase your work and speaking skills depending on your domain.",
  },
  {
    question: "What can I expect as a member?",
    answer:
      "AIS is a project oriented club with an emphasis on research as well, after your selection to one of the teams you will help with events and actively make projects that may be published on our site or showcased in these events.",
  },
]

// --- Helper for User-Friendly Error Messages ---
const getFriendlyErrorMessage = (error: any): string => {
  const message = error.message || "An unknown error occurred."
  if (message.includes("Network request failed"))
    return "Network Error: Please check your internet connection and try again."
  if (message.toLowerCase().includes("permission"))
    return "Permission Denied: You may not have the required permissions to submit this form. Please contact support."
  if (message.toLowerCase().includes("database or collection is not configured"))
    return "Configuration Error: The form is not set up correctly. Please contact the administrator."
  return `An unexpected error occurred: ${message}. Please try again later.`
}

export default function JoinUs() {
  const pageRef = useRef<HTMLDivElement>(null)
  const { isMobile, reducedMotion } = useMobileOptimization()
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [activeGuideline, setActiveGuideline] = useState<"tech" | "community" | "general">("tech")
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      additionalSkills: [],
      portfolioLinks: "",
      linkedinLink: "",
      githubLink: "",
    },
  })

  const domain = watch("domain")

  // Load form data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFormData = localStorage.getItem('ais-registration-form')
      if (savedFormData) {
        try {
          const parsedData = JSON.parse(savedFormData)
          Object.entries(parsedData).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
              setValue(key as keyof FormData, value as any)
            }
          })
        } catch (error) {
          console.error('Error loading form data:', error)
        }
      }
    }
  }, [setValue])

  // Save form data to localStorage on form changes
  useEffect(() => {
    const subscription = watch((data) => {
      if (typeof window !== 'undefined') {
        const cleanedData = Object.fromEntries(
          Object.entries(data).filter(([, value]) => {
            // Only save non-empty values
            if (Array.isArray(value)) return value.length > 0
            return value !== undefined && value !== null && value !== ""
          })
        )
        
        // Only save if there's actual data to save
        if (Object.keys(cleanedData).length > 0) {
          localStorage.setItem('ais-registration-form', JSON.stringify(cleanedData))
        }
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

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

  const onSubmit = async (data: FormData) => {
    setSubmissionStatus("loading")
    setErrorMessage(null)

    try {
      const appwriteData = {
        fullname: data.fullName,
        email: data.email,
        phone: data.phone,
        degree: data.degree,
        currentyear: data.year,
        hostel: data.hostel === "Yes" ? "true" : "false",
        domain: data.domain.toLowerCase(),
        department: data.department,
        additionalskills: data.additionalSkills.join(", "),
        elaboratechoices: data.elaborateChoices,
        hobbies: data.hobbies,
        fictionalchar: data.fictionalCharacter,
        whyjoin: data.whyJoinUs,
        otherlinks: data.portfolioLinks || null,
        linkedinlink: data.linkedinLink || null,
        githublink: data.githubLink || null,
      }

      const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID
      const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID

      if (!databaseId || !collectionId) {
        throw new Error("Database or Collection is not configured.")
      }

      await databases.createDocument(databaseId, collectionId, ID.unique(), appwriteData)

      setSubmissionStatus("success")
      toast.success("Registration successful! We'll be in touch.")
      
      // Clear localStorage and reset form
      if (typeof window !== 'undefined') {
        localStorage.removeItem('ais-registration-form')
      }
      reset()
    } catch (error: any) {
      console.error("Registration error:", error)
      const friendlyError = getFriendlyErrorMessage(error)
      setErrorMessage(friendlyError)
      setSubmissionStatus("error")
      toast.error(`Registration failed: ${friendlyError}`)
    }
  }

  const renderError = (fieldName: keyof FormData) => {
    if (errors[fieldName]) {
      return <span className="text-sm text-red-500 mt-1">{errors[fieldName]?.message}</span>
    }
    return null
  }

  const SuccessMessage = () => (
    <div className="text-center bg-white p-8 sm:p-12 rounded-2xl border border-green-300 shadow-lg">
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6 animate-pulse" />
      <h2 className="text-3xl font-black text-black mb-4">Application Submitted!</h2>
      <p className="text-black/70 text-lg mb-8 max-w-lg mx-auto">
        Thank you for your interest in joining the AI Society. We have received your application and will review it
        shortly.
      </p>
      <MagneticButton
        onClick={() => setSubmissionStatus("idle")}
        className="bg-black text-white py-3 px-8 rounded-full font-semibold text-lg hover:bg-black/80 transition-all"
      >
        Submit Another Application
      </MagneticButton>
    </div>
  )

  return (
    <div ref={pageRef} className="pt-32 pb-20 px-4 min-h-screen relative overflow-hidden bg-gray-50">
      {/* Floating Icons */}
      

      {/* Logo */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 cursor-pointer hover:scale-110 transition-transform duration-300">
        <img
          src="/images/BIAS.png"
          alt="AI Society Logo"
          className="w-12 h-12 sm:w-16 sm:h-16 object-contain drop-shadow-lg"
        />
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
              We are currently seeking dedicated, passionate, and skilled individuals to join our core team in{" "}
              <span className="font-semibold text-black">Tech, Multimedia, Design and Management</span> roles.
            </p>
          </div>
        </div>

        {/* Organizational Structure */}
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

        {/* About AIS */}
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
            <span className="font-semibold text-black"> We are an exclusive group of productive individuals</span>, so
            keep that in mind while you fill the form honestly.
          </p>
        </div>

        {/* Technical Departments */}
        <div className="form-section mb-12">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">Technical Departments</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(TECH_DEPARTMENTS).map(([dept, info]) => {
              const Icon = info.icon
              return (
                <div
                  key={dept}
                  className="bg-white p-6 rounded-xl border border-black/10 hover:border-black hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-black group-hover:bg-white border-2 border-black rounded-full flex items-center justify-center transition-all">
                      <Icon width={20} height={20} className="text-white group-hover:text-black transition-colors" />
                    </div>
                    <h3 className="font-bold text-black">{dept}</h3>
                  </div>
                  <p className="text-black/70 text-sm mb-4">{info.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {info.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-black/5 text-black text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                    {info.skills.length > 3 && (
                      <span className="px-2 py-1 bg-black/5 text-black text-xs rounded-full">
                        +{info.skills.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-black/60">
                    <div className="mb-2">
                      <strong>Projects:</strong> {info.projects.slice(0, 2).join(", ")}
                      {info.projects.length > 2 && "..."}
                    </div>
                    <div>
                      <strong>Looking for:</strong> {info.requirements[0]}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Non-Technical Departments */}
        <div className="form-section mb-12">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">Non-Technical Departments</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(NON_TECH_DEPARTMENTS).map(([dept, info]) => {
              const Icon = info.icon
              return (
                <div
                  key={dept}
                  className="bg-white p-6 rounded-xl border border-black/10 hover:border-black hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-black group-hover:bg-white border-2 border-black rounded-full flex items-center justify-center transition-all">
                      <Icon width={20} height={20} className="text-white group-hover:text-black transition-colors" />
                    </div>
                    <h3 className="font-bold text-black">{dept}</h3>
                  </div>
                  <p className="text-black/70 text-sm mb-4">{info.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {info.skills.map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-black/5 text-black text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Timeline Section - Moved before form */}
        <div className="form-section mb-12">
          <h2 className="text-3xl font-bold text-black mb-8 text-center flex items-center justify-center space-x-3">
            <Calendar className="text-black" />
            <span>How to Join</span>
          </h2>
          <div className="space-y-6">
            {TIMELINE_ITEMS.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl border border-black/10 hover:border-black/20 transition-all group"
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        item.status === "ongoing" ? "bg-green-500" : "bg-black/10"
                      }`}
                    >
                      <Icon size={24} className={item.status === "ongoing" ? "text-white" : "text-black/60"} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-black">{item.title}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.status === "ongoing" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {item.status === "ongoing" ? "📝 Ongoing" : "🔍 Upcoming"}
                        </span>
                      </div>
                      <p className="text-black/70 mb-2">{item.subtitle}</p>
                      <p className="text-sm text-black/60 mb-2">{item.description}</p>
                      <p className="text-sm font-medium text-black">{item.date}</p>
                    </div>
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

          {submissionStatus === "success" ? (
            <SuccessMessage />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("fullName")}
                    required
                    className="w-full px-4 py-3 border-2 border-black/20 rounded-full focus:outline-none focus:border-black transition-colors hover:border-black/40"
                    placeholder="Enter your legal full name"
                  />
                  {renderError("fullName")}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    required
                    className="w-full px-4 py-3 border-2 border-black/20 rounded-full focus:outline-none focus:border-black transition-colors hover:border-black/40"
                    placeholder="Enter your email address"
                  />
                  {renderError("email")}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    {...register("phone")}
                    required
                    className="w-full px-4 py-3 border-2 border-black/20 rounded-full focus:outline-none focus:border-black transition-colors hover:border-black/40"
                    placeholder="10-digit phone number"
                  />
                  {renderError("phone")}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Degree Program <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("degree")}
                    required
                    className="w-full px-4 py-3 border-2 border-black/20 rounded-full focus:outline-none focus:border-black transition-colors hover:border-black/40"
                    placeholder="Your current degree program"
                  />
                  {renderError("degree")}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Current Year <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("year")}
                    required
                    className="w-full px-4 py-3 border-2 border-black/20 rounded-full focus:outline-none focus:border-black transition-colors hover:border-black/40"
                  >
                    <option value="">Select Year</option>
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="4th">4th Year</option>
                    <option value="Postgrad">Postgrad</option>
                  </select>
                  {renderError("year")}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Hostel Accommodation <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("hostel")}
                    required
                    className="w-full px-4 py-3 border-2 border-black/20 rounded-full focus:outline-none focus:border-black transition-colors hover:border-black/40"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {renderError("hostel")}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Domain <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("domain")}
                    required
                    className="w-full px-4 py-3 border-2 border-black/20 rounded-full focus:outline-none focus:border-black transition-colors hover:border-black/40"
                  >
                    <option value="">Select Domain</option>
                    <option value="Tech">Tech</option>
                    <option value="Non-Tech">Non-Tech</option>
                  </select>
                  {renderError("domain")}
                </div>
              </div>

              {/* Tech Domain Links */}
              {domain === "Tech" && (
                <div className="grid md:grid-cols-2 gap-6 p-4 bg-blue-50 rounded-2xl border border-blue-200">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      GitHub Profile <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("githubLink")}
                      required
                      className="w-full px-4 py-3 border-2 border-black/20 rounded-full focus:outline-none focus:border-black transition-colors hover:border-black/40"
                      placeholder="https://github.com/username"
                    />
                    {renderError("githubLink")}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">LinkedIn Profile</label>
                    <input
                      type="text"
                      {...register("linkedinLink")}
                      className="w-full px-4 py-3 border-2 border-black/20 rounded-full focus:outline-none focus:border-black transition-colors hover:border-black/40"
                      placeholder="https://linkedin.com/in/username"
                    />
                    {renderError("linkedinLink")}
                  </div>
                </div>
              )}

              {/* Department Selection */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("department")}
                  required
                  className="w-full px-4 py-3 border-2 border-black/20 rounded-full focus:outline-none focus:border-black transition-colors hover:border-black/40"
                >
                  <option value="">Select Department</option>
                  {domain &&
                    ALL_DEPARTMENTS[domain === "Tech" ? "Tech" : "NonTech"].map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                </select>
                {renderError("department")}
              </div>

              {/* Additional Skills */}
              <div>
                <label className="block text-sm font-semibold text-black mb-4">
                  Additional Skills <span className="text-red-500">*</span>
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  {ADDITIONAL_SKILLS.map((skill) => (
                    <label key={skill} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        value={skill}
                        {...register("additionalSkills")}
                        className="w-5 h-5 accent-black border-2 border-black/20 rounded focus:outline-none focus:ring-0"
                      />
                      <span className="text-black/70 group-hover:text-black transition-colors text-sm">{skill}</span>
                    </label>
                  ))}
                </div>
                {renderError("additionalSkills")}
              </div>

              {/* Portfolio Links */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">Portfolio/Task Links</label>
                <textarea
                  {...register("portfolioLinks")}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-black/20 rounded-2xl focus:outline-none focus:border-black transition-colors hover:border-black/40 resize-none"
                  placeholder="Add all relevant links in a public Google doc and paste the link here."
                />
                {renderError("portfolioLinks")}
              </div>

              {/* Text Areas */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Elaborate on Your Choices <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("elaborateChoices")}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-black/20 rounded-2xl focus:outline-none focus:border-black transition-colors hover:border-black/40 resize-none"
                    placeholder="Explain your department and skill choices"
                  />
                  {renderError("elaborateChoices")}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Hobbies <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("hobbies")}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-black/20 rounded-2xl focus:outline-none focus:border-black transition-colors hover:border-black/40 resize-none"
                    placeholder="Describe your hobbies in a few lines"
                  />
                  {renderError("hobbies")}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Fictional Character <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("fictionalCharacter")}
                    required
                    className="w-full px-4 py-3 border-2 border-black/20 rounded-full focus:outline-none focus:border-black transition-colors hover:border-black/40"
                    placeholder="A fictional character you resemble"
                  />
                  {renderError("fictionalCharacter")}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Why Join Us? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("whyJoinUs")}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-black/20 rounded-2xl focus:outline-none focus:border-black transition-colors hover:border-black/40 resize-none"
                    placeholder="Write concisely. Don't use ChatGPT (Your application might be filtered automatically)"
                  />
                  {renderError("whyJoinUs")}
                </div>
              </div>
              

              {/* Error Message */}
              {submissionStatus === "error" && errorMessage && (
                <div className="p-4 bg-red-50 border border-red-300 text-red-800 rounded-lg flex items-start space-x-3">
                  <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold">Submission Failed</h4>
                    <p className="text-sm">{errorMessage}</p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-6">
                <MagneticButton
                  type="submit"
                  disabled={submissionStatus === "loading"}
                  className="w-full bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-black/90 transition-all interactive group flex items-center justify-center space-x-2 disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                  {submissionStatus === "loading" ? (
                    <>
                      <LoaderIcon className="animate-spin" size={20} />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                      <span>Submit Application</span>
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </MagneticButton>
              </div>
            </form>
          )}
        </div>

        {/* Interview Guidelines Section */}
        <div className="form-section mb-12">
          <h2 className="text-3xl font-bold text-black mb-8 text-center flex items-center justify-center space-x-3">
            <MessageCircle className="text-black" />
            <span>Interview Guidelines and Preparation</span>
          </h2>

          {/* Guidelines Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveGuideline("tech")}
              className={`px-6 py-3 rounded-full font-medium transition-all flex items-center space-x-2 ${
                activeGuideline === "tech"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-black/20 hover:border-black"
              }`}
            >
              <Code size={16} />
              <span>Technical Positions</span>
            </button>
            <button
              onClick={() => setActiveGuideline("community")}
              className={`px-6 py-3 rounded-full font-medium transition-all flex items-center space-x-2 ${
                activeGuideline === "community"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-black/20 hover:border-black"
              }`}
            >
              <Megaphone size={16} />
              <span>Community Outreach</span>
            </button>
            <button
              onClick={() => setActiveGuideline("general")}
              className={`px-6 py-3 rounded-full font-medium transition-all flex items-center space-x-2 ${
                activeGuideline === "general"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-black/20 hover:border-black"
              }`}
            >
              <Globe size={16} />
              <span>General Guidelines</span>
            </button>
          </div>

          {/* Technical Positions Guidelines */}
          {activeGuideline === "tech" && (
            <div className="bg-white p-8 rounded-2xl border border-black/10">
              <div className="flex items-center space-x-3 mb-6">
                <AlertTriangle className="text-red-500" size={24} />
                <h3 className="text-2xl font-bold text-black">For Technical Positions</h3>
              </div>
              <div className="space-y-6">
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-800 font-medium">⚠️ AI Generated Form Responses will be rejected in review.</p>
                </div>

                <div>
                  <h4 className="font-bold text-black mb-3">1. Create a Kaggle Account</h4>
                  <p className="text-black/70 mb-2">
                    Kaggle is a free, online community and platform for AI competitions, learning, and collaboration. It
                    is used by recruiters worldwide.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-black mb-3">2. Mandatory Courses</h4>
                  <p className="text-black/70 mb-3">
                    Complete the following mandatory courses on Kaggle and obtain the certificates. These courses are
                    covered in the YouTube course by Abhishek Thakur's Kaggle Tutorial for Beginners (World's first 4x
                    Kaggle Grandmaster)
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-black font-medium">Python Course (Mandatory)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-black font-medium">Intro to Machine Learning (Mandatory)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-black mb-3">3. Optional Courses</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <Star className="text-yellow-500" size={16} />
                      <span className="text-black/70">
                        Intro to Deep Learning (Optional, recommended for advanced learners)
                      </span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="text-yellow-500" size={16} />
                      <span className="text-black/70">
                        Intermediate Machine Learning (Optional, recommended for advanced learners)
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-black mb-3">4. LinkedIn Post</h4>
                  <p className="text-black/70">
                    Post Certificate on LinkedIn tagging @Artificial Intelligence Society Bennett University, mentioning
                    the completion of these (2) courses, and include the certificate links in your post. (Optional, will
                    be considered)
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-black mb-3">5. Interview Expectations</h4>
                  <ul className="space-y-2 text-black/70">
                    <li>
                      • Verify your Kaggle account and check the completion of these (2) courses along with their
                      certificates.
                    </li>
                    <li>• You will be asked questions regarding the Kaggle courses.</li>
                    <li>• Ask you for sure: Why do you want to join the CV / RL / GenAI / NLP department?</li>
                    <li>• Share a problem you want to solve with AI in this domain and your approach.</li>
                    <li>
                      • Bring your laptop to the interview. Ensure it's fully charged and ready to showcase your work.
                    </li>
                    <li>
                      • We also appreciate additional skills like Web/App development, Video Editing, or Public
                      Speaking.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Community Outreach Guidelines */}
          {activeGuideline === "community" && (
            <div className="bg-white p-8 rounded-2xl border border-black/10">
              <div className="flex items-center space-x-3 mb-6">
                <AlertTriangle className="text-blue-500" size={24} />
                <h3 className="text-2xl font-bold text-black">For Community Outreach Positions</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-black mb-3">General Requirements</h4>
                  <ul className="space-y-2 text-black/70">
                    <li>• Bring your laptop to the interview.</li>
                    <li>• Be prepared to showcase your work and projects.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-black mb-3">For Design, Video Editing, or Photography</h4>
                  <ul className="space-y-2 text-black/70">
                    <li>• Submit your designs in the form and be ready to present them during the interview.</li>
                    <li>• Relevant examples include posters, reels, or any visual content you've created.</li>
                    <li>• Skills required: Figma, Canva, Adobe Suite, etc.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-black mb-3">For Social Media Management</h4>
                  <ul className="space-y-2 text-black/70">
                    <li>• Provide examples of pages or accounts you have managed.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-black mb-3">For Management/Public Relations</h4>
                  <ul className="space-y-2 text-black/70">
                    <li>
                      • Your behavior, personality, and speaking skills will be assessed through an on-the-spot task
                      during the interview.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* General Guidelines */}
          {activeGuideline === "general" && (
            <div className="bg-white p-8 rounded-2xl border border-black/10">
              <div className="flex items-center space-x-3 mb-6">
                <AlertTriangle className="text-green-500" size={24} />
                <h3 className="text-2xl font-bold text-black">General Guidelines for All Positions</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock className="text-black/60 mt-1" size={16} />
                  <div>
                    <h4 className="font-bold text-black">Be on time</h4>
                    <p className="text-black/70">Punctuality is crucial.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="text-black/60 mt-1" size={16} />
                  <div>
                    <h4 className="font-bold text-black">Dress appropriately</h4>
                    <p className="text-black/70">Professional attire is expected.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Brain className="text-black/60 mt-1" size={16} />
                  <div>
                    <h4 className="font-bold text-black">Bring your laptop</h4>
                    <p className="text-black/70">
                      Bring your laptop and any necessary accessories (charger, mouse, etc.). Ensure your laptop is
                      fully functional and ready for use.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MessageCircle className="text-black/60 mt-1" size={16} />
                  <div>
                    <h4 className="font-bold text-black">Be prepared to discuss</h4>
                    <p className="text-black/70">Be prepared to discuss your work, skills, and experience in detail.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="text-black/60 mt-1" size={16} />
                  <div>
                    <h4 className="font-bold text-black">Showcase relevant projects</h4>
                    <p className="text-black/70">
                      Highlight the work that best represents your abilities and aligns with the position you're
                      applying for.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <HelpCircle className="text-black/60 mt-1" size={16} />
                  <div>
                    <h4 className="font-bold text-black">Ask questions</h4>
                    <p className="text-black/70">
                      Engage with the interviewers by asking insightful questions about the role and organization.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FAQ Section */}
        <div className="form-section mb-12">
          <h2 className="text-3xl font-bold text-black mb-8 text-center flex items-center justify-center space-x-3">
            <HelpCircle className="text-black" />
            <span>Frequently Asked Questions</span>
          </h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-black/10 hover:border-black/20 transition-all overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none"
                >
                  <h3 className="font-bold text-black flex-1 pr-4">{faq.question}</h3>
                  <div className="flex-shrink-0 ml-4 mr-2">
                    {expandedFAQ === index ? (
                      <ChevronUp className="text-black/60" size={20} />
                    ) : (
                      <ChevronDown className="text-black/60" size={20} />
                    )}
                  </div>
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <p className="text-black/70 leading-relaxed pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Why Join AIS */}
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