import React, { useState } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import heroBg from "../../assets/h1-bg01.jpg";
import paralax1 from "../../assets/paralax1.jpg";
import paralax2 from "../../assets/paralax2.jpg";
import paralax3 from "../../assets/paralax3.jpg";
import paralax4 from "../../assets/paralax4.jpg";
import paralax5 from "../../assets/paralax5.jpg";
import parlax6 from "../../assets/parlax6.jpg";
import paralax7 from "../../assets/paralax7.jpg";
import paralax8 from "../../assets/paralax8.jpg";
import paralax9 from "../../assets/paralax9.jpg";
import paralax10 from "../../assets/paralax10.jpg";

/**
 * ParallaxShowcase Component
 * 
 * An interactive 3D parallax section with 10 stacked images that can be dragged
 * left/right for a dynamic 3D card effect with parallax scrolling animation.
 * 
 * Features:
 * - 10 images stacked in 3D effect (stacked overlapping cards)
 * - 5 images on left side, 5 on right side
 * - Draggable images with smooth 3D transitions
 * - Parallax scrolling with layered depth
 * - Responsive design with Tailwind CSS
 * - Smooth scroll animations with mouse drag
 */

// Parallax images data (10 images for stacked 3D carousel effect)
const imageList = [
  { id: 1, src: paralax1 },
  { id: 2, src: paralax2 },
  { id: 3, src: paralax3 },
  { id: 4, src: paralax4 },
  { id: 5, src: paralax5 },
  { id: 6, src: parlax6 },
  { id: 7, src: paralax7 },
  { id: 8, src: paralax8 },
  { id: 9, src: paralax9 },
  { id: 10, src: paralax10 },
];

export function ParallaxShowcase() {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - startX;
    setDragX(newX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    
    const threshold = 100;
    
    if (dragX > threshold) {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : imageList.length - 1));
    } else if (dragX < -threshold) {
      setCurrentIndex((prev) => (prev < imageList.length - 1 ? prev + 1 : 0));
    }
    
    setDragX(0);
  };

  return (
    <div className="relative w-full">
      {/* Parallax Container */}
      <Parallax pages={3} style={{ top: "0", left: "0", height: "100%" }}>
        {/* Layer 0: Background Image with overlay */}
        <ParallaxLayer
          offset={0}
          speed={-0.3}
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#000816]/55 via-[#021427]/35 to-[#0a5d7a]/25" />
        </ParallaxLayer>

        {/* Layer 1: Subtle spacer */}
        <ParallaxLayer offset={0} speed={0.1}>
          <div className="h-screen" />
        </ParallaxLayer>

        {/* Layer 2: Empty spacer */}
        <ParallaxLayer offset={1} speed={0.2}>
          <div className="h-screen" />
        </ParallaxLayer>
      </Parallax>

      {/* Stacked Carousel - Outside Parallax */}
      <div className="relative w-full overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 bg-transparent" />
        <div className="absolute left-0 right-0 top-16 h-px bg-gradient-to-r from-transparent via-[#F59E0B]/80 to-transparent" />
        <div className="absolute left-0 right-0 bottom-16 h-px bg-gradient-to-r from-transparent via-[#0a5d7a]/70 to-transparent" />

        <div className="relative flex flex-col justify-center items-center px-4">
          <div className="mb-12 max-w-3xl text-center">
            <p className="text-xs md:text-sm uppercase tracking-[0.5em] text-white/65 mb-4 font-semibold">
              Travel Gallery
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-white via-[#F59E0B] to-[#7ee0ff] bg-clip-text text-transparent drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
              style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
            >
              Swipe Into the Journey
            </h2>
            <p className="text-lg md:text-xl text-white/82 leading-relaxed max-w-2xl mx-auto">
              Drag to flip through photos. They fly off-screen and snap back with style.
            </p>
          </div>

          <div
            className="relative"
            style={{ width: "288px", height: "384px", perspective: "1400px" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Stacked images - all centered */}
            {imageList.map((img, idx) => {
              const positionOffset = idx - currentIndex;
              const isVisible = Math.abs(positionOffset) <= 2;
              const isActive = positionOffset === 0;
              const dragRatio = isDragging ? Math.min(Math.abs(dragX) / 140, 1.2) : 0;
              const dragDirection = dragX > 0 ? 1 : -1;
              const offscreenX = isDragging && isActive ? dragX * 3.2 : 0;
              const verticalShift = isDragging && isActive ? -Math.abs(dragX) * 0.035 : 0;

              return (
                <div
                  key={img.id}
                  className="absolute inset-0 rounded-[1.75rem] overflow-hidden cursor-grab active:cursor-grabbing"
                  style={{
                    transform: `
                      translate3d(${offscreenX}px, ${positionOffset * -14 + verticalShift}px, ${isDragging && isActive ? Math.abs(dragX) * 0.8 : 0}px)
                      rotateY(${isDragging && isActive ? dragX * 0.09 : positionOffset * -6}deg)
                      rotateZ(${positionOffset * 0.8}deg)
                      scale(${1 - Math.abs(positionOffset) * 0.07})
                    `,
                    zIndex: imageList.length - Math.abs(positionOffset),
                    opacity: isVisible ? 1 : 0,
                    pointerEvents: positionOffset === 0 ? "auto" : "none",
                    transition: isDragging
                      ? "none"
                      : "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease, filter 0.35s ease",
                    filter: `
                      brightness(${1 - Math.abs(positionOffset) * 0.11})
                      saturate(${1 - Math.abs(positionOffset) * 0.08})
                      contrast(${1 + Math.abs(positionOffset) * 0.03})
                    `,
                    transformStyle: "preserve-3d" as any,
                    boxShadow: isDragging
                      ? "0 34px 85px rgba(0,0,0,0.45)"
                      : "0 20px 60px rgba(0,0,0,0.30)",
                  }}
                >
                  <img
                    src={img.src}
                    alt={`Parallax ${img.id}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-white/8" />
                </div>
              );
            })}
          </div>

          {/* Image counter */}
          <div className="mt-8 rounded-full border border-white/20 bg-white/8 px-5 py-2 text-white/85 backdrop-blur-md">
            <p className="text-base md:text-lg font-semibold tracking-[0.18em]">
              {currentIndex + 1} / {imageList.length}
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Parallax responsive adjustments */
        @media (max-width: 768px) {
          .parallax-layer {
            padding: 0 1rem;
          }
        }
      `}</style>
    </div>
  );
}
