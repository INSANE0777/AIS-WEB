"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { gsap } from "gsap"
import { motion, AnimatePresence } from "framer-motion"
import {
  Users, Sparkles, Award, Brain, Heart, Zap, Star, Rocket, ArrowRight, Send, LoaderIcon, CheckCircle,
  XCircle, Calendar, Clock, MessageCircle, AlertTriangle, HelpCircle, ChevronDown, ChevronUp, Code,
  Megaphone, Globe, Eye, Cpu, MessageSquare, Bot, RefreshCw,
} from "lucide-react"
import toast from "react-hot-toast"
// --- NEW: Import your real Appwrite client ---
import { databases, ID } from "./appwrite/app"; // Make sure this path is correct

// --- NEW: Floating SVG Background Component ---

const FloatingSvgBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMobileOptimization();

  // The two new SVGs you provided
  const svgs = [
    `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_234_943)"> <path fill-rule="evenodd" clip-rule="evenodd" d="M200 50V4.37114e-06L100 0V49.9803C99.9893 22.3751 77.6077 4.37114e-06 50 4.37114e-06H2.18557e-06V100H50C22.3858 100 -1.20706e-06 122.386 0 150L2.18557e-06 200H100L100 150C100 177.614 122.386 200 150 200H200L200 100H150.02C177.625 99.9893 200 77.6077 200 50Z" fill="url(#paint0_linear_234_943)"/> </g> <defs> <linearGradient id="paint0_linear_234_943" x1="27.5" y1="19" x2="149" y2="174.5" gradientUnits="userSpaceOnUse"> <stop stop-color="#FFD9A0"/> <stop offset="1" stop-color="#FFF5F1"/> </linearGradient> <clipPath id="clip0_234_943"> <rect width="200" height="200" fill="white"/> </clipPath> </defs> </svg>`,
    `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_234_869)"> <path fill-rule="evenodd" clip-rule="evenodd" d="M50 0H0V100H50C22.3858 100 0 122.386 0 150V200H100V150C100 177.614 122.386 200 150 200H200V100H150C177.614 100 200 77.6142 200 50V0H100V50C100 22.3858 77.6142 0 50 0ZM100 100H50C77.6142 100 100 122.386 100 150V100ZM100 100V50C100 77.6142 122.386 100 150 100H100Z" fill="url(#paint0_linear_234_869)"/> </g> <defs> <linearGradient id="paint0_linear_234_869" x1="100" y1="0" x2="100" y2="200" gradientUnits="userSpaceOnUse"> <stop stop-color="#A7B5FF"/> <stop offset="1" stop-color="#F3ACFF"/> </linearGradient> <clipPath id="clip0_234_869"> <rect width="200" height="200" fill="white"/> </clipPath> </defs> </svg>`
  ];

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const container = containerRef.current;
    const particleCount = 12; // Number of floating SVGs

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.innerHTML = svgs[Math.floor(Math.random() * svgs.length)];
      particle.className = "background-svg-particle absolute opacity-0"; // Class for CSS targeting
      
      const size = Math.random() * 150 + 50; // Size between 50px and 200px
      gsap.set(particle, {
        width: size,
        height: size,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.05 + 0.02, // Very low opacity for a subtle effect
      });

      container.appendChild(particle);

      // Continuous, slow, looping animation
      gsap.to(particle, {
        duration: Math.random() * 40 + 30, // Long duration (30-70 seconds)
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
        rotation: (Math.random() - 0.5) * 360,
        ease: "sine.inOut",
        repeat: -1, // Infinite loop
        yoyo: true, // Animate back and forth
        delay: Math.random() * 5,
      });
    }
  }, [reducedMotion]);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full -z-10 overflow-hidden" />;
};


// --- Helper Components & Hooks ---

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}
const MagneticButton: React.FC<MagneticButtonProps> = ({ children, ...props }) => <button {...props}>{children}</button>

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
    window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", checkMotionPreference)
    return () => {
      window.removeEventListener("resize", checkMobile)
      window.matchMedia("(prefers-reduced-motion: reduce)").removeEventListener("change", checkMotionPreference)
    }
  }, [])
  return { isMobile, reducedMotion }
}

const getOptimizedDuration = (duration: number, isMobile?: boolean, reducedMotion?: boolean): number => {
  if (reducedMotion) return 0
  return isMobile ? duration * 0.7 : duration
}

const getOptimizedEase = (): string => "power3.out"

