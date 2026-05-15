import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import dubai from "@/assets/dubi.jpg";
import egypt from "@/assets/eygpt.jpg";
import france from "@/assets/france.jpg";
import italy from "@/assets/itali.jpg";
import maldives from "@/assets/maldevi.jpg";
import saudiArabia from "@/assets/sudi arabia.jpg";
import turkey from "@/assets/turkya.jpg";

export default function DestinationCarousel() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  const destinations = [
    {
      name: "Dubai",
      image: dubai,
      tours: 3,
      descriptionKey: "luxuryDesertCity",
      color: "from-amber-500",
    },
    {
      name: "Egypt",
      image: egypt,
      tours: 5,
      descriptionKey: "ancientWonders",
      color: "from-orange-600",
    },
    {
      name: "France",
      image: france,
      tours: 4,
      descriptionKey: "cityOfLights",
      color: "from-blue-600",
    },
    {
      name: "Italy",
      image: italy,
      tours: 6,
      descriptionKey: "romanticGetaway",
      color: "from-red-600",
    },
    {
      name: "Maldives",
      image: maldives,
      tours: 4,
      descriptionKey: "tropicalParadise",
      color: "from-cyan-500",
    },
    {
      name: "Saudi Arabia",
      image: saudiArabia,
      tours: 3,
      descriptionKey: "culturalHeritage",
      color: "from-yellow-700",
    },
    {
      name: "Turkey",
      image: turkey,
      tours: 5,
      descriptionKey: "eastMeetsWest",
      color: "from-purple-600",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? destinations.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === destinations.length - 1 ? 0 : prev + 1
    );
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const currentX = e.clientX;
    const diff = dragStart - currentX;

    // Drag threshold
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const visibleDestinations = [];
  for (let i = 0; i < visibleCount; i++) {
    visibleDestinations.push(
      destinations[(currentIndex + i) % destinations.length]
    );
  }

  return (
    <>
      {/* Divider Section - Elegant Separator */}
      <div className="relative h-20 overflow-hidden bg-gradient-to-b from-white via-orange-50 to-transparent sm:h-24 lg:h-32">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(255, 159, 64, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(255, 159, 64, 0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="flex items-center gap-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="h-1 w-12 bg-gradient-to-r from-orange-400 to-transparent rounded-full" />
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-orange-500 to-teal-500" />
            <div className="h-1 w-12 bg-gradient-to-l from-orange-400 to-transparent rounded-full" />
          </motion.div>
        </div>
      </div>

      {/* Main Carousel Section */}
      <section
        className="relative w-full overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:min-h-screen lg:px-16 lg:py-24"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
      {/* Transparent Background */}
        <div className="absolute inset-0 z-0" />
        
        {/* Subtle Glass Effect */}
        <div className="absolute inset-0 z-0 bg-transparent backdrop-blur-sm" />
        
        {/* Wave Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none" viewBox="0 0 1200 400">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#fda34b" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,100 Q300,50 600,100 T1200,100 L1200,400 L0,400 Z"
            fill="url(#waveGradient)"
            animate={{
              d: [
                "M0,100 Q300,50 600,100 T1200,100 L1200,400 L0,400 Z",
                "M0,120 Q300,80 600,120 T1200,120 L1200,400 L0,400 Z",
                "M0,100 Q300,50 600,100 T1200,100 L1200,400 L0,400 Z",
              ],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>

        {/* Floating Orbs */}
        <motion.div
          className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-orange-200 to-orange-100 opacity-20 blur-3xl sm:-left-32 sm:-top-32 sm:h-64 sm:w-64 lg:-left-40 lg:-top-40 lg:h-80 lg:w-80"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-24 -right-20 h-52 w-52 rounded-full bg-gradient-to-tl from-orange-200 to-orange-100 opacity-20 blur-3xl sm:-bottom-32 sm:-right-32 sm:h-72 sm:w-72 lg:-bottom-40 lg:-right-40 lg:h-96 lg:w-96"
          animate={{ x: [0, -80, 0], y: [0, -60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* HEADER */}
          <motion.div
            className="mb-12 text-center sm:mb-16 lg:mb-20"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.p
              className="mb-3 text-xs font-bold tracking-[0.22em] text-[#fff1dc] sm:mb-4 sm:text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {t("exploreDestinationsLabel")}
            </motion.p>

            <motion.h2
              className="mb-5 bg-gradient-to-r from-orange-800 via-orange-700 to-orange-500 bg-clip-text text-3xl font-black leading-tight text-transparent sm:text-4xl lg:mb-6 lg:text-7xl"
              style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {t("popularDestinations")}
            </motion.h2>

            <motion.p
              className="mx-auto max-w-2xl text-sm font-light text-[#ffe8cc] sm:text-base lg:text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {t("dragExplore")}
            </motion.p>
          </motion.div>

          {/* CAROUSEL */}
          <div className={`relative flex items-center gap-2 lg:gap-3 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}>
            {/* Left Arrow */}
            <motion.button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 z-20 rounded-full bg-white p-2.5 shadow-2xl transition-all duration-300 hover:bg-gradient-to-br hover:from-orange-500 hover:to-orange-600 hover:text-white hover:shadow-3xl sm:-left-3 sm:p-3 lg:-left-20 lg:p-4"
              whileHover={{ scale: 1.15, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
            </motion.button>

            {/* Carousel Container */}
            <div className="w-full overflow-hidden px-10 sm:px-12 lg:px-24">
              <div className="flex gap-3 lg:gap-1">
                {visibleDestinations.map((destination, index) => {
                  const activeIndex = Math.floor(visibleCount / 2);
                  const isCenter = index === activeIndex;
                  const scale = isCenter ? 1 : 0.9;
                  const opacity = isCenter ? 1 : 0.8;

                  return (
                    <motion.div
                      key={`${destination.name}-${currentIndex}-${index}`}
                      className="flex-shrink-0"
                      style={{ width: `calc(${100 / visibleCount}% - 0.75rem)` }}
                      animate={{ scale, opacity }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <motion.div
                      className="group relative h-80 cursor-pointer overflow-hidden rounded-3xl border-2 border-white/30 shadow-2xl hover:shadow-3xl sm:h-96 lg:h-[32rem]"
                        whileHover={{ y: -15, rotateX: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Image */}
                        <motion.img
                          src={destination.image}
                          alt={destination.name}
                          className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                        />

                        {/* Gradient Overlay */}
                        <motion.div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                        {/* Shine Effect on Hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5 lg:p-6">
                          <div />

                          {/* Bottom Content */}
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <motion.h3
                              className="mb-2 text-2xl font-black text-white sm:text-3xl lg:text-4xl"
                              style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                            >
                              {t(destination.name)}
                            </motion.h3>

                            <p className="mb-4 text-xs font-light text-white/85 sm:text-sm">
                              {t(destination.descriptionKey)}
                            </p>

                            <motion.div
                              className="flex w-fit items-center gap-2 rounded-full border border-white/40 bg-white/30 px-3 py-2 backdrop-blur-lg transition-all group-hover:bg-orange-500/50 sm:px-4"
                              whileHover={{ scale: 1.08 }}
                            >
                              <MapPin className="w-4 h-4 text-orange-300" />
                              <span className="text-white text-sm font-bold">
                                {destination.tours} {t("tours")}
                              </span>
                            </motion.div>
                          </motion.div>
                        </div>

                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right Arrow */}
            <motion.button
              onClick={handleNext}
              className="absolute right-0 top-1/2 z-20 rounded-full bg-white p-2.5 shadow-2xl transition-all duration-300 hover:bg-gradient-to-br hover:from-orange-500 hover:to-orange-600 hover:text-white hover:shadow-3xl sm:-right-3 sm:p-3 lg:-right-20 lg:p-4"
              whileHover={{ scale: 1.15, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6" />
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <motion.div
            className="mt-10 flex justify-center gap-2 sm:mt-12 lg:mt-16 lg:gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {destinations.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`rounded-full transition-all duration-300 backdrop-blur-sm ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 w-10 h-3 shadow-lg shadow-orange-500/50"
                    : "bg-gray-300/60 w-3 h-3 hover:bg-gray-400/80"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
