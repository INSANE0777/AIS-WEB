"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from "lucide-react"

interface PDFFlipbookProps {
  pdfUrl: string
  className?: string
}

declare global {
  interface Window {
    pdfjsLib: any
  }
}

export default function PDFFlipbook({ pdfUrl, className = "" }: PDFFlipbookProps) {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [scale, setScale] = useState<number>(0.89)
  const [rotation, setRotation] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [pdfDoc, setPdfDoc] = useState<any>(null)
  const [pageWidth, setPageWidth] = useState<number>(0)
  const [pageHeight, setPageHeight] = useState<number>(0)
  const [isPageTransitioning, setIsPageTransitioning] = useState<boolean>(false)
  
  const pageRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const viewerRef = useRef<HTMLDivElement>(null)
  const pdfjsLoaded = useRef<boolean>(false)
  const renderTaskRef = useRef<any>(null)
  const isRenderingRef = useRef<boolean>(false)
  const renderTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Load PDF.js from CDN
  useEffect(() => {
    if (pdfjsLoaded.current) return

    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
    script.async = true
    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"
        pdfjsLoaded.current = true
        loadPDF()
      }
    }
    script.onerror = () => {
      setError("Failed to load PDF.js library")
      setLoading(false)
    }
    document.body.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  const loadPDF = useCallback(async () => {
    if (!window.pdfjsLib || !pdfUrl) return

    try {
      setLoading(true)
      setError(null)
      
      const loadingTask = window.pdfjsLib.getDocument(pdfUrl)
      const pdf = await loadingTask.promise
      
      setPdfDoc(pdf)
      setNumPages(pdf.numPages)
      setLoading(false)
    } catch (err) {
      console.error("PDF load error:", err)
      setError("Failed to load PDF. Please try again.")
      setLoading(false)
    }
  }, [pdfUrl])

  // Calculate initial scale to fit page width
  const calculateFitToWidth = useCallback((pdfPage: any, containerWidth: number) => {
    const viewport = pdfPage.getViewport({ scale: 1.0, rotation: 0 })
    const containerPadding = 40 // Account for padding
    const availableWidth = containerWidth - containerPadding
    return availableWidth / viewport.width
  }, [])

  // Initial scale is set to 0.89 (89%) by default - no automatic fit-to-width

  // Render PDF page with cancellation and performance optimization
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current || pageNumber < 1) return

    // Clear any pending render timeout
    if (renderTimeoutRef.current) {
      clearTimeout(renderTimeoutRef.current)
      renderTimeoutRef.current = null
    }

    // Cancel any ongoing render task
    const cancelPreviousRender = () => {
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel()
        } catch (e) {
          // Ignore cancellation errors
        }
        renderTaskRef.current = null
      }
      isRenderingRef.current = false
    }

    // For page changes, render immediately. For zoom/rotation, debounce.
    const isPageChange = true // We can detect this by checking if pageNumber changed
    const debounceDelay = 100 // Only debounce zoom/rotation changes

    renderTimeoutRef.current = setTimeout(async () => {
      // Cancel any previous render first
      cancelPreviousRender()
      
      // Wait a bit to ensure cancellation is complete
      await new Promise(resolve => setTimeout(resolve, 10))

      const renderPage = async () => {
        // Double-check we're not already rendering
        if (isRenderingRef.current) {
          return
        }

        try {
          isRenderingRef.current = true
          
          // Get page and canvas
          const page = await pdfDoc.getPage(pageNumber)
          const canvas = canvasRef.current
          
          // Verify canvas and pdf still exist
          if (!canvas || !pdfDoc) {
            isRenderingRef.current = false
            return
          }

          const context = canvas.getContext("2d", { alpha: false })
          if (!context) {
            isRenderingRef.current = false
            return
          }

          const viewport = page.getViewport({ scale, rotation })

          // Set canvas dimensions with device pixel ratio for crisp rendering
          const devicePixelRatio = window.devicePixelRatio || 1
          const outputScale = devicePixelRatio

          const canvasWidth = Math.floor(viewport.width * outputScale)
          const canvasHeight = Math.floor(viewport.height * outputScale)
          
          // Store current dimensions before changing
          const currentWidth = canvas.width
          const currentHeight = canvas.height
          
          // Always update canvas dimensions for page changes, or if dimensions changed
          if (canvasWidth !== currentWidth || canvasHeight !== currentHeight) {
            // Set new dimensions (this clears the canvas automatically)
            canvas.width = canvasWidth
            canvas.height = canvasHeight
            canvas.style.width = `${viewport.width}px`
            canvas.style.height = `${viewport.height}px`
            
            // Clear canvas explicitly
            context.clearRect(0, 0, canvasWidth, canvasHeight)
          } else {
            // Even if dimensions are same, clear the canvas for page changes
            context.clearRect(0, 0, canvasWidth, canvasHeight)
          }

          // Store page dimensions (actual rendered size) - update immediately
          setPageWidth(viewport.width)
          setPageHeight(viewport.height)

          const transform = outputScale !== 1
            ? [outputScale, 0, 0, outputScale, 0, 0]
            : undefined

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
            transform: transform,
          }

          // Start render and store the task
          const renderTask = page.render(renderContext)
          renderTaskRef.current = renderTask

          await renderTask.promise
          
          // Only update state if this render completed successfully
          if (renderTaskRef.current === renderTask) {
            renderTaskRef.current = null
            isRenderingRef.current = false
          }
        } catch (err: any) {
          // Only log error if it's not a cancellation
          const isCancellation = err?.name === "RenderingCancelledException" || 
                                err?.name === "AbortException" ||
                                err?.message?.includes("cancelled")
          
          if (!isCancellation) {
            console.error("Page render error:", err)
            setError("Failed to render PDF page")
          }
          
          // Reset state
          if (renderTaskRef.current) {
            renderTaskRef.current = null
          }
          isRenderingRef.current = false
        }
      }

      renderPage()
    }, 100) // Debounce delay

    // Cleanup function
    return () => {
      if (renderTimeoutRef.current) {
        clearTimeout(renderTimeoutRef.current)
      }
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel()
        } catch (e) {
          // Ignore cancellation errors
        }
        renderTaskRef.current = null
      }
      isRenderingRef.current = false
    }
  }, [pdfDoc, pageNumber, scale, rotation])

  // Reload PDF when URL changes
  useEffect(() => {
    if (pdfjsLoaded.current) {
      loadPDF()
    }
  }, [pdfUrl, loadPDF])

  const goToPrevPage = useCallback(() => {
    if (pageNumber > 1 && !isPageTransitioning) {
      setIsPageTransitioning(true)
      setPageNumber((prev) => prev - 1)
      setTimeout(() => setIsPageTransitioning(false), 300)
    }
  }, [pageNumber, isPageTransitioning])

  const goToNextPage = useCallback(() => {
    if (pageNumber < numPages && !isPageTransitioning) {
      setIsPageTransitioning(true)
      setPageNumber((prev) => prev + 1)
      setTimeout(() => setIsPageTransitioning(false), 300)
    }
  }, [pageNumber, numPages, isPageTransitioning])

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3.0))
  }

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5))
  }

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const handleFitToWidth = useCallback(async () => {
    if (!pdfDoc || !viewerRef.current || pageNumber < 1) return
    
    try {
      // Cancel any ongoing render
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel()
        } catch (e) {
          // Ignore cancellation errors
        }
        renderTaskRef.current = null
      }
      
      const page = await pdfDoc.getPage(pageNumber)
      const viewer = viewerRef.current
      const containerWidth = viewer.clientWidth || 800
      const fitScale = calculateFitToWidth(page, containerWidth)
      setScale(fitScale)
    } catch (err) {
      console.error("Fit to width error:", err)
    }
  }, [pdfDoc, pageNumber, calculateFitToWidth])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevPage()
      if (e.key === "ArrowRight") goToNextPage()
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [goToPrevPage, goToNextPage])

  if (error) {
    return (
      <div className={`flex items-center justify-center p-12 bg-red-50/50 backdrop-blur-sm rounded-2xl border border-red-200/50 shadow-lg ${className}`}>
        <div className="text-center space-y-3">
          <div className="w-12 h-12 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>
          <p className="text-red-600 font-semibold text-lg">Error loading PDF</p>
          <p className="text-red-500 text-sm max-w-md">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col items-center ${className}`} ref={containerRef}>
      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mb-8 flex-wrap px-4">
        <button
          onClick={goToPrevPage}
          disabled={pageNumber <= 1 || loading || isPageTransitioning}
          className="group relative p-3 rounded-xl bg-black text-white hover:bg-black/90 disabled:opacity-40 disabled:cursor-not-allowed 
                     transition-all duration-300 ease-out
                     hover:scale-110 hover:shadow-lg hover:shadow-black/20
                     active:scale-95
                     disabled:hover:scale-100 disabled:hover:shadow-none"
          aria-label="Previous page"
        >
          <ChevronLeft size={20} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
          <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </button>

        <div className="relative px-5 py-2.5 bg-white/90 backdrop-blur-sm rounded-xl border border-black/10 shadow-sm">
          <span className="text-sm font-semibold text-black tabular-nums">
            <span className="inline-block transition-all duration-300 ease-out">{pageNumber}</span>
            <span className="mx-1.5 text-black/40">/</span>
            <span className="text-black/60">{numPages || "..."}</span>
          </span>
        </div>

        <button
          onClick={goToNextPage}
          disabled={pageNumber >= numPages || loading || isPageTransitioning}
          className="group relative p-3 rounded-xl bg-black text-white hover:bg-black/90 disabled:opacity-40 disabled:cursor-not-allowed 
                     transition-all duration-300 ease-out
                     hover:scale-110 hover:shadow-lg hover:shadow-black/20
                     active:scale-95
                     disabled:hover:scale-100 disabled:hover:shadow-none"
          aria-label="Next page"
        >
          <ChevronRight size={20} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </button>

        <div className="h-8 w-px bg-gradient-to-b from-transparent via-black/20 to-transparent mx-1" />

        <button
          onClick={handleZoomOut}
          disabled={scale <= 0.5}
          className="group relative p-3 rounded-xl bg-white/90 backdrop-blur-sm text-black border border-black/10
                     hover:bg-white hover:border-black/20 disabled:opacity-40 disabled:cursor-not-allowed 
                     transition-all duration-300 ease-out
                     hover:scale-110 hover:shadow-md
                     active:scale-95
                     disabled:hover:scale-100 disabled:hover:shadow-none"
          aria-label="Zoom out"
        >
          <ZoomOut size={20} className="transition-transform duration-300 group-hover:scale-90" />
        </button>

        <div className="relative px-4 py-2 bg-black/5 rounded-lg min-w-[3.5rem]">
          <span className="text-xs font-bold text-black tabular-nums transition-all duration-300 ease-out">
            {Math.round(scale * 100)}%
          </span>
        </div>

        <button
          onClick={handleZoomIn}
          disabled={scale >= 3.0}
          className="group relative p-3 rounded-xl bg-white/90 backdrop-blur-sm text-black border border-black/10
                     hover:bg-white hover:border-black/20 disabled:opacity-40 disabled:cursor-not-allowed 
                     transition-all duration-300 ease-out
                     hover:scale-110 hover:shadow-md
                     active:scale-95
                     disabled:hover:scale-100 disabled:hover:shadow-none"
          aria-label="Zoom in"
        >
          <ZoomIn size={20} className="transition-transform duration-300 group-hover:scale-110" />
        </button>

        <button
          onClick={handleRotate}
          className="group relative p-3 rounded-xl bg-white/90 backdrop-blur-sm text-black border border-black/10
                     hover:bg-white hover:border-black/20
                     transition-all duration-300 ease-out
                     hover:scale-110 hover:shadow-md hover:rotate-12
                     active:scale-95"
          aria-label="Rotate"
        >
          <RotateCw size={20} className="transition-transform duration-500 group-hover:rotate-180" />
        </button>
      </div>

      {/* PDF Viewer */}
      <div
        ref={viewerRef}
        className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-2xl overflow-auto w-full
                   border border-black/5
                   transition-all duration-500 ease-out"
        style={{
          minHeight: "800px",
          maxHeight: "95vh",
        }}
      >
        <div
          ref={pageRef}
          className="relative flex justify-center items-start"
          style={{
            padding: "24px",
            minHeight: "100%",
          }}
        >
          {loading && (
            <div className="flex items-center justify-center w-full min-h-[600px]">
              <div className="text-center space-y-4">
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 border-4 border-black/10 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-black/60 font-medium animate-pulse">Loading PDF...</p>
              </div>
            </div>
          )}

          {!loading && pdfDoc && (
            <div 
              className={`relative shadow-2xl bg-white mx-auto rounded-sm overflow-hidden
                         transition-all duration-500 ease-out
                         ${isPageTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
              style={{
                width: pageWidth > 0 ? `${pageWidth}px` : "auto",
                height: pageHeight > 0 ? `${pageHeight}px` : "auto",
                maxWidth: "100%",
                boxShadow: "0 20px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
              }}
            >
              <canvas
                ref={canvasRef}
                className="block"
                style={{
                  display: "block",
                  width: pageWidth > 0 ? `${pageWidth}px` : "auto",
                  height: pageHeight > 0 ? `${pageHeight}px` : "auto",
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Page indicator dots */}
      {numPages > 1 && !loading && (
        <div className="flex items-center gap-2 mt-8 px-4 py-3 bg-white/60 backdrop-blur-sm rounded-xl border border-black/10 shadow-sm">
          {Array.from({ length: Math.min(numPages, 10) }, (_, i) => {
            const pageIndex = i + 1
            const isActive = pageNumber === pageIndex
            return (
              <button
                key={i}
                onClick={() => {
                  if (!isPageTransitioning) {
                    setIsPageTransitioning(true)
                    setPageNumber(pageIndex)
                    setTimeout(() => setIsPageTransitioning(false), 300)
                  }
                }}
                className={`relative rounded-full transition-all duration-300 ease-out
                          ${isActive 
                            ? "w-8 h-2 bg-black shadow-md" 
                            : "w-2 h-2 bg-black/30 hover:bg-black/50 hover:w-3 hover:h-3"
                          }`}
                aria-label={`Go to page ${pageIndex}`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-black/20 animate-pulse"></span>
                )}
              </button>
            )
          })}
          {numPages > 10 && (
            <span className="text-xs text-black/50 ml-3 self-center font-medium">
              ... {numPages} pages
            </span>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 px-4 py-2 bg-black/5 rounded-lg">
        <p className="text-xs text-black/50 text-center font-medium">
          <span className="inline-flex items-center gap-1">
            <kbd className="px-2 py-0.5 bg-white/80 border border-black/10 rounded text-[10px] font-mono shadow-sm">←</kbd>
            <kbd className="px-2 py-0.5 bg-white/80 border border-black/10 rounded text-[10px] font-mono shadow-sm">→</kbd>
            <span className="mx-1">to navigate</span>
          </span>
        </p>
      </div>
    </div>
  )
}
