import { motion } from "framer-motion";
import { Plane, Hotel, MapPinned, FileText, Users, MapPin, Stamp, Heart } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import React, { useRef, useState } from "react";
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

import flightBookingImg from "../../assets/Flight Bookingjpg.jpg";
import hotelReservationsImg from "../../assets/Hotel Reservations.jpg";
import tourPackagesImg from "../../assets/Tour Packages.jpg";
import visaServiceImg from "../../assets/Visa Assistance.jpg";
import travelInsuranceImg from "../../assets/Travel Planning.jpg";
import groupTravelImg from "../../assets/Group Travel.jpg";

export type ServiceItem = {
  id: number;
  title: string;
  description: string;
  features: string[];
  image: string;
  icon: typeof Plane;
  cta: string;
};

export const ADMIN_SERVICES_STORAGE_KEY = "rainbowTravelAdminServices";

type StoredServiceItem = Omit<ServiceItem, "icon">;

export function getAdminServices(): ServiceItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedServices = localStorage.getItem(ADMIN_SERVICES_STORAGE_KEY);
    const parsedServices: StoredServiceItem[] = storedServices ? JSON.parse(storedServices) : [];
    return parsedServices.map((service) => ({ ...service, icon: Plane }));
  } catch {
    return [];
  }
}

export function saveAdminServices(nextServices: ServiceItem[]) {
  const storableServices: StoredServiceItem[] = nextServices.map(({ icon, ...service }) => service);
  localStorage.setItem(ADMIN_SERVICES_STORAGE_KEY, JSON.stringify(storableServices));
}

export const services: ServiceItem[] = [
  {
    id: 0,
    title: "flightBooking",
    description: "servicesFlightDesc",
    features: [
      "internationalDomesticBookings",
      "bestPriceGuarantee",
      "easyCancellationChanges",
      "support247"
    ],
    image: flightBookingImg,
    icon: Plane,
    cta: "learnMore"
  },
  {
    id: 1,
    title: "hotelReservations",
    description: "servicesHotelDesc",
    features: [
      "diverseAccommodationOptions",
      "exclusiveDealsPrices",
      "verifiedGuestReviews",
      "groupDiscounts"
    ],
    image: hotelReservationsImg,
    icon: MapPin,
    cta: "learnMore"
  },
  {
    id: 2,
    title: "tourPackages",
    description: "servicesTourDesc",
    features: [
      "allInclusivePackages",
      "flexibleCustomPrograms",
      "professionalLocalGuides",
      "groupPrivateTours"
    ],
    image: tourPackagesImg,
    icon: MapPinned,
    cta: "learnMore"
  },
  {
    id: 3,
    title: "visaServices",
    description: "servicesVisaDesc",
    features: [
      "visaConsultationGuidance",
      "documentPreparationAssistance",
      "fastTrackProcessing",
      "multiCountryExpertise"
    ],
    image: visaServiceImg,
    icon: Stamp,
    cta: "learnMore"
  },
  {
    id: 4,
    title: "travelInsurance",
    description: "servicesInsuranceDesc",
    features: [
      "fullMedicalCoverage",
      "tripCancellationProtection",
      "baggageDelayCoverage",
      "emergencyAssistance247"
    ],
    image: travelInsuranceImg,
    icon: Heart,
    cta: "learnMore"
  },
  {
    id: 5,
    title: "groupTravel",
    description: "servicesGroupDesc",
    features: [
      "customizedGroupItineraries",
      "specialGroupRatesDiscounts",
      "dedicatedGroupCoordinator",
      "teamBuildingTravelExperiences"
    ],
    image: groupTravelImg,
    icon: Users,
    cta: "learnMore"
  },
];

const whyChoose = [
  { number: "1", title: "competitivePrices", description: "whyCompetitivePricesDesc" },
  { number: "2", title: "excellentService", description: "whyExcellentServiceDesc" },
  { number: "3", title: "organizedTrips", description: "whyOrganizedTripsDesc" },
  { number: "4", title: "continuousOffers", description: "whyContinuousOffersDesc" },
];

