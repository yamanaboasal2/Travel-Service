import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plane, Hotel, MapPinned, FileText, Users, MapPin, Stamp, Heart } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import React, { useRef, useState } from "react";
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

import flightBookingImg from "../../assets/Flight Bookingjpg.jpg";
import hotelReservationsImg from "../../assets/Hotel Reservations.jpg";
import tourPackagesImg from "../../assets/Tour Packages.jpg";
import visaServiceImg from "../../assets/Visa Assistance.jpg";
import travelInsuranceImg from "../../assets/Travel Planning.jpg";
import groupTravelImg from "../../assets/Group Travel.jpg";

const services = [
  {
    id: 0,
    title: "Flight Booking",
    description: "Book your flight easily with top international and local airlines. We guarantee competitive prices, flexible options, and full support at every step.",
    features: [
      "International & domestic bookings",
      "Best price guarantee",
      "Easy cancellation & changes",
      "24/7 support"
    ],
    image: flightBookingImg,
    icon: Plane,
    cta: "Learn More"
  },
  {
    id: 1,
    title: "Hotel Reservations",
    description: "Enjoy luxury or budget stays at the best hotels worldwide. We help you choose the perfect hotel for your needs with exclusive offers and trusted reviews.",
    features: [
      "Diverse accommodation options",
      "Exclusive deals & prices",
      "Verified guest reviews",
      "Group discounts"
    ],
    image: hotelReservationsImg,
    icon: MapPin,
    cta: "Learn More"
  },
  {
    id: 2,
    title: "Tour Packages",
    description: "Discover the world with all-inclusive tour packages covering flights, accommodation, tours, and activities. We offer tailor-made programs to suit your interests.",
    features: [
      "All-inclusive packages",
      "Flexible & custom programs",
      "Professional local guides",
      "Group & private tours"
    ],
    image: tourPackagesImg,
    icon: MapPinned,
    cta: "Learn More"
  },
  {
    id: 3,
    title: "Visa Services",
    description: "Navigate visa requirements effortlessly with our expert consultation services. We handle all documentation and applications to ensure smooth approval.",
    features: [
      "Visa consultation & guidance",
      "Document preparation assistance",
      "Fast-track processing",
      "Multi-country expertise"
    ],
    image: visaServiceImg,
    icon: Stamp,
    cta: "Learn More"
  },
  {
    id: 4,
    title: "Travel Insurance",
    description: "Protect your investment with comprehensive travel insurance covering medical emergencies, trip cancellations, and lost luggage worldwide.",
    features: [
      "Full medical coverage",
      "Trip cancellation protection",
      "Baggage & delay coverage",
      "24/7 emergency assistance"
    ],
    image: travelInsuranceImg,
    icon: Heart,
    cta: "Learn More"
  },
  {
    id: 5,
    title: "Group Travel",
    description: "Experience unforgettable adventures with our specialized group travel packages. We handle all arrangements for cohesive itineraries and exclusive group discounts.",
    features: [
      "Customized group itineraries",
      "Special group rates & discounts",
      "Dedicated group coordinator",
      "Team building travel experiences"
    ],
    image: groupTravelImg,
    icon: Users,
    cta: "Learn More"
  },
];

const whyChoose = [
  { number: "1", title: "Competitive Prices", description: "Best value for your money with exclusive deals" },
  { number: "2", title: "Excellent Service", description: "Professional and friendly customer support" },
  { number: "3", title: "Organized Trips", description: "Well-planned itineraries for stress-free travel" },
  { number: "4", title: "Continuous Offers", description: "Regular promotions and special discounts" },
];

