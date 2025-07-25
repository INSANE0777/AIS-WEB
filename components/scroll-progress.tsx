"use client"

import { useState, useEffect } from "react"

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPosition = window.scrollY
      setProgress(totalHeight > 0 ? scrollPosition / totalHeight : 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="scroll-progress">
      <div
        className="scroll-progress-bar"
        style={{ transform: `scaleY(${progress})` }}
      />
    </div>
  )
}

export default ScrollProgress