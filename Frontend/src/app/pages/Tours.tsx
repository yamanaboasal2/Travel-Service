import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import React, { useRef, useState } from "react";
import { ProtectedBookingLink } from "../components/ProtectedBookingLink";
import heroBg from "../../assets/h1-bg01.jpg";

const wavyButtonStyle = `
  @keyframes wavyFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .wavy-btn {
    position: relative;
    overflow: hidden;
    background-size: 200% 200%;
    animation: wavyFlow 3s ease infinite;
  }
  .wavy-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    animation: wave 2s infinite;
  }
  @keyframes wave {
    0% { left: -100%; }
    100% { left: 100%; }
  }
`;

import cairoImg from "../../assets/Cairo.jpg";
import dubaiImg from "../../assets/dubi.jpg";
import maldivesImg from "../../assets/maldevi.jpg";
import istanbulImg from "../../assets/intalia.mp4";
import parisImg from "../../assets/france.jpg";
import japanImg from "../../assets/Tokyo.jpg";

const tours = [
  {
    id: 0,
    title: "Cairo & Pyramids Explorer",
    destination: "Egypt",
    duration: "5 Days",
    price: "$1,299",
    rating: 4.8,
    description: "Explore the magnificent pyramids of Giza and discover the wonders of ancient Egypt. Walk through the bustling Khan el-Khalili bazaar and experience Cairo's rich cultural heritage.",
    highlights: [
      "Giza Pyramid Complex tour",
      "Egyptian Museum visit",
      "Nile River dinner cruise",
      "Luxor & Aswan extension available"
    ],
    image: cairoImg,
    icon: MapPin,
    guests: "2-12 people"
  },
  {
    id: 1,
    title: "Dubai Luxury Experience",
    destination: "UAE",
    duration: "4 Days",
    price: "$1,599",
    rating: 4.9,
    description: "Experience the glitz and glamour of Dubai with luxury accommodations and exclusive experiences. From desert safaris to world-class shopping.",
    highlights: [
      "Burj Khalifa at sunset",
      "Desert safari with dinner",
      "Luxury shopping experience",
      "Palm Jumeirah tour"
    ],
    image: dubaiImg,
    icon: MapPin,
    guests: "2-10 people"
  },
  {
    id: 2,
    title: "Maldives Paradise Retreat",
    destination: "Maldives",
    duration: "7 Days",
    price: "$2,499",
    rating: 5.0,
    description: "Escape to paradise with overwater bungalows, pristine beaches, and world-class diving. Perfect for honeymoons and relaxation.",
    highlights: [
      "Overwater bungalow stay",
      "Coral reef snorkeling",
      "Spa treatments",
      "Water sports activities"
    ],
    image: maldivesImg,
    icon: MapPin,
    guests: "2-8 people"
  },
  {
    id: 3,
    title: "Istanbul Cultural Tour",
    destination: "Turkey",
    duration: "3 Days",
    price: "$799",
    rating: 4.7,
    description: "Discover Istanbul's stunning blend of East and West. Visit iconic monuments, bustling bazaars, and enjoy authentic Turkish cuisine.",
    highlights: [
      "Blue Mosque & Hagia Sophia",
      "Topkapi Palace tour",
      "Turkish Baths experience",
      "Grand Bazaar shopping"
    ],
    image: parisImg,
    icon: MapPin,
    guests: "2-15 people"
  },
  {
    id: 4,
    title: "Paris Romance Package",
    destination: "France",
    duration: "5 Days",
    price: "$1,799",
    rating: 4.9,
    description: "Fall in love with the City of Light. Experience world-class museums, fine dining, and romantic Seine river cruises.",
    highlights: [
      "Eiffel Tower visit",
      "Louvre Museum tour",
      "Seine river cruise",
      "Versailles Palace tour"
    ],
    image: parisImg,
    icon: MapPin,
    guests: "2-10 people"
  },
  {
    id: 5,
    title: "Tokyo Modern Adventure",
    destination: "Japan",
    duration: "6 Days",
    price: "$2,199",
    rating: 4.8,
    description: "Immerse yourself in Tokyo's vibrant culture blending ancient traditions with cutting-edge technology. Temples, neon lights, and incredible food.",
    highlights: [
      "Senso-ji Temple visit",
      "Shibuya Crossing experience",
      "Mount Fuji day trip",
      "Traditional tea ceremony"
    ],
    image: japanImg,
    icon: MapPin,
    guests: "2-12 people"
  },
];