// --- Fluid Animation Canvas Component ---
const FluidAnimationCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { reducedMotion } = useMobileOptimization()

  useEffect(() => {
    if (reducedMotion || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    const mouse = { x: -1000, y: -1000, radius: 80 }

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      particles = []
      initParticles()
    }

    class Particle {
      x: number; y: number; size: number; baseX: number; baseY: number; density: number
      constructor(x: number, y: number) { this.x = x; this.y = y; this.size = 1.5; this.baseX = this.x; this.baseY = this.y; this.density = (Math.random() * 30) + 1 }
      draw() { if (!ctx) return; ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.closePath(); ctx.fill() }
      update() { if (!ctx) return; let dx = mouse.x - this.x; let dy = mouse.y - this.y; let distance = Math.sqrt(dx * dx + dy * dy); let forceDirectionX = dx / distance; let forceDirectionY = dy / distance; let maxDistance = mouse.radius; let force = (maxDistance - distance) / maxDistance; let directionX = (forceDirectionX * force * this.density); let directionY = (forceDirectionY * force * this.density); if (distance < mouse.radius) { this.x -= directionX; this.y -= directionY } else { if (this.x !== this.baseX) { let dx = this.x - this.baseX; this.x -= dx / 10 } if (this.y !== this.baseY) { let dy = this.y - this.baseY; this.y -= dy / 10 } } }
    }

    const initParticles = () => { const particleCount = Math.floor((canvas.width * canvas.height) / 8000); for (let i = 0; i < particleCount; i++) { let x = Math.random() * canvas.width; let y = Math.random() * canvas.height; particles.push(new Particle(x, y)) } }
    const connect = () => { let opacityValue = 1; for (let a = 0; a < particles.length; a++) { for (let b = a; b < particles.length; b++) { let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x)) + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y)); if (distance < (canvas.width / 7) * (canvas.height / 7)) { opacityValue = 1 - (distance / 20000); ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue * 0.3})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(particles[a].x, particles[a].y); ctx.lineTo(particles[b].x, particles[b].y); ctx.stroke() } } } }
    const animate = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.update(); p.draw() }); connect(); animationFrameId = requestAnimationFrame(animate) }
    const handleMouseMove = (event: MouseEvent) => { const rect = canvas.getBoundingClientRect(); mouse.x = event.clientX - rect.left; mouse.y = event.clientY - rect.top }
    const handleMouseLeave = () => { mouse.x = -1000; mouse.y = -1000 }

    resizeCanvas(); animate()
    window.addEventListener('resize', resizeCanvas); canvas.addEventListener('mousemove', handleMouseMove); canvas.addEventListener('mouseleave', handleMouseLeave)
    return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener('resize', resizeCanvas); canvas.removeEventListener('mousemove', handleMouseMove); canvas.removeEventListener('mouseleave', handleMouseLeave) }
  }, [reducedMotion])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
}

// --- REMOVED: Mock Appwrite Client ---

// --- Type Definitions ---
interface DepartmentInfo { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; description: string; skills: string[] }
interface TechDepartmentInfo extends DepartmentInfo { projects: string[]; requirements: string[] }
interface FAQItem { question: string; answer: string }

// --- Zod Schema ---
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
    portfolioLinks: z.string().optional().or(z.literal("")),
    linkedinLink: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
    githubLink: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  })
  .refine((data) => (data.domain === "Tech" ? !!data.githubLink && data.githubLink.length > 0 : true), {
    message: "GitHub link is required for the Tech domain",
    path: ["githubLink"],
  })

type FormData = z.infer<typeof formSchema>

