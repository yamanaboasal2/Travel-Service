import { motion } from "framer-motion";
import { MapPin, Users, Calendar, DollarSign, Plane, Hotel, Package, Briefcase, Search, Filter, Check, ChevronRight, CreditCard, Landmark, Wallet, Building2, ShieldCheck, LogIn } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import React, { useState } from "react";
import heroBg from "../../assets/h1-bg01.jpg";
import { ParallaxShowcase } from "../components/ParallaxShowcase";
import { createBookingRequest, isAuthenticated } from "../services/apiService";
import { Link } from "react-router-dom";

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
  { id: 1, name: "Cairo & Pyramids Explorer", price: 650, rating: 4.7, location: "Egypt", duration: "4 Days / 3 Nights", type: "History", description: "Pyramids, Egyptian Museum, Nile dinner cruise, and guided cultural visits." },
  { id: 2, name: "Istanbul Package", price: 750, rating: 4.9, location: "Turkey", duration: "5 Days / 4 Nights", type: "Culture", description: "Historic Istanbul, Bosphorus cruise, Grand Bazaar, and guided landmark tours." },
  { id: 3, name: "Dubai Luxury Experience", price: 1200, rating: 4.9, location: "UAE", duration: "6 Days / 5 Nights", type: "Luxury", description: "Burj Khalifa, desert safari, luxury hotel stay, marina cruise, and shopping tours." },
  { id: 4, name: "Maldives Paradise Retreat", price: 1500, rating: 5.0, location: "Maldives", duration: "7 Days / 6 Nights", type: "Relaxation", description: "Overwater villa, beach escape, snorkeling, water sports, and all-inclusive relaxation." },
  { id: 5, name: "Aqaba Beach Trip", price: 400, rating: 4.8, location: "Jordan", duration: "4 Days / 3 Nights", type: "Beach", description: "Red Sea beach stay, snorkeling, optional Wadi Rum trip, and internal transport." },
  { id: 6, name: "Sharm El Sheikh Luxury", price: 900, rating: 5.0, location: "Egypt", duration: "5 Days / 4 Nights", type: "Beach", description: "All-inclusive resort, Red Sea activities, beach access, spa facilities, and entertainment." },
];

const services = [
  { id: 1, name: "Flight Booking", icon: Plane, color: "from-blue-500 to-cyan-500", price: 120, description: "Best available flight options with flexible support." },
  { id: 2, name: "Hotel Reservations", icon: Hotel, color: "from-amber-500 to-orange-500", price: 150, description: "Upgrade or extend your hotel stay with trusted partners." },
  { id: 3, name: "Private Tour Guide", icon: Package, color: "from-green-500 to-emerald-500", price: 180, description: "Private local guide for a more personal itinerary." },
  { id: 4, name: "Visa Services", icon: Briefcase, color: "from-purple-500 to-pink-500", price: 90, description: "Document guidance and application support." },
];

