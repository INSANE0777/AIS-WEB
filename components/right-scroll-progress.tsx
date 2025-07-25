// components/right-scroll-progress.tsx
"use client"
import { useEffect, useState } from 'react'

export default function RightScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0
      setScrollProgress(progress)
    }

    // Update on mount
    updateScrollProgress()

    // Direct scroll listener for immediate updates
    const handleScroll = () => {
      updateScrollProgress()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateScrollProgress)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateScrollProgress)
    }
  }, [])

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100]">
      {/* Progress Track */}
      <div className="relative h-48 w-0.5 bg-gray-200 rounded-full shadow-sm">
        {/* Progress Fill - now fills from top */}
        <div 
          className="absolute top-0 left-0 w-full bg-black rounded-full transform-gpu will-change-transform"
          style={{ 
            height: `${scrollProgress}%`,
            boxShadow: '0 0 4px rgba(0, 0, 0, 0.2)',
            transition: 'none'
          }}
        />
      </div>
    </div>
  )
}