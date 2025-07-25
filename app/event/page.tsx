"use client"
import { useEffect, useState, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

// --- Type Definitions ---
interface ImageType {
  src: string;
  alt: string;
  overlayText?: string;
}

interface GalleryMediaItem {
  id: number;
  type: string;
  title: string;
  desc: string;
  url: string;
  span: string;
}

// --- Data Arrays ---
const leftImages: ImageType[] = [
  {
    src: "/images/AI 101.png",
    alt: "AI 101",
    overlayText:
      "An immersive kickoff event where freshers engaged in foundational AI concepts, hands-on coding sessions, and insightful talks, setting the stage for innovation and learning.",
  },
  {
    src: "/images/TECH ARENA.png",
    alt: "TechArena 2025",
    overlayText:
      "AIS proudly participated in TechArena 2025, presenting innovative projects and connecting with a vibrant community of tech enthusiasts and industry experts.",
  },
  {
    src: "/images/Workshop.png",
    alt: "Workshop",
    overlayText:
      "A deep dive into the fusion of XR and Generative AI, providing students with hands-on experience and practical insights into emerging technologies.",
  },
]

const rightImages: ImageType[] = [
  {
    src: "/images/AI HUNT 2.0.png",
    alt: "AI Hunt 2.0",
    overlayText:
      "AI Hunt 2.0 was an exciting 48‑hour online cryptic treasure hunt, featuring a Gen AI workshop, an info session, and dynamic problem‑solving challenges that pushed the boundaries of AI exploration.",
  },
  {
    src: "/images/Project Showcase.png",
    alt: "Project Showcase",
    overlayText:
      "AIS shone at the Project Showcase, presenting over 10 groundbreaking projects, the most by any student body, that redefined innovation and creativity!",
  },
  {
    src: "/images/Club Carnival.png",
    alt: "Club Carnival",
    overlayText:
      "Freshers Orientation and Club Carnival for the new batch of students. Included a variety of fun demos, games, and fun events.",
  },
]

const leftCubeImages: ImageType[] = [
  { src: "/images/RL.png", alt: "Reinforcement Learning" },
  { src: "/images/GENAI.png", alt: "Generative AI" },
  { src: "/images/NLP.png", alt: "Natural Language Processing" },
  { src: "/images/CV.png", alt: "Computer Vision" },
  { src: "/images/DESIGN.png", alt: "Design" },
  { src: "/images/MULTIMEDIA.png", alt: "Multimedia" },
]

const rightCubeImages: ImageType[] = [
  { src: "/images/MANAGEMENT.png", alt: "Management" },
  { src: "/images/PR.png", alt: "Public Relations" },
  { src: "/images/DESIGN.png", alt: "Design" },
  { src: "/images/MULTIMEDIA.png", alt: "Multimedia" },
  { src: "/images/GENAI.png", alt: "Generative AI" },
  { src: "/images/NLP.png", alt: "Natural Language Processing" },
]

const galleryMediaItems: GalleryMediaItem[] = [
  { 
    id: 1, 
    type: "image", 
    title: "AI 101", 
    desc: "An immersive kickoff event where freshers engaged in foundational AI concepts...", 
    url: "/api/placeholder/400/300", 
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2" 
  },
  { 
    id: 2, 
    type: "image", 
    title: "AI Hunt 2.0", 
    desc: "AI Hunt 2.0 was an exciting 48‑hour online cryptic treasure hunt...", 
    url: "/api/placeholder/600/400", 
    span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2" 
  },
  { 
    id: 3, 
    type: "image", 
    title: "TechArena 2025", 
    desc: "AIS proudly participated in TechArena 2025, presenting innovative projects...", 
    url: "/api/placeholder/400/300", 
    span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2" 
  },
  { 
    id: 4, 
    type: "image", 
    title: "Project Showcase", 
    desc: "AIS shone at the Project Showcase, presenting over 10 groundbreaking projects...", 
    url: "/api/placeholder/600/400", 
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2" 
  },
  { 
    id: 5, 
    type: "image", 
    title: "Workshop", 
    desc: "A deep dive into the fusion of XR and Generative AI, providing hands-on experience...", 
    url: "/api/placeholder/400/300", 
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2" 
  },
  { 
    id: 6, 
    type: "image", 
    title: "Club Carnival", 
    desc: "Freshers Orientation and Club Carnival for the new batch of students...", 
    url: "/api/placeholder/600/400", 
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2" 
  },
]

// --- Scroll Progress Component ---
const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState<number>(0)
  const [visible, setVisible] = useState<boolean>(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
    
    setProgress(Math.min(Math.max(scrolled, 0), 100))
    setVisible(true)
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    timeoutRef.current = setTimeout(() => {
      setVisible(false)
    }, 1000)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  return (
    <div 
      className="fixed right-3 top-1/2 transform -translate-y-1/2 w-1 h-24 bg-white/20 rounded-full z-50 transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div 
        className="w-full bg-white rounded-full transition-all duration-150 ease-out"
        style={{ height: `${progress}%` }}
      />
    </div>
  )
}

// --- Event Card Component with Enhanced Animation ---
interface EventCardProps {
  image: ImageType;
  isLeft?: boolean;
  index: number;
}

const EventCard: React.FC<EventCardProps> = ({ image, isLeft = false, index }) => (
  <div 
    className={`relative w-full max-w-md md:w-2/5 h-80 md:h-96 rounded-xl overflow-hidden cursor-pointer group shadow-2xl mx-auto transform transition-all duration-700 hover:scale-110 hover:rotate-1 ${
      isLeft ? 'hover:-rotate-1' : 'hover:rotate-1'
    }`}
    style={{
      animation: `slideIn${isLeft ? 'Left' : 'Right'} 0.8s ease-out ${index * 0.2}s both`
    }}
  >
    <div className="relative w-full h-full">
      <img 
        src={image.src} 
        alt={image.alt} 
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:brightness-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-full transition-all duration-500 ease-out group-hover:translate-y-0">
          <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
            {image.alt}
          </h3>
          <p className="text-xs md:text-sm text-white/90 leading-relaxed line-clamp-3 md:line-clamp-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
            {image.overlayText}
          </p>
        </div>
      </div>
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-xl transition-all duration-500"></div>
    </div>
  </div>
)

// --- Enhanced 3D Cube Component ---
interface ThreeDCubeProps {
  images: ImageType[];
  className?: string;
}

const ThreeDCube: React.FC<ThreeDCubeProps> = ({ images, className }) => {
  const [rotationX, setRotationX] = useState<number>(0)
  const [rotationY, setRotationY] = useState<number>(0)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const animate = () => {
      setRotationY(prev => prev + 0.3)
      setRotationX(prev => prev + 0.15)
      animationRef.current = requestAnimationFrame(animate)
    }
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className={`${className} relative`}>
      <div 
        className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto"
        style={{ perspective: '1000px' }}
      >
        <div 
          className="relative w-full h-full transition-transform duration-100 ease-linear"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`
          }}
        >
          {/* Front Face */}
          <div 
            className="absolute w-full h-full bg-cover bg-center backdrop-blur-sm rounded-lg shadow-2xl"
            style={{ 
              backgroundImage: `url(${images[0]?.src})`,
              transform: 'translateZ(80px)',
              border: '2px solid rgba(255,255,255,0.2)',
              boxShadow: '0 0 20px rgba(255,255,255,0.1)'
            }}
          />
          
          {/* Back Face */}
          <div 
            className="absolute w-full h-full bg-cover bg-center backdrop-blur-sm rounded-lg shadow-2xl"
            style={{ 
              backgroundImage: `url(${images[1]?.src})`,
              transform: 'translateZ(-80px) rotateY(180deg)',
              border: '2px solid rgba(255,255,255,0.2)',
              boxShadow: '0 0 20px rgba(255,255,255,0.1)'
            }}
          />
          
          {/* Right Face */}
          <div 
            className="absolute w-full h-full bg-cover bg-center backdrop-blur-sm rounded-lg shadow-2xl"
            style={{ 
              backgroundImage: `url(${images[2]?.src})`,
              transform: 'rotateY(90deg) translateZ(80px)',
              border: '2px solid rgba(255,255,255,0.2)',
              boxShadow: '0 0 20px rgba(255,255,255,0.1)'
            }}
          />
          
          {/* Left Face */}
          <div 
            className="absolute w-full h-full bg-cover bg-center backdrop-blur-sm rounded-lg shadow-2xl"
            style={{ 
              backgroundImage: `url(${images[3]?.src})`,
              transform: 'rotateY(-90deg) translateZ(80px)',
              border: '2px solid rgba(255,255,255,0.2)',
              boxShadow: '0 0 20px rgba(255,255,255,0.1)'
            }}
          />
          
          {/* Top Face */}
          <div 
            className="absolute w-full h-full bg-cover bg-center backdrop-blur-sm rounded-lg shadow-2xl"
            style={{ 
              backgroundImage: `url(${images[4]?.src})`,
              transform: 'rotateX(90deg) translateZ(80px)',
              border: '2px solid rgba(255,255,255,0.2)',
              boxShadow: '0 0 20px rgba(255,255,255,0.1)'
            }}
          />
          
          {/* Bottom Face */}
          <div 
            className="absolute w-full h-full bg-cover bg-center backdrop-blur-sm rounded-lg shadow-2xl"
            style={{ 
              backgroundImage: `url(${images[5]?.src})`,
              transform: 'rotateX(-90deg) translateZ(80px)',
              border: '2px solid rgba(255,255,255,0.2)',
              boxShadow: '0 0 20px rgba(255,255,255,0.1)'
            }}
          />
        </div>
      </div>
    </div>
  )
}

// --- Interactive Bento Gallery Component ---
interface InteractiveBentoGalleryProps {
  mediaItems: GalleryMediaItem[];
  title: string;
  description: string;
}

const InteractiveBentoGallery: React.FC<InteractiveBentoGalleryProps> = ({ 
  mediaItems, 
  title, 
  description 
}) => {
  const [selectedItem, setSelectedItem] = useState<GalleryMediaItem | null>(null)

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{title}</h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">{description}</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
        {mediaItems.map((item) => (
          <div
            key={item.id}
            className={`${item.span} relative group cursor-pointer rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105`}
            onClick={() => setSelectedItem(item)}
          >
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-white/80 text-sm line-clamp-2">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
            <div className="relative">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors"
              >
                ✕
              </button>
              <img
                src={selectedItem.url}
                alt={selectedItem.title}
                className="w-full h-64 md:h-96 object-cover rounded-t-2xl"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4">{selectedItem.title}</h3>
                <p className="text-white/80 leading-relaxed">{selectedItem.desc}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// --- Main Events Component ---
export default function Events() {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [scrollY, setScrollY] = useState<number>(0)

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY)
  }, [])

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    setIsLoaded(true)
    
    window.addEventListener("resize", handleResize, { passive: true })
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleResize, handleScroll])

  const leftCubeFaces: ImageType[] = isMobile 
    ? [...leftImages.slice(0, 3), ...leftImages.slice(0, 3)]
    : leftCubeImages
    
  const rightCubeFaces: ImageType[] = isMobile 
    ? [...rightImages.slice(0, 3), ...rightImages.slice(0, 3)]
    : rightCubeImages

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-black text-2xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-white overflow-x-hidden">
      <ScrollProgress />
      
      <div className="content relative z-10 w-full">
        {/* Hero Section */}
        <section className="hero relative w-full min-h-screen flex items-center justify-center px-4 bg-white">
          {/* Background Cubes - Left and Right Sides */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <ThreeDCube 
              images={leftCubeFaces} 
              className="absolute top-1/2 left-4 md:left-8 lg:left-16 transform -translate-y-1/2 opacity-70"
            />
            <ThreeDCube 
              images={rightCubeFaces} 
              className="absolute top-1/2 right-4 md:right-8 lg:right-16 transform -translate-y-1/2 opacity-70"
            />
          </div>

          <div className="hero-text text-center relative z-10">
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-none text-black drop-shadow-2xl">
              Events
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-4 text-black/90 drop-shadow-xl">
              Let's dive in
            </h2>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="main relative w-full flex flex-col items-center justify-start bg-white py-16 px-4">
          <div className="main-content relative z-10 text-center py-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black drop-shadow-2xl">
              AI SOCIETY
            </h1>
          </div>
          
          {/* Event Cards */}
          <div className="cards-container w-full max-w-7xl mx-auto pb-8">
            {leftImages.map((leftImage, index) => (
              <div 
                className="row flex flex-col md:flex-row justify-center items-center w-full gap-6 md:gap-8 mb-16"
                key={index}
              >
                <EventCard image={leftImage} isLeft={true} index={index} />
                <EventCard image={rightImages[index]} isLeft={false} index={index} />
              </div>
            ))}
          </div>
        </section>

        {/* Bento Gallery Section */}
        <section className="bento-gallery-section relative w-full bg-white">
          <div className="container mx-auto max-w-7xl">
            {/* Gallery content removed */}
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          0% { 
            transform: translateX(-100px) rotate(-5deg) scale(0.8);
            opacity: 0;
          }
          100% { 
            transform: translateX(0) rotate(0deg) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes slideInRight {
          0% { 
            transform: translateX(100px) rotate(5deg) scale(0.8);
            opacity: 0;
          }
          100% { 
            transform: translateX(0) rotate(0deg) scale(1);
            opacity: 1;
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}