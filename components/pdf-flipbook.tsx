"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Download } from "lucide-react" // 1. Import Download icon

// Props interface for the component
interface PDFFlipbookProps {
  pdfUrl: string
  className?: string
}

// Ensure pdfjsLib is available on the window object
declare global {
  interface Window {
    pdfjsLib: any
  }
}

/**
 * An enhanced, stylish, and responsive PDF viewer with a seamless flipbook effect.
 * It includes controls for navigation, zoom, rotation, and downloading.
 * The component is styled with Tailwind CSS and uses PDF.js for rendering.
 *
 * @param {PDFFlipbookProps} props - The props for the component.
 * @param {string} props.pdfUrl - The URL of the PDF file to display.
 * @param {string} [props.className] - Optional additional CSS classes for the root container.
 * @returns {JSX.Element} The rendered PDFFlipbook component.
 */
export default function PDFFlipbook({ pdfUrl, className = "" }: PDFFlipbookProps): JSX.Element {
  // State management
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [scale, setScale] = useState<number>(1.0)
  const [rotation, setRotation] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [pdfDoc, setPdfDoc] = useState<any>(null)
  const [pageWidth, setPageWidth] = useState<number>(0)
  const [pageHeight, setPageHeight] = useState<number>(0)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [animationClass, setAnimationClass] = useState<string>("")
  
  // Refs for DOM elements and state that doesn't trigger re-renders
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const viewerRef = useRef<HTMLDivElement>(null)
  const pdfjsLoaded = useRef<boolean>(false)
  const renderTaskRef = useRef<any>(null)
  const isRenderingRef = useRef<boolean>(false)

  // Effect to detect if the user is on a mobile device
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Callback to calculate the optimal scale for the PDF page
  const calculateResponsiveScale = useCallback((pdfPage: any) => {
    if (!viewerRef.current) return 1.0;
  
    const viewport = pdfPage.getViewport({ scale: 1.0, rotation: 0 });
    const containerWidth = viewerRef.current.clientWidth;
    const containerHeight = window.innerHeight;
  
    const padding = isMobile ? 20 : 40;
    const desktopHeightMultiplier = isMobile ? 0.6 : 0.85; 
  
    const availableWidth = containerWidth - padding;
    const availableHeight = (containerHeight * desktopHeightMultiplier) - padding;
    
    const scaleWidth = availableWidth / viewport.width;
    const scaleHeight = availableHeight / viewport.height;
    
    return Math.min(scaleWidth, scaleHeight, isMobile ? 1.0 : 2.0);
  }, [isMobile]);

  // Effect to load the PDF.js library from a CDN
  useEffect(() => {
    if (pdfjsLoaded.current) return;

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.async = true;
    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        pdfjsLoaded.current = true;
        loadPDF();
      }
    };
    script.onerror = () => {
      setError("Failed to load PDF.js library.");
      setLoading(false);
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  // Callback to load the PDF document
  const loadPDF = useCallback(async () => {
    if (!window.pdfjsLib || !pdfUrl) return;
    setLoading(true);
    setError(null);
    try {
      const loadingTask = window.pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      setPdfDoc(pdf);
      setNumPages(pdf.numPages);
      const firstPage = await pdf.getPage(1);
      setScale(calculateResponsiveScale(firstPage));
    } catch (err) {
      console.error("PDF load error:", err);
      setError("Failed to load PDF. Please check the URL or try again.");
    } finally {
      setLoading(false);
    }
  }, [pdfUrl, calculateResponsiveScale]);

  // Effect to render a page of the PDF onto the canvas at high quality
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current || pageNumber < 1) return;

    const renderPage = async () => {
      if (isRenderingRef.current) renderTaskRef.current?.cancel();
      isRenderingRef.current = true;

      try {
        const page = await pdfDoc.getPage(pageNumber);
        const canvas = canvasRef.current;
        if (!canvas) { isRenderingRef.current = false; return; }
        const context = canvas.getContext("2d", { alpha: false });
        if (!context) { isRenderingRef.current = false; return; }

        const viewport = page.getViewport({ scale, rotation });
        
        // Use devicePixelRatio for high-res screens to ensure max quality
        const devicePixelRatio = window.devicePixelRatio || 1;

        canvas.width = Math.floor(viewport.width * devicePixelRatio);
        canvas.height = Math.floor(viewport.height * devicePixelRatio);
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        setPageWidth(viewport.width);
        setPageHeight(viewport.height);

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
          transform: devicePixelRatio !== 1 ? [devicePixelRatio, 0, 0, devicePixelRatio, 0, 0] : undefined,
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;
        await renderTask.promise;
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException') {
          console.error("Page render error:", err);
          setError("Failed to render PDF page.");
        }
      } finally {
        isRenderingRef.current = false;
      }
    };

    renderPage();
    return () => { renderTaskRef.current?.cancel(); };
  }, [pdfDoc, pageNumber, scale, rotation]);

  // Effect to reload the PDF if the URL changes
  useEffect(() => {
    if (pdfjsLoaded.current) loadPDF();
  }, [pdfUrl, loadPDF]);

  // Master function to handle page navigation with smooth animation
  const goToPage = useCallback((newPageNumber: number) => {
    if (newPageNumber === pageNumber || !!animationClass || newPageNumber < 1 || newPageNumber > numPages) return;
    
    const isNext = newPageNumber > pageNumber;
    setAnimationClass(isNext ? 'flip-out-right' : 'flip-out-left');
    
    setTimeout(() => {
      setPageNumber(newPageNumber);
      setAnimationClass(isNext ? 'flip-in-right' : 'flip-in-left');
      setTimeout(() => setAnimationClass(''), 300); // Animation duration
    }, 300); // Animation duration
  }, [pageNumber, numPages, animationClass]);

  // Control handlers
  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3.0));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.3));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  // 2. Add Download Handler function
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    // Extract filename from URL or use a generic name
    link.download = pdfUrl.substring(pdfUrl.lastIndexOf('/') + 1) || 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Effect for keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPage(pageNumber - 1);
      if (e.key === "ArrowRight") goToPage(pageNumber + 1);
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [goToPage, pageNumber]);

  if (error) {
    return (
      <div className={`flex items-center justify-center p-8 bg-red-100/50 rounded-2xl border-2 border-red-200/60 ${className}`}>
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto bg-red-200/70 rounded-full flex items-center justify-center animate-pulse"><span className="text-4xl">⚠️</span></div>
          <p className="text-red-700 font-bold text-lg">Error loading PDF</p>
          <p className="text-red-500 text-sm max-w-md">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center w-full ${className}`}>
      {/* Controls */}
      <div className="flex items-center justify-center gap-2 md:gap-4 mb-6 md:mb-10 flex-wrap px-4 py-3 bg-white/50 backdrop-blur-md border border-gray-200/80 rounded-full shadow-lg">
        <button onClick={() => goToPage(pageNumber - 1)} disabled={pageNumber <= 1 || loading || !!animationClass} className="p-3 rounded-full bg-gray-900 text-white hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 ease-in-out hover:scale-110 active:scale-95" aria-label="Previous page">
          <ChevronLeft size={isMobile ? 20 : 24} />
        </button>
        <div className="px-4 md:px-6 py-2 bg-gray-100 rounded-full">
          <span className="text-sm md:text-base font-bold text-gray-800 tabular-nums">{pageNumber} / {numPages || "..."}</span>
        </div>
        <button onClick={() => goToPage(pageNumber + 1)} disabled={pageNumber >= numPages || loading || !!animationClass} className="p-3 rounded-full bg-gray-900 text-white hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 ease-in-out hover:scale-110 active:scale-95" aria-label="Next page">
          <ChevronRight size={isMobile ? 20 : 24} />
        </button>
        <div className="h-8 w-px bg-gray-300 mx-2" />
        <button onClick={handleZoomOut} disabled={scale <= 0.3} className="p-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 ease-in-out hover:scale-110 active:scale-95" aria-label="Zoom out">
          <ZoomOut size={isMobile ? 18 : 20} />
        </button>
        <div className="px-4 py-2 bg-gray-100 rounded-full text-sm md:text-base font-bold text-gray-800 tabular-nums min-w-[4rem] md:min-w-[5rem] text-center">{Math.round(scale * 100)}%</div>
        <button onClick={handleZoomIn} disabled={scale >= 3.0} className="p-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 ease-in-out hover:scale-110 active:scale-95" aria-label="Zoom in">
          <ZoomIn size={isMobile ? 18 : 20} />
        </button>
        {!isMobile && (
          <>
            <button onClick={handleRotate} className="p-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 hover:rotate-90" aria-label="Rotate">
              <RotateCw size={20} />
            </button>
            {/* 3. Add Download button to JSX */}
            <button onClick={handleDownload} className="p-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300 ease-in-out hover:scale-110 active:scale-95" aria-label="Download PDF">
              <Download size={20} />
            </button>
          </>
        )}
      </div>

      {/* PDF Viewer */}
      <div ref={viewerRef} className="relative bg-gradient-to-tr from-gray-100 to-gray-200 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden w-full border-4 border-white" style={{ minHeight: isMobile ? "450px" : "600px", maxHeight: isMobile ? "70vh" : "85vh" }}>
        <div className="relative flex justify-center items-center h-full" style={{ padding: isMobile ? "16px" : "32px", perspective: "2500px" }}>
          {loading && (
            <div className="flex items-center justify-center w-full h-full">
              <div className="text-center space-y-4">
                <div className="relative w-16 h-16 md:w-20 md:h-20 mx-auto">
                  <div className="absolute inset-0 border-8 border-gray-300/80 rounded-full"></div>
                  <div className="absolute inset-0 border-8 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-gray-600 text-base md:text-lg font-semibold animate-pulse">Loading PDF...</p>
              </div>
            </div>
          )}
          {!loading && pdfDoc && (
            <div className={`relative shadow-2xl bg-white mx-auto rounded-md overflow-hidden transform-gpu ${animationClass}`} style={{ width: pageWidth > 0 ? `${pageWidth}px` : "auto", height: pageHeight > 0 ? `${pageHeight}px` : "auto", maxWidth: "100%", transformStyle: "preserve-3d", boxShadow: "0 25px 70px -15px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.08)"}}>
              <canvas ref={canvasRef} className="block" style={{ display: "block", width: pageWidth > 0 ? `${pageWidth}px` : "auto", height: pageHeight > 0 ? `${pageHeight}px` : "auto" }}/>
            </div>
          )}
        </div>
      </div>

      {/* Page indicator dots */}
      {numPages > 1 && !loading && (
        <div className="flex items-center gap-2 md:gap-3 mt-6 md:mt-8 px-4 py-3 bg-white/60 backdrop-blur-md border border-gray-200/90 rounded-full shadow-md">
          {Array.from({ length: Math.min(numPages, isMobile ? 5 : 10) }, (_, i) => {
            const pageIndex = i + 1;
            const isActive = pageNumber === pageIndex;
            return (
              <button key={i} onClick={() => goToPage(pageIndex)} className={`rounded-full transition-all duration-300 ease-in-out ${isActive ? "w-8 md:w-10 h-2 bg-gray-800" : "w-2 h-2 bg-gray-400/70 hover:bg-gray-500"}`} aria-label={`Go to page ${pageIndex}`} />
            );
          })}
          {numPages > (isMobile ? 5 : 10) && <span className="text-xs md:text-sm text-gray-600 ml-2 font-medium">+{numPages - (isMobile ? 5 : 10)}</span>}
        </div>
      )}

      {/* Keyboard instructions */}
      {!isMobile && (
        <div className="mt-5 px-4 py-2 bg-gray-100/80 rounded-full border border-gray-200/90">
          <p className="text-sm text-gray-700 text-center font-medium">
            Use <kbd className="px-2 py-1 bg-white border border-gray-300 rounded-md text-xs font-mono shadow-sm">←</kbd>
            {' '}and{' '}
            <kbd className="px-2 py-1 bg-white border border-gray-300 rounded-md text-xs font-mono shadow-sm">→</kbd>
            {' '}to navigate
          </p>
        </div>
      )}
    </div>
  )
}