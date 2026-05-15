import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Star, Play } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ProtectedBookingLink } from "../components/ProtectedBookingLink";
import heroBg from "../../assets/h1-bg01.jpg";
import { useLanguage } from "../contexts/LanguageContext";

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
    title: "istanbulPackage",
    destination: "istanbulTurkey",
    duration: "fiveDaysFourNights",
    price: "$750",
    rating: 4.9,
    reviews: 127,
    description: "offerIstanbulDesc",
    includes: [
      "includeHotelBreakfast",
      "includeAirportTransfers",
      "includeHagiaSophiaTours",
      "includeSultanAhmedMosque",
      "includeBosphorusCruise",
      "includeProfessionalGuide"
    ],
    highlights: [
      "highlightHistoricLandmarks",
      "highlightCulturalExperiences",
      "highlightTurkishCuisine",
      "highlightGrandBazaar"
    ],
    video: istanbulVideo,
    bestFor: "cultureLovers",
    badge: "popular",
    discount: 15,
    originalPrice: "$880"
  },
  {
    id: 1,
    title: "aqabaBeachTrip",
    destination: "aqabaJordan",
    duration: "fourDaysThreeNights",
    price: "$400",
    rating: 4.8,
    reviews: 89,
    description: "offerAqabaDesc",
    includes: [
      "includeBeachfrontHotel",
      "includeSeaActivities",
      "includeInternalTransportation",
      "includeWadiRumTrip",
      "includeRedSeaDiving",
      "includeBeachEquipment"
    ],
    highlights: [
      "highlightCrystalWaters",
      "highlightCoralReefs",
      "highlightDesertAdventure",
      "highlightWaterSports"
    ],
    video: aqabaVideo,
    bestFor: "beachAdventure",
    badge: "bestValue"
  },
  {
    id: 2,
    title: "sharmElSheikhLuxury",
    destination: "sharmEgypt",
    duration: "fiveDaysFourNights",
    price: "$900",
    rating: 5.0,
    reviews: 156,
    description: "offerSharmDesc",
    includes: [
      "includeFiveStarResort",
      "includeUnlimitedMeals",
      "includeSwimmingPools",
      "includeEntertainmentActivities",
      "includeBeachWaterSports",
      "includeSpaAccess"
    ],
    highlights: [
      "highlightLuxuryAccommodation",
      "highlightAllInclusive",
      "highlightRedSeaBeaches",
      "highlightEveningEntertainment"
    ],
    video: sharmVideo,
    bestFor: "luxurySeekers",
    badge: "bestRated",
    discount: 25,
    originalPrice: "$1,200"
  },
  {
    id: 3,
    title: "dubaiLuxuryExperience",
    destination: "dubaiUae",
    duration: "sixDaysFiveNights",
    price: "$1,200",
    rating: 4.9,
    reviews: 203,
    description: "offerDubaiDesc",
    includes: [
      "includeFiveStarHotel",
      "includeBurjKhalifa",
      "includeDesertSafari",
      "includeDubaiMarina",
      "includeShoppingTours",
      "includeCityTourGuide"
    ],
    highlights: [
      "highlightModernArchitecture",
      "highlightLuxuryShopping",
      "highlightDesertAdventures",
      "highlightWorldClassDining"
    ],
    video: dubaiVideo,
    bestFor: "modernLuxury",
    badge: "premium",
    discount: 10,
    originalPrice: "$1,335"
  },
  {
    id: 4,
    title: "cairoPyramidsExplorer",
    destination: "cairoEgypt",
    duration: "fourDaysThreeNights",
    price: "$650",
    rating: 4.7,
    reviews: 142,
    description: "offerCairoDesc",
    includes: [
      "includeHotelNearPyramids",
      "includePyramidsSphinxTour",
      "includeEgyptianMuseum",
      "includeNileDinner",
      "includeEgyptianMeals",
      "includeEntranceFees"
    ],
    highlights: [
      "highlightAncientWonders",
      "highlightHistoricalTreasures",
      "highlightNileExperience",
      "highlightEgyptianCulture"
    ],
    video: cairoVideo,
    bestFor: "historyEnthusiasts",
    badge: "historic"
  },
  {
    id: 5,
    title: "maldivesParadiseRetreat",
    destination: "maleMaldives",
    duration: "sevenDaysSixNights",
    price: "$1,500",
    rating: 5.0,
    reviews: 98,
    description: "offerMaldivesDesc",
    includes: [
      "includeOverwaterVilla",
      "includeAllInclusiveMeals",
      "includeWaterSportsEquipment",
      "includeSnorkelingDiving",
      "includeSpaTreatments",
      "includePrivateBeach"
    ],
    highlights: [
      "highlightOverwaterBungalows",
      "highlightPristineBeaches",
      "highlightMarineLife",
      "highlightUltimateRelaxation"
    ],
    video: maldivesVideo,
    bestFor: "honeymooners",
    badge: "paradise",
    discount: 55,
    originalPrice: "$3,335"
  },
];

