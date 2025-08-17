// app/layout.tsx

"use client"
import type React from "react"
import { Poppins } from "next/font/google"
import "./globals.css"
import SpaceshipNavigation from "@/components/spaceship-navigation"
import SpaceFooter from "@/components/space-footer"
import PageTransition from "@/components/page-transition"
import FluidGradient from "@/components/fluid-gradient"
import RightScrollProgress from "@/components/right-scroll-progress"
import { ReactLenis } from "lenis/react"
// 1. Import your new CustomCursor component
import CustomCursor from "@/components/cutom-cursor" 

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>AI Society - Bennett University | Training Minds, One Epoch at a Time</title>
        <meta name="description" content="Bennett University's premier artificial intelligence research community. Join us in pushing the boundaries of AI innovation through research, projects, and collaboration." />
        <meta name="keywords" content="AI Society, Bennett University, Artificial Intelligence, Machine Learning, Research, Innovation" />
      </head>
      <body className={`${poppins.className} bg-white text-black antialiased`}>
        {/* 2. Add the cursor in its own container right after the body tag */}
        <div id="custom-cursor-container">
          <CustomCursor />
        </div>
        
        <ReactLenis root>
          {/* Right Side Scroll Progress Bar */}
          <RightScrollProgress />
        
          {/* Gradient Layer: Above main content but below footer */}
          <div className="fixed inset-0 z-40 pointer-events-none">
            <FluidGradient />
          </div>

          {/* Navigation Layer: Fixed on top with high z-index */}
          <div className="fixed top-0 left-0 w-full z-50">
            <SpaceshipNavigation />
          </div>

          {/* Main Content Layer */}
          <main className="relative z-10 bg-white pb-20">
            <PageTransition>{children}</PageTransition>
          </main>

          {/* Footer Layer: Sits visually above the gradient */}
          <SpaceFooter />
        </ReactLenis>
      </body>
    </html>
  )
}