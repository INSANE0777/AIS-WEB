"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
// Note: ReactLenis is no longer imported here. It has been moved to layout.tsx.
import "@/screensCss/b.css" // Import custom CSS
import InteractiveBentoGallery from "@/components/interactive-bento-gallery"

gsap.registerPlugin(ScrollTrigger)

// --- Data Arrays (Unchanged) ---
const leftImages = [
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

const rightImages = [
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

const leftCubeImages = [
  { src: "/images/RL.png", alt: "Left Cube Front" },
  { src: "/images/GENAI.png", alt: "Left Cube Back" },
  { src: "/images/NLP.png", alt: "Left Cube Right" },
  { src: "/images/CV.png", alt: "Left Cube Left" },
  { src: "/images/DESIGN.png", alt: "Left Cube Top" },
  { src: "/images/MULTIMEDIA.png", alt: "Left Cube Bottom" },
]

const rightCubeImages = [
  { src: "/images/MANAGEMENT.png", alt: "Right Cube Front" },
  { src: "/images/PR.png", alt: "Right Cube Back" },
  { src: "/images/DESIGN.png", alt: "Right Cube Right" },
  { src: "/images/MULTIMEDIA.png", alt: "Right Cube Left" },
  { src: "/images/GENAI.png", alt: "Right Cube Top" },
  { src: "/images/NLP.png", alt: "Right Cube Bottom" },
]

const galleryMediaItems = [
    { id: 1, type: "image", title: "AI 101", desc: "An immersive kickoff event...", url: "/images/AI 101.png", span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2" },
    { id: 2, type: "image", title: "AI Hunt 2.0", desc: "AI Hunt 2.0 was an exciting...", url: "/images/AI HUNT 2.0.png", span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2" },
    { id: 3, type: "image", title: "TechArena 2025", desc: "AIS proudly participated in TechArena...", url: "/images/TECH ARENA.png", span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2" },
    { id: 4, type: "image", title: "Project Showcase", desc: "AIS shone at the Project Showcase...", url: "/images/Project Showcase.png", span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2" },
    { id: 5, type: "image", title: "Workshop", desc: "A deep dive into the fusion of XR and...", url: "/images/Workshop.png", span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2" },
    { id: 6, type: "image", title: "Club Carnival", desc: "Freshers Orientation and Club Carnival...", url: "/images/Club Carnival.png", span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2" },
]

// --- Scroll Progress Component (Unchanged) ---
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (scrollTop / docHeight) * 100
      setProgress(scrolled)
      setVisible(true)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setVisible(false)
      }, 500)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div style={{ position: "fixed", right: "10px", top: "50%", transform: "translateY(-50%)", width: "2.5px", height: "100px", backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "1px", zIndex: 9999, opacity: visible ? 1 : 0, transition: "opacity 0.3s ease-in-out" }}>
      <div style={{ width: "100%", height: `${progress}%`, backgroundColor: "white", borderRadius: "1px" }}/>
    </div>
  )
}

// --- Main Events Component (Fixed) ---
export default function Events() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)

    gsap.registerPlugin(ScrollTrigger)
    const mm = gsap.matchMedia()

    gsap.from(".hero-title", { opacity: 0, y: 50, duration: 1, ease: "power3.out", delay: 0.2 })
    gsap.from(".hero-subtitle", { opacity: 0, y: 50, duration: 1, ease: "power3.out", delay: 0.4 })
    
    mm.add(
      { isDesktop: "(min-width: 768px)", isMobile: "(max-width: 767px)" },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean; isMobile: boolean }
        if (isDesktop) {
          const leftXValues = [-800, -900, -400]
          const rightXValues = [800, 900, 400]
          const leftRotationValues = [-30, -20, -35]
          const rightRotationValues = [30, 20, 35]
          const yValues = [100, -150, -400]
          gsap.utils.toArray<HTMLElement>(".row").forEach((row, index) => {
            gsap.to(row.querySelector(".card-left"), { x: leftXValues[index], y: yValues[index], rotation: leftRotationValues[index], scrollTrigger: { trigger: ".main", start: "top center", end: "150% bottom", scrub: true } })
            gsap.to(row.querySelector(".card-right"), { x: rightXValues[index], y: yValues[index], rotation: rightRotationValues[index], scrollTrigger: { trigger: ".main", start: "top center", end: "150% bottom", scrub: true } })
          })
        }
      }
    )

    gsap.to(".threeD-container", { opacity: 0, duration: 0.5, ease: "power1.out", scrollTrigger: { trigger: ".main", start: "top 80%", end: "top 50%", scrub: true } })

    const leftCubeWrapper = document.querySelector<HTMLElement>(".left-cube .cube-wrapper")
    const rightCubeWrapper = document.querySelector<HTMLElement>(".right-cube .cube-wrapper")
    const handleMouseMove = (e: MouseEvent) => {
      if (!leftCubeWrapper || !rightCubeWrapper) return
      const { clientX, clientY } = e
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const offsetX = (clientX - centerX) * 0.02
      const offsetY = (clientY - centerY) * 0.02
      gsap.to(leftCubeWrapper, { rotationY: offsetX, rotationX: offsetY, duration: 0.5, ease: "power2.out" })
      gsap.to(rightCubeWrapper, { rotationY: offsetX, rotationX: offsetY, duration: 0.5, ease: "power2.out" })
    }
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      mm.revert()
    }
  }, [])

  const leftCubeFaces = isMobile ? leftImages.slice(0, 2).concat(leftImages.slice(0, 2), leftImages.slice(0, 2)) : leftCubeImages
  const rightCubeFaces = isMobile ? rightImages.concat(rightImages) : rightCubeImages

  return (
    // The <ReactLenis root> wrapper has been removed from here.
    <>
      <ScrollProgress />

      <div className="content relative z-10">
        <section className="hero relative overflow-hidden min-h-screen flex items-center justify-center">
          {!isMobile && (
            <>
              <div className="threeD-container left-cube"><div className="cube-wrapper"><div className="cube">{["front", "back", "right", "left", "top", "bottom"].map((face, index) => (<div key={face} className={`face face-${face}`} style={{ backgroundImage: `url(${leftCubeFaces[index]?.src})` }} />))}</div></div></div>
              <div className="threeD-container right-cube"><div className="cube-wrapper"><div className="cube">{["front", "back", "right", "left", "top", "bottom"].map((face, index) => (<div key={face} className={`face face-${face}`} style={{ backgroundImage: `url(${rightCubeFaces[index]?.src})` }} />))}</div></div></div>
            </>
          )}

          <div className="hero-text text-center relative z-10">
            <h1 className="hero-title text-6xl md:text-8xl lg:text-9xl font-black leading-none whitespace-nowrap">
              Events
            </h1>
            <h2 className="hero-subtitle text-3xl md:text-4xl lg:text-5xl font-bold whitespace-nowrap mt-4">
              Let's dive in
            </h2>
          </div>
        </section>

        <section className="main w-full min-h-screen flex flex-col items-center justify-center bg-transparent">
          <div className="main-content relative z-10 text-center py-12">
            <h1 className="middle-text text-4xl md:text-5xl lg:text-6xl font-black text-shadow-white">
              Artificial Intelligence Society
            </h1>
          </div>
          {[0, 1, 2].map((i) => (
            <div className="row flex flex-col md:flex-row justify-center items-center w-full my-8 gap-8" key={i}>
              <div className="card card-left relative w-11/12 md:w-2/5 h-96 rounded-xl overflow-hidden will-change-transform cursor-pointer group"><div className="hover-container relative w-full h-full"><Image src={leftImages[i].src} alt={leftImages[i].alt} layout="fill" objectFit="cover" priority /><div className="card-overlay absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-5 transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0"><h3 className="text-xl font-semibold text-white mb-2">{leftImages[i].alt}</h3><p className="text-sm text-white/90 leading-snug">{leftImages[i].overlayText}</p></div></div></div>
              <div className="card card-right relative w-11/12 md:w-2/5 h-96 rounded-xl overflow-hidden will-change-transform cursor-pointer group"><div className="hover-container relative w-full h-full"><Image src={rightImages[i].src} alt={rightImages[i].alt} layout="fill" objectFit="cover" priority /><div className="card-overlay absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-5 transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0"><h3 className="text-xl font-semibold text-white mb-2">{rightImages[i].alt}</h3><p className="text-sm text-white/90 leading-snug">{rightImages[i].overlayText}</p></div></div></div>
            </div>
          ))}
        </section>

        <section className="bento-gallery-section py-16 bg-transparent"><div className="container mx-auto"><InteractiveBentoGallery mediaItems={galleryMediaItems} title="Explore All Our Events" description="Drag and interact with our collection of events and activities. Click on any event to see full details." /></div></section>
      </div>

      <style jsx>{`
        .hero-title,
        .hero-subtitle {
          color: #000000 !important;
          text-shadow: 
            0px 2px 4px rgba(255, 255, 255, 0.7),
            0px 0px 15px rgba(255, 255, 255, 0.5);
          background: none !important;
          -webkit-background-clip: unset !important;
          -webkit-text-fill-color: unset !important;
          opacity: 1 !important;
        }

        .content { position: relative; z-index: 1; }
        .hero, .main { background: transparent; }

        .threeD-container { position: absolute; width: 150px; height: 150px; perspective: 800px; z-index: 0; opacity: 1; }
        .left-cube { top: 20%; left: 10%; }
        .right-cube { top: 20%; right: 10%; }
        .cube-wrapper { width: 100%; height: 100%; transform-style: preserve-3d; }
        .cube { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; animation: spinCube 10s infinite linear; }
        .face { position: absolute; width: 150px; height: 150px; background-size: cover; background-position: center; border: 2px solid rgba(255, 255, 255, 0.3); }
        .face-front { transform: rotateY(0deg) translateZ(75px); }
        .face-back { transform: rotateY(180deg) translateZ(75px); }
        .face-right { transform: rotateY(90deg) translateZ(75px); }
        .face-left { transform: rotateY(-90deg) translateZ(75px); }
        .face-top { transform: rotateX(90deg) translateZ(75px); }
        .face-bottom { transform: rotateX(-90deg) translateZ(75px); }
        @keyframes spinCube {
          from { transform: rotateX(0deg) rotateY(0deg); }
          to { transform: rotateX(360deg) rotateY(360deg); }
        }
        .row { display: flex; justify-content: center; align-items: center; width: 100%; max-width: 1200px; margin: 2rem auto; gap: 2rem; }
        .card { flex-shrink: 0; width: 45%; max-width: 500px; height: 360px; border-radius: 0.75em; overflow: hidden; will-change: transform; cursor: pointer; }
        .middle-text { font-size: 3rem; text-align: center; color: black; text-shadow: 0 0 10px rgba(255, 255, 255, 0.8); animation: glow 4s ease-in-out infinite alternate; }
        @keyframes glow {
          from { text-shadow: 0 0 10px rgba(255, 255, 255, 0.8); }
          to { text-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(220, 220, 220, 0.8); }
        }

        @media (max-width: 767px) {
          .top-cube { top: 20%; left: 50%; transform: translateX(-50%); }
          .bottom-cube { bottom: 10%; left: 50%; transform: translateX(-50%); }
          .hero-title { font-size: 2.5rem !important; }
          .hero-subtitle { font-size: 1.8rem !important; }
          .row { flex-direction: column; gap: 1rem; }
          .card { width: 90%; margin-bottom: 1rem; }
          .middle-text { font-size: 2.5rem; }
        }
      `}</style>
    </>
  )
}