import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Compass } from "lucide-react";
import dubai from "@/assets/dubi.jpg";
import egypt from "@/assets/eygpt.jpg";
import france from "@/assets/france.jpg";
import italy from "@/assets/itali.jpg";
import maldives from "@/assets/maldevi.jpg";
import saudiArabia from "@/assets/sudi arabia.jpg";
import turkey from "@/assets/turkya.jpg";

export default function DestinationCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const destinations = [
    {
      name: "Dubai",
      image: dubai,
      tours: 3,
      description: "Luxury Desert City",
      color: "from-amber-500",
    },
    {
      name: "Egypt",
      image: egypt,
      tours: 5,
      description: "Ancient Wonders",
      color: "from-orange-600",
    },
    {
      name: "France",
      image: france,
      tours: 4,
      description: "City of Lights",
      color: "from-blue-600",
    },
    {
      name: "Italy",
      image: italy,
      tours: 6,
      description: "Romantic Getaway",
      color: "from-red-600",
    },
    {
      name: "Maldives",
      image: maldives,
      tours: 4,
      description: "Tropical Paradise",
      color: "from-cyan-500",
    },
    {
      name: "Saudi Arabia",
      image: saudiArabia,
      tours: 3,
      description: "Cultural Heritage",
      color: "from-yellow-700",
    },
    {
      name: "Turkey",
      image: turkey,
      tours: 5,
      description: "Where East Meets West",
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

  const visibleDestinations = [];
  for (let i = 0; i < 3; i++) {
    visibleDestinations.push(
      destinations[(currentIndex + i) % destinations.length]
    );
  }

  return (
    <>
      {/* Divider Section - Elegant Separator */}
      <div className="relative h-32 bg-gradient-to-b from-white via-orange-50 to-transparent overflow-hidden">
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
        className="relative w-full min-h-screen py-24 px-8 lg:px-16 overflow-hidden"
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
          className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-orange-200 to-orange-100 opacity-20 blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-tl from-orange-200 to-orange-100 opacity-20 blur-3xl"
          animate={{ x: [0, -80, 0], y: [0, -60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* HEADER */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.p
              className="text-sm font-bold tracking-widest mb-4 text-[#fff1dc]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              ✈️ EXPLORE DESTINATIONS
            </motion.p>

            <motion.h2
              className="text-5xl lg:text-7xl font-black leading-tight mb-6 bg-gradient-to-r from-orange-800 via-orange-700 to-orange-500 bg-clip-text text-transparent"
              style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Popular Destinations
            </motion.h2>

            <motion.p
              className="text-lg max-w-2xl mx-auto font-light text-[#ffe8cc]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Drag to explore amazing destinations around the world
            </motion.p>
          </motion.div>

          {/* CAROUSEL */}
          <div className={`relative flex items-center gap-2 lg:gap-3 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}>
            {/* Left Arrow */}
            <motion.button
              onClick={handlePrev}
              className="absolute -left-8 lg:-left-20 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-4 shadow-2xl hover:shadow-3xl hover:bg-gradient-to-br hover:from-orange-500 hover:to-orange-600 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.15, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Carousel Container */}
            <div className="w-full overflow-hidden px-12 lg:px-24">
              <div className="flex gap-0 lg:gap-1">
                {visibleDestinations.map((destination, index) => {
                  const isCenter = index === 1;
                  const distance = Math.abs(index - 1);
                  const scale = isCenter ? 1 : 0.9;
                  const opacity = isCenter ? 1 : 0.8;

                  return (
                    <motion.div
                      key={`${destination.name}-${currentIndex}-${index}`}
                      className="flex-shrink-0"
                      style={{ width: "calc(33.333% - 1rem)" }}
                      animate={{ scale, opacity }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <motion.div
                      className="relative h-96 lg:h-[32rem] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl group cursor-pointer border-2 border-white/30"
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
                        <div className="absolute inset-0 flex flex-col justify-between p-6">
                          {/* Top Icon */}
                          <div className="flex justify-end">
                            <motion.div
                              className="bg-white/25 backdrop-blur-lg rounded-full p-3 group-hover:bg-orange-500 group-hover:shadow-lg transition-all duration-300"
                              whileHover={{ scale: 1.15, rotate: 180 }}
                            >
                              <Compass className="w-5 h-5 text-white" />
                            </motion.div>
                          </div>

                          {/* Bottom Content */}
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <motion.h3
                              className="text-3xl lg:text-4xl font-black text-white mb-2"
                              style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                            >
                              {destination.name}
                            </motion.h3>

                            <p className="text-white/85 text-sm mb-4 font-light">
                              {destination.description}
                            </p>

                            <motion.div
                              className="flex items-center gap-2 bg-white/30 backdrop-blur-lg rounded-full px-4 py-2 w-fit border border-white/40 group-hover:bg-orange-500/50 transition-all"
                              whileHover={{ scale: 1.08 }}
                            >
                              <MapPin className="w-4 h-4 text-orange-300" />
                              <span className="text-white text-sm font-bold">
                                {destination.tours} Tours
                              </span>
                            </motion.div>
                          </motion.div>
                        </div>

                        {/* Hover Arrow */}
                        <motion.div
                          className="absolute bottom-6 right-6 bg-white/40 backdrop-blur-lg rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity group-hover:bg-orange-500/80 shadow-lg"
                          whileHover={{ scale: 1.15 }}
                        >
                          <ChevronRight className="w-5 h-5 text-white" />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right Arrow */}
            <motion.button
              onClick={handleNext}
              className="absolute -right-8 lg:-right-20 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-4 shadow-2xl hover:shadow-3xl hover:bg-gradient-to-br hover:from-orange-500 hover:to-orange-600 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.15, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <motion.div
            className="flex justify-center gap-3 mt-16"
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
