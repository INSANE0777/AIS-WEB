import Lenis from "lenis"

export function initLenis() {
  const lenis = new Lenis({
    duration: 1.2, // Slightly reduced duration for snappier feel
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    mouseMultiplier: 0.8, // Reduced mouse multiplier
    smoothTouch: true, // Enabled for smoother touch scrolling
    touchMultiplier: 1.5, // Adjusted touch multiplier
    infinite: false,
    autoResize: true,
  })

  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  // Prevent default scroll behavior
  lenis.on("scroll", (e: any) => {
    // Custom scroll logic can be added here
  })

  return lenis
}
