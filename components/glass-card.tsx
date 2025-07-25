"use client"

import * as React from "react"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

export interface SocialLink {
  icon: LucideIcon
  href: string
}

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  description: string
  socials?: SocialLink[]
  viewMoreLink?: string
  tag?: string
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, name, description, socials, viewMoreLink, tag, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`group w-full max-w-[290px] aspect-[29/30] [perspective:1000px] ${className}`}
        {...props}
      >
        <div className="relative h-full rounded-[50px] bg-gradient-to-br from-zinc-900 to-black shadow-2xl transition-all duration-500 ease-in-out [transform-style:preserve-3d] group-hover:[box-shadow:rgba(0,0,0,0.3)_30px_50px_25px_-40px,rgba(0,0,0,0.1)_0px_25px_30px_0px] group-hover:[transform:rotate3d(1,1,0,30deg)]">
          <div className="absolute inset-2 rounded-[55px] border-b border-l border-white/20 bg-gradient-to-b from-white/30 to-white/10 backdrop-blur-sm [transform-style:preserve-3d] [transform:translate3d(0,0,25px)]"></div>

          <div className="absolute [transform:translate3d(0,0,26px)]">
            <div className="px-5 pt-16 md:px-7 md:pt-[100px] pb-0">
              <span className="block text-xl font-black text-white">{name}</span>
              <span className="mt-4 block text-[15px] text-zinc-300">{description}</span>
            </div>
          </div>

          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between [transform-style:preserve-3d] [transform:translate3d(0,0,26px)]">
            {socials && socials.length > 0 && (
              <div className="flex gap-2.5 [transform-style:preserve-3d]">
                {socials.map(({ icon: Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social grid h-[30px] w-[30px] place-content-center rounded-full border-none bg-white shadow-[rgba(0,0,0,0.5)_0px_7px_5px_-5px] transition-all duration-200 ease-in-out group-hover:[box-shadow:rgba(0,0,0,0.2)_-5px_20px_10px_0px] group-hover:[transform:translate3d(0,0,50px)] hover:bg-black active:bg-yellow-400"
                    style={{ transitionDelay: `${200 * (index + 2)}ms` }}
                  >
                    <Icon className="h-4 w-4 stroke-black transition-colors group-hover/social:stroke-white" />
                  </a>
                ))}
              </div>
            )}

            {viewMoreLink && (
              <Link
                href={viewMoreLink}
                className="flex w-2/5 cursor-pointer items-center justify-end transition-all duration-200 ease-in-out hover:[transform:translate3d(0,0,10px)]"
              >
                <span className="border-none bg-none text-xs font-bold text-white">View more</span>
              </Link>
            )}
          </div>

          <div className="absolute top-0 right-0 [transform-style:preserve-3d]">
            {/* --- THEME CHANGE: Tag is now black and white --- */}
            {tag && (
              <div
                className="absolute grid place-content-center rounded-full bg-black px-3 py-1 shadow-lg transition-all duration-500 ease-in-out [transform:translate3d(0,0,100px)] [transition-delay:1.6s] group-hover:[transform:translate3d(0,0,120px)]"
                style={{ top: "25px", right: "25px" }}
              >
                <span className="text-xs font-black text-white">{tag}</span>
              </div>
            )}

            {/* Decorative circles remain the same */}
            {[
              { size: "170px", pos: "8px", z: "20px", delay: "0s" },
              { size: "140px", pos: "10px", z: "40px", delay: "0.4s" },
              { size: "110px", pos: "17px", z: "60px", delay: "0.8s" },
              { size: "80px", pos: "23px", z: "80px", delay: "1.2s" },
            ].map((circle, index) => (
              <div
                key={index}
                className="absolute aspect-square rounded-full bg-white/10 shadow-[rgba(100,100,111,0.2)_-10px_10px_20px_0px] transition-all duration-500 ease-in-out"
                style={{
                  width: circle.size,
                  top: circle.pos,
                  right: circle.pos,
                  transform: `translate3d(0, 0, ${circle.z})`,
                  transitionDelay: circle.delay,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    )
  },
)

GlassCard.displayName = "GlassCard"

export default GlassCard