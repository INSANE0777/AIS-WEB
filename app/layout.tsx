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
      {/* THE FIX - STEP 1: Added the 'has-custom-cursor' class here */}
      <body className={`${poppins.className} has-custom-cursor bg-white text-black antialiased`}>
        <div id="custom-cursor-container">
          <CustomCursor />
        </div>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <ReactLenis root>
          {/* ... rest of your layout file remains the same */}
          <RightScrollProgress />
          <div className="fixed inset-0 z-40 pointer-events-none">
            <FluidGradient />
          </div>
          <div className="fixed top-0 left-0 w-full z-50">
            <SpaceshipNavigation />
          </div>
          <main className="relative z-10 bg-white pb-20">
            <PageTransition>{children}</PageTransition>
          </main>
          <SpaceFooter />
        </ReactLenis>
      </body>
    </html>
  )
}