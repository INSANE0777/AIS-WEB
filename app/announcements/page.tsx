"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
// --- GSAP PREMIUM PLUGINS ---
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import { Megaphone, Star } from "lucide-react";
import dynamic from "next/dynamic";
import TextReveal from "@/components/text-reveal";
import InteractiveCard from "@/components/InteractiveCard";

// Dynamically import PDFFlipbook with no SSR to avoid webpack issues
const PDFFlipbook = dynamic(() => import("@/components/pdf-flipbook"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full min-h-[600px] bg-gray-100 rounded-lg">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-black/60">Loading PDF viewer...</p>
      </div>
    </div>
  ),
});

const announcements: never[] = [];

export default function Announcements() {
  const pageRef = useRef<HTMLDivElement>(null);
  const headerIconRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // --- Register GSAP plugins on the client ---
    gsap.registerPlugin(MorphSVGPlugin, DrawSVGPlugin, MotionPathPlugin);

    const tl = gsap.timeline();

    // Page load animations
    tl.fromTo(
      ".page-header",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
    )
      // Animate the star shapes drawing themselves on load
      .fromTo(
        ".float-element path",
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          duration: 2,
          stagger: 0.2,
          ease: "power2.inOut",
        },
        "-=1.5",
      );

    // Basic looping float animation for a more organic feel
    gsap.to(".float-element", {
      y: (i) => -15 + Math.random() * 10,
      x: (i) => 15 - Math.random() * 30,
      rotation: (i) => 10 - Math.random() * 20,
      duration: 8, // Slowed down for a more gentle float
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        each: 0.6,
        from: "random",
      },
    });

    // --- NEW: Continuous Morphing Animation for Floating Elements ---
    const morphTargets = [
      // Shape 1
      "M127.233 110.308C145.856 117.358 170.923 116.073 186.883 107.25L200 100L186.883 92.7498C170.923 83.9274 145.857 82.6428 127.233 89.6916L113.267 94.9781C113.18 94.6967 113.075 94.4251 112.972 94.1516L126.546 88.0321C144.7 79.8479 161.515 61.2149 166.563 43.6907L170.711 29.2888L156.309 33.4367C138.785 38.4842 120.152 55.3 111.967 73.4535L106.057 86.5642C105.784 86.4316 105.511 86.3 105.229 86.1851L110.308 72.7665C117.357 54.1433 116.072 29.0767 107.25 13.1163L100 0L92.7498 13.1167C83.9274 29.0772 82.6428 54.1433 89.6916 72.767L94.7707 86.1856C94.4884 86.3005 94.2154 86.4321 93.9428 86.5646L88.0321 73.4539C79.8479 55.3005 61.2149 38.4846 43.6907 33.4372L29.2888 29.2893L33.4367 43.6912C38.4842 61.2149 55.3 79.8484 73.4535 88.0326L87.0274 94.1521C86.9247 94.4256 86.8191 94.6972 86.733 94.9786L72.7665 89.6921C54.1433 82.6428 29.0767 83.9279 13.1163 92.7502L0 100L13.1167 107.25C29.0772 116.073 54.1433 117.358 72.767 110.308L87.3861 104.775C87.5014 105.027 87.6172 105.28 87.747 105.524L73.454 111.968C55.3005 120.152 38.4847 138.785 33.4372 156.309L29.2893 170.711L43.6912 166.563C61.2149 161.516 79.8484 144.7 88.0326 126.547L94.6656 111.834C94.9107 111.936 95.1651 112.02 95.4172 112.109L89.6921 127.234C82.6428 145.857 83.9279 170.924 92.7502 186.884L100 200.001L107.251 186.884C116.073 170.924 117.358 145.858 110.309 127.234L104.583 112.108C104.835 112.02 105.09 111.936 105.335 111.833L111.968 126.546C120.152 144.7 138.785 161.515 156.309 166.563L170.711 170.711L166.563 156.309C161.516 138.785 144.7 120.152 126.547 111.967L112.253 105.524C112.383 105.28 112.499 105.027 112.614 104.774L127.233 110.308Z",
      // Shape 2 (original star)
      "M146.171 100C161.187 97.0302 175.962 89.6912 184.977 80.047L195.212 69.0981L180.496 66.2558C167.534 63.7521 151.267 66.5 137.373 72.9237C147.776 61.6944 155.416 47.0726 157.04 33.9716L158.885 19.0981L145.309 25.4484C133.351 31.0419 121.806 42.826 114.34 56.1898C116.156 40.9907 113.743 24.6707 107.356 13.1167L100.106 0L92.8553 13.1167C86.4688 24.6707 84.0554 40.9907 85.8712 56.1898C78.406 42.826 66.8609 31.0414 54.9028 25.4484L41.327 19.0981L43.1712 33.9716C44.7958 47.0726 52.4358 61.6944 62.8386 72.9237C48.9446 66.5 32.6772 63.7526 19.7153 66.2558L5 69.0981L15.2344 80.047C24.2493 89.6912 39.0242 97.0298 54.0409 100C39.0247 102.97 24.2493 110.308 15.2344 119.953L5 130.902L19.7153 133.744C32.6772 136.248 48.9442 133.5 62.8386 127.076C52.4358 138.306 44.7958 152.927 43.1712 166.028L41.327 180.901L54.9023 174.552C66.8605 168.958 78.4056 157.174 85.8707 143.81C84.0549 159.009 86.4684 175.329 92.8549 186.883L100.105 200L107.355 186.883C113.742 175.329 116.155 159.009 114.34 143.81C121.805 157.174 133.35 168.959 145.308 174.552L158.883 180.901L157.039 166.028C155.414 152.927 147.774 138.306 137.372 127.076C151.266 133.5 167.533 136.247 180.495 133.744L195.21 130.902L184.976 119.953C175.962 110.309 161.187 102.97 146.171 100Z",
      // Shape 3
      "M184.977 80.047C175.962 89.6912 161.187 97.0302 146.171 100C161.187 102.97 175.962 110.309 184.976 119.953L195.21 130.902L180.495 133.744C167.533 136.247 151.266 133.5 137.372 127.076C147.774 138.306 155.414 152.927 157.039 166.028L158.883 180.901L145.308 174.552C133.35 168.959 121.805 157.174 114.34 143.81C116.155 159.009 113.742 175.329 107.355 186.883L100.105 200L92.8549 186.883C86.4684 175.329 84.0549 159.009 85.8707 143.81C78.4056 157.174 66.8605 168.958 54.9023 174.552L41.327 180.901L43.1712 166.028C44.7958 152.927 52.4358 138.306 62.8386 127.076C48.9442 133.5 32.6772 136.248 19.7153 133.744L5 130.902L15.2344 119.953C24.2493 110.308 39.0247 102.97 54.0409 100C39.0242 97.0298 24.2493 89.6912 15.2344 80.047L5 69.0981L19.7153 66.2558C32.6772 63.7526 48.9447 66.5 62.8386 72.9237C52.4358 61.6944 44.7958 47.0726 43.1712 33.9716L41.327 19.0981L54.9028 25.4484C66.8609 31.0414 78.4061 42.826 85.8712 56.1898C84.0554 40.9907 86.4688 24.6707 92.8553 13.1167L100.106 0L107.356 13.1167C113.743 24.6707 116.156 40.9907 114.34 56.1898C121.806 42.826 133.351 31.0419 145.309 25.4484L158.885 19.0981L157.04 33.9716C155.416 47.0726 147.776 61.6944 137.373 72.9237C151.267 66.5 167.534 63.7521 180.496 66.2558L195.212 69.0981L184.977 80.047ZM81.2543 118.696C91.5325 128.974 108.197 128.974 118.475 118.696C128.753 108.418 128.753 91.7533 118.475 81.4751C108.197 71.1969 91.5325 71.1969 81.2543 81.4751C70.9761 91.7533 70.9761 108.418 81.2543 118.696Z",
    ];

    gsap.utils
      .toArray<SVGPathElement>(".float-element path")
      .forEach((path) => {
        // Shuffle the targets for each element to create variety
        const targets = gsap.utils.shuffle([...morphTargets]);

        const tl = gsap.timeline({
          repeat: -1,
          yoyo: true,
          defaults: {
            duration: gsap.utils.random(3, 5), // Random duration for each step
            ease: "sine.inOut",
          },
        });

        // Add the morphs to the timeline
        targets.forEach((target) => {
          tl.to(path, { morphSVG: target });
        });
      });

    // --- Interactive MorphSVG animation for header icon ---
    const headerIcon = headerIconRef.current;
    const headerIconPath = headerIcon?.querySelector("#header-icon-path");
    const targetShape =
      "M100 0 L125 75 L200 100 L125 125 L100 200 L75 125 L0 100 L75 75 Z"; // 4-point star

    if (headerIcon && headerIconPath) {
      const morphTimeline = gsap
        .timeline({
          paused: true,
          defaults: { duration: 0.4, ease: "power2.inOut" },
        })
        .to(headerIconPath, { morphSVG: targetShape })
        .to(headerIcon, { scale: 1.2, rotate: 90 }, 0);

      const handleMouseEnter = () => morphTimeline.play();
      const handleMouseLeave = () => morphTimeline.reverse();

      headerIcon.addEventListener("mouseenter", handleMouseEnter);
      headerIcon.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        if (headerIcon) {
          headerIcon.removeEventListener("mouseenter", handleMouseEnter);
          headerIcon.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    }
  }, []);

  return (
    <div
      ref={pageRef}
      className="pt-32 pb-20 px-4 min-h-screen relative overflow-hidden"
    >
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 cursor-pointer hover:scale-110 transition-transform duration-300">
        <img
          src="/images/BIAS.png"
          alt="AI Society Logo"
          className="w-12 h-12 sm:w-16 sm:h-16 object-contain drop-shadow-lg"
        />
      </div>

      {/* --- FLOATING STAR SHAPES --- */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {/* Red Element */}
        <svg
          className="float-element absolute top-[10%] left-[5%] w-24 h-24 sm:w-40 sm:h-40"
          viewBox="0 0 200 200"
          fill="none"
        >
          <path
            d="M146.171 100C161.187 97.0302 175.962 89.6912 184.977 80.047L195.212 69.0981L180.496 66.2558C167.534 63.7521 151.267 66.5 137.373 72.9237C147.776 61.6944 155.416 47.0726 157.04 33.9716L158.885 19.0981L145.309 25.4484C133.351 31.0419 121.806 42.826 114.34 56.1898C116.156 40.9907 113.743 24.6707 107.356 13.1167L100.106 0L92.8553 13.1167C86.4688 24.6707 84.0554 40.9907 85.8712 56.1898C78.406 42.826 66.8609 31.0414 54.9028 25.4484L41.327 19.0981L43.1712 33.9716C44.7958 47.0726 52.4358 61.6944 62.8386 72.9237C48.9446 66.5 32.6772 63.7526 19.7153 66.2558L5 69.0981L15.2344 80.047C24.2493 89.6912 39.0242 97.0298 54.0409 100C39.0247 102.97 24.2493 110.308 15.2344 119.953L5 130.902L19.7153 133.744C32.6772 136.248 48.9442 133.5 62.8386 127.076C52.4358 138.306 44.7958 152.927 43.1712 166.028L41.327 180.901L54.9023 174.552C66.8605 168.958 78.4056 157.174 85.8707 143.81C84.0549 159.009 86.4684 175.329 92.8549 186.883L100.105 200L107.355 186.883C113.742 175.329 116.155 159.009 114.34 143.81C121.805 157.174 133.35 168.959 145.308 174.552L158.883 180.901L157.039 166.028C155.414 152.927 147.774 138.306 137.372 127.076C151.266 133.5 167.533 136.247 180.495 133.744L195.21 130.902L184.976 119.953C175.962 110.309 161.187 102.97 146.171 100Z"
            fill="url(#paint0_red)"
          />
          <defs>
            <linearGradient
              id="paint0_red"
              x1="100.106"
              y1="0"
              x2="100.106"
              y2="200"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#EF4444" />
              <stop offset="1" stopColor="#FCA5A5" />
            </linearGradient>
          </defs>
        </svg>

        {/* Yellow Element */}
        <svg
          className="float-element absolute top-[20%] right-[10%] w-20 h-20 sm:w-32 sm:h-32"
          viewBox="0 0 200 200"
          fill="none"
        >
          <path
            d="M146.171 100C161.187 97.0302 175.962 89.6912 184.977 80.047L195.212 69.0981L180.496 66.2558C167.534 63.7521 151.267 66.5 137.373 72.9237C147.776 61.6944 155.416 47.0726 157.04 33.9716L158.885 19.0981L145.309 25.4484C133.351 31.0419 121.806 42.826 114.34 56.1898C116.156 40.9907 113.743 24.6707 107.356 13.1167L100.106 0L92.8553 13.1167C86.4688 24.6707 84.0554 40.9907 85.8712 56.1898C78.406 42.826 66.8609 31.0414 54.9028 25.4484L41.327 19.0981L43.1712 33.9716C44.7958 47.0726 52.4358 61.6944 62.8386 72.9237C48.9446 66.5 32.6772 63.7526 19.7153 66.2558L5 69.0981L15.2344 80.047C24.2493 89.6912 39.0242 97.0298 54.0409 100C39.0247 102.97 24.2493 110.308 15.2344 119.953L5 130.902L19.7153 133.744C32.6772 136.248 48.9442 133.5 62.8386 127.076C52.4358 138.306 44.7958 152.927 43.1712 166.028L41.327 180.901L54.9023 174.552C66.8605 168.958 78.4056 157.174 85.8707 143.81C84.0549 159.009 86.4684 175.329 92.8549 186.883L100.105 200L107.355 186.883C113.742 175.329 116.155 159.009 114.34 143.81C121.805 157.174 133.35 168.959 145.308 174.552L158.883 180.901L157.039 166.028C155.414 152.927 147.774 138.306 137.372 127.076C151.266 133.5 167.533 136.247 180.495 133.744L195.21 130.902L184.976 119.953C175.962 110.309 161.187 102.97 146.171 100Z"
            fill="url(#paint0_yellow)"
          />
          <defs>
            <linearGradient
              id="paint0_yellow"
              x1="100.106"
              y1="0"
              x2="100.106"
              y2="200"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#EAB308" />
              <stop offset="1" stopColor="#FDE047" />
            </linearGradient>
          </defs>
        </svg>

        {/* Green Element */}
        <svg
          className="float-element absolute bottom-[15%] left-[15%] w-28 h-28 sm:w-48 sm:h-48"
          viewBox="0 0 200 200"
          fill="none"
        >
          <path
            d="M146.171 100C161.187 97.0302 175.962 89.6912 184.977 80.047L195.212 69.0981L180.496 66.2558C167.534 63.7521 151.267 66.5 137.373 72.9237C147.776 61.6944 155.416 47.0726 157.04 33.9716L158.885 19.0981L145.309 25.4484C133.351 31.0419 121.806 42.826 114.34 56.1898C116.156 40.9907 113.743 24.6707 107.356 13.1167L100.106 0L92.8553 13.1167C86.4688 24.6707 84.0554 40.9907 85.8712 56.1898C78.406 42.826 66.8609 31.0414 54.9028 25.4484L41.327 19.0981L43.1712 33.9716C44.7958 47.0726 52.4358 61.6944 62.8386 72.9237C48.9446 66.5 32.6772 63.7526 19.7153 66.2558L5 69.0981L15.2344 80.047C24.2493 89.6912 39.0242 97.0298 54.0409 100C39.0247 102.97 24.2493 110.308 15.2344 119.953L5 130.902L19.7153 133.744C32.6772 136.248 48.9442 133.5 62.8386 127.076C52.4358 138.306 44.7958 152.927 43.1712 166.028L41.327 180.901L54.9023 174.552C66.8605 168.958 78.4056 157.174 85.8707 143.81C84.0549 159.009 86.4684 175.329 92.8549 186.883L100.105 200L107.355 186.883C113.742 175.329 116.155 159.009 114.34 143.81C121.805 157.174 133.35 168.959 145.308 174.552L158.883 180.901L157.039 166.028C155.414 152.927 147.774 138.306 137.372 127.076C151.266 133.5 167.533 136.247 180.495 133.744L195.21 130.902L184.976 119.953C175.962 110.309 161.187 102.97 146.171 100Z"
            fill="url(#paint0_green)"
          />
          <defs>
            <linearGradient
              id="paint0_green"
              x1="100.106"
              y1="0"
              x2="100.106"
              y2="200"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#22C55E" />
              <stop offset="1" stopColor="#86EFAC" />
            </linearGradient>
          </defs>
        </svg>

        {/* Violet Element */}
        <svg
          className="float-element absolute bottom-[5%] right-[5%] w-24 h-24 sm:w-40 sm:h-40"
          viewBox="0 0 200 200"
          fill="none"
        >
          <path
            d="M146.171 100C161.187 97.0302 175.962 89.6912 184.977 80.047L195.212 69.0981L180.496 66.2558C167.534 63.7521 151.267 66.5 137.373 72.9237C147.776 61.6944 155.416 47.0726 157.04 33.9716L158.885 19.0981L145.309 25.4484C133.351 31.0419 121.806 42.826 114.34 56.1898C116.156 40.9907 113.743 24.6707 107.356 13.1167L100.106 0L92.8553 13.1167C86.4688 24.6707 84.0554 40.9907 85.8712 56.1898C78.406 42.826 66.8609 31.0414 54.9028 25.4484L41.327 19.0981L43.1712 33.9716C44.7958 47.0726 52.4358 61.6944 62.8386 72.9237C48.9446 66.5 32.6772 63.7526 19.7153 66.2558L5 69.0981L15.2344 80.047C24.2493 89.6912 39.0242 97.0298 54.0409 100C39.0247 102.97 24.2493 110.308 15.2344 119.953L5 130.902L19.7153 133.744C32.6772 136.248 48.9442 133.5 62.8386 127.076C52.4358 138.306 44.7958 152.927 43.1712 166.028L41.327 180.901L54.9023 174.552C66.8605 168.958 78.4056 157.174 85.8707 143.81C84.0549 159.009 86.4684 175.329 92.8549 186.883L100.105 200L107.355 186.883C113.742 175.329 116.155 159.009 114.34 143.81C121.805 157.174 133.35 168.959 145.308 174.552L158.883 180.901L157.039 166.028C155.414 152.927 147.774 138.306 137.372 127.076C151.266 133.5 167.533 136.247 180.495 133.744L195.21 130.902L184.976 119.953C175.962 110.309 161.187 102.97 146.171 100Z"
            fill="url(#paint0_violet)"
          />
          <defs>
            <linearGradient
              id="paint0_violet"
              x1="100.106"
              y1="0"
              x2="100.106"
              y2="200"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8B5CF6" />
              <stop offset="1" stopColor="#C4B5FD" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="page-header text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium mb-8 cursor-pointer">
            <svg
              ref={headerIconRef}
              width="20"
              height="20"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="origin-center"
            >
              <g clipPath="url(#clip0_238_1296)">
                <path
                  id="header-icon-path"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M100 0H0L100 100H0L100 200H200L100 100H200L100 0Z"
                  fill="white"
                />
              </g>
              <clipPath id="clip0_238_1296">
                <rect width="200" height="200" fill="white" />
              </clipPath>
            </svg>

            <span>Stay Updated</span>
          </div>
          <TextReveal className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black mb-6 leading-tight">
            Announcements
          </TextReveal>
          <div className="w-24 h-1 bg-black mx-auto mb-8"></div>
          <p className="text-lg sm:text-xl text-black/70 max-w-3xl mx-auto leading-relaxed px-4">
            Stay informed about the latest updates, opportunities, and events
            from the AI Society community.
          </p>
        </div>

        <div className="py-12">
          <InteractiveCard
            className="bg-white/90 backdrop-blur-sm rounded-2xl border border-black/10 p-8 sm:p-12 max-w-5xl mx-auto"
            spillColor="rgba(0, 0, 0, 0.05)"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-block bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  Featured Event
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-black mb-4 leading-tight">
                  AI 911
                </h3>
                <p className="text-black/80 text-base sm:text-lg mb-6 leading-relaxed">
                  An introductory event for first-year students to learn the
                  basics of Artificial Intelligence. Interact with club members,
                  understand our working domains, and gain hands-on experience
                  building your first simple AI project.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-black/90 transition-colors text-sm sm:text-base">
                    Learn More
                  </button>
                  <button className="border-2 border-black text-black px-6 py-3 rounded-full font-semibold hover:bg-black/5 transition-colors text-sm sm:text-base">
                    Register Now
                  </button>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="/images/ai911.jpeg"
                  alt="AI911 Event Poster"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </InteractiveCard>
        </div>

        <div className="py-20">
          <InteractiveCard
            className="bg-white/90 backdrop-blur-sm rounded-2xl border border-black/10 p-8 sm:p-12 max-w-5xl mx-auto"
            spillColor="rgba(0, 0, 0, 0.05)"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-black mb-2">
                AIS Newsletter Epoch - The Emergence
              </h3>
              <p className="text-black/60 text-base sm:text-lg">
                Explore our latest newsletter with interactive page-flipping
                experience
              </p>
            </div>
            <PDFFlipbook pdfUrl="/AIS Newsletter.pdf" className="w-full" />
          </InteractiveCard>
        </div>

        <div className="mt-20 text-center">
          <InteractiveCard
            className="bg-black text-white p-8 sm:p-12 rounded-2xl"
            spillColor="rgba(59, 130, 246, 0.2)"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
              <Megaphone size={24} className="text-blue-400" />
              <h2 className="text-2xl sm:text-3xl font-bold text-center">
                Never Miss an Update
              </h2>
              <Star size={24} className="text-yellow-400" />
            </div>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto text-sm sm:text-base px-4">
              Subscribe to our announcement feed and get instant notifications
              about important updates, deadlines, and opportunities.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
              />
              <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors text-sm sm:text-base whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </InteractiveCard>
        </div>
      </div>
    </div>
  );
}
