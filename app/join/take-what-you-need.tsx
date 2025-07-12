"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const services = [
  "GRAPHIC DESIGN",
  "COPYWRITING",
  "WEB DESIGN",
  "EMAIL MARKETING",
  "BRANDING",
  "CONTENT CREATION",
  "LOGO SUITE",
  "MARKETING",
]

export default function TakeWhatYouNeed() {
  const [takenServices, setTakenServices] = useState<Set<string>>(new Set())
  const [hoveredService, setHoveredService] = useState<string | null>(null)

  const handleTakeService = (service: string) => {
    setTakenServices((prev) => new Set([...prev, service]))
  }

  const resetServices = () => {
    setTakenServices(new Set())
  }

  const availableServices = services.filter((service) => !takenServices.has(service))

  // Calculate tab width to match main box width
  const mainBoxWidth = 400
  const tabGap = 2

  return (
    <>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-black flex flex-col items-center justify-start pt-32 p-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative flex flex-col items-center"
        >
          {/* Two Curved Line Cuts "Take What You Need" Box */}
          <div className="relative w-[400px] h-[200px] mb-0">
            {/* Main box background - only top rounded */}
            <div className="absolute inset-0 bg-white rounded-t-2xl shadow-2xl" />

            {/* Top Left Curved Line Cut */}
            <motion.div
              initial={{ x: -10, y: -10, rotate: -1 }}
              animate={{ x: -2, y: -2, rotate: -0.5 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="absolute inset-0"
            >
              <svg width="400" height="200" className="absolute inset-0" style={{ overflow: "visible" }}>
                <path
                  d="M 60 40 Q 80 20, 100 45 Q 120 70, 90 90 Q 60 110, 40 85 Q 20 60, 60 40"
                  fill="none"
                  stroke="black"
                  strokeWidth="3"
                  className="drop-shadow-sm"
                />
              </svg>
            </motion.div>

            {/* Bottom Right Curved Line Cut */}
            <motion.div
              initial={{ x: 10, y: 10, rotate: 1 }}
              animate={{ x: 2, y: 2, rotate: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute inset-0"
            >
              <svg width="400" height="200" className="absolute inset-0" style={{ overflow: "visible" }}>
                <path
                  d="M 320 130 Q 340 110, 360 135 Q 380 160, 350 180 Q 320 200, 300 175 Q 280 150, 320 130"
                  fill="none"
                  stroke="black"
                  strokeWidth="3"
                  className="drop-shadow-sm"
                />
              </svg>
            </motion.div>

            {/* Main text content overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-center"
              >
                <h1
                  className="text-4xl font-bold text-gray-800 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  take what
                  <br />
                  you need
                </h1>
              </motion.div>
            </div>
          </div>

          {/* Dotted line separator */}
          <div className="w-[400px] border-t-2 border-dashed border-gray-600 relative z-10 mt-2" />

          {/* Horizontal tear-off tabs below the box */}
          <div className="flex justify-center mt-0 relative w-[400px]">
            <div className="flex w-full" style={{ gap: `${tabGap}px` }}>
              <AnimatePresence mode="popLayout">
                {availableServices.map((service, index) => (
                  <motion.div
                    key={service}
                    layout
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      y: 100,
                      rotate: Math.random() * 30 - 15,
                      scale: 0.8,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      layout: { duration: 0.3 },
                    }}
                    className="relative flex-1"
                  >
                    <motion.button
                      className="relative bg-gray-100 border-2 border-dashed border-gray-400 border-t-0 rounded-b-lg w-full hover:bg-white transition-colors duration-200"
                      onMouseEnter={() => setHoveredService(service)}
                      onMouseLeave={() => setHoveredService(null)}
                      onClick={() => handleTakeService(service)}
                      animate={{
                        y: hoveredService === service ? 30 : 0,
                        scale: hoveredService === service ? 1.05 : 1,
                        zIndex: hoveredService === service ? 10 : 1,
                      }}
                      whileTap={{
                        scale: 0.95,
                        y: 15,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      style={{
                        transformOrigin: "top center",
                      }}
                    >
                      {/* Tab content */}
                      <div className="px-2 py-6 min-h-[80px] flex items-center justify-center">
                        <span
                          className="text-gray-700 font-semibold text-[9px] leading-tight text-center"
                          style={{
                            writingMode: "vertical-rl",
                            textOrientation: "mixed",
                            fontFamily: "'Inter', sans-serif",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {service}
                        </span>
                      </div>

                      {/* Hover glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-gray-300 rounded-b-lg"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: hoveredService === service ? 0.3 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      />

                      {/* Tear indicator dots at top */}
                      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-0.5 h-0.5 bg-gray-500 rounded-full"
                            animate={{
                              scale: hoveredService === service ? [1, 1.5, 1] : 1,
                            }}
                            transition={{
                              duration: 0.5,
                              delay: i * 0.1,
                              repeat: hoveredService === service ? Number.POSITIVE_INFINITY : 0,
                            }}
                          />
                        ))}
                      </div>
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Floating confetti when tabs are taken */}
          <AnimatePresence>
            {takenServices.size > 0 && (
              <motion.div
                className="absolute inset-0 pointer-events-none overflow-hidden w-[800px] h-[600px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: ["#374151", "#6B7280", "#9CA3AF"][i % 3],
                    }}
                    initial={{
                      x: Math.random() * 800,
                      y: 300,
                      rotate: 0,
                    }}
                    animate={{
                      y: -50,
                      rotate: 360,
                      x: Math.random() * 800,
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.1,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reset button */}
          {takenServices.size > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex flex-col items-center gap-2"
            >
              <motion.button
                onClick={resetServices}
                className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors shadow-lg"
                style={{ fontFamily: "'Inter', sans-serif" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset All Tabs
              </motion.button>
              <div className="text-gray-400 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                {takenServices.size} service{takenServices.size !== 1 ? "s" : ""} taken
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  )
}