export function Offers() {
  const { t } = useLanguage();
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
        className="min-h-screen bg-cover bg-center text-[#0a5d7a] md:bg-fixed"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 py-20 sm:py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-[#000816]/85 via-[#021427]/70 to-[#F59E0B]/15 z-0" />

          <div className="relative z-10 mx-auto max-w-7xl text-center">
            <h1
              className="mb-4 text-4xl font-black drop-shadow-lg sm:text-5xl md:text-7xl"
              style={{ fontFamily: "'Playfair Display', 'Georgia', serif", letterSpacing: '-0.02em', color: '#0a5d7a' }}
            >
              <span className="bg-gradient-to-r from-white via-[#F59E0B] to-white bg-clip-text text-transparent">
                {t("specialOffers")}
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-light text-white/85 drop-shadow-lg sm:text-2xl md:text-3xl" style={{ fontFamily: "'Lora', 'Georgia', serif", color: '#F59E0B' }}>
              {t("offersPageDesc")}
            </p>
          </div>
        </section>

        {/* Offers Grid Section */}
        <section className="relative overflow-hidden py-10 sm:py-14 md:py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/30 backdrop-blur-sm" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center sm:mb-12">
              <h2 className="mb-3 text-3xl font-black text-[#0a5d7a] sm:text-4xl md:text-5xl" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                {t("amazingPackagesAvailable", { count: allOffers.length })}
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-[#0a5d7a] via-[#F59E0B] to-[#0a5d7a] rounded-full mx-auto mb-4" />
              <p className="text-sm leading-7 text-[#1a3a52] sm:text-lg" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                {t("offersGridDesc")}
              </p>
            </div>
            <div className="grid justify-center gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
              {allOffers.map((offer, index) => {
                return (
                  <motion.div
                    key={offer.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03, y: -6 }}
                    className="group cursor-pointer"
                    onClick={() => handleOfferClick(offer)}
                  >
                    <Card className={`flex h-full flex-col overflow-hidden rounded-2xl border-2 border-white/80 bg-white/70 p-0 shadow-xl backdrop-blur-xl transition-all duration-300 group-hover:border-[#F59E0B]/80 sm:rounded-3xl sm:shadow-2xl ${selectedOffer.id === offer.id ? 'ring-2 ring-[#F59E0B] shadow-[0_0_28px_rgba(245,158,11,0.32)] sm:ring-4 sm:shadow-[0_0_40px_rgba(245,158,11,0.4)]' : ''}`}>
                      {/* Video Container */}
                      <div className="relative h-64 w-full overflow-hidden bg-black/20 sm:h-72 md:h-80 lg:h-96">
                        {offer.mediaType === "image" ? (
                          <img
                            src={offer.video}
                            alt={t(offer.title)}
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
                          className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#ff8c00] px-3 py-1.5 text-xs font-bold text-white shadow-lg sm:left-4 sm:top-4 sm:px-4 sm:py-2 sm:text-sm"
                        >
                          {t(offer.badge)}
                        </motion.div>

                        {offer.discount && (
                          <motion.div
                            whileHover={{ scale: 1.08 }}
                            className="absolute left-3 top-12 rounded-full bg-white/95 px-3 py-1.5 text-xs font-black text-[#F46C28] shadow-lg backdrop-blur-sm sm:left-4 sm:top-16 sm:px-4 sm:py-2 sm:text-sm"
                          >
                            {offer.discount}% {t("off")}
                          </motion.div>
                        )}

                        {/* Rating */}
                        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[#0a5d7a] shadow-lg backdrop-blur-sm sm:right-4 sm:top-4 sm:px-3">
                          <Star className="h-3.5 w-3.5 fill-current text-[#F59E0B] sm:h-4 sm:w-4" />
                          <span className="text-xs font-bold sm:text-sm">{offer.rating}</span>
                        </div>

                        {/* Price Badge */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="absolute bottom-3 left-3 rounded-xl bg-gradient-to-r from-[#0a5d7a] to-[#1a3a52] px-3 py-2 text-base font-black text-white shadow-lg sm:bottom-4 sm:left-4 sm:px-4 sm:text-lg"
                        >
                          <div className="flex flex-wrap items-end gap-1.5 sm:gap-2">
                            {offer.originalPrice && <span className="text-xs text-white/65 line-through sm:text-sm">{offer.originalPrice}</span>}
                            <span>{offer.price}</span>
                          </div>
                        </motion.div>
                      </div>

                      <div className="flex flex-1 flex-col p-4 sm:p-5">
                        <h3 className="mb-1 text-base font-black leading-tight text-[#0a5d7a] sm:text-lg" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                          {t(offer.title)}
                        </h3>
                        
                        <div className="flex items-center gap-1 mb-3 text-xs text-[#F59E0B] font-bold">
                          <span className="bg-[#F59E0B]/20 px-2 py-1 rounded-full">{t(offer.bestFor)}</span>
                        </div>

                        <div className="flex items-center gap-2 mb-3 text-xs text-[#1a3a52]">
                          <MapPin className="h-4 w-4 text-[#F59E0B]" />
                          <span className="font-semibold">{t(offer.destination)}</span>
                        </div>

                        <div className="flex items-center gap-2 mb-3 text-xs text-[#1a3a52]">
                          <Calendar className="h-4 w-4 text-[#F59E0B]" />
                          <span className="font-semibold">{t(offer.duration)}</span>
                        </div>

                        <div className="flex items-center gap-2 mb-3 text-xs text-[#1a3a52]">
                          <Users className="h-4 w-4 text-[#F59E0B]" />
                          <span className="font-semibold">({t("reviewsCount", { count: offer.reviews })})</span>
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
        <div ref={detailsRef} className="flex w-full justify-center px-4 py-10 sm:py-12 md:mb-16 md:mt-12 md:py-0">
          <motion.div
            key={selectedOffer.id}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="group w-full max-w-3xl rounded-2xl border border-white/90 bg-gradient-to-br from-white/85 via-white/80 to-white/75 p-4 shadow-xl backdrop-blur-xl sm:p-6 md:p-10 md:shadow-2xl"
          >
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h2 className="mb-2 text-2xl font-black leading-tight text-[#0a5d7a] sm:text-3xl md:text-4xl" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                    {t(selectedOffer.title)}
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-[#F59E0B] to-[#0a5d7a] rounded-full" />
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-full rounded-xl bg-gradient-to-br from-[#F59E0B]/20 to-[#0a5d7a]/20 px-4 py-3 text-left sm:w-auto sm:flex-shrink-0 sm:text-right"
                >
                  {selectedOffer.originalPrice && <p className="text-sm font-bold text-[#1a3a52]/55 line-through">{selectedOffer.originalPrice}</p>}
                  <p className="text-2xl font-black text-[#F59E0B] sm:text-3xl">{selectedOffer.price}</p>
                  {selectedOffer.discount && <p className="text-xs font-black text-[#F46C28]">{selectedOffer.discount}% {t("off")}</p>}
                  <p className="text-xs text-[#1a3a52] font-bold">{t("limitedTimeOffer")}</p>
                </motion.div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl bg-gradient-to-r from-[#F59E0B]/15 via-[#0a5d7a]/10 to-[#F59E0B]/15 p-3 sm:gap-3 sm:p-4 md:mb-8 md:grid-cols-4">
              <div className="text-center">
                <Calendar className="h-5 w-5 text-[#F59E0B] mx-auto mb-1" />
                <p className="text-xs text-[#1a3a52] font-bold">{t(selectedOffer.duration)}</p>
              </div>
              <div className="border-l border-white/40 text-center md:border-r">
                <MapPin className="h-5 w-5 text-[#F59E0B] mx-auto mb-1" />
                <p className="text-xs text-[#1a3a52] font-bold">{t("premiumDestination")}</p>
              </div>
              <div className="text-center">
                <Star className="h-5 w-5 text-[#F59E0B] mx-auto mb-1 fill-current" />
                <p className="text-xs text-[#1a3a52] font-bold">{t("ratingOutOfFive", { rating: selectedOffer.rating })}</p>
              </div>
              <div className="text-center border-l border-white/40">
                <Users className="h-5 w-5 text-[#F59E0B] mx-auto mb-1" />
                <p className="text-xs text-[#1a3a52] font-bold">{t("happyTravelersCount", { count: selectedOffer.reviews })}</p>
              </div>
            </div>

            {/* Best For Badge */}
            <div className="mb-6">
              <span className="inline-block rounded-full bg-gradient-to-r from-[#F59E0B] to-[#ff8c00] px-3 py-2 text-xs font-bold text-white sm:px-4 sm:text-sm">
                {t("perfectFor", { value: t(selectedOffer.bestFor) })}
              </span>
            </div>

            {/* Description */}
            <p className="mb-6 text-sm font-light leading-7 text-[#1a3a52] sm:text-base md:mb-8 md:text-lg md:leading-relaxed" style={{ fontFamily: "'Lora', 'Georgia', serif", letterSpacing: '0.3px' }}>
              {t(selectedOffer.description)}
            </p>

            {/* Package Includes */}
            <div className="mb-8">
              <h3 className="text-sm font-black text-[#0a5d7a] uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="h-0.5 w-4 bg-[#F59E0B]" />
                {t("packageIncludes")}
              </h3>
              <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
                {selectedOffer.includes.map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-[#F59E0B]/5"
                  >
                    <span className="flex-shrink-0 h-2 w-2 rounded-full bg-[#F59E0B] mt-2" />
                    <span className="text-sm font-medium leading-6 text-[#1a3a52]">{t(item)}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="mb-8">
              <h3 className="text-sm font-black text-[#0a5d7a] uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="h-0.5 w-4 bg-[#F59E0B]" />
                {t("highlights")}
              </h3>
              <ul className="space-y-2">
                {selectedOffer.highlights.map((highlight, idx) => (
                  <motion.li 
                    key={idx} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="group/item flex items-start gap-2"
                  >
                    <span className="text-lg leading-6">✓</span>
                    <span className="text-sm font-medium leading-6 text-[#1a3a52] transition-colors duration-300 group-hover/item:text-[#0a5d7a] md:text-base">{t(highlight)}</span>
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
                <ProtectedBookingLink className="w-full block">
                  <Button className="wavy-btn w-full rounded-xl border-b-4 border-[#F59E0B] bg-gradient-to-r from-[#0a5d7a] via-[#F59E0B] to-[#1a3a52] px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-xl transition-all duration-300 hover:shadow-2xl sm:px-8 sm:text-base" style={{ backgroundSize: '200% 200%' }}>
                    {t("bookNow")}
                  </Button>
                </ProtectedBookingLink>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Link to="/contact" className="block w-full">
                  <Button className="w-full rounded-xl border-2 border-[#0a5d7a] bg-white/60 px-5 py-3 text-sm font-bold uppercase tracking-wide text-[#0a5d7a] shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/80 hover:shadow-xl sm:px-8 sm:text-base">
                    {t("askQuestions")}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Why Choose This Offer Section */}
        <section className="relative overflow-hidden py-10 sm:py-14 md:py-16">
          <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-[#fff7ea]/94 to-[#f4dfbf]/96" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center sm:mb-12">
              <h2 className="mb-4 text-3xl font-black text-[#0a5d7a] sm:text-4xl md:text-5xl" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                {t("whyOffersStandOut")}
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-[#0a5d7a] via-[#F59E0B] to-[#0a5d7a] rounded-full mx-auto" />
            </div>
            <div className="grid gap-5 md:grid-cols-3 md:gap-8">
              {[
                { icon: "💎", title: "premiumQuality", desc: "premiumQualityDesc" },
                { icon: "💰", title: "unbeatablePrices", desc: "unbeatablePricesDesc" },
                { icon: "🛡️", title: "completeProtection", desc: "completeProtectionDesc" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="rounded-2xl border border-white/80 bg-white/50 p-5 text-center backdrop-blur sm:p-6"
                >
                  <p className="mb-3 text-4xl sm:text-5xl">{item.icon}</p>
                  <h3 className="mb-2 text-lg font-bold text-[#0a5d7a] sm:text-xl" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                    {t(item.title)}
                  </h3>
                  <p className="text-sm leading-6 text-[#1a3a52] sm:text-base">{t(item.desc)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