export function OurServices() {
  const [selectedService, setSelectedService] = useState(services[0]);
  const detailsRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (service) => {
    setSelectedService(service);
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
                Our Services
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-white/85 font-light max-w-2xl mx-auto drop-shadow-lg" style={{ fontFamily: "'Lora', 'Georgia', serif", color: '#F59E0B' }}>
              Travel services designed to feel effortless
            </p>
          </div>
        </section>

        {/* Services Grid Section */}
        <section className="relative overflow-hidden py-16 md:py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/30 backdrop-blur-sm" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-4xl md:text-5xl font-black text-[#0a5d7a] mb-3" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                Our Premium Services
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-[#0a5d7a] via-[#F59E0B] to-[#0a5d7a] rounded-full mx-auto mb-4" />
              <p className="text-lg text-[#1a3a52]" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                Comprehensive travel solutions tailored to your needs
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-center">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.08, y: -8 }}
                    className="cursor-pointer group"
                    onClick={() => handleCardClick(service)}
                  >
                    <Card className={`overflow-hidden rounded-3xl border-2 border-white/80 bg-white/70 shadow-2xl backdrop-blur-xl flex flex-col items-center p-0 transition-all duration-300 h-full group-hover:border-[#F59E0B]/80 ${selectedService.id === service.id ? 'ring-4 ring-[#F59E0B] shadow-[0_0_40px_rgba(245,158,11,0.4)]' : ''}`}>
                      <div className="relative w-full h-52 overflow-hidden">
                        <img
                          src={`${service.image}?t=${Date.now()}`}
                          alt={service.title}
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a5d7a]/15 to-transparent" />
                      </div>
                      <div className="flex flex-col items-center p-6 w-full">
                        <motion.div 
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 400 }}
                          className="mb-3 p-3 rounded-full bg-gradient-to-br from-[#F59E0B]/20 to-[#0a5d7a]/10"
                        >
                          <IconComponent className="h-6 w-6 text-[#F59E0B]" />
                        </motion.div>
                        <h3 className="text-xl font-bold text-[#0a5d7a] text-center leading-tight" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>{service.title}</h3>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Shared Service Details Section */}
        <div ref={detailsRef} className="flex justify-center w-full mt-12 mb-16 px-4">
          <motion.div
            key={selectedService.id}
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
                <selectedService.icon className="h-7 w-7 text-[#F59E0B]" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl md:text-3xl font-black text-[#0a5d7a] leading-tight mb-1 truncate" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                  {selectedService.title}
                </h2>
                <div className="h-0.5 w-12 bg-gradient-to-r from-[#F59E0B] to-[#0a5d7a] rounded-full" />
              </div>
            </div>

            {/* Description */}
            <p className="text-sm md:text-base leading-relaxed text-[#1a3a52] mb-6 font-light" style={{ fontFamily: "'Lora', 'Georgia', serif", letterSpacing: '0.2px' }}>
              {selectedService.description}
            </p>

            {/* Features with Enhanced Styling */}
            <div>
              <h3 className="text-xs font-bold text-[#0a5d7a] uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="h-0.5 w-3 bg-[#F59E0B]" />
                Features
              </h3>
              <ul className="space-y-2">
                {selectedService.features.map((feature, idx) => (
                  <motion.li 
                    key={idx} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="flex items-center gap-2 group/item"
                  >
                    <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-[#F59E0B] group-hover/item:scale-150 transition-transform duration-300" />
                    <span className="text-xs md:text-sm text-[#1a3a52] font-medium group-hover/item:text-[#0a5d7a] transition-colors duration-300">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Why Choose Section */}
        <section className="relative overflow-hidden py-12 md:py-16">
          <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-[#fff7ea]/94 to-[#f4dfbf]/96" />
          
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-5xl md:text-6xl font-black text-[#3E2723] mb-6" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                Why Choose Rainbow Travel?
              </h2>
              <div className="mb-8 flex justify-center">
                <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-[#0a5d7a] to-transparent rounded-full"></div>
              </div>
              <p className="text-xl text-[#6D5D54]" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                We're committed to making your travel experience exceptional
              </p>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {whyChoose.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="text-center group"
                >
                  <div className="mb-5 flex justify-center">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 360 }}
                      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                      className="h-20 w-20 rounded-full bg-gradient-to-br from-[#0a5d7a] to-[#F59E0B] flex items-center justify-center text-white text-4xl font-black shadow-lg group-hover:shadow-[0_15px_40px_rgba(10,93,122,0.4)] transition-shadow duration-300"
                    >
                      {item.number}
                    </motion.div>
                  </div>
                  <h3 className="text-2xl font-black text-[#3E2723] mb-3 pb-3 border-b border-[#0a5d7a]/30 group-hover:border-[#0a5d7a]/60 transition-colors duration-300" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>{item.title}</h3>
                  <p className="text-base leading-7 text-[#6D5D54]" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden py-12 md:py-16">
          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
          
          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8 flex justify-center">
              <div className="h-0.5 w-40 bg-gradient-to-r from-transparent via-[#0a5d7a] to-transparent rounded-full"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-[#3E2723] mb-6" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
              Ready to Book Your Trip?
            </h2>
            <p className="text-xl text-[#6D5D54] mb-10 max-w-2xl mx-auto" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
              Contact us today and let us help you plan your perfect vacation
            </p>
            
            <div className="flex justify-center mt-12">
              <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.3 }}>
                <Link to="/tours">
                  <Button className="wavy-btn rounded-2xl text-white px-16 py-6 text-3xl font-extrabold shadow-2xl hover:shadow-[0_30px_80px_rgba(10,93,122,0.25)] transition-shadow duration-300 border-b-8 border-[#F59E0B] tracking-wide"
                    style={{
                      background: 'linear-gradient(90deg, #0a5d7a, #F59E0B, #1a3a52)',
                      backgroundSize: '200% 200%'
                    }}>
                    Book Now
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