// --- Department & Page Constants ---
const TECH_DEPARTMENTS: { [key: string]: TechDepartmentInfo } = { 
  "Natural Language Processing (NLP)": { icon: MessageSquare, description: "Work with language models, text analysis, chatbots, and language understanding systems.", skills: ["Python", "Transformers", "NLTK", "spaCy", "Hugging Face", "LangChain", "OpenAI APIs"], projects: ["Conversational AI Chatbots", "Sentiment Analysis Systems", "Text Summarization Tools"], requirements: ["Strong foundation in Python programming", "Understanding of language processing concepts"] }, 
  "Generative AI (GenAI)": { icon: Bot, description: "Create AI systems that generate content - text, images, code, and multimedia using cutting-edge generative models.", skills: ["Python", "PyTorch/TensorFlow", "Stable Diffusion", "GPT APIs", "LangChain", "Prompt Engineering"], projects: ["AI Art Generation Applications", "Code Generation Tools", "Creative Writing Assistants"], requirements: ["Strong programming skills in Python", "Understanding of neural networks"] }, 
  "Reinforcement Learning (RL)": { icon: Cpu, description: "Develop AI agents that learn through interaction with environments, perfect for game AI, robotics, and decision-making systems.", skills: ["Python", "OpenAI Gym", "Stable Baselines3", "PyTorch", "Unity ML-Agents", "Ray RLlib"], projects: ["Game AI Agents (Chess, Go, Atari)", "Autonomous Navigation Systems", "Trading and Finance Bots"], requirements: ["Strong mathematical background", "Programming experience in Python"] }, 
  "Computer Vision (CV)": { icon: Eye, description: "Build AI systems that can see, understand, and interpret visual information from images and videos.", skills: ["Python", "OpenCV", "PyTorch/TensorFlow", "YOLO", "Detectron2", "Pillow", "Scikit-image"], projects: ["Object Detection and Recognition", "Face Recognition Systems", "Medical Image Analysis"], requirements: ["Strong programming skills", "Basic understanding of linear algebra"] },
  "Research": { icon: Star, description: "Dive deep into theoretical AI, explore novel concepts, and contribute to academic publications. This is for those who want to push the boundaries of AI knowledge.", skills: ["Python", "PyTorch/TensorFlow", "LaTeX", "Academic Writing", "Critical Thinking", "Statistical Analysis"], projects: ["Original Research Papers", "Replication Studies of State-of-the-Art Models", "Literature Review Compilations"], requirements: ["Strong academic and theoretical background", "Passion for exploring novel concepts", "Excellent writing and analytical skills"] },
}
const NON_TECH_DEPARTMENTS: { [key: string]: DepartmentInfo } = { "Community Outreach": { icon: Users, description: "Social Media Managers: Manage socials and create engaging content (stories & reels on Instagram).", skills: ["Social Media Management", "Content Creation", "Community Building"] }, Designers: { icon: Sparkles, description: "Proficient with Canva/Figma for creating designs. Focus on graphic and visual design.", skills: ["Canva/Figma", "Graphic Design", "Visual Identity"] }, "Event Managers": { icon: Award, description: "Oversee administrative and logistical aspects. Coordinate meetings, events, and club activities.", skills: ["Event Planning", "Project Management", "Leadership"] }, "Public Speakers (PR)": { icon: Brain, description: "Engage with external representatives and organizations. Build partnerships and collaborations.", skills: ["Public Speaking", "Networking", "Partnership Development"] }, "Photographers / Video Editors": { icon: Zap, description: "Capture high-quality photos and videos during events. Edit and create engaging visual content.", skills: ["Photography", "Video Editing", "Creative Direction"] } }
const ALL_DEPARTMENTS = { Tech: Object.keys(TECH_DEPARTMENTS), "Non-Tech": Object.keys(NON_TECH_DEPARTMENTS) }
const ALL_DEPARTMENTS_FOR_TABS = [...Object.keys(TECH_DEPARTMENTS).map((dept) => ({ name: dept, domain: "Tech" as const })), ...Object.keys(NON_TECH_DEPARTMENTS).map((dept) => ({ name: dept, domain: "Non-Tech" as const }))]
const ADDITIONAL_SKILLS: string[] = ["Researching", "Content Writing", "Designing (Canva/Figma/Photoshop etc.)", "Public Speaking", "Outreach and Sponsorship", "Social Media Management / Marketing", "Photography/Videography", "Managing Events", "3D softwares (Blender, Maya, etc)", "Video editing (Capcut/Kinemaster/After Effects, Da Vinci etc)"]
const TIMELINE_ITEMS = [{ icon: Send, title: "Fill the Form", subtitle: "Applications open till Monday 27th January 12 noon", description: "Applications: 128+", status: "ongoing", date: "Till 27th Jan" }, { icon: Clock, title: "Form Shortlisting", subtitle: "Form review period where you will be judged by the form responses", description: "AI Generated Form Responses will be rejected.", status: "upcoming", date: "21st-27th Jan" }, { icon: MessageCircle, title: "One-on-One Interview", subtitle: "Candidate is interviewed on technicalities and soft skills", description: "Interview Guidelines and Preparation", status: "upcoming", date: "26th-27th Jan" }]
const FAQ_ITEMS: FAQItem[] = [{ question: "I missed the deadline, Can I apply now?", answer: "No. We might float volunteer forms later, But the Core Team intake has officially ended." }, { question: "Who can apply for the Junior Core positions?", answer: "If you a fresher, and are in B.Tech / BCA / MCA / M. Tech, you are eligible. If you are passionate about AI, have relevant experience, and are eager to contribute to the growth of our community, you can apply. We encourage individuals with leadership qualities and a vision for the future of AIS to take part." }, { question: "What is the selection criteria for the Junior Core positions?", answer: "Selection will be based on a combination of factors including your experience, skills, leadership qualities, past contributions in AI, and your vision for the role. We are looking for individuals who demonstrate a strong commitment to our mission and the ability to lead initiatives." }, { question: "What are the responsibilities of a Junior Core member?", answer: "As a Junior Core member, you'll be responsible for leading specific sub-domains within AIS, organizing events, mentoring juniors, and ensuring that our projects align with the society's goals. You'll play a key role in shaping the direction of AIS and its initiatives." }, { question: "How can I prepare for the selection process?", answer: "Check the interview guidelines given above. For Technical Teams, you need to complete two courses on AI and Python. For Community Outreach, You will showcase your work and speaking skills depending on your domain." }, { question: "What can I expect as a member?", answer: "AIS is a project oriented club with an emphasis on research as well, after your selection to one of the teams you will help with events and actively make projects that may be published on our site or showcased in these events." }]
const getFriendlyErrorMessage = (error: any): string => { const message = error.message || "An unknown error occurred."; if (message.includes("Network")) return "Network Error: Please check your internet connection."; if (message.toLowerCase().includes("permission")) return "Permission Denied: Please contact support."; if (message.toLowerCase().includes("configured")) return "Configuration Error: Please contact the administrator."; return `An unexpected error occurred. Please try again later.` }

