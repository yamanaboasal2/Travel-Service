import { motion } from "framer-motion";
import { MapPin, Users, Calendar, DollarSign, Plane, Hotel, Package, Briefcase, Search, Filter, Check, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import React, { useState } from "react";
import heroBg from "../../assets/h1-bg01.jpg";
import { ParallaxShowcase } from "../components/ParallaxShowcase";

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

const tours = [
  { id: 1, name: "Cairo & Pyramids Explorer", price: 650, rating: 4.7, location: "Egypt" },
  { id: 2, name: "Istanbul Package", price: 750, rating: 4.9, location: "Turkey" },
  { id: 3, name: "Dubai Luxury Experience", price: 1200, rating: 4.9, location: "UAE" },
  { id: 4, name: "Maldives Paradise Retreat", price: 1500, rating: 5.0, location: "Maldives" },
  { id: 5, name: "Aqaba Beach Trip", price: 400, rating: 4.8, location: "Jordan" },
  { id: 6, name: "Sharm El Sheikh Luxury", price: 900, rating: 5.0, location: "Egypt" },
];

const services = [
  { id: 1, name: "Flight Booking", icon: Plane, color: "from-blue-500 to-cyan-500" },
  { id: 2, name: "Hotel Reservations", icon: Hotel, color: "from-amber-500 to-orange-500" },
  { id: 3, name: "Tour Packages", icon: Package, color: "from-green-500 to-emerald-500" },
  { id: 4, name: "Visa Services", icon: Briefcase, color: "from-purple-500 to-pink-500" },
];

const steps = [
  { number: "1", title: "Personal Details", icon: "👤" },
  { number: "2", title: "Select Tour", icon: "✈️" },
  { number: "3", title: "Add Services", icon: "🎁" },
  { number: "4", title: "Review & Pay", icon: "💳" },
];

export function Booking() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    guests: 1,
  });
  const [selectedTour, setSelectedTour] = useState<number | null>(null);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState(1500);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTours = tours.filter(
    (tour) =>
      tour.price <= priceRange &&
      tour.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleServiceToggle = (serviceId: number) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <>
      <style>{wavyButtonStyle}</style>
      <div
        className="min-h-screen bg-cover bg-center bg-fixed text-[#0a5d7a]"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundAttachment: "fixed",
        }}
      >
        {/* Hero Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#000816]/85 via-[#021427]/70 to-[#F59E0B]/15 z-0" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1
              className="text-6xl md:text-7xl font-black mb-4 drop-shadow-lg"
              style={{
                fontFamily: "'Playfair Display', 'Georgia', serif",
                letterSpacing: "-0.02em",
                color: "#0a5d7a",
              }}
            >
              <span className="bg-gradient-to-r from-white via-[#F59E0B] to-white bg-clip-text text-transparent">
                Book Your Dream Trip
              </span>
            </h1>
            <p
              className="text-2xl md:text-3xl text-white/85 font-light max-w-2xl mx-auto drop-shadow-lg"
              style={{ fontFamily: "'Lora', 'Georgia', serif", color: "#F59E0B" }}
            >
              Complete your booking in just 4 simple steps
            </p>
          </div>
        </section>

        {/* Step Indicator */}
        <section className="relative py-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/20 backdrop-blur-sm" />
          <div className="relative z-10 max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, idx) => (
                <motion.div key={idx} className="flex items-center flex-1">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`relative w-16 h-16 rounded-full flex items-center justify-center font-black text-2xl shadow-xl ${
                      currentStep >= parseInt(step.number)
                        ? "bg-gradient-to-br from-[#F59E0B] to-[#ff8c00] text-white"
                        : "bg-white/60 text-[#0a5d7a] backdrop-blur"
                    }`}
                  >
                    {step.icon}
                  </motion.div>
                  {idx < steps.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: idx * 0.15, duration: 0.8 }}
                      className={`flex-1 h-1 mx-2 rounded-full origin-left ${
                        currentStep > parseInt(step.number)
                          ? "bg-gradient-to-r from-[#F59E0B] to-[#ff8c00]"
                          : "bg-white/30"
                      }`}
                    />
                  )}
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between text-xs md:text-sm font-bold text-[#0a5d7a]">
              {steps.map((step) => (
                <span
                  key={step.number}
                  className={`${currentStep >= parseInt(step.number) ? "text-[#F59E0B]" : "text-[#0a5d7a]/50"}`}
                >
                  {step.title}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Step 1: Personal Details */}
        {currentStep === 1 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative py-12 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/30 backdrop-blur-sm" />
            <div className="relative z-10 max-w-4xl mx-auto px-4">
              <Card className="bg-gradient-to-br from-white/85 via-white/80 to-white/75 backdrop-blur-xl border border-white/90 rounded-3xl p-8 md:p-12 shadow-2xl">
                <h2
                  className="text-4xl md:text-5xl font-black text-[#0a5d7a] mb-8"
                  style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                >
                  Tell Us About Yourself
                </h2>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                    <label className="block text-sm font-bold text-[#0a5d7a] mb-3 uppercase tracking-wide">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#F59E0B]/30 bg-white/60 backdrop-blur text-[#0a5d7a] placeholder-[#0a5d7a]/40 focus:outline-none focus:border-[#F59E0B] focus:bg-white/80 transition-all duration-300"
                    />
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                    <label className="block text-sm font-bold text-[#0a5d7a] mb-3 uppercase tracking-wide">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#F59E0B]/30 bg-white/60 backdrop-blur text-[#0a5d7a] placeholder-[#0a5d7a]/40 focus:outline-none focus:border-[#F59E0B] focus:bg-white/80 transition-all duration-300"
                    />
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                    <label className="block text-sm font-bold text-[#0a5d7a] mb-3 uppercase tracking-wide">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#F59E0B]/30 bg-white/60 backdrop-blur text-[#0a5d7a] placeholder-[#0a5d7a]/40 focus:outline-none focus:border-[#F59E0B] focus:bg-white/80 transition-all duration-300"
                    />
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                    <label className="block text-sm font-bold text-[#0a5d7a] mb-3 uppercase tracking-wide">
                      Number of Guests *
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#F59E0B]/30 bg-white/60 backdrop-blur text-[#0a5d7a] focus:outline-none focus:border-[#F59E0B] focus:bg-white/80 transition-all duration-300"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-4"
                >
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 wavy-btn rounded-xl text-white px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 border-b-4 border-[#F59E0B] bg-gradient-to-r from-[#0a5d7a] via-[#F59E0B] to-[#1a3a52] uppercase tracking-wide flex items-center justify-center gap-2"
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    Continue <ChevronRight className="h-5 w-5" />
                  </button>
                </motion.div>
              </Card>
            </div>
          </motion.section>
        )}

        {/* Step 2: Select Tour */}
        {currentStep === 2 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative py-12 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/30 backdrop-blur-sm" />
            <div className="relative z-10 max-w-7xl mx-auto px-4">
              <Card className="bg-gradient-to-br from-white/85 via-white/80 to-white/75 backdrop-blur-xl border border-white/90 rounded-3xl p-8 md:p-12 shadow-2xl mb-8">
                <h2
                  className="text-4xl md:text-5xl font-black text-[#0a5d7a] mb-8"
                  style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                >
                  Choose Your Perfect Tour
                </h2>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {/* Search */}
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F59E0B] h-5 w-5" />
                      <input
                        type="text"
                        placeholder="Search tours..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#F59E0B]/30 bg-white/60 backdrop-blur text-[#0a5d7a] placeholder-[#0a5d7a]/40 focus:outline-none focus:border-[#F59E0B]"
                      />
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div>
                    <label className="block text-xs font-bold text-[#0a5d7a] mb-2 uppercase">Max Price: ${priceRange}</label>
                    <input
                      type="range"
                      min="0"
                      max="1500"
                      value={priceRange}
                      onChange={(e) => setPriceRange(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTours.map((tour, idx) => (
                    <motion.div
                      key={tour.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => setSelectedTour(tour.id)}
                      className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 ${
                        selectedTour === tour.id
                          ? "border-[#F59E0B] bg-gradient-to-br from-[#F59E0B]/20 to-[#0a5d7a]/10"
                          : "border-white/40 bg-white/40 hover:border-[#F59E0B]/60"
                      }`}
                    >
                      {selectedTour === tour.id && (
                        <div className="absolute top-2 right-2 w-8 h-8 bg-[#F59E0B] rounded-full flex items-center justify-center text-white">
                          <Check className="h-5 w-5" />
                        </div>
                      )}
                      <h3 className="text-lg font-bold text-[#0a5d7a] mb-2">{tour.name}</h3>
                      <p className="text-sm text-[#1a3a52] mb-3 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#F59E0B]" /> {tour.location}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-[#F59E0B]">${tour.price}</span>
                        <span className="flex items-center gap-1 text-sm font-bold text-yellow-600">
                          ⭐ {tour.rating}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 rounded-xl text-[#0a5d7a] px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#0a5d7a] bg-white/60 backdrop-blur-sm uppercase tracking-wide"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  disabled={!selectedTour}
                  className="flex-1 wavy-btn rounded-xl text-white px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 border-b-4 border-[#F59E0B] bg-gradient-to-r from-[#0a5d7a] via-[#F59E0B] to-[#1a3a52] uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ backgroundSize: "200% 200%" }}
                >
                  Continue <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.section>
        )}

        {/* Step 3: Add Services */}
        {currentStep === 3 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative py-12 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/30 backdrop-blur-sm" />
            <div className="relative z-10 max-w-7xl mx-auto px-4">
              <Card className="bg-gradient-to-br from-white/85 via-white/80 to-white/75 backdrop-blur-xl border border-white/90 rounded-3xl p-8 md:p-12 shadow-2xl mb-8">
                <h2
                  className="text-4xl md:text-5xl font-black text-[#0a5d7a] mb-3"
                  style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                >
                  Add Optional Services
                </h2>
                <p className="text-lg text-[#1a3a52] mb-8">Enhance your trip with our premium services</p>

                <div className="grid sm:grid-cols-2 gap-6">
                  {services.map((service, idx) => {
                    const Icon = service.icon;
                    return (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => handleServiceToggle(service.id)}
                        className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 ${
                          selectedServices.includes(service.id)
                            ? "border-[#F59E0B] bg-gradient-to-br from-[#F59E0B]/20 to-[#0a5d7a]/10"
                            : "border-white/40 bg-white/40 hover:border-[#F59E0B]/60"
                        }`}
                      >
                        {selectedServices.includes(service.id) && (
                          <div className="absolute top-2 right-2 w-8 h-8 bg-[#F59E0B] rounded-full flex items-center justify-center text-white">
                            <Check className="h-5 w-5" />
                          </div>
                        )}
                        <div className={`inline-block p-4 rounded-xl bg-gradient-to-br ${service.color} mb-4`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0a5d7a]">{service.name}</h3>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex-1 rounded-xl text-[#0a5d7a] px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#0a5d7a] bg-white/60 backdrop-blur-sm uppercase tracking-wide"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="flex-1 wavy-btn rounded-xl text-white px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 border-b-4 border-[#F59E0B] bg-gradient-to-r from-[#0a5d7a] via-[#F59E0B] to-[#1a3a52] uppercase tracking-wide flex items-center justify-center gap-2"
                  style={{ backgroundSize: "200% 200%" }}
                >
                  Review Booking <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.section>
        )}

        {/* Step 4: Review & Pay */}
        {currentStep === 4 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative py-12 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/30 backdrop-blur-sm" />
            <div className="relative z-10 max-w-4xl mx-auto px-4">
              <Card className="bg-gradient-to-br from-white/85 via-white/80 to-white/75 backdrop-blur-xl border border-white/90 rounded-3xl p-8 md:p-12 shadow-2xl mb-8">
                <h2
                  className="text-4xl md:text-5xl font-black text-[#0a5d7a] mb-8"
                  style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                >
                  Review Your Booking
                </h2>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-[#F59E0B]/10 to-[#0a5d7a]/10 p-6 rounded-2xl border border-white/60">
                    <h3 className="text-sm font-bold text-[#0a5d7a] uppercase mb-4 flex items-center gap-2">
                      <span>👤</span> Personal Information
                    </h3>
                    <p className="text-[#1a3a52]"><strong>{formData.fullName}</strong> • {formData.email} • {formData.phone}</p>
                    <p className="text-[#1a3a52] mt-2"><strong>{formData.guests}</strong> Guest{formData.guests > 1 ? "s" : ""}</p>
                  </div>

                  <div className="bg-gradient-to-r from-[#F59E0B]/10 to-[#0a5d7a]/10 p-6 rounded-2xl border border-white/60">
                    <h3 className="text-sm font-bold text-[#0a5d7a] uppercase mb-4 flex items-center gap-2">
                      <span>✈️</span> Selected Tour
                    </h3>
                    <p className="text-lg font-bold text-[#0a5d7a]">
                      {tours.find((t) => t.id === selectedTour)?.name}
                    </p>
                    <p className="text-2xl font-black text-[#F59E0B] mt-2">
                      ${tours.find((t) => t.id === selectedTour)?.price}
                    </p>
                  </div>

                  {selectedServices.length > 0 && (
                    <div className="bg-gradient-to-r from-[#F59E0B]/10 to-[#0a5d7a]/10 p-6 rounded-2xl border border-white/60">
                      <h3 className="text-sm font-bold text-[#0a5d7a] uppercase mb-4 flex items-center gap-2">
                        <span>🎁</span> Selected Services
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {services
                          .filter((s) => selectedServices.includes(s.id))
                          .map((service) => (
                            <span
                              key={service.id}
                              className="inline-block bg-[#F59E0B]/30 text-[#0a5d7a] px-4 py-2 rounded-full font-semibold"
                            >
                              {service.name}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-gradient-to-br from-[#0a5d7a] to-[#1a3a52] p-6 rounded-2xl text-white">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg">Subtotal:</span>
                      <span className="text-2xl font-black">${tours.find((t) => t.id === selectedTour)?.price || 0}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/30">
                      <span className="text-lg">Services ({selectedServices.length}):</span>
                      <span className="text-2xl font-black">+ ${selectedServices.length * 150}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-black">TOTAL:</span>
                      <span className="text-3xl font-black text-[#F59E0B]">
                        ${(tours.find((t) => t.id === selectedTour)?.price || 0) + selectedServices.length * 150}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="flex-1 rounded-xl text-[#0a5d7a] px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#0a5d7a] bg-white/60 backdrop-blur-sm uppercase tracking-wide"
                  >
                    Back
                  </button>
                  <button
                    className="flex-1 wavy-btn rounded-xl text-white px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 border-b-4 border-[#F59E0B] bg-gradient-to-r from-[#0a5d7a] via-[#F59E0B] to-[#1a3a52] uppercase tracking-wide flex items-center justify-center gap-2"
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    <span>Complete Booking</span>
                  </button>
                </div>
              </Card>

              <p className="text-center text-[#0a5d7a] text-sm">
                🔒 Your booking is secure and encrypted
              </p>
            </div>
          </motion.section>
        )}

        {/* Parallax Achievements Section */}
        <section className="w-full">
          <ParallaxShowcase />
        </section>
      </div>
    </>
  );
}
