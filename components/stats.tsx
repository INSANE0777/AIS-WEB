"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image" // Import the Next.js Image component
import { gsap } from "gsap"
import { 
  User, 
  UserCheck, 
  FileText, 
  MessageSquare, 
  Eye, 
  Zap, 
  Sparkles,
  Share2,
  Palette,
  Calendar,
  Camera,
  Mic,
  GraduationCap,
  Brain
} from "lucide-react"

// --- Data (updated with new technical dept) ---
const executives = [
  { icon: User, title: "President" },
  { icon: UserCheck, title: "Vice-President" },
  { icon: FileText, title: "General Secretary" },
]

const technicalDepts = [
  { icon: MessageSquare, title: "Natural Language Processing" },
  { icon: Zap, title: "Reinforcement Learning" },
  { icon: Eye, title: "Computer Vision" },
  { icon: Sparkles, title: "Generative AI" },
  { icon: Brain, title: "Machine Learning Research" },
]

const nonTechnicalDepts = [
  { icon: Share2, title: "Social Media Managers" },
  { icon: Palette, title: "Designers" },
  { icon: Calendar, title: "Event Managers" },
  { icon: Camera, title: "Video Editors // Photographers" },
  { icon: Mic, title: "Public Speakers // Sponsorship Outreach" },
]

