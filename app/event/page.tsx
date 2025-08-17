"use client"
import { useEffect, useState, useRef, useCallback, useMemo } from "react"
// Import Image component from next/image
import Image from "next/image"

// --- Type Definitions ---
interface ImageType {
  src: string;
  alt: string;
  overlayText?: string;
  date?: string;
  sortDate?: Date;
}

interface GalleryMediaItem {
  id: number;
  type: string;
  title: string;
  desc: string;
  url: string;
  span: string;
  date?: string;
}

// --- Data Arrays (Sorted Latest to Oldest) ---
const eventImages: ImageType[] = [
  {
    src: "/images/TECH ARENA.png",
    alt: "TechArena 2025",
    date: "January 15, 2025",
    sortDate: new Date("2025-01-15"),
    overlayText:
      "AIS proudly participated in TechArena 2025, presenting innovative projects and connecting with a vibrant community of tech enthusiasts and industry experts.",
  },
  {
    src: "/images/AI HUNT 2.0.png",
    alt: "AI Hunt 2.0",
    date: "November 13-17, 2024",
    sortDate: new Date("2024-11-13"),
    overlayText:
      "AI Hunt 2.0 was an exciting 48‑hour online cryptic treasure hunt, featuring a Gen AI workshop, an info session, and dynamic problem‑solving challenges that pushed the boundaries of AI exploration.",
  },
  {
    src: "/images/Workshop.png",
    alt: "Immersive XR Workshop",
    date: "November 13, 2024",
    sortDate: new Date("2024-11-13"),
    overlayText:
      "A deep dive into the fusion of XR and Generative AI, providing students with hands-on experience and practical insights into emerging technologies.",
  },
  {
    src: "/images/Project Showcase.png",
    alt: "Project Showcase",
    date: "October 21, 2024",
    sortDate: new Date("2024-10-21"),
    overlayText:
      "AIS shone at the Project Showcase, presenting over 10 groundbreaking projects, the most by any student body, that redefined innovation and creativity!",
  },
  {
    src: "/images/AI 101.png",
    alt: "AI 101",
    date: "September 19, 2024",
    sortDate: new Date("2024-09-19"),
    overlayText:
      "An immersive kickoff event where freshers engaged in foundational AI concepts, hands-on coding sessions, and insightful talks, setting the stage for innovation and learning.",
  },
  {
    src: "/images/Club Carnival.png",
    alt: "Club Carnival",
    date: "August 23, 2024",
    sortDate: new Date("2024-08-23"),
    overlayText:
      "Freshers Orientation and Club Carnival for the new batch of students. Included a variety of fun demos, games, and fun events.",
  },
];

// Split events into left and right arrays for alternating layout
const leftImages: ImageType[] = eventImages.filter((_, index) => index % 2 === 0);
const rightImages: ImageType[] = eventImages.filter((_, index) => index % 2 === 1);

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

// Dynamically generate gallery items from event images for a functional Bento Grid
const galleryMediaItems: GalleryMediaItem[] = eventImages.map((image, index) => {
  const spans = [
    "md:col-span-2 md:row-span-2 sm:col-span-2", // TechArena
    "md:col-span-2 md:row-span-1 sm:col-span-2", // AI Hunt 2.0
    "md:col-span-1 md:row-span-1", // Immersive XR
    "md:col-span-1 md:row-span-1", // Project Showcase
    "md:col-span-2 md:row-span-1 sm:col-span-2", // AI 101
    "md:col-span-2 md:row-span-2 sm:col-span-2", // Club Carnival
  ];
  return {
    id: index + 1,
    type: "image",
    title: image.alt,
    desc: image.overlayText || "An event by the AI Society.",
    url: image.src,
    date: image.date,
    span: spans[index] || "md:col-span-1 md:row-span-1", // Fallback span
  };
});

// --- Image Preloader Hook ---
const useImagePreloader = (imageSources: string[]) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    const imagePromises = imageSources.map(src => {
      return new Promise<string>((resolve, reject) => {
        // Note: This uses the native browser Image API for preloading, which is fine.
        const img = new window.Image() 
        img.onload = () => resolve(src)
        img.onerror = () => reject(src)
        img.src = src
      })
    })

    Promise.allSettled(imagePromises).then((results) => {
      if (isMounted) {
        const loaded = new Set<string>()
        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            loaded.add(imageSources[index])
          }
        })
        setLoadedImages(loaded)
        setIsLoading(false)
      }
    })

    return () => { isMounted = false }
  }, [imageSources])

  return { loadedImages, isLoading }
}