export function Tours() {
  const [selectedTour, setSelectedTour] = useState(tours[0]);
  const detailsRef = useRef<HTMLDivElement>(null);

  const handleTourClick = (tour) => {
    setSelectedTour(tour);
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  };

  return (
    <>
      <style>{wavyButtonStyle}</style>
      <div
        className="min-h-screen bg-cover bg-center bg-fixed text-[#0a5d7a]"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Hero Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#000816]/85 via-[#021427]/70 to-[#F59E0B]/15 z-0" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1
              className="text-6xl md:text-7xl font-black mb-4 drop-shadow-lg"
              style={{ fontFamily: "'Playfair Display', 'Georgia', serif", letterSpacing: '-0.02em', color: '#0a5d7a' }}
            >
              <span className="bg-gradient-to-r from-white via-[#F59E0B] to-white bg-clip-text text-transparent">
                Tours Grid
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-white/85 font-light max-w-2xl mx-auto drop-shadow-lg" style={{ fontFamily: "'Lora', 'Georgia', serif", color: '#F59E0B' }}>
              Discover unforgettable destinations worldwide
            </p>
          </div>
        </section>

        {/* Tours Grid Section */}
        <section className="relative overflow-hidden py-16 md:py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/30 backdrop-blur-sm" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-4xl md:text-5xl font-black text-[#0a5d7a] mb-3" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                Explore Our Tours
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-[#0a5d7a] via-[#F59E0B] to-[#0a5d7a] rounded-full mx-auto mb-4" />
              <p className="text-lg text-[#1a3a52]" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                Click on any tour to see detailed information and book your adventure
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center">
              {tours.map((tour, index) => {
                return (
                  <motion.div
                    key={tour.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.08, y: -8 }}
                    className="cursor-pointer group"
                    onClick={() => handleTourClick(tour)}
                  >
                    <Card className={`overflow-hidden rounded-3xl border-2 border-white/80 bg-white/70 shadow-2xl backdrop-blur-xl flex flex-col p-0 transition-all duration-300 h-full group-hover:border-[#F59E0B]/80 ${selectedTour.id === tour.id ? 'ring-4 ring-[#F59E0B] shadow-[0_0_40px_rgba(245,158,11,0.4)]' : ''}`}>
                      <div className="relative w-full h-52 overflow-hidden">
                        <img
                          src={`${tour.image}?t=${Date.now()}`}
                          alt={tour.title}
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a5d7a]/15 to-transparent" />
                        <div className="absolute top-4 right-4 bg-[#F59E0B] text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm font-bold">{tour.rating}</span>
                        </div>
                      </div>
                      <div className="flex flex-col p-5 flex-1">
                        <h3 className="text-lg font-bold text-[#0a5d7a] mb-2 leading-tight" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>{tour.title}</h3>
                        <div className="flex items-center gap-2 mb-3 text-xs text-[#1a3a52]">
                          <MapPin className="h-4 w-4 text-[#F59E0B]" />
                          <span className="font-semibold">{tour.destination}</span>
                          <span className="text-gray-400">•</span>
                          <Calendar className="h-4 w-4 text-[#F59E0B]" />
                          <span className="font-semibold">{tour.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3 text-xs text-[#1a3a52]">
                          <Users className="h-4 w-4 text-[#F59E0B]" />
                          <span className="font-semibold">{tour.guests}</span>
                        </div>
                        <div className="mt-auto pt-3 border-t border-[#F59E0B]/20">
                          <p className="text-xl font-black text-[#F59E0B]">{tour.price}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tour Details Section */}
        <div ref={detailsRef} className="flex justify-center w-full mt-12 mb-16 px-4">
          <motion.div
            key={selectedTour.id}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="w-full max-w-2xl bg-gradient-to-br from-white/85 via-white/80 to-white/75 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 border border-white/90 group"
          >
            {/* Header with Icon */}
            <div className="flex items-start gap-4 mb-6">
              <motion.div 
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-[#F59E0B]/25 to-[#0a5d7a]/15"
              >
                <MapPin className="h-7 w-7 text-[#F59E0B]" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl md:text-3xl font-black text-[#0a5d7a] leading-tight mb-1" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                  {selectedTour.title}
                </h2>
                <div className="h-0.5 w-12 bg-gradient-to-r from-[#F59E0B] to-[#0a5d7a] rounded-full" />
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-2xl font-black text-[#F59E0B]">{selectedTour.price}</p>
              </div>
            </div>

            {/* Tour Info */}
            <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-gradient-to-r from-[#F59E0B]/10 to-[#0a5d7a]/10 rounded-xl">
              <div className="text-center">
                <Calendar className="h-5 w-5 text-[#F59E0B] mx-auto mb-1" />
                <p className="text-xs text-[#1a3a52] font-bold">{selectedTour.duration}</p>
              </div>
              <div className="text-center border-l border-r border-white/40">
                <Users className="h-5 w-5 text-[#F59E0B] mx-auto mb-1" />
                <p className="text-xs text-[#1a3a52] font-bold">{selectedTour.guests}</p>
              </div>
              <div className="text-center">
                <Star className="h-5 w-5 text-[#F59E0B] mx-auto mb-1 fill-current" />
                <p className="text-xs text-[#1a3a52] font-bold">{selectedTour.rating}/5</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm md:text-base leading-relaxed text-[#1a3a52] mb-6 font-light" style={{ fontFamily: "'Lora', 'Georgia', serif", letterSpacing: '0.2px' }}>
              {selectedTour.description}
            </p>

            {/* Highlights */}
            <div className="mb-6">
              <h3 className="text-xs font-bold text-[#0a5d7a] uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="h-0.5 w-3 bg-[#F59E0B]" />
                Tour Highlights
              </h3>
              <ul className="space-y-2">
                {selectedTour.highlights.map((highlight, idx) => (
                  <motion.li 
                    key={idx} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="flex items-center gap-2 group/item"
                  >
                    <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-[#F59E0B] group-hover/item:scale-150 transition-transform duration-300" />
                    <span className="text-xs md:text-sm text-[#1a3a52] font-medium group-hover/item:text-[#0a5d7a] transition-colors duration-300">{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="flex justify-center"
            >
              <ProtectedBookingLink className="w-full">
                <Button className="wavy-btn w-full rounded-xl text-white px-10 py-3 text-base font-bold shadow-xl hover:shadow-2xl transition-all duration-300 border-b-4 border-[#F59E0B] bg-gradient-to-r from-[#0a5d7a] via-[#F59E0B] to-[#1a3a52] uppercase tracking-wide" style={{ backgroundSize: '200% 200%' }}>
                  Book This Tour
                </Button>
              </ProtectedBookingLink>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