// --- Main Component ---
export default function JoinUs() {
  const pageRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const isInitialMount = useRef(true);
  const { isMobile, reducedMotion } = useMobileOptimization()
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [activeGuideline, setActiveGuideline] = useState<"tech" | "community" | "general">("tech")
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [hoveredDepartment, setHoveredDepartment] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
    clearErrors,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { additionalSkills: [], portfolioLinks: "", linkedinLink: "", githubLink: "" },
  })

  const domainValue = watch("domain")
  const departmentValue = watch("department")
  const domainRegistration = register("domain");

  const selectedDepartment = (domainValue && departmentValue)
    ? { name: departmentValue, domain: domainValue }
    : null;

  const handleSelectDepartment = (department: { name: string; domain: "Tech" | "Non-Tech" }) => {
    setValue("domain", department.domain, { shouldValidate: true })
    setValue("department", department.name, { shouldValidate: true })
    clearErrors(["domain", "department"])
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 300)
  }

  const resetDepartmentSelection = () => {
    setValue("domain", "" as any)
    setValue("department", "")
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFormData = localStorage.getItem("ais-registration-form")
      if (savedFormData) {
        try {
          const parsedData = JSON.parse(savedFormData) as Partial<FormData>
          Object.entries(parsedData).forEach(([key, value]) => {
            if (key in formSchema._def.schema.shape && value) {
              setValue(key as keyof FormData, value as any)
            }
          })
        } catch (error) { console.error("Error loading form data:", error) }
      }
    }
  }, [setValue])
  
  useEffect(() => {
    const subscription = watch((data) => {
      if (typeof window !== "undefined") {
        const cleanedData = Object.fromEntries(Object.entries(data).filter(([, value]) => value && (!Array.isArray(value) || value.length > 0)));
        if (Object.keys(cleanedData).length > 0) { localStorage.setItem("ais-registration-form", JSON.stringify(cleanedData)) } 
        else { localStorage.removeItem("ais-registration-form") }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
    }
  }, [domainValue, setValue]);

  useEffect(() => {
    if (reducedMotion) return
    const tl = gsap.timeline()
    tl.fromTo(".page-header", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: getOptimizedDuration(1, isMobile, reducedMotion), ease: getOptimizedEase() })
      .fromTo(".form-section", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: getOptimizedDuration(0.8, isMobile, reducedMotion), stagger: 0.1, ease: getOptimizedEase() }, "-=0.6")
  }, [isMobile, reducedMotion])

  const onSubmit = async (data: FormData) => {
    setSubmissionStatus("loading")
    setErrorMessage(null)
    try {
      const appwriteData = { fullname: data.fullName, email: data.email, phone: data.phone, degree: data.degree, currentyear: data.year, hostel: data.hostel, domain: data.domain.toLowerCase(), department: data.department, additionalskills: data.additionalSkills.join(", "), elaboratechoices: data.elaborateChoices, hobbies: data.hobbies, fictionalchar: data.fictionalCharacter, whyjoin: data.whyJoinUs, otherlinks: data.portfolioLinks || null, linkedinlink: data.linkedinLink || null, githublink: data.githubLink || null }
      
      const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!
      const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!

      if (!databaseId || !collectionId) throw new Error("Database or Collection is not configured.")
      
      await databases.createDocument(databaseId, collectionId, ID.unique(), appwriteData)
      
      setSubmissionStatus("success")
      toast.success("Registration successful! We'll be in touch.")
      if (typeof window !== "undefined") localStorage.removeItem("ais-registration-form")
      reset()
    } catch (error: any) {
      const friendlyError = getFriendlyErrorMessage(error)
      setErrorMessage(friendlyError)
      setSubmissionStatus("error")
      toast.error(`Registration failed: ${friendlyError}`)
    }
  }

  const renderError = (fieldName: keyof FormData) => errors[fieldName] && <span className="text-sm text-red-500 mt-1">{errors[fieldName]?.message}</span>

  const SuccessMessage = () => (
    <div className="text-center bg-white p-8 sm:p-12 rounded-2xl border border-green-300 shadow-lg">
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6 animate-pulse" />
      <h2 className="text-3xl font-black text-black mb-4">Application Submitted!</h2>
      <p className="text-black/70 text-lg mb-8 max-w-lg mx-auto">Thank you for your interest. We have received your application and will review it shortly.</p>
      <MagneticButton
        onClick={() => {
          setSubmissionStatus("idle");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="bg-black text-white py-3 px-8 rounded-full font-semibold text-lg hover:bg-black/80 transition-all"
      >
        Submit Another Application
      </MagneticButton>
    </div>
  )

  return (
    <div ref={pageRef} className="pt-32 pb-20 px-4 min-h-screen relative overflow-hidden bg-gray-50">
      <FloatingSvgBackground />

      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 cursor-pointer hover:scale-110 transition-transform duration-300">
        <img src="/images/BIAS.png" alt="AI Society Logo" className="w-12 h-12 sm:w-16 sm:h-16 object-contain drop-shadow-lg" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <header className="page-header text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium mb-8">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 200 200" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform hover:rotate-180 duration-500"
            >
              <g clipPath="url(#clip0_119_300)">
                <path 
                  d="M99.6778 105.287C99.6778 -81.6924 145.108 21.3021 98.3534 102.278C145.098 21.3021 257.091 9.12898 95.091 102.638C257.052 9.14845 190.528 99.9892 97.0387 99.9892C190.528 99.9892 257.062 190.859 95.091 97.3404C257.052 190.83 145.108 178.686 98.3534 97.7007C145.098 178.686 99.6778 281.759 99.6778 94.7012C99.6778 281.681 54.2379 178.686 100.993 97.7007C54.2477 178.686 -57.7451 190.859 104.255 97.3404C-57.7062 190.83 8.81757 99.9892 102.307 99.9892C8.81757 99.9892 -57.7159 9.12898 104.255 102.638C-57.7062 9.14845 54.2379 21.3021 100.993 102.278C54.2379 21.3021 99.6778 -81.7411 99.6778 105.287Z" 
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_119_300">
                  <rect width="200" height="200" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            <span>Join the AI Revolution</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-black mb-6">Registration <span className="text-black/60">Form</span></h1>
          <div className="w-24 h-1 bg-black mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-lg text-black/70 leading-relaxed font-semibold">Welcome to the AIS Core Selection Process! We are seeking dedicated individuals for <span className="text-black">Tech, Multimedia, Design and Management</span> roles.</p>
        </header>

        <section className="form-section mb-12">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">Our Organizational Structure</h2>
          <div className="bg-white p-4 rounded-2xl border border-black/10 hover:border-black/20 transition-all"><img src="/images/neworg.jpg" alt="AI Society Organizational Chart" className="w-full h-auto object-contain rounded-xl" /></div>
        </section>

        <section className="form-section bg-white p-8 rounded-2xl border border-black/10 hover:border-black/20 transition-all mb-12 group">
          <div className="flex items-center space-x-3 mb-6"><div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"><Brain size={24} className="text-white" /></div><h2 className="text-2xl font-bold text-black">About AIS</h2></div>
          <p className="text-black/70 leading-relaxed mb-4">The Artificial Intelligence Society (AIS) at Bennett University is one of the most research + open-source development focused student communities on campus. Our mission is to foster a deep understanding of AI and its applications by bringing together like-minded individuals who are eager to learn, share knowledge, and work on innovative projects.</p>
          <p className="text-black/70 leading-relaxed"><span className="font-semibold text-black"> We are an exclusive group of productive individuals</span>, so keep that in mind while you fill the form honestly.</p>
        </section>

        <section className="form-section mb-12">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">Technical Departments</h2>
          <div className="grid md:grid-cols-2 gap-6">{Object.entries(TECH_DEPARTMENTS).map(([dept, info]) => (
            <div key={dept} className="bg-white p-8 rounded-2xl border border-black/10 hover:border-black hover:shadow-lg transition-all group">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-black group-hover:bg-white border-2 border-black rounded-full flex items-center justify-center transition-all flex-shrink-0">
                  <info.icon width={20} height={20} className="text-white group-hover:text-black transition-colors" />
                </div>
                <h3 className="font-bold text-black min-w-0">{dept}</h3>
              </div>
              <p className="text-black/70 text-sm mb-4">{info.description}</p>
            </div>
          ))}</div>
        </section>

        <section className="form-section mb-12">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">Non-Technical Departments</h2>
          <div className="grid md:grid-cols-2 gap-6">{Object.entries(NON_TECH_DEPARTMENTS).map(([dept, info]) => (
            <div key={dept} className="bg-white p-8 rounded-2xl border border-black/10 hover:border-black hover:shadow-lg transition-all group">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-black group-hover:bg-white border-2 border-black rounded-full flex items-center justify-center transition-all flex-shrink-0">
                  <info.icon width={20} height={20} className="text-white group-hover:text-black transition-colors" />
                </div>
                <h3 className="font-bold text-black min-w-0">{dept}</h3>
              </div>
              <p className="text-black/70 text-sm mb-4">{info.description}</p>
            </div>
          ))}</div>
        </section>
        
        <section className="form-section mb-12">
          <AnimatePresence mode="wait">
            { !selectedDepartment ? (
              <motion.div key="selector" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="relative flex flex-col items-center">
                <div className="relative w-full max-w-3xl bg-black rounded-2xl shadow-xl p-8 text-center overflow-hidden">
                  <FluidAnimationCanvas />
                  <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-white">Choose Your Department</h2>
                    <p className="text-white/70 mt-2">Select a department tab below or use the dropdowns in the form.</p>
                  </div>
                </div>
                <div className="w-full max-w-3xl bg-white/50 p-2 rounded-b-2xl shadow-xl -mt-1">
                  <div className="flex w-full" style={{ gap: `2px` }}>
                    {ALL_DEPARTMENTS_FOR_TABS.map((dept, index) => (
                      <motion.div 
                        key={dept.name} 
                        layout 
                        initial={{ opacity: 0, y: -20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.3, delay: index * 0.03 }} 
                        // --- FIX: Changed flex-grow to flex-1 and removed minWidth style ---
                        className="relative flex-1"
                      >
                        <motion.button className="relative bg-white border border-black/10 rounded-lg w-full h-full hover:bg-gray-100 transition-colors duration-200 group focus:outline-none focus:ring-0" onMouseEnter={() => setHoveredDepartment(dept.name)} onMouseLeave={() => setHoveredDepartment(null)} onClick={() => handleSelectDepartment(dept)} animate={{ y: hoveredDepartment === dept.name ? 20 : 0, zIndex: hoveredDepartment === dept.name ? 10 : 1 }} whileTap={{ scale: 0.95, y: 10 }} transition={{ type: "spring", stiffness: 400, damping: 25 }} style={{ transformOrigin: "top center" }}>
                          <div className="px-1 py-4 min-h-[100px] flex items-center justify-center"><span className="text-black/80 group-hover:text-black font-semibold text-[10px] sm:text-xs leading-tight text-center" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>{dept.name}</span></div>
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="selection-confirmation" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="bg-white p-8 rounded-2xl border border-black/10 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-black">Department Selected!</h3>
                <p className="text-black/70 mt-2 text-lg">You've chosen the <span className="font-semibold text-black">{selectedDepartment.name}</span> department.</p>
                <p className="text-black/60 mt-1">Please complete the form below, or change your selection.</p>
                <button onClick={resetDepartmentSelection} className="mt-6 px-5 py-2.5 bg-black/5 text-black rounded-full font-medium hover:bg-black/10 transition-colors text-sm flex items-center justify-center mx-auto"><RefreshCw size={14} className="mr-2" />Change Department</button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <section className="form-section mb-12">
          <h2 className="text-3xl font-bold text-black mb-8 text-center flex items-center justify-center space-x-3"><Calendar /><span>How to Join</span></h2>
          <div className="space-y-6">{TIMELINE_ITEMS.map((item, index) => (<div key={index} className="bg-white p-6 rounded-2xl border border-black/10 hover:border-black/20 transition-all group"><div className="flex items-start space-x-4"><div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${item.status === "ongoing" ? "bg-green-500" : "bg-black/10"}`}><item.icon size={24} className={item.status === "ongoing" ? "text-white" : "text-black/60"} /></div><div className="flex-1"><div className="flex items-center justify-between mb-2"><h3 className="text-xl font-bold text-black">{item.title}</h3><span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === "ongoing" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>{item.status === "ongoing" ? "📝 Ongoing" : "🔍 Upcoming"}</span></div><p className="text-black/70 mb-2">{item.subtitle}</p><p className="text-sm text-black/60 mb-2">{item.description}</p><p className="text-sm font-medium text-black">{item.date}</p></div></div></div>))}</div>
        </section>
        
        <div ref={formRef} className="form-section bg-white p-6 sm:p-8 rounded-2xl border border-black/10 hover:border-black/20 transition-all scroll-mt-24">
          <div className="flex items-center space-x-3 mb-8"><div className="w-12 h-12 bg-black rounded-full flex items-center justify-center"><Send size={24} className="text-white" /></div><h2 className="text-2xl font-bold text-black">Registration Form</h2></div>
          {submissionStatus === "success" ? (<SuccessMessage />) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-semibold text-black mb-2">Full Name <span className="text-red-500">*</span></label><input type="text" {...register("fullName")} required className="w-full px-4 py-3 border-2 border-black/20 rounded-full focus:outline-none focus:border-black transition-colors hover:border-black/40" placeholder="Enter your full name" />{renderError("fullName")}</div>
                <div><label className="block text-sm font-semibold text-black mb-2">Email <span className="text-red-500">*</span></label><input type="email" {...register("email")} required className="w-full px-4 py-3 border-2 border-black/20 rounded-full focus:outline-none focus:border-black transition-colors hover:border-black/40" placeholder="Enter your email address" />{renderError("email")}</div>
                <div><label className="block text-sm font-semibold text-black mb-2">Phone Number <span className="text-red-500">*</span></label><input type="tel" {...register("phone")} required className="w-full px-4 py-3 border-2 border-black/20 rounded-full focus:outline-none focus:border-black transition-colors hover:border-black/40" placeholder="10-digit phone number" />{renderError("phone")}</div>
                <div><label className="block text-sm font-semibold text-black mb-2">Degree Program <span className="text-red-500">*</span></label><input type="text" {...register("degree")} required className="w-full px-4 py-3 border-2 border-black/20 rounded-full focus:outline-none focus:border-black transition-colors hover:border-black/40" placeholder="e.g., B.Tech CSE" />{renderError("degree")}</div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div><label className="block text-sm font-semibold text-black mb-2">Current Year <span className="text-red-500">*</span></label><select {...register("year")} required className="w-full px-4 py-3 border-2 border-black/20 rounded-full focus:outline-none focus:border-black transition-colors hover:border-black/40"><option value="">Select Year</option><option value="1st">1st Year</option><option value="2nd">2nd Year</option><option value="3rd">3rd Year</option><option value="4th">4th Year</option><option value="Postgrad">Postgrad</option></select>{renderError("year")}</div>
                <div><label className="block text-sm font-semibold text-black mb-2">Hostel <span className="text-red-500">*</span></label><select {...register("hostel")} required className="w-full px-4 py-3 border-2 border-black/20 rounded-full focus:outline-none focus:border-black transition-colors hover:border-black/40"><option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option></select>{renderError("hostel")}</div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">Domain <span className="text-red-500">*</span></label>
                  <select
                    {...domainRegistration}
                    required
                    className="w-full px-4 py-3 border-2 border-black/20 rounded-full focus:outline-none focus:border-black transition-colors hover:border-black/40"
                    onChange={(e) => {
                      domainRegistration.onChange(e); 
                      setValue("department", "", { shouldValidate: true });
                    }}
                  >
                    <option value="">Select Domain</option>
                    <option value="Tech">Tech</option>
                    <option value="Non-Tech">Non-Tech</option>
                  </select>
                  {renderError("domain")}
                </div>
              </div>

              <div key={domainValue || 'department-wrapper'}>
                <label className="block text-sm font-semibold text-black mb-2">Department <span className="text-red-500">*</span></label>
                <select {...register("department")} required className="w-full px-4 py-3 border-2 border-black/20 rounded-full focus:outline-none focus:border-black transition-colors hover:border-black/40">
                  <option value="">Select Department</option>
                  {domainValue && ALL_DEPARTMENTS[domainValue as keyof typeof ALL_DEPARTMENTS]?.map((dept) => (<option key={dept} value={dept}>{dept}</option>))}
                </select>
                {renderError("department")}
              </div>

              {domainValue === "Tech" && (<div className="grid md:grid-cols-2 gap-6 p-4 bg-blue-50 rounded-2xl border border-blue-200"><div><label className="block text-sm font-semibold text-black mb-2">GitHub Profile <span className="text-red-500">*</span></label><input type="text" {...register("githubLink")} required className="w-full px-4 py-3 border-2 border-black/20 rounded-full focus:outline-none focus:border-black transition-colors hover:border-black/40" placeholder="https://github.com/username" />{renderError("githubLink")}</div><div><label className="block text-sm font-semibold text-black mb-2">LinkedIn Profile</label><input type="text" {...register("linkedinLink")} className="w-full px-4 py-3 border-2 border-black/20 rounded-full focus:outline-none focus:border-black transition-colors hover:border-black/40" placeholder="https://linkedin.com/in/username" />{renderError("linkedinLink")}</div></div>)}
              
              <div><label className="block text-sm font-semibold text-black mb-4">Additional Skills <span className="text-red-500">*</span></label><div className="grid md:grid-cols-2 gap-3">{ADDITIONAL_SKILLS.map((skill) => (<label key={skill} className="flex items-center space-x-3 cursor-pointer group"><input type="checkbox" value={skill} {...register("additionalSkills")} className="w-5 h-5 accent-black border-2 border-black/20 rounded focus:outline-none focus:ring-0" /><span className="text-black/70 group-hover:text-black transition-colors text-sm">{skill}</span></label>))}{renderError("additionalSkills")}</div></div>
              
              <div><label className="block text-sm font-semibold text-black mb-2">Portfolio/Task Links</label><textarea {...register("portfolioLinks")} rows={3} className="w-full px-4 py-3 border-2 border-black/20 rounded-2xl focus:outline-none focus:border-black transition-colors hover:border-black/40 resize-none" placeholder="Add text, project descriptions, or links..." />{renderError("portfolioLinks")}</div>

              <div className="grid md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-semibold text-black mb-2">Elaborate on Your Choices <span className="text-red-500">*</span></label><textarea {...register("elaborateChoices")} required rows={4} className="w-full px-4 py-3 border-2 border-black/20 rounded-2xl focus:outline-none focus:border-black transition-colors hover:border-black/40 resize-none" placeholder="Explain your department and skill choices" />{renderError("elaborateChoices")}</div>
                <div><label className="block text-sm font-semibold text-black mb-2">Hobbies <span className="text-red-500">*</span></label><textarea {...register("hobbies")} required rows={4} className="w-full px-4 py-3 border-2 border-black/20 rounded-2xl focus:outline-none focus:border-black transition-colors hover:border-black/40 resize-none" placeholder="Describe your hobbies in a few lines" />{renderError("hobbies")}</div>
                <div><label className="block text-sm font-semibold text-black mb-2">Fictional Character <span className="text-red-500">*</span></label><input type="text" {...register("fictionalCharacter")} required className="w-full px-4 py-3 border-2 border-black/20 rounded-full focus:outline-none focus:border-black transition-colors hover:border-black/40" placeholder="A fictional character you resemble" />{renderError("fictionalCharacter")}</div>
                <div><label className="block text-sm font-semibold text-black mb-2">Why Join Us? <span className="text-red-500">*</span></label><textarea {...register("whyJoinUs")} required rows={4} className="w-full px-4 py-3 border-2 border-black/20 rounded-2xl focus:outline-none focus:border-black transition-colors hover:border-black/40 resize-none" placeholder="Write concisely. Don't use ChatGPT." />{renderError("whyJoinUs")}</div>
              </div>

              {submissionStatus === "error" && errorMessage && (<div className="p-4 bg-red-50 border border-red-300 text-red-800 rounded-lg flex items-start space-x-3"><XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" /><div><h4 className="font-bold">Submission Failed</h4><p className="text-sm">{errorMessage}</p></div></div>)}
              
              <div className="pt-6"><MagneticButton type="submit" disabled={submissionStatus === "loading"} className="w-full bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-black/90 transition-all flex items-center justify-center space-x-2 disabled:bg-gray-500 disabled:cursor-not-allowed group">{submissionStatus === "loading" ? (<><LoaderIcon className="animate-spin" size={20} /><span>Submitting...</span></>) : (<><Send size={20} className="group-hover:translate-x-1 transition-transform" /><span>Submit Application</span><ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>)}</MagneticButton></div>
            </form>
          )}
        </div>

        {/* ... Rest of your component JSX remains unchanged ... */}
        <section className="form-section my-12">
          <h2 className="text-3xl font-bold text-black mb-8 text-center flex items-center justify-center space-x-3"><MessageCircle /><span>Interview Guidelines</span></h2>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button onClick={() => setActiveGuideline("tech")} className={`px-6 py-3 rounded-full font-medium transition-all flex items-center space-x-2 ${activeGuideline === "tech" ? "bg-black text-white" : "bg-white text-black border border-black/20 hover:border-black"}`}><Code size={16} /><span>Technical</span></button>
            <button onClick={() => setActiveGuideline("community")} className={`px-6 py-3 rounded-full font-medium transition-all flex items-center space-x-2 ${activeGuideline === "community" ? "bg-black text-white" : "bg-white text-black border border-black/20 hover:border-black"}`}><Megaphone size={16} /><span>Community</span></button>
            <button onClick={() => setActiveGuideline("general")} className={`px-6 py-3 rounded-full font-medium transition-all flex items-center space-x-2 ${activeGuideline === "general" ? "bg-black text-white" : "bg-white text-black border border-black/20 hover:border-black"}`}><Globe size={16} /><span>General</span></button>
          </div>
          {activeGuideline === "tech" && (
            <div className="bg-white p-8 rounded-2xl border border-black/10">
              <div className="flex items-center space-x-3 mb-6">
                <AlertTriangle className="text-red-500" size={24} />
                <h3 className="text-2xl font-bold text-black">For Technical Positions</h3>
              </div>
              <div className="space-y-6 text-black/70">
                <div>
                  <p>AI Generated Form Responses will be rejected in review.</p>
                </div>
                <div>
                  <h4 className="font-bold text-black mb-2">Create a Kaggle account.</h4>
                  <p>Kaggle is a free, online community and platform for AI competitions, learning, and collaboration. It is used by recruiters worldwide.</p>
                </div>
                <div>
                  <h4 className="font-bold text-black mb-2">Mandatory Courses</h4>
                  <p className="mb-2">Complete the following mandatory courses on Kaggle and obtain the certificates. These courses are covered in the YouTube course by Abhishek Thakur's Kaggle Tutorial for Beginners (World's first 4x Kaggle Grandmaster)</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><a href="https://www.kaggle.com/learn/python" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Python Course</a> (Mandatory)</li>
                    <li><a href="https://www.kaggle.com/learn/intro-to-machine-learning" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Intro to Machine Learning</a> (Mandatory)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-black mb-2">Optional Courses</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li><a href="https://www.kaggle.com/learn/intro-to-deep-learning" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Intro to Deep Learning</a> (Optional, recommended for advanced learners)</li>
                    <li><a href="https://www.kaggle.com/learn/intermediate-machine-learning" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Intermediate Machine Learning</a> (Optional, recommended for advanced learners)</li>
                  </ul>
                </div>
                <div>
                  <p>Post Certificate on LinkedIn tagging <a href="https://www.linkedin.com/company/ais-bennett/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@Artificial Intelligence Society Bennett University</a>, mentioning the completion of these (2) courses, and include the certificate links in your post. (Optional, will be considered)</p>
                </div>
                <div>
                  <h4 className="font-bold text-black mb-2">For the interview, we will:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Verify your Kaggle account and check the completion of these (2) courses along with their certificates.</li>
                    <li>You will be asked questions regarding the Kaggle courses.</li>
                    <li>Ask you for sure: Why do you want to join the CV / RL / GenAI / NLP department? Share a problem you want to solve with AI in this domain and your approach.</li>
                  </ul>
                </div>
                <div>
                  <p>Bring your laptop to the interview. Ensure it's fully charged and ready to showcase your work.</p>
                </div>
                <div>
                  <p>We also appreciate additional skills like Web/App development, Video Editing, or Public Speaking.</p>
                </div>
              </div>
            </div>
          )}
          {activeGuideline === "community" && (<div className="bg-white p-8 rounded-2xl border border-black/10"><div className="flex items-center space-x-3 mb-6"><AlertTriangle className="text-blue-500" size={24} /><h3 className="text-2xl font-bold text-black">For Community Outreach</h3></div><div className="space-y-6 text-black/70"><ul className="list-disc list-inside space-y-2"><li>Bring your laptop to the interview. Be prepared to showcase your work and projects.</li></ul><div><h4 className="font-bold text-black mb-2">If applying for Design, Video Editing, or Photography:</h4><ul className="list-disc list-inside space-y-1"><li>Submit your designs in the form and be ready to present them during the interview. Relevant examples include posters, reels, or any visual content you’ve created.</li><li>Skills required: Figma, Canva, Adobe Suite, etc.</li></ul></div><div><h4 className="font-bold text-black mb-2">For Social Media Management:</h4><ul className="list-disc list-inside space-y-1"><li>Provide examples of pages or accounts you have managed.</li></ul></div><div><h4 className="font-bold text-black mb-2">For Management/Public Relations:</h4><ul className="list-disc list-inside space-y-1"><li>Your behavior, personality, and speaking skills will be assessed through an on-the-spot task during the interview.</li></ul></div></div></div>)}
          {activeGuideline === "general" && (<div className="bg-white p-8 rounded-2xl border border-black/10"><div className="flex items-center space-x-3 mb-6"><AlertTriangle className="text-green-500" size={24} /><h3 className="text-2xl font-bold text-black">General Guidelines for All</h3></div><div className="space-y-4 text-black/70"><ul className="list-disc list-inside space-y-2"><li><strong>Be on time.</strong> Punctuality is crucial.</li><li><strong>Dress appropriately.</strong> Professional attire is expected.</li><li><strong>Bring your laptop</strong> and any necessary accessories (charger, mouse, etc.). Ensure your laptop is fully functional and ready for use.</li><li><strong>Be prepared to discuss</strong> your work, skills, and experience in detail.</li><li><strong>Showcase relevant projects.</strong> Highlight the work that best represents your abilities and aligns with the position you’re applying for.</li><li><strong>Ask questions.</strong> Engage with the interviewers by asking insightful questions about the role and organization.</li></ul></div></div>)}
        </section>

        <section className="form-section my-12">
          <h2 className="text-3xl font-bold text-black mb-8 text-center flex items-center justify-center space-x-3"><HelpCircle /><span>Frequently Asked Questions</span></h2>
          <div className="space-y-4">{FAQ_ITEMS.map((faq, index) => (<div key={index} className="bg-white rounded-2xl border border-black/10 hover:border-black/20 transition-all overflow-hidden"><button onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)} className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none"><h3 className="font-bold text-black flex-1 pr-4">{faq.question}</h3><div className="flex-shrink-0 ml-4 mr-2">{expandedFAQ === index ? <ChevronUp className="text-black/60" size={20} /> : <ChevronDown className="text-black/60" size={20} />}</div></button>{expandedFAQ === index && (<motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden"><div className="px-6 pb-6 border-t border-gray-100"><p className="text-black/70 leading-relaxed pt-4">{faq.answer}</p></div></motion.div>)}</div>))}</div>
        </section>

        <section className="form-section mt-12 bg-black text-white p-8 rounded-2xl">
          <div className="text-center mb-8"><h2 className="text-3xl font-bold mb-4 flex items-center justify-center space-x-3"><Heart className="text-red-500 animate-pulse" /><span>Why Join AIS?</span><Rocket className="text-blue-400 animate-bounce" /></h2></div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center group"><div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"><Brain size={32} className="text-white" /></div><h3 className="font-bold mb-2">Learn & Grow</h3><p className="text-white/80 text-sm">Access to cutting-edge AI resources and mentorship</p></div>
            <div className="text-center group"><div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"><Users size={32} className="text-white" /></div><h3 className="font-bold mb-2">Network</h3><p className="text-white/80 text-sm">Connect with like-minded AI enthusiasts and industry experts</p></div>
            <div className="text-center group"><div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"><Award size={32} className="text-white" /></div><h3 className="font-bold mb-2">Achieve</h3><p className="text-white/80 text-sm">Work on award-winning projects and research publications</p></div>
          </div>
        </section>
      </div>
    </div>
  )
}