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
  GraduationCap
} from "lucide-react"

// --- Data (no changes) ---
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
  <div className="max-w-7xl mx-auto animate-pulse">
    {/* Header */}
    <div className="flex justify-center mb-16">
      <div className="h-10 w-80 bg-gray-200 rounded-md"></div>
    </div>

    {/* Org Chart Structure */}
    <div className="relative">
      {/* Executives Level */}
      <div className="mb-12">
        <div className="h-8 w-48 bg-gray-200 rounded-md mx-auto mb-8"></div>
        <div className="flex justify-center items-center gap-8">
          <div className="h-32 w-48 bg-gray-200 rounded-2xl"></div>
          <div className="h-32 w-48 bg-gray-200 rounded-2xl"></div>
          <div className="h-32 w-48 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>

      {/* Connecting Lines */}
      <div className="flex justify-center mb-8">
        <div className="w-px h-12 bg-gray-200"></div>
      </div>

      {/* Departments Level */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        <div className="h-64 bg-gray-200 rounded-3xl p-8 space-y-4">
            <div className="h-8 w-64 bg-gray-300 rounded-md mx-auto mb-4"></div>
            <div className="h-12 bg-gray-300 rounded-full"></div>
            <div className="h-12 bg-gray-300 rounded-full"></div>
        </div>
        <div className="h-80 bg-gray-200 rounded-3xl p-8 space-y-4">
            <div className="h-8 w-64 bg-gray-300 rounded-md mx-auto mb-4"></div>
            <div className="h-12 bg-gray-300 rounded-full"></div>
            <div className="h-12 bg-gray-300 rounded-full"></div>
            <div className="h-12 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Connecting Line to Mentors */}
      <div className="flex justify-center mb-8">
        <div className="w-px h-12 bg-gray-200"></div>
      </div>

      {/* Mentors Level */}
      <div className="flex justify-center">
        <div className="h-40 w-80 bg-gray-200 rounded-3xl"></div>
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
    <section ref={sectionRef} className="py-20 px-4 bg-white">
      {isLoading ? (
        <OrgChartSkeleton />
      ) : (
        <div ref={chartRef} className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              {/* --- LOGO CHANGE HERE --- */}
              <Image src="/images/BIAS.png" alt="BIAS Logo" width={52} height={52 } />
              <h2 className="text-4xl font-black text-black">Artificial Intelligence Society</h2>
            </div>
          </div>

          {/* Org Chart Structure */}
          <div className="relative">
            {/* Executives Level */}
            <div className="mb-12">
              <h3 className="text-2xl font-black text-black text-center mb-8">Executives</h3>
              <div className="flex justify-center items-center gap-8 relative">
                {executives.map((exec, index) => {
                  const Icon = exec.icon
                  return (
                    <div key={index} className="org-card exec-card relative">
                      <div className="p-6 rounded-2xl bg-white border-2 border-black/20 hover:border-black/40 transition-all hover:shadow-xl text-center min-w-[200px]">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-black text-white rounded-full mb-4">
                          <Icon size={20} />
                        </div>
                        <h4 className="text-sm font-bold text-black">{exec.title}</h4>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Connecting Lines */}
            <div className="flex justify-center mb-8">
              <div className="connecting-line w-px h-12 bg-black/30 origin-top"></div>
            </div>

            {/* Departments Level */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <div className="dept-container relative">
                <div className="p-8 rounded-3xl bg-white border-2 border-black/20 hover:border-black/30 transition-all shadow-lg">
                  <h3 className="text-2xl font-black text-black mb-6 text-center">Technical Departments</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {technicalDepts.map((dept, index) => {
                      const Icon = dept.icon
                      return (
                        <div key={index} className="org-card dept-card">
                          <div className="p-2 pl-3 rounded-full bg-gray-50 border border-black/10 hover:border-black/20 transition-all hover:shadow-md">
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
                                <Icon size={16} />
                              </div>
                              <h4 className="text-sm font-bold text-black leading-tight pr-4">{dept.title}</h4>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className="dept-container relative">
                <div className="p-8 rounded-3xl bg-white border-2 border-black/20 hover:border-black/30 transition-all shadow-lg">
                  <h3 className="text-2xl font-black text-black mb-6 text-center">Non-Technical Departments</h3>
                  <div className="space-y-4">
                    {nonTechnicalDepts.map((dept, index) => {
                      const Icon = dept.icon
                      return (
                        <div key={index} className="org-card dept-card">
                          <div className="p-2 pl-3 rounded-full bg-gray-50 border border-black/10 hover:border-black/20 transition-all hover:shadow-md">
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
                                <Icon size={16} />
                              </div>
                              <h4 className="text-sm font-bold text-black leading-tight pr-4">{dept.title}</h4>
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
            <div className="flex justify-center mb-8">
              <div className="connecting-line w-px h-12 bg-black/30 origin-top"></div>
            </div>

            {/* Mentors Level */}
            <div className="flex justify-center">
              <div className="org-card mentors-card">
                <div className="p-8 rounded-3xl bg-white border-2 border-black/20 hover:border-black/30 transition-all shadow-lg text-center min-w-[300px]">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4">
                    <GraduationCap size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-black mb-2">Mentors</h3>
                  <p className="text-black/60 font-medium">(3rd/ 4th Year Students)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}