const paymentMethods = [
  {
    name: "Pay at Office",
    icon: Building2,
    badge: "In person",
    description: "Confirm now and pay when you visit our office.",
    details: ["Office team will prepare your booking file.", "Bring your ID and booking confirmation."],
  },
  {
    name: "Bank Transfer",
    icon: Landmark,
    badge: "Bank",
    description: "Reserve your trip and receive bank transfer instructions.",
    details: ["Transfer details are shared after confirmation.", "Your booking stays pending until payment is verified."],
  },
  {
    name: "Cash on Arrival",
    icon: Wallet,
    badge: "Cash",
    description: "Pay in cash when the trip or service starts.",
    details: ["Available for eligible local services.", "Our team will confirm the cash amount before arrival."],
  },
  {
    name: "Credit Card",
    icon: CreditCard,
    badge: "Card",
    description: "Use a card-ready checkout flow for faster confirmation.",
    details: ["Card details are collected only through a secure payment provider.", "We will contact you to complete the secure card payment."],
  },
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
    travelDate: "",
    tripType: "Any",
    specialRequests: "",
    paymentMethod: "Pay at Office",
  });
  const [selectedTour, setSelectedTour] = useState<number | null>(null);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState(1500);
  const [searchTerm, setSearchTerm] = useState("");
  const [destinationFilter, setDestinationFilter] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState("");

  const destinations = ["All", ...Array.from(new Set(tours.map((tour) => tour.location)))];
  const tripTypes = ["Any", ...Array.from(new Set(tours.map((tour) => tour.type)))];
  const filteredTours = tours
    .filter((tour) =>
      tour.price <= priceRange &&
      (destinationFilter === "All" || tour.location === destinationFilter) &&
      (formData.tripType === "Any" || tour.type === formData.tripType) &&
      (tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.rating - a.rating || a.price - b.price;
    });

  const handleServiceToggle = (serviceId: number) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const selectedTourDetails = tours.find((tour) => tour.id === selectedTour);
  const servicesTotal = services
    .filter((service) => selectedServices.includes(service.id))
    .reduce((total, service) => total + service.price, 0);
  const bookingTotal = (selectedTourDetails?.price || 0) + servicesTotal;
  const selectedPaymentMethod =
    paymentMethods.find((method) => method.name === formData.paymentMethod) || paymentMethods[0];
  const SelectedPaymentIcon = selectedPaymentMethod.icon;

  const completeBooking = async () => {
    if (!selectedTourDetails || bookingSubmitting || bookingSuccess) return;

    setBookingSubmitting(true);
    setBookingError("");

    try {
      await createBookingRequest({
        bookingDate: formData.travelDate || new Date().toISOString(),
        travelers: formData.guests,
        specialRequests: formData.specialRequests,
        customer: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        },
        selectedServices: services
          .filter((service) => selectedServices.includes(service.id))
          .map((service) => service.name),
        destination: `${selectedTourDetails.name} - ${selectedTourDetails.location}`,
        tripType: formData.tripType,
        paymentMethod: formData.paymentMethod,
        totalPrice: bookingTotal,
        notes: selectedTourDetails.description,
      });

      setBookingSuccess(true);
    } catch (error) {
      setBookingError(error instanceof Error ? error.message : "Booking failed. Please try again.");
    } finally {
      setBookingSubmitting(false);
    }
  };

  if (!isAuthenticated()) {
    return (
      <>
        <style>{wavyButtonStyle}</style>
        <div
          className="min-h-screen bg-cover bg-center bg-fixed text-[#021427]"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundAttachment: "fixed",
          }}
        >
          <section className="relative flex min-h-[78vh] items-center justify-center overflow-hidden px-4 py-28">
            <div className="absolute inset-0 bg-gradient-to-br from-[#000816]/85 via-[#021427]/72 to-[#F59E0B]/18" />
            <Card className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-[0_30px_90px_rgba(2,20,39,0.28)] backdrop-blur-xl">
              <div className="bg-gradient-to-r from-[#021427] via-[#0a5d7a] to-[#021427] px-7 py-6 text-white md:px-9">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#F59E0B]">Login Required</p>
                <h1 className="mt-3 text-4xl font-black" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                  Sign in before booking
                </h1>
              </div>
              <div className="p-7 md:p-9">
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#021427] text-white shadow-lg shadow-[#021427]/15">
                    <LogIn className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-lg font-black text-[#021427]">You need an account to continue.</p>
                    <p className="mt-2 text-sm font-semibold leading-7 text-[#1a3a52]">
                      Please login or create a new account before filling booking information. This helps us keep your trip details, contact info, and payment choices connected to your profile.
                    </p>
                  </div>
                </div>
                <Link
                  to="/auth"
                  className="mt-7 inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#9a4b08] via-[#c46312] to-[#F59E0B] px-7 py-4 text-base font-black text-white shadow-[0_14px_34px_rgba(154,75,8,0.28)] transition hover:scale-[1.03] hover:shadow-[0_18px_42px_rgba(2,20,39,0.32)] md:w-auto"
                >
                  Login / Sign Up
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
            </Card>
          </section>
        </div>
      </>
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

        {/* Travel Gallery Section */}
        <section className="w-full">
          <ParallaxShowcase />
        </section>

        {/* Step Indicator */}
        <section className="relative py-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/20 backdrop-blur-sm" />
          <div className="relative z-10 mx-auto max-w-5xl px-4">
            <div className="mx-auto mb-8 flex max-w-4xl items-center justify-center">
              {steps.map((step, idx) => (
                <motion.div key={idx} className="flex min-w-0 flex-1 items-center last:flex-none">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`relative w-16 h-16 rounded-full flex items-center justify-center font-black text-2xl shadow-xl ${
                      currentStep >= parseInt(step.number)
                        ? "bg-gradient-to-br from-[#021427] to-[#0a5d7a] text-white"
                        : "bg-white/70 text-[#021427]/55 backdrop-blur"
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
                          ? "bg-gradient-to-r from-[#021427] to-[#0a5d7a]"
                          : "bg-white/30"
                      }`}
                    />
                  )}
                </motion.div>
              ))}
            </div>
            <div className="mx-auto grid max-w-4xl grid-cols-4 gap-2 text-center text-xs font-bold text-[#021427] md:text-sm">
              {steps.map((step) => (
                <span
                  key={step.number}
                  className={`${currentStep >= parseInt(step.number) ? "text-[#021427]" : "text-[#021427]/45"}`}
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

                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}>
                    <label className="block text-sm font-bold text-[#0a5d7a] mb-3 uppercase tracking-wide">
                      Travel Date *
                    </label>
                    <input
                      type="date"
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#F59E0B]/30 bg-white/60 backdrop-blur text-[#0a5d7a] focus:outline-none focus:border-[#F59E0B] focus:bg-white/80 transition-all duration-300"
                    />
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                    <label className="block text-sm font-bold text-[#0a5d7a] mb-3 uppercase tracking-wide">
                      Trip Style
                    </label>
                    <select
                      value={formData.tripType}
                      onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#F59E0B]/30 bg-white/60 backdrop-blur text-[#0a5d7a] focus:outline-none focus:border-[#F59E0B] focus:bg-white/80 transition-all duration-300"
                    >
                      {tripTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div className="md:col-span-2" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
                    <label className="block text-sm font-bold text-[#0a5d7a] mb-3 uppercase tracking-wide">
                      Special Requests
                    </label>
                    <textarea
                      placeholder="Tell us about hotel preferences, airport pickup, children, dietary needs..."
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      className="min-h-28 w-full px-4 py-3 rounded-xl border-2 border-[#F59E0B]/30 bg-white/60 backdrop-blur text-[#0a5d7a] placeholder-[#0a5d7a]/40 focus:outline-none focus:border-[#F59E0B] focus:bg-white/80 transition-all duration-300"
                    />
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

                <div className="grid gap-5 mb-8 md:grid-cols-4">
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

                  <div>
                    <label className="block text-xs font-bold text-[#0a5d7a] mb-2 uppercase">Destination</label>
                    <select
                      value={destinationFilter}
                      onChange={(e) => setDestinationFilter(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#F59E0B]/30 bg-white/60 backdrop-blur text-[#0a5d7a] focus:outline-none focus:border-[#F59E0B]"
                    >
                      {destinations.map((destination) => (
                        <option key={destination} value={destination}>
                          {destination}
                        </option>
                      ))}
                    </select>
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

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#0a5d7a] mb-2 uppercase">Trip Style</label>
                    <select
                      value={formData.tripType}
                      onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#F59E0B]/30 bg-white/60 backdrop-blur text-[#0a5d7a] focus:outline-none focus:border-[#F59E0B]"
                    >
                      {tripTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0a5d7a] mb-2 uppercase">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#F59E0B]/30 bg-white/60 backdrop-blur text-[#0a5d7a] focus:outline-none focus:border-[#F59E0B]"
                    >
                      <option value="recommended">Recommended</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rating</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm("");
                        setDestinationFilter("All");
                        setPriceRange(1500);
                        setSortBy("recommended");
                        setFormData({ ...formData, tripType: "Any" });
                      }}
                      className="inline-flex h-[3.25rem] w-full items-center justify-center gap-2 rounded-xl border-2 border-[#021427]/20 bg-white/60 px-4 text-sm font-black text-[#021427] transition hover:bg-white"
                    >
                      <Filter className="h-4 w-4" />
                      Reset
                    </button>
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
                      className={`relative cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 ${
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
                      <p className="text-sm text-[#1a3a52] mb-2 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#F59E0B]" /> {tour.location}
                      </p>
                      <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#1a3a52]">
                        <Calendar className="h-4 w-4 text-[#F59E0B]" /> {tour.duration}
                      </p>
                      <p className="mb-4 line-clamp-2 text-sm leading-6 text-[#1a3a52]/80">{tour.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-[#F59E0B]">${tour.price}</span>
                        <span className="flex items-center gap-1 text-sm font-bold text-yellow-600">
                          ⭐ {tour.rating}
                        </span>
                      </div>
                      <div className="mt-4 rounded-full bg-[#021427]/10 px-3 py-1 text-center text-xs font-black uppercase tracking-[0.12em] text-[#021427]">
                        {tour.type}
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
                        className={`relative cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 ${
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
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-bold text-[#0a5d7a]">{service.name}</h3>
                            <p className="mt-2 text-sm leading-6 text-[#1a3a52]/75">{service.description}</p>
                          </div>
                          <span className="shrink-0 rounded-full bg-[#021427]/10 px-3 py-1 text-sm font-black text-[#021427]">
                            +${service.price}
                          </span>
                        </div>
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
              <Card className="overflow-hidden bg-gradient-to-br from-white/88 via-white/82 to-white/76 backdrop-blur-xl border border-white/90 rounded-3xl p-0 shadow-2xl mb-8">
                <div className="bg-gradient-to-r from-[#021427] via-[#0a5d7a] to-[#021427] px-8 py-7 text-white md:px-12">
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-[#F59E0B]">Final Step</p>
                <h2
                    className="mt-2 text-4xl md:text-5xl font-black"
                  style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                >
                  Review Your Booking
                </h2>
                  <p className="mt-3 text-sm font-semibold text-white/75">Check the details before confirming your trip.</p>
                </div>

                <div className="p-8 md:p-12">
                  {bookingSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-800 shadow-lg shadow-emerald-900/5"
                    >
                      <p className="text-lg font-black">Booking completed successfully</p>
                      <p className="mt-1 text-sm font-semibold">Your trip registration has been received. We'll contact you soon with the next steps.</p>
                    </motion.div>
                  )}

                  <div className="space-y-6">
                  <div className="rounded-2xl border border-white/70 bg-white/65 p-6 shadow-[0_14px_40px_rgba(2,20,39,0.08)]">
                    <h3 className="text-sm font-black text-[#021427] uppercase mb-4 flex items-center gap-2 tracking-[0.16em]">
                      <span>👤</span> Personal Information
                    </h3>
                    <p className="text-[#1a3a52]"><strong>{formData.fullName}</strong> • {formData.email} • {formData.phone}</p>
                    <p className="text-[#1a3a52] mt-2"><strong>{formData.guests}</strong> Guest{formData.guests > 1 ? "s" : ""}</p>
                  </div>

                  <div className="rounded-2xl border border-white/70 bg-white/65 p-6 shadow-[0_14px_40px_rgba(2,20,39,0.08)]">
                    <h3 className="text-sm font-black text-[#021427] uppercase mb-4 flex items-center gap-2 tracking-[0.16em]">
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
                    <div className="rounded-2xl border border-white/70 bg-white/65 p-6 shadow-[0_14px_40px_rgba(2,20,39,0.08)]">
                      <h3 className="text-sm font-black text-[#021427] uppercase mb-4 flex items-center gap-2 tracking-[0.16em]">
                        <span>🎁</span> Selected Services
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {services
                          .filter((s) => selectedServices.includes(s.id))
                          .map((service) => (
                            <span
                              key={service.id}
                              className="inline-block rounded-full bg-[#021427]/10 px-4 py-2 font-black text-[#021427]"
                            >
                              {service.name} +${service.price}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}

                  <div className="rounded-2xl border border-white/70 bg-white/65 p-6 shadow-[0_14px_40px_rgba(2,20,39,0.08)]">
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-[#021427]">
                      <Calendar className="h-4 w-4 text-[#F59E0B]" />
                      Travel Preferences
                    </h3>
                    <div className="grid gap-3 text-sm font-semibold text-[#1a3a52] md:grid-cols-2">
                      <p>Date: <strong>{formData.travelDate || "Not selected"}</strong></p>
                      <p>Style: <strong>{formData.tripType}</strong></p>
                    </div>
                    {formData.specialRequests && (
                      <p className="mt-4 rounded-xl bg-[#021427]/5 p-4 text-sm font-semibold leading-6 text-[#1a3a52]">
                        {formData.specialRequests}
                      </p>
                    )}
                  </div>

                  <div className="overflow-hidden rounded-3xl border border-white/70 bg-white/70 shadow-[0_18px_55px_rgba(2,20,39,0.10)]">
                    <div className="border-b border-[#021427]/10 bg-gradient-to-r from-[#021427] via-[#0a5d7a] to-[#0f2d44] p-6 text-white">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#F59E0B]">Checkout</p>
                          <h3 className="mt-2 text-3xl font-black" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                            Choose Payment Method
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold">
                          <ShieldCheck className="h-4 w-4 text-[#F59E0B]" />
                          Secure checkout
                        </div>
                      </div>
                    </div>

                    <div className="p-5 md:p-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        {paymentMethods.map((method) => {
                          const Icon = method.icon;
                          const isSelected = formData.paymentMethod === method.name;

                          return (
                            <button
                              key={method.name}
                              type="button"
                              onClick={() => setFormData({ ...formData, paymentMethod: method.name })}
                              className={`group rounded-2xl border-2 p-5 text-left transition-all duration-300 ${
                                isSelected
                                  ? "border-[#F59E0B] bg-[#fff8ed] shadow-[0_16px_36px_rgba(245,158,11,0.16)]"
                                  : "border-[#021427]/10 bg-white/75 hover:border-[#F59E0B]/60 hover:bg-white"
                              }`}
                            >
                              <div className="flex items-start gap-4">
                                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg ${
                                  isSelected ? "bg-[#F59E0B]" : "bg-[#021427] group-hover:bg-[#0a5d7a]"
                                }`}>
                                  <Icon className="h-6 w-6" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <h4 className="text-lg font-black text-[#021427]">{method.name}</h4>
                                    <span className="rounded-full bg-[#021427]/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-[#0a5d7a]">
                                      {method.badge}
                                    </span>
                                  </div>
                                  <p className="mt-2 text-sm font-semibold leading-6 text-[#1a3a52]">{method.description}</p>
                                </div>
                                {isSelected && (
                                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F59E0B] text-white">
                                    <Check className="h-4 w-4" />
                                  </div>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-5 rounded-2xl border border-[#021427]/10 bg-gradient-to-br from-[#f8fbfc] to-white p-5">
                        <div className="flex items-start gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#021427] text-white">
                            <SelectedPaymentIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#F59E0B]">Selected Method</p>
                            <h4 className="mt-1 text-2xl font-black text-[#021427]">{selectedPaymentMethod.name}</h4>
                            <ul className="mt-3 grid gap-2 text-sm font-semibold leading-6 text-[#1a3a52] md:grid-cols-2">
                              {selectedPaymentMethod.details.map((detail) => (
                                <li key={detail} className="flex gap-2">
                                  <Check className="mt-1 h-4 w-4 shrink-0 text-[#F59E0B]" />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {formData.paymentMethod === "Credit Card" && (
                          <div className="mt-5 grid gap-4 rounded-2xl border border-[#F59E0B]/20 bg-[#fff8ed] p-4 md:grid-cols-4">
                            <input
                              type="text"
                              placeholder="Cardholder name"
                              className="rounded-xl border border-[#021427]/10 bg-white px-4 py-3 text-sm font-bold text-[#021427] outline-none focus:border-[#F59E0B] md:col-span-2"
                            />
                            <input
                              type="text"
                              placeholder="Card number"
                              inputMode="numeric"
                              className="rounded-xl border border-[#021427]/10 bg-white px-4 py-3 text-sm font-bold text-[#021427] outline-none focus:border-[#F59E0B] md:col-span-2"
                            />
                            <input
                              type="text"
                              placeholder="MM / YY"
                              className="rounded-xl border border-[#021427]/10 bg-white px-4 py-3 text-sm font-bold text-[#021427] outline-none focus:border-[#F59E0B]"
                            />
                            <input
                              type="text"
                              placeholder="CVV"
                              inputMode="numeric"
                              className="rounded-xl border border-[#021427]/10 bg-white px-4 py-3 text-sm font-bold text-[#021427] outline-none focus:border-[#F59E0B]"
                            />
                            <p className="text-sm font-semibold leading-6 text-[#1a3a52] md:col-span-2">
                              Final card processing will be completed securely by our team.
                            </p>
                          </div>
                        )}

                        {formData.paymentMethod === "Bank Transfer" && (
                          <div className="mt-5 grid gap-3 rounded-2xl border border-[#021427]/10 bg-white p-4 text-sm font-bold text-[#1a3a52] md:grid-cols-3">
                            <p>Bank: <span className="text-[#021427]">To be confirmed</span></p>
                            <p>Reference: <span className="text-[#021427]">Booking name</span></p>
                            <p>Status: <span className="text-[#F59E0B]">Pending verification</span></p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#021427] to-[#0a5d7a] p-6 rounded-3xl text-white shadow-[0_22px_55px_rgba(2,20,39,0.22)]">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg">Subtotal:</span>
                      <span className="text-2xl font-black">${selectedTourDetails?.price || 0}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/30">
                      <span className="text-lg">Services ({selectedServices.length}):</span>
                      <span className="text-2xl font-black">+ ${servicesTotal}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-black">TOTAL:</span>
                      <span className="text-3xl font-black text-[#F59E0B]">
                        ${bookingTotal}
                      </span>
                    </div>
                  </div>
                </div>

                {bookingError && (
                  <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                    {bookingError}
                  </div>
                )}

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => {
                      setBookingSuccess(false);
                      setCurrentStep(3);
                    }}
                    className="flex-1 rounded-xl text-[#0a5d7a] px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#0a5d7a] bg-white/60 backdrop-blur-sm uppercase tracking-wide"
                  >
                    Back
                  </button>
                  <button
                    onClick={completeBooking}
                    disabled={bookingSuccess || bookingSubmitting}
                    className="flex-1 wavy-btn rounded-xl text-white px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 border-b-4 border-[#F59E0B] bg-gradient-to-r from-[#021427] via-[#0a5d7a] to-[#1a3a52] uppercase tracking-wide flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-75"
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    <span>{bookingSuccess ? "Booking Completed" : bookingSubmitting ? "Saving..." : "Complete Booking"}</span>
                  </button>
                </div>
                </div>
              </Card>

              <p className="text-center text-[#0a5d7a] text-sm">
                🔒 Your booking is secure and encrypted
              </p>
            </div>
          </motion.section>
        )}

      </div>
    </>
  );
}