// --- Enhanced Scroll Animation Hook ---
const useScrollAnimation = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const [scrollProgress, setScrollProgress] = useState<Map<number, number>>(new Map())
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      visibleCards.forEach(cardIndex => {
        const element = document.querySelector(`[data-card-index="${cardIndex}"]`)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + scrollY
          const elementCenter = elementTop + rect.height / 2
          const viewportCenter = scrollY + windowHeight / 2
          
          const distance = (viewportCenter - elementCenter) / windowHeight
          const progress = Math.max(0, Math.min(1, 1 - Math.abs(distance)))
          
          setScrollProgress(prev => new Map(prev.set(cardIndex, progress)))
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [visibleCards])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardIndex = parseInt(entry.target.getAttribute('data-card-index') || '0')
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, cardIndex]))
          } else {
            setVisibleCards(prev => {
              const newSet = new Set(prev)
              newSet.delete(cardIndex)
              return newSet
            })
          }
        })
      },
      { 
        threshold: 0.1,
        rootMargin: '100px 0px'
      }
    )

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const observeElement = useCallback((element: HTMLElement | null, index: number) => {
    if (element && observerRef.current) {
      element.setAttribute('data-card-index', index.toString())
      observerRef.current.observe(element)
    }
  }, [])

  return { visibleCards, observeElement, scrollProgress }
}

// --- Optimized Scroll Progress Component ---
const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState<number>(0)
  const [visible, setVisible] = useState<boolean>(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const rafRef = useRef<number | null>(null)

  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }
    
    rafRef.current = requestAnimationFrame(() => {
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
    })
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  return (
    <div 
      className="fixed right-3 top-1/2 transform -translate-y-1/2 w-1 h-24 bg-black/20 rounded-full z-50 transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div 
        className="w-full bg-black rounded-full transition-all duration-150 ease-out"
        style={{ height: `${progress}%` }}
      />
    </div>
  )
}

// --- Enhanced Event Card Component ---
interface EventCardProps {
  image: ImageType;
  isLeft?: boolean;
  index: number;
  isLoaded: boolean;
  isVisible: boolean;
  scrollProgress: number;
  onRef: (element: HTMLElement | null) => void;
}

