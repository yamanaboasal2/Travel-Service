import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Star, Play } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
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

import istanbulVideo from "../../assets/Istanbul Package.mp4";
import aqabaVideo from "../../assets/Aqaba Beach Trip.mp4";
import sharmVideo from "../../assets/Sharm El Sheikh Luxury Package.mp4";
import dubaiVideo from "../../assets/Dubai Luxury Experience.mp4";
import cairoVideo from "../../assets/Cairo & Pyramids Explorer.mp4";
import maldivesVideo from "../../assets/Maldives Paradise Retreat.mp4";

export type OfferPackage = {
  id: number;
  title: string;
  destination: string;
  duration: string;
  price: string;
  rating: number;
  reviews: number;
  description: string;
  includes: string[];
  highlights: string[];
  video: string;
  mediaType?: "image" | "video";
  bestFor: string;
  badge: string;
  discount?: number;
  originalPrice?: string;
};

export const ADMIN_PACKAGES_STORAGE_KEY = "rainbowTravelAdminPackages";

export function getAdminOfferPackages(): OfferPackage[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedPackages = localStorage.getItem(ADMIN_PACKAGES_STORAGE_KEY);
    return storedPackages ? JSON.parse(storedPackages) : [];
  } catch {
    return [];
  }
}

export function saveAdminOfferPackages(packages: OfferPackage[]) {
  localStorage.setItem(ADMIN_PACKAGES_STORAGE_KEY, JSON.stringify(packages));
}

export const offers: OfferPackage[] = [
  {
    id: 0,
    title: "Istanbul Package",
    destination: "Istanbul, Turkey",
    duration: "5 Days / 4 Nights",
    price: "$750",
    rating: 4.9,
    reviews: 127,
    description: "Experience the magic of Istanbul where East meets West. Explore historic landmarks, enjoy a Bosphorus cruise, and immerse yourself in Turkish culture and cuisine at one of the world's most captivating cities.",
    includes: [
      "Hotel accommodation with breakfast",
      "Airport transfers (arrival & departure)",
      "Guided tours to Hagia Sophia",
      "Visit to Sultan Ahmed Mosque",
      "Bosphorus cruise tour",
      "Professional tour guide"
    ],
    highlights: [
      "Historic landmarks",
      "Cultural experiences",
      "Delicious Turkish cuisine",
      "Shopping at Grand Bazaar"
    ],
    video: istanbulVideo,
    bestFor: "Culture Lovers",
    badge: "Popular",
    discount: 15,
    originalPrice: "$880"
  },
  {
    id: 1,
    title: "Aqaba Beach Trip",
    destination: "Aqaba, Jordan",
    duration: "4 Days / 3 Nights",
    price: "$400",
    rating: 4.8,
    reviews: 89,
    description: "Discover the breathtaking beauty of Aqaba with pristine red sea waters, world-class diving spots, and optional desert adventures. Perfect for beach lovers and water sports enthusiasts seeking unforgettable aquatic experiences.",
    includes: [
      "Beachfront hotel stay",
      "Sea activities (snorkeling)",
      "Internal transportation",
      "Optional Wadi Rum desert trip",
      "Red Sea diving opportunities",
      "Beach equipment rental"
    ],
    highlights: [
      "Crystal clear waters",
      "Coral reefs exploration",
      "Desert adventure option",
      "Water sports activities"
    ],
    video: aqabaVideo,
    bestFor: "Beach & Adventure",
    badge: "Best Value"
  },
  {
    id: 2,
    title: "Sharm El Sheikh Luxury Package",
    destination: "Sharm El Sheikh, Egypt",
    duration: "5 Days / 4 Nights",
    price: "$900",
    rating: 5.0,
    reviews: 156,
    description: "Indulge in ultimate luxury at one of the world's premier resort destinations. This all-inclusive package offers pristine beaches, championship diving, spa retreats, and world-class entertainment for the ultimate getaway.",
    includes: [
      "5-star all-inclusive resort",
      "Unlimited meals & drinks",
      "Multiple swimming pools",
      "Entertainment & activities",
      "Beach access & water sports",
      "Spa facilities access"
    ],
    highlights: [
      "Luxury accommodation",
      "All-inclusive experience",
      "Red Sea beaches",
      "Evening entertainment"
    ],
    video: sharmVideo,
    bestFor: "Luxury Seekers",
    badge: "Best Rated",
    discount: 25,
    originalPrice: "$1,200"
  },
  {
    id: 3,
    title: "Dubai Luxury Experience",
    destination: "Dubai, UAE",
    duration: "6 Days / 5 Nights",
    price: "$1,200",
    rating: 4.9,
    reviews: 203,
    description: "Experience the epitome of modern luxury in Dubai. From breathtaking skyscrapers to golden desert safaris, world-class shopping to exquisite dining, Dubai offers an unforgettable blend of contemporary luxury and Arabian adventure.",
    includes: [
      "5-star hotel accommodation",
      "Burj Khalifa visit (148th floor)",
      "Desert safari with BBQ dinner",
      "Dubai Marina cruise",
      "Shopping mall tours",
      "City tour with guide"
    ],
    highlights: [
      "Modern architecture",
      "Luxury shopping",
      "Desert adventures",
      "World-class dining"
    ],
    video: dubaiVideo,
    bestFor: "Modern Luxury",
    badge: "Premium",
    discount: 10,
    originalPrice: "$1,335"
  },
  {
    id: 4,
    title: "Cairo & Pyramids Explorer",
    destination: "Cairo, Egypt",
    duration: "4 Days / 3 Nights",
    price: "$650",
    rating: 4.7,
    reviews: 142,
    description: "Uncover the mysteries of ancient Egypt with exclusive access to the Great Pyramids, the enigmatic Sphinx, and the treasures of the Egyptian Museum. Experience authentic Cairo culture along the legendary Nile River.",
    includes: [
      "Hotel near pyramids",
      "Guided Pyramids & Sphinx tour",
      "Egyptian Museum visit",
      "Nile River cruise dinner",
      "Traditional Egyptian meals",
      "All entrance fees included"
    ],
    highlights: [
      "Ancient wonders",
      "Historical treasures",
      "Nile experience",
      "Egyptian culture"
    ],
    video: cairoVideo,
    bestFor: "History Enthusiasts",
    badge: "Historic"
  },
  {
    id: 5,
    title: "Maldives Paradise Retreat",
    destination: "Male, Maldives",
    duration: "7 Days / 6 Nights",
    price: "$1,500",
    rating: 5.0,
    reviews: 98,
    description: "Escape to paradise in the Maldives with overwater bungalows, pristine white-sand beaches, and crystal-clear turquoise waters. Perfect for honeymooners and those seeking ultimate relaxation, romance, and marine adventures.",
    includes: [
      "Luxury overwater villa",
      "All-inclusive meals & drinks",
      "Water sports equipment",
      "Snorkeling & diving",
      "Spa treatments included",
      "Private beach access"
    ],
    highlights: [
      "Overwater bungalows",
      "Pristine beaches",
      "Marine life exploration",
      "Ultimate relaxation"
    ],
    video: maldivesVideo,
    bestFor: "Honeymooners",
    badge: "Paradise",
    discount: 55,
    originalPrice: "$3,335"
  },
];