export function OurServices() {
  const { t } = useLanguage();
  const [adminServices] = useState<ServiceItem[]>(() => getAdminServices());
  const allServices = [...adminServices, ...services];
  const [selectedService, setSelectedService] = useState<ServiceItem>(allServices[0]);
  const detailsRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (service: ServiceItem) => {
    setSelectedService(service);
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  };

  const formatFallbackLabel = (value: string) =>
    value
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
      .trim();

  const translateOrFormat = (key: string) => {
    const translated = t(key);
    return translated === key ? formatFallbackLabel(key) : translated;
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
                {t("ourServices")}
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-light text-white/85 drop-shadow-lg sm:text-2xl md:text-3xl" style={{ fontFamily: "'Lora', 'Georgia', serif", color: '#F59E0B' }}>
              {t("servicesHeroDesc")}
            </p>
          </div>
        </section>

        {/* Services Grid Section */}
        <section className="relative overflow-hidden py-10 sm:py-14 md:py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/30 backdrop-blur-sm" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center sm:mb-12">
              <h2 className="mb-3 text-3xl font-black text-[#0a5d7a] sm:text-4xl md:text-5xl" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                {t("ourPremiumServices")}
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-[#0a5d7a] via-[#F59E0B] to-[#0a5d7a] rounded-full mx-auto mb-4" />
              <p className="text-sm leading-7 text-[#1a3a52] sm:text-lg" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                {t("servicesPremiumDesc")}
              </p>
            </div>
            <div className="grid justify-center gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
              {allServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03, y: -6 }}
                    className="group cursor-pointer"
                    onClick={() => handleCardClick(service)}
                  >
                    <Card className={`flex h-full flex-col items-center overflow-hidden rounded-2xl border-2 border-white/80 bg-white/70 p-0 shadow-xl backdrop-blur-xl transition-all duration-300 group-hover:border-[#F59E0B]/80 sm:rounded-3xl sm:shadow-2xl ${selectedService.id === service.id ? 'ring-2 ring-[#F59E0B] shadow-[0_0_28px_rgba(245,158,11,0.32)] sm:ring-4 sm:shadow-[0_0_40px_rgba(245,158,11,0.4)]' : ''}`}>
                      <div className="relative h-44 w-full overflow-hidden sm:h-52">
                        <img
                          src={`${service.image}?t=${Date.now()}`}
                          alt={t(service.title)}
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a5d7a]/15 to-transparent" />
                      </div>
                      <div className="flex w-full flex-col items-center p-4 sm:p-6">
                        <motion.div 
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 400 }}
                          className="mb-3 rounded-full bg-gradient-to-br from-[#F59E0B]/20 to-[#0a5d7a]/10 p-3"
                        >
                          <IconComponent className="h-6 w-6 text-[#F59E0B]" />
                        </motion.div>
                        <h3 className="text-center text-lg font-bold leading-tight text-[#0a5d7a] sm:text-xl" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>{t(service.title)}</h3>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Shared Service Details Section */}
        <div ref={detailsRef} className="flex w-full justify-center px-4 py-10 sm:py-12 md:mb-16 md:mt-12 md:py-0">
          <motion.div
            key={selectedService.id}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="group w-full max-w-2xl rounded-2xl border border-white/90 bg-gradient-to-br from-white/85 via-white/80 to-white/75 p-4 shadow-xl backdrop-blur-xl sm:p-6 md:p-8 md:shadow-2xl"
          >
            {/* Header with Icon */}
            <div className="mb-5 flex items-start gap-3 sm:mb-6 sm:gap-4">
              <motion.div 
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex-shrink-0 rounded-xl bg-gradient-to-br from-[#F59E0B]/25 to-[#0a5d7a]/15 p-2.5 sm:p-3"
              >
                <selectedService.icon className="h-6 w-6 text-[#F59E0B] sm:h-7 sm:w-7" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <h2 className="mb-1 text-xl font-black leading-tight text-[#0a5d7a] sm:text-2xl md:text-3xl" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                  {t(selectedService.title)}
                </h2>
                <div className="h-0.5 w-12 bg-gradient-to-r from-[#F59E0B] to-[#0a5d7a] rounded-full" />
              </div>
            </div>

            {/* Description */}
            <p className="mb-6 text-sm font-light leading-7 text-[#1a3a52] md:text-base md:leading-relaxed" style={{ fontFamily: "'Lora', 'Georgia', serif", letterSpacing: '0.2px' }}>
              {t(selectedService.description)}
            </p>

            {/* Features with Enhanced Styling */}
            <div>
              <h3 className="text-xs font-bold text-[#0a5d7a] uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="h-0.5 w-3 bg-[#F59E0B]" />
                {t("features")}
              </h3>
              <ul className="space-y-2">
                {selectedService.features.map((feature, idx) => (
                  <motion.li 
                    key={idx} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="group/item flex items-start gap-2"
                  >
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#F59E0B] transition-transform duration-300 group-hover/item:scale-150" />
                    <span className="text-sm font-medium leading-6 text-[#1a3a52] transition-colors duration-300 group-hover/item:text-[#0a5d7a] md:text-sm">{t(feature)}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Why Choose Section */}
        <section className="relative overflow-hidden py-10 sm:py-12 md:py-16">
          <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-[#fff7ea]/94 to-[#f4dfbf]/96" />
          
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center sm:mb-12 md:mb-16">
              <h2 className="mb-4 text-3xl font-black text-[#3E2723] sm:text-4xl md:mb-6 md:text-6xl" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                {t("whyChooseRainbow")}
              </h2>
              <div className="mb-5 flex justify-center sm:mb-8">
                <div className="h-0.5 w-24 rounded-full bg-gradient-to-r from-transparent via-[#0a5d7a] to-transparent sm:w-32"></div>
              </div>
              <p className="text-sm leading-7 text-[#6D5D54] sm:text-xl" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                {t("committedToExceptional")}
              </p>
            </div>

            <div className="grid gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-10">
              {whyChoose.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="group text-center"
                >
                  <div className="mb-4 flex justify-center sm:mb-5">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 360 }}
                      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#0a5d7a] to-[#F59E0B] text-3xl font-black text-white shadow-lg transition-shadow duration-300 group-hover:shadow-[0_15px_40px_rgba(10,93,122,0.4)] sm:h-20 sm:w-20 sm:text-4xl"
                    >
                      {item.number}
                    </motion.div>
                  </div>
                  <h3 className="mb-3 border-b border-[#0a5d7a]/30 pb-3 text-xl font-black text-[#3E2723] transition-colors duration-300 group-hover:border-[#0a5d7a]/60 sm:text-2xl" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                    {translateOrFormat(item.title)}
                  </h3>
                  <p className="text-sm leading-7 text-[#6D5D54] sm:text-base" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                    {translateOrFormat(item.description)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden py-10 sm:py-12 md:py-16">
          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
          
          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-5 flex justify-center sm:mb-8">
              <div className="h-0.5 w-28 rounded-full bg-gradient-to-r from-transparent via-[#0a5d7a] to-transparent sm:w-40"></div>
            </div>
            <h2 className="mb-4 text-3xl font-black text-[#3E2723] sm:text-4xl md:mb-6 md:text-6xl" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
              {t("readyToBook")}
            </h2>
            <p className="mx-auto mb-7 max-w-2xl text-sm leading-7 text-[#6D5D54] sm:mb-10 sm:text-xl" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
              {t("servicesCtaDesc")}
            </p>
            
            <div className="mt-8 flex justify-center sm:mt-12">
              <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.3 }}>
                <ProtectedBookingLink>
                  <Button className="wavy-btn rounded-2xl border-b-4 border-[#F59E0B] px-8 py-4 text-lg font-extrabold tracking-wide text-white shadow-2xl transition-shadow duration-300 hover:shadow-[0_30px_80px_rgba(10,93,122,0.25)] sm:border-b-8 sm:px-16 sm:py-6 sm:text-3xl"
                    style={{
                      background: 'linear-gradient(90deg, #0a5d7a, #F59E0B, #1a3a52)',
                      backgroundSize: '200% 200%'
                    }}>
                    {t("bookNow")}
                  </Button>
                </ProtectedBookingLink>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