const EventCard: React.FC<EventCardProps> = ({ 
  image, 
  isLeft = false, 
  index, 
  isLoaded, 
  isVisible,
  scrollProgress,
  onRef 
}) => {
  const translateX = isVisible ? 0 : isLeft ? -120 : 120
  const translateY = isVisible ? 0 : 80
  const opacity = isVisible ? 1 : 0
  const scale = isVisible ? 1 : 0.85
  
  const parallaxY = (scrollProgress - 0.5) * 30
  const parallaxRotation = (scrollProgress - 0.5) * 2
  const parallaxScale = 0.95 + (scrollProgress * 0.1)

  return (
    <div 
      ref={onRef}
      className="relative w-full max-w-md md:w-2/5 h-80 md:h-96 rounded-xl overflow-hidden cursor-pointer group shadow-2xl mx-auto"
      style={{
        transform: `
          translate3d(${translateX}px, ${translateY + parallaxY}px, 0) 
          scale3d(${scale * parallaxScale}, ${scale * parallaxScale}, 1) 
          rotate3d(0, 0, 1, ${parallaxRotation}deg)
        `,
        opacity,
        transitionProperty: isVisible ? 'transform, opacity' : 'all',
        transitionDuration: isVisible ? '0.1s' : '1.2s',
        transitionTimingFunction: isVisible 
          ? 'cubic-bezier(0.25, 0.46, 0.45, 0.94), ease-out' 
          : 'cubic-bezier(0.23, 1, 0.32, 1)',
        transitionDelay: isVisible ? '0s' : `${index * 0.15}s`,
        willChange: 'transform, opacity'
      }}
    >
      
      <div className="relative w-full h-full">
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl flex items-center justify-center">
            <div className="text-gray-500">Loading...</div>
          </div>
        )}
        <Image 
          src={image.src} 
          alt={image.alt} 
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className={`object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Date Badge */}
        {image.date && (
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            {image.date}
          </div>
        )}
        
          
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-full transition-all duration-500 ease-out group-hover:translate-y-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg md:text-xl font-bold text-white tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                {image.alt}
              </h3>
            
            </div>
            <p className="text-xs md:text-sm text-white/90 leading-relaxed line-clamp-3 md:line-clamp-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
              {image.overlayText}
            </p>
          </div>
        </div>
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-xl transition-all duration-500"></div>
      </div>
    </div>
  )
}

// --- Improved 3D Cube Component for Mobile ---
interface ThreeDCubeProps {
  images: ImageType[];
  className?: string;
  loadedImages: Set<string>;
  isMobile: boolean;
}

const ThreeDCube: React.FC<ThreeDCubeProps> = ({ images, className, loadedImages, isMobile }) => {
  const [rotationX, setRotationX] = useState<number>(0)
  const [rotationY, setRotationY] = useState<number>(0)
  const animationRef = useRef<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const cubeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: '100px' }
    )
    if (cubeRef.current) observer.observe(cubeRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const animate = () => {
      setRotationY(prev => prev + (isMobile ? 0.5 : 0.3))
      setRotationX(prev => prev + (isMobile ? 0.25 : 0.15))
      animationRef.current = requestAnimationFrame(animate)
    }
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [isVisible, isMobile])

  const cubeSize = isMobile 
    ? 'w-20 h-20 sm:w-24 sm:h-24' 
    : 'w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40'
  const cubeDepth = isMobile ? 40 : 60

  return (
    <div className={`${className} relative`} ref={cubeRef}>
      <div 
        className={`relative ${cubeSize} mx-auto`}
        style={{ 
          perspective: isMobile ? '800px' : '1000px',
          filter: isMobile ? 'brightness(1.2) contrast(1.1)' : 'none'
        }}
      >
        <div 
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`
          }}
        >
          {images.slice(0, 6).map((image, index) => {
            const transforms = [
              `translateZ(${cubeDepth}px)`,
              `translateZ(-${cubeDepth}px) rotateY(180deg)`,
              `rotateY(90deg) translateZ(${cubeDepth}px)`,
              `rotateY(-90deg) translateZ(${cubeDepth}px)`,
              `rotateX(90deg) translateZ(${cubeDepth}px)`,
              `rotateX(-90deg) translateZ(${cubeDepth}px)`
            ]

            return (
              <div 
                key={index}
                className="absolute w-full h-full rounded-lg shadow-2xl"
                style={{ 
                  transform: transforms[index],
                  border: isMobile ? '2px solid rgba(0,0,0,0.4)' : '2px solid rgba(0,0,0,0.2)',
                  boxShadow: isMobile ? '0 0 25px rgba(0,0,0,0.3)' : '0 0 20px rgba(0,0,0,0.1)'
                }}
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  {loadedImages.has(image.src) ? (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="160px"
                      className="object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500 rounded-lg">
                      ...
                    </div>
                  )}
                </div>
              </div>
            )
          })}
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
    <div className="w-full py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-black mb-4">{title}</h2>
        <p className="text-lg text-black/80 max-w-2xl mx-auto">{description}</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
        {mediaItems.map((item) => (
          <div
            key={item.id}
            className={`${item.span} relative group cursor-pointer rounded-xl overflow-hidden bg-black/5 backdrop-blur-sm border border-black/10 hover:border-black/30 transition-all duration-300 hover:scale-105 shadow-lg`}
            onClick={() => setSelectedItem(item)}
          >
            <Image
              src={item.url}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Date Badge for Gallery */}
            {item.date && (
              <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-semibold">
                {item.date}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-4">
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
                {item.date && (
                  <p className="text-white/80 text-sm mt-1">{item.date}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
          <div className="bg-white shadow-2xl rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto flex flex-col md:flex-row" onClick={e => e.stopPropagation()}>
            <div className="relative w-full md:w-1/2 h-64 md:h-auto">
              <Image
                src={selectedItem.url}
                alt={selectedItem.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
              />
              {selectedItem.date && (
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-semibold">
                  {selectedItem.date}
                </div>
              )}
            </div>
            <div className="p-6 md:p-8 w-full md:w-1/2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-black">{selectedItem.title}</h3>
                {selectedItem.date && (
                  <span className="text-sm text-black/60 bg-gray-100 px-2 py-1 rounded-md">
                    {selectedItem.date}
                  </span>
                )}
              </div>
              <p className="text-black/80 leading-relaxed">{selectedItem.desc}</p>
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors"
              >
                ✕
              </button>
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
  const [isComponentLoaded, setIsComponentLoaded] = useState<boolean>(false)

  const allImageSources = useMemo(() => [
    ...eventImages.map(img => img.src),
    ...leftCubeImages.map(img => img.src),
    ...rightCubeImages.map(img => img.src)
  ], [])

  const { loadedImages } = useImagePreloader(allImageSources)
  const { visibleCards, observeElement, scrollProgress } = useScrollAnimation()

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    setIsComponentLoaded(true)
    
    window.addEventListener("resize", handleResize, { passive: true })
    
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [handleResize])

  const leftCubeFaces: ImageType[] = useMemo(() => leftCubeImages, [])
  const rightCubeFaces: ImageType[] = useMemo(() => rightCubeImages, [])

  if (!isComponentLoaded) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-black text-2xl animate-pulse">Loading Events...</div>
      </div>
    )
  }

  return (
    <div className="w-full bg-white overflow-x-hidden">
      <ScrollProgress />
      
      <div className="content relative z-10 w-full">
        {/* Hero Section */}
        <section className="hero relative w-full h-screen flex items-center justify-center px-4 bg-white">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <ThreeDCube 
              images={leftCubeFaces} 
              loadedImages={loadedImages}
              isMobile={isMobile}
              className={`absolute z-0 ${
                isMobile 
                  ? 'top-[75%] left-0 transform -translate-y-1/2' 
                  : 'top-8 left-8 md:top-20 md:left-80 lg:bottom-20 lg:left-96'
              }`}
            />
            <ThreeDCube 
              images={rightCubeFaces} 
              loadedImages={loadedImages}
              isMobile={isMobile}
              className={`absolute z-0 ${
                isMobile 
                  ? 'top-[1%] right-[2%] transform -translate-y-1/2' 
                  : 'bottom-8 right-8 md:bottom-20 md:right-60 lg:bottom-20 lg:right-96'
              }`}
            />
          </div>

          <div className="hero-text text-center relative z-10 px-4 py-8">
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black drop-shadow-2xl">
              AI SOCIETY
            </h1>
            <p className="text-lg text-black/70 mt-4">Latest to Oldest Events</p>
          </div>
          
          <div className="cards-container w-full max-w-7xl mx-auto">
            {leftImages.map((leftImage, index) => (
              <div 
                className="row flex flex-col md:flex-row justify-center items-center w-full gap-6 md:gap-8 mb-16"
                key={index}
              >
                <EventCard 
                  image={leftImage} 
                  isLeft={true} 
                  index={index} 
                  isLoaded={loadedImages.has(leftImage.src)}
                  isVisible={visibleCards.has(index * 2)}
                  scrollProgress={scrollProgress.get(index * 2) || 0}
                  onRef={(el) => observeElement(el, index * 2)}
                />
                {rightImages[index] && (
                  <EventCard 
                    image={rightImages[index]} 
                    isLeft={false} 
                    index={index}
                    isLoaded={loadedImages.has(rightImages[index].src)}
                    isVisible={visibleCards.has(index * 2 + 1)}
                    scrollProgress={scrollProgress.get(index * 2 + 1) || 0}
                    onRef={(el) => observeElement(el, index * 2 + 1)}
                  />
                )}
              </div>
            ))}
          </div>
        </section>

     
      </div>

      <style jsx>{`
        .line-clamp-2, .line-clamp-3, .line-clamp-4 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 { -webkit-line-clamp: 2; }
        .line-clamp-3 { -webkit-line-clamp: 3; }
        .line-clamp-4 { -webkit-line-clamp: 4; }
      `}</style>
    </div>
  )
}