export function Offers() {
  const [adminPackages] = useState<OfferPackage[]>(() => getAdminOfferPackages());
  const allOffers = [...adminPackages, ...offers];
  const [selectedOffer, setSelectedOffer] = useState<OfferPackage>(allOffers[0]);
  const detailsRef = useRef<HTMLDivElement>(null);

  const handleOfferClick = (offer: OfferPackage) => {
    setSelectedOffer(offer);
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
                Special Offers
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-white/85 font-light max-w-2xl mx-auto drop-shadow-lg" style={{ fontFamily: "'Lora', 'Georgia', serif", color: '#F59E0B' }}>
              Discover amazing travel deals and exclusive packages to your dream destinations
            </p>
          </div>
        </section>

        {/* Offers Grid Section */}
        <section className="relative overflow-hidden py-16 md:py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/30 backdrop-blur-sm" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-4xl md:text-5xl font-black text-[#0a5d7a] mb-3" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                {allOffers.length} Amazing Packages Available
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-[#0a5d7a] via-[#F59E0B] to-[#0a5d7a] rounded-full mx-auto mb-4" />
              <p className="text-lg text-[#1a3a52]" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                Click on any offer to view complete details and book your dream vacation today
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center">
              {allOffers.map((offer, index) => {
                return (
                  <motion.div
                    key={offer.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.08, y: -8 }}
                    className="cursor-pointer group"
                    onClick={() => handleOfferClick(offer)}
                  >
                    <Card className={`overflow-hidden rounded-3xl border-2 border-white/80 bg-white/70 shadow-2xl backdrop-blur-xl flex flex-col p-0 transition-all duration-300 h-full group-hover:border-[#F59E0B]/80 ${selectedOffer.id === offer.id ? 'ring-4 ring-[#F59E0B] shadow-[0_0_40px_rgba(245,158,11,0.4)]' : ''}`}>
                      {/* Video Container */}
                      <div className="relative w-full h-96 overflow-hidden bg-black/20">
                        {offer.mediaType === "image" ? (
                          <img
                            src={offer.video}
                            alt={offer.title}
                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <video
                            src={offer.video.startsWith("data:") ? offer.video : `${offer.video}?t=${Date.now()}`}
                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                            autoPlay
                            muted
                            loop
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a5d7a]/20 to-transparent" />
                        
                        {/* Badge */}
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="absolute top-4 left-4 bg-gradient-to-r from-[#F59E0B] to-[#ff8c00] text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg"
                        >
                          {offer.badge}
                        </motion.div>

                        {offer.discount && (
                          <motion.div
                            whileHover={{ scale: 1.08 }}
                            className="absolute left-4 top-16 rounded-full bg-white/95 px-4 py-2 text-sm font-black text-[#F46C28] shadow-lg backdrop-blur-sm"
                          >
                            {offer.discount}% OFF
                          </motion.div>
                        )}

                        {/* Rating */}
                        <div className="absolute top-4 right-4 bg-white/90 text-[#0a5d7a] px-3 py-1 rounded-full flex items-center gap-1 shadow-lg backdrop-blur-sm">
                          <Star className="h-4 w-4 fill-current text-[#F59E0B]" />
                          <span className="text-sm font-bold">{offer.rating}</span>
                        </div>

                        {/* Price Badge */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="absolute bottom-4 left-4 bg-gradient-to-r from-[#0a5d7a] to-[#1a3a52] text-white px-4 py-2 rounded-xl font-black text-lg shadow-lg"
                        >
                          <div className="flex items-end gap-2">
                            {offer.originalPrice && <span className="text-sm text-white/65 line-through">{offer.originalPrice}</span>}
                            <span>{offer.price}</span>
                          </div>
                        </motion.div>
                      </div>

                      <div className="flex flex-col p-5 flex-1">
                        <h3 className="text-lg font-black text-[#0a5d7a] mb-1 leading-tight" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                          {offer.title}
                        </h3>
                        
                        <div className="flex items-center gap-1 mb-3 text-xs text-[#F59E0B] font-bold">
                          <span className="bg-[#F59E0B]/20 px-2 py-1 rounded-full">{offer.bestFor}</span>
                        </div>

                        <div className="flex items-center gap-2 mb-3 text-xs text-[#1a3a52]">
                          <MapPin className="h-4 w-4 text-[#F59E0B]" />
                          <span className="font-semibold">{offer.destination}</span>
                        </div>

                        <div className="flex items-center gap-2 mb-3 text-xs text-[#1a3a52]">
                          <Calendar className="h-4 w-4 text-[#F59E0B]" />
                          <span className="font-semibold">{offer.duration}</span>
                        </div>

                        <div className="flex items-center gap-2 mb-3 text-xs text-[#1a3a52]">
                          <Users className="h-4 w-4 text-[#F59E0B]" />
                          <span className="font-semibold">({offer.reviews} reviews)</span>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Offer Details Section */}
        <div ref={detailsRef} className="flex justify-center w-full mt-12 mb-16 px-4">
          <motion.div
            key={selectedOffer.id}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="w-full max-w-3xl bg-gradient-to-br from-white/85 via-white/80 to-white/75 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-10 border border-white/90 group"
          >
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-[#0a5d7a] leading-tight mb-2" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                    {selectedOffer.title}
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-[#F59E0B] to-[#0a5d7a] rounded-full" />
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-right flex-shrink-0 bg-gradient-to-br from-[#F59E0B]/20 to-[#0a5d7a]/20 px-4 py-3 rounded-xl"
                >
                  {selectedOffer.originalPrice && <p className="text-sm font-bold text-[#1a3a52]/55 line-through">{selectedOffer.originalPrice}</p>}
                  <p className="text-3xl font-black text-[#F59E0B]">{selectedOffer.price}</p>
                  {selectedOffer.discount && <p className="text-xs font-black text-[#F46C28]">{selectedOffer.discount}% OFF</p>}
                  <p className="text-xs text-[#1a3a52] font-bold">LIMITED TIME OFFER</p>
                </motion.div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 p-4 bg-gradient-to-r from-[#F59E0B]/15 via-[#0a5d7a]/10 to-[#F59E0B]/15 rounded-xl">
              <div className="text-center">
                <Calendar className="h-5 w-5 text-[#F59E0B] mx-auto mb-1" />
                <p className="text-xs text-[#1a3a52] font-bold">{selectedOffer.duration}</p>
              </div>
              <div className="text-center border-l border-r border-white/40">
                <MapPin className="h-5 w-5 text-[#F59E0B] mx-auto mb-1" />
                <p className="text-xs text-[#1a3a52] font-bold">Premium Destination</p>
              </div>
              <div className="text-center">
                <Star className="h-5 w-5 text-[#F59E0B] mx-auto mb-1 fill-current" />
                <p className="text-xs text-[#1a3a52] font-bold">{selectedOffer.rating}/5 Rating</p>
              </div>
              <div className="text-center border-l border-white/40">
                <Users className="h-5 w-5 text-[#F59E0B] mx-auto mb-1" />
                <p className="text-xs text-[#1a3a52] font-bold">{selectedOffer.reviews} Happy Travelers</p>
              </div>
            </div>

            {/* Best For Badge */}
            <div className="mb-6">
              <span className="inline-block bg-gradient-to-r from-[#F59E0B] to-[#ff8c00] text-white px-4 py-2 rounded-full text-sm font-bold">
                ✨ Perfect for {selectedOffer.bestFor}
              </span>
            </div>

            {/* Description */}
            <p className="text-base md:text-lg leading-relaxed text-[#1a3a52] mb-8 font-light" style={{ fontFamily: "'Lora', 'Georgia', serif", letterSpacing: '0.3px' }}>
              {selectedOffer.description}
            </p>

            {/* Package Includes */}
            <div className="mb-8">
              <h3 className="text-sm font-black text-[#0a5d7a] uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="h-0.5 w-4 bg-[#F59E0B]" />
                📦 Package Includes
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {selectedOffer.includes.map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#F59E0B]/5 transition-colors"
                  >
                    <span className="flex-shrink-0 h-2 w-2 rounded-full bg-[#F59E0B] mt-2" />
                    <span className="text-sm text-[#1a3a52] font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="mb-8">
              <h3 className="text-sm font-black text-[#0a5d7a] uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="h-0.5 w-4 bg-[#F59E0B]" />
                ⭐ Highlights
              </h3>
              <ul className="space-y-2">
                {selectedOffer.highlights.map((highlight, idx) => (
                  <motion.li 
                    key={idx} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="flex items-center gap-2 group/item"
                  >
                    <span className="text-lg">✓</span>
                    <span className="text-sm md:text-base text-[#1a3a52] font-medium group-hover/item:text-[#0a5d7a] transition-colors duration-300">{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Link to="/booking" className="w-full block">
                  <Button className="wavy-btn w-full rounded-xl text-white px-8 py-3 text-base font-bold shadow-xl hover:shadow-2xl transition-all duration-300 border-b-4 border-[#F59E0B] bg-gradient-to-r from-[#0a5d7a] via-[#F59E0B] to-[#1a3a52] uppercase tracking-wide" style={{ backgroundSize: '200% 200%' }}>
                    Book Now
                  </Button>
                </Link>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Link to="/contact" className="block w-full">
                  <Button className="w-full rounded-xl text-[#0a5d7a] px-8 py-3 text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#0a5d7a] bg-white/60 backdrop-blur-sm uppercase tracking-wide hover:bg-white/80">
                    Ask Questions
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Why Choose This Offer Section */}
        <section className="relative overflow-hidden py-16">
          <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-[#fff7ea]/94 to-[#f4dfbf]/96" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-[#0a5d7a] mb-4" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                Why Our Offers Stand Out
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-[#0a5d7a] via-[#F59E0B] to-[#0a5d7a] rounded-full mx-auto" />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: "💎", title: "Premium Quality", desc: "Hand-picked destinations & luxury experiences" },
                { icon: "💰", title: "Unbeatable Prices", desc: "Best rates with full transparency, no hidden fees" },
                { icon: "🛡️", title: "Complete Protection", desc: "Travel insurance & 24/7 support included" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="text-center p-6 bg-white/50 backdrop-blur rounded-2xl border border-white/80"
                >
                  <p className="text-5xl mb-3">{item.icon}</p>
                  <h3 className="text-xl font-bold text-[#0a5d7a] mb-2" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-[#1a3a52]">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