// --- Skeleton Loader Component ---
const OrgChartSkeleton = () => (
  <div className="max-w-7xl mx-auto animate-pulse px-4">
    {/* Header */}
    <div className="flex justify-center mb-8 md:mb-16">
      <div className="h-8 md:h-10 w-60 md:w-80 bg-gray-200 rounded-md"></div>
    </div>

    {/* Org Chart Structure */}
    <div className="relative">
      {/* Executives Level */}
      <div className="mb-8 md:mb-12">
        <div className="h-6 md:h-8 w-32 md:w-48 bg-gray-200 rounded-md mx-auto mb-4 md:mb-8"></div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-8">
          <div className="h-24 md:h-32 w-40 md:w-48 bg-gray-200 rounded-2xl"></div>
          <div className="h-24 md:h-32 w-40 md:w-48 bg-gray-200 rounded-2xl"></div>
          <div className="h-24 md:h-32 w-40 md:w-48 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>

      {/* Connecting Lines */}
      <div className="flex justify-center mb-4 md:mb-8">
        <div className="w-px h-8 md:h-12 bg-gray-200"></div>
      </div>

      {/* Departments Level */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-8 md:mb-12">
        <div className="h-64 md:h-80 bg-gray-200 rounded-3xl p-4 md:p-8 space-y-4">
            <div className="h-6 md:h-8 w-48 md:w-64 bg-gray-300 rounded-md mx-auto mb-4"></div>
            <div className="h-10 md:h-12 bg-gray-300 rounded-full"></div>
            <div className="h-10 md:h-12 bg-gray-300 rounded-full"></div>
        </div>
        <div className="h-64 md:h-80 bg-gray-200 rounded-3xl p-4 md:p-8 space-y-4">
            <div className="h-6 md:h-8 w-48 md:w-64 bg-gray-300 rounded-md mx-auto mb-4"></div>
            <div className="h-10 md:h-12 bg-gray-300 rounded-full"></div>
            <div className="h-10 md:h-12 bg-gray-300 rounded-full"></div>
            <div className="h-10 md:h-12 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Connecting Line to Mentors */}
      <div className="flex justify-center mb-4 md:mb-8">
        <div className="w-px h-8 md:h-12 bg-gray-200"></div>
      </div>

      {/* Mentors Level */}
      <div className="flex justify-center">
        <div className="h-32 md:h-40 w-72 md:w-96 bg-gray-200 rounded-3xl"></div>
      </div>
    </div>
  </div>
);


// --- Main Component ---
export default function AISocietyOrgChart() {
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null)
  const chartRef = useRef<HTMLDivElement>(null)

  // Effect to simulate loading and switch off the skeleton
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000); // Adjust time as needed (e.g., 1000ms = 1s)
    return () => clearTimeout(timer);
  }, []);

  // Effect for GSAP animations, runs only after loading is false
  useEffect(() => {
    if (!isLoading && chartRef.current) {
      // Set initial states for animation
      gsap.set(".org-card, .dept-container, .connecting-line", { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(
        ".exec-card",
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      )
      .to(
        ".connecting-line",
        { opacity: 1, duration: 0.3 },
        "-=0.6"
      )
      .to(
        ".dept-container",
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: "power3.out" },
        "-=0.2"
      )
      .to(
        ".dept-card",
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.08, ease: "back.out(1.7)" },
        "-=0.3"
      )
      .to(
        ".mentors-card",
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.2"
      );
    }
  }, [isLoading]);

  return (
    <section ref={sectionRef} className="py-10 md:py-20 px-4 bg-white">
      {isLoading ? (
        <OrgChartSkeleton />
      ) : (
        <div ref={chartRef} className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-16">
            <div className="inline-flex items-center gap-2 md:gap-3 mb-4 flex-col sm:flex-row">
              {/* --- LOGO CHANGE HERE --- */}
              <Image src="/images/BIAS.png" alt="BIAS Logo" width={40} height={40} className="md:w-[52px] md:h-[52px]" />
              <h2 className="text-2xl md:text-4xl font-black text-black text-center sm:text-left">Artificial Intelligence Society</h2>
            </div>
          </div>

          {/* Org Chart Structure */}
          <div className="relative">
            {/* Executives Level */}
            <div className="mb-8 md:mb-12">
              <h3 className="text-xl md:text-2xl font-black text-black text-center mb-6 md:mb-8">Executives</h3>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-8 relative">
                {executives.map((exec, index) => {
                  const Icon = exec.icon
                  return (
                    <div key={index} className="org-card exec-card relative">
                      <div className="p-8 md:p-12 rounded-3xl bg-white border-2 border-black/20 hover:border-black/40 transition-all hover:shadow-xl text-center min-w-[200px] md:min-w-[280px] w-full sm:w-auto">
                        <div className="inline-flex items-center justify-center w-16 md:w-20 h-16 md:h-20 bg-black text-white rounded-full mb-6 md:mb-8">
                          <Icon size={22} className="md:w-8 md:h-8" />
                        </div>
                        <h4 className="text-base md:text-lg font-bold text-black">{exec.title}</h4>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Connecting Lines */}
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="connecting-line w-px h-8 md:h-12 bg-black/30 origin-top"></div>
            </div>

            {/* Departments Level - Both boxes now have equal height */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-8 md:mb-12">
              <div className="dept-container relative h-full">
                <div className="h-full p-4 md:p-8 rounded-3xl bg-white border-2 border-black/20 hover:border-black/30 transition-all shadow-lg flex flex-col">
                  <h3 className="text-lg md:text-2xl font-black text-black mb-4 md:mb-6 text-center">Technical Departments</h3>
                  <div className="grid grid-cols-1 gap-3 md:gap-4 flex-1">
                    {technicalDepts.map((dept, index) => {
                      const Icon = dept.icon
                      return (
                        <div key={index} className="org-card dept-card">
                          <div className="p-2 pl-3 rounded-full bg-gray-50 border border-black/10 hover:border-black/20 transition-all hover:shadow-md">
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0 w-8 md:w-10 h-8 md:h-10 bg-black text-white rounded-full flex items-center justify-center">
                                <Icon size={14} className="md:w-4 md:h-4" />
                              </div>
                              <h4 className="text-xs md:text-sm font-bold text-black leading-tight pr-2 md:pr-4">{dept.title}</h4>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className="dept-container relative h-full">
                <div className="h-full p-4 md:p-8 rounded-3xl bg-white border-2 border-black/20 hover:border-black/30 transition-all shadow-lg flex flex-col">
                  <h3 className="text-lg md:text-2xl font-black text-black mb-4 md:mb-6 text-center">Non-Technical Departments</h3>
                  <div className="space-y-3 md:space-y-4 flex-1">
                    {nonTechnicalDepts.map((dept, index) => {
                      const Icon = dept.icon
                      return (
                        <div key={index} className="org-card dept-card">
                          <div className="p-2 pl-3 rounded-full bg-gray-50 border border-black/10 hover:border-black/20 transition-all hover:shadow-md">
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0 w-8 md:w-10 h-8 md:h-10 bg-black text-white rounded-full flex items-center justify-center">
                                <Icon size={14} className="md:w-4 md:h-4" />
                              </div>
                              <h4 className="text-xs md:text-sm font-bold text-black leading-tight pr-2 md:pr-4">{dept.title}</h4>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Connecting Line to Mentors */}
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="connecting-line w-px h-8 md:h-12 bg-black/30 origin-top"></div>
            </div>

            {/* Mentors Level - Smaller height but wider to match layout */}
            <div className="flex justify-center">
              <div className="org-card mentors-card w-full max-w-4xl">
                <div className="p-4 md:p-6 rounded-3xl bg-white border-2 border-black/20 hover:border-black/30 transition-all shadow-lg text-center">
                  <div className="inline-flex items-center justify-center w-12 md:w-16 h-12 md:h-16 bg-black text-white rounded-full mb-3 md:mb-4">
                    <GraduationCap size={18} className="md:w-6 md:h-6" />
                  </div>
                  <h3 className="text-lg md:text-2xl font-black text-black mb-2">Mentors</h3>
                  <p className="text-black/60 font-medium text-sm md:text-base">(3rd/ 4th Year Students)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}