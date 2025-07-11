// app/layout.tsx

import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import SpaceshipNavigation from "@/components/spaceship-navigation"
import SpaceFooter from "@/components/space-footer"
import PageTransition from "@/components/page-transition"
import FluidGradient from "@/components/fluid-gradient"
import { ReactLenis } from "lenis/react" // <-- STEP 1: Import ReactLenis here

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "AI Society - Bennett University | Training Minds, One Epoch at a Time",
  description:
    "Bennett University's premier artificial intelligence research community. Join us in pushing the boundaries of AI innovation through research, projects, and collaboration.",
  keywords: "AI Society, Bennett University, Artificial Intelligence, Machine Learning, Research, Innovation"
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.className} bg-white text-black antialiased`}>
        {/* STEP 2: Wrap everything in the global smooth scroll container */}
        <ReactLenis root>
          <FluidGradient />

          {/* 
            STEP 3: Elevate the navigation.
            We wrap SpaceshipNavigation in a div with a high z-index to ensure
            it always floats on top of all page content. `z-50` is a high
            value from Tailwind that works perfectly for this. `fixed` pulls it
            out of the normal document flow.
          */}
          <div className="fixed top-0 left-0 w-full z-50">
            <SpaceshipNavigation />
          </div>

          <PageTransition>{children}</PageTransition>
          <SpaceFooter />
        </ReactLenis>
      </body>
    </html>
  )
}