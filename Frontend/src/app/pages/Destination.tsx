import { motion } from "framer-motion";
import { MapPin, Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import heroBg from "../../assets/h1-bg01.jpg";
import dubai from "@/assets/dubi.jpg";
import egypt from "@/assets/eygpt.jpg";
import france from "@/assets/france.jpg";
import italy from "@/assets/itali.jpg";
import maldives from "@/assets/maldevi.jpg";
import saudiArabia from "@/assets/sudi arabia.jpg";
import turkey from "@/assets/turkya.jpg";
import amman from "@/assets/Amman.jpg";
import cairo from "@/assets/Cairo.jpg";
import hongKong from "@/assets/Hong Kong.jpg";
import jerusalem from "@/assets/Jerusalem.jpg";
import tokyo from "@/assets/Tokyo.jpg";
import istanbulVid from "@/assets/Istanbul Package.mp4";
import antalyaVid from "@/assets/intalia.mp4";
import trabzonVid from "@/assets/trabzon.mp4";
import cairoVid from "@/assets/Cairo & Pyramids Explorer.mp4";
import sharmVid from "@/assets/Sharm El Sheikh Luxury Package.mp4";
import aqabaVid from "@/assets/Aqaba Beach Trip.mp4";
import ammanVid from "@/assets/Amaan.mp4";
import jordanImg from "@/assets/jordan.jpg";

export function Destination() {
  const [searchQuery, setSearchQuery] = useState("");
  const [toursFilter, setToursFilter] = useState(0);
  const turkeyRowRef = useRef<HTMLDivElement | null>(null);
  const egyptRowRef = useRef<HTMLDivElement | null>(null);
  const jordanRowRef = useRef<HTMLDivElement | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const turkeyVideos = [
    { src: istanbulVid, name: "Istanbul", region: "Turkey" },
    { src: antalyaVid, name: "Antalya", region: "Turkey" },
    { src: trabzonVid, name: "Trabzon", region: "Turkey" },
  ];

  const egyptVideos = [
    { src: cairoVid, name: "Cairo", region: "Egypt" },
    { src: sharmVid, name: "Sharm El Sheikh", region: "Egypt" },
  ];

  const jordanVideos = [
    { src: aqabaVid, name: "Aqaba", region: "Jordan" },
    { src: ammanVid, name: "Amman", region: "Jordan" },
  ];

  const destinations = [
    { name: "France", image: france, tours: 4 },
    { name: "Dubai", image: dubai, tours: 3 },
    { name: "Egypt", image: egypt, tours: 5 },
    { name: "Saudi Arabia", image: saudiArabia, tours: 3 },
    { name: "Maldives", image: maldives, tours: 4 },
    { name: "Italy", image: italy, tours: 6 },
    { name: "Turkey", image: turkey, tours: 5 },
    { name: "Amman", image: amman, tours: 2 },
    { name: "Cairo", image: cairo, tours: 4 },
    { name: "Hong Kong", image: hongKong, tours: 3 },
    { name: "Jerusalem", image: jerusalem, tours: 5 },
    { name: "Tokyo", image: tokyo, tours: 4 },
  ];

  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch = destination.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTours = toursFilter === 0 || destination.tours === toursFilter;
    return matchesSearch && matchesTours;
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed text-[#021427]"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000816]/80 via-[#021427]/65 to-[#F59E0B]/12 z-0" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#F59E0B]" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
            Destinations
          </motion.p>

          <motion.h1
            className="text-5xl md:text-6xl font-black mb-4"
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif", letterSpacing: '-0.02em' }}
            initial={{ y: 6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <span className="bg-gradient-to-r from-white via-[#F59E0B] to-white bg-clip-text text-transparent">Destinations</span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-white/90"
            style={{ fontFamily: "'Lora', 'Georgia', serif" }}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            Discover unforgettable trips tailored just for you.
          </motion.p>
        </div>
      </section>

      {/* Popular Tourist Attractions Section - Stacked Large Cards */}
      <section className="relative py-12 lg:py-16 bg-transparent">
        {/* Glass base + orange-leaning gradient overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-white/6 backdrop-blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#021427]/10 via-[#F59E0B]/12 to-[#F59E0B]/8 mix-blend-overlay" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-[#F59E0B] to-white" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
              Popular Tourist Attractions
            </h2>
            <p className="mt-3 text-lg md:text-xl text-white/90 max-w-3xl mx-auto" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
              Discover beautiful beaches, landmarks, and cultural destinations
            </p>
          </div>

          <div className="space-y-10">
            {/* Turkey - large stacked card */}
            <article
              className="rounded-3xl overflow-hidden shadow-2xl text-white"
              style={{ background: 'linear-gradient(90deg, rgba(2,20,39,1) 0%, rgba(245,158,11,0.18) 35%, rgba(2,20,39,1) 100%)' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-6 relative min-h-[28rem]">
                  <img src={turkey} alt="Turkey" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute left-6 top-6 bg-[#00000066] px-5 py-3 rounded-xl">
                    <h3 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Turkey</h3>
                    <p className="text-sm text-[#ffffffcc]" style={{ fontFamily: "'Lora', serif" }}>Top destinations: Istanbul, Antalya, Trabzon</p>
                  </div>
                </div>

                <div className="lg:col-span-6 p-6 flex flex-col gap-4 justify-center min-h-[28rem]">
                  <div className="relative">
                    {/* glass layer under videos */}
                    <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-[#F59E0B]/12 via-[#F59E0B]/8 to-white/6 backdrop-blur-md -z-0" />
                    <div ref={turkeyRowRef} className="flex gap-6 items-end pb-2 relative z-10" style={{ overflow: 'hidden' }}>
                      {turkeyVideos.map((video, i) => {
                        const offsets = [44, 68, 44];
                        const translateY = offsets[i] ?? 44;
                        return (
                          <motion.div key={i} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.03 }} viewport={{ once: true }} className="w-96 flex-shrink-0 overflow-hidden transform transition-transform duration-300 rounded-t-[3.5rem]" style={{ transform: `translateY(${translateY}px)` }}>
                            <div className="relative">
                              <video src={video.src} controls className="w-full h-72 object-cover rounded-t-[3.5rem]" />
                              <div className="absolute left-4 top-4 rounded-full bg-[#021427]/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-md">
                                {video.name}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex gap-2 z-20">
                      <button
                        type="button"
                        onClick={() => turkeyRowRef.current?.scrollBy({ left: -320, behavior: 'smooth' })}
                        className="h-10 w-10 rounded-full bg-white/6 border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
                        aria-label="Prev videos"
                      >
                        <ChevronLeft className="h-4 w-4 text-white/90" />
                      </button>
                      <button
                        type="button"
                        onClick={() => turkeyRowRef.current?.scrollBy({ left: 320, behavior: 'smooth' })}
                        className="h-10 w-10 rounded-full bg-white/6 border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
                        aria-label="Next videos"
                      >
                        <ChevronRight className="h-4 w-4 text-white/90" />
                      </button>
                    </div>
                  </div>

                  <p className="mt-2 text-[#ffffffcc]" style={{ fontFamily: "'Lora', serif" }}>
                    Experience the cultural richness and stunning coastlines of Turkey. Swipe the videos to preview highlights from each region.
                  </p>

                </div>
              </div>
            </article>

            {/* Egypt - large stacked card */}
            <article
              className="rounded-3xl overflow-hidden shadow-2xl text-white"
              style={{ background: 'linear-gradient(90deg, rgba(2,20,39,1) 0%, rgba(245,158,11,0.18) 35%, rgba(2,20,39,1) 100%)' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-6 relative min-h-[28rem]">
                  <img src={egypt} alt="Egypt" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute left-6 top-6 bg-[#00000066] px-5 py-3 rounded-xl">
                    <h3 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Egypt</h3>
                    <p className="text-sm text-[#ffffffcc]" style={{ fontFamily: "'Lora', serif" }}>Top: Cairo, Sharm El Sheikh</p>
                  </div>
                </div>

                <div className="lg:col-span-6 p-6 flex flex-col gap-4 justify-center min-h-[28rem]">
                  <div className="relative">
                    {/* glass layer under videos */}
                    <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-[#F59E0B]/12 via-[#F59E0B]/8 to-white/6 backdrop-blur-md -z-0" />
                    <div ref={egyptRowRef} className="flex gap-6 items-end pb-2 relative z-10" style={{ overflow: 'hidden' }}>
                      {egyptVideos.map((video, i) => {
                        const offsets = [44, 36];
                        const translateY = offsets[i] ?? 36;
                        return (
                          <motion.div key={i} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.03 }} viewport={{ once: true }} className="w-96 flex-shrink-0 overflow-hidden transform transition-transform duration-300 rounded-t-[3.5rem]" style={{ transform: `translateY(${translateY}px)` }}>
                            <div className="relative">
                              <video src={video.src} controls className="w-full h-72 object-cover rounded-t-[3.5rem]" />
                              <div className="absolute left-4 top-4 rounded-full bg-[#021427]/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-md">
                                {video.name}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    <div className="flex gap-2 absolute right-0 top-1/2 transform -translate-y-1/2 z-20">
                      <button type="button" onClick={() => egyptRowRef.current?.scrollBy({ left: -320, behavior: 'smooth' })} className="h-10 w-10 rounded-full bg-white/6 border border-white/10 hover:bg-white/10 transition"><ChevronLeft className="h-4 w-4 text-white/90" /></button>
                      <button type="button" onClick={() => egyptRowRef.current?.scrollBy({ left: 320, behavior: 'smooth' })} className="h-10 w-10 rounded-full bg-white/6 border border-white/10 hover:bg-white/10 transition"><ChevronRight className="h-4 w-4 text-white/90" /></button>
                    </div>
                  </div>

                  <p className="mt-2 text-[#ffffffcc]" style={{ fontFamily: "'Lora', serif" }}>
                    From the pyramids of Cairo to the beaches of Sharm El Sheikh — Egypt offers history and sun in one trip.
                  </p>

                </div>
              </div>
            </article>

            {/* Jordan - large stacked card */}
            <article
              className="rounded-3xl overflow-hidden shadow-2xl text-white"
              style={{ background: 'linear-gradient(90deg, rgba(2,20,39,1) 0%, rgba(245,158,11,0.18) 35%, rgba(2,20,39,1) 100%)' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-6 relative min-h-[28rem]">
                  <img src={jordanImg} alt="Jordan" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute left-6 top-6 bg-[#00000066] px-5 py-3 rounded-xl">
                    <h3 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Jordan</h3>
                    <p className="text-sm text-[#ffffffcc]" style={{ fontFamily: "'Lora', serif" }}>Top: Aqaba, Amman</p>
                  </div>
                </div>

                <div className="lg:col-span-6 p-6 flex flex-col gap-4 justify-center min-h-[28rem]">
                  <div className="relative">
                    <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-[#F59E0B]/12 via-[#F59E0B]/8 to-white/6 backdrop-blur-md -z-0" />
                    <div ref={jordanRowRef} className="flex gap-6 items-end pb-2 relative z-10" style={{ overflow: 'hidden' }}>
                      {jordanVideos.map((video, i) => {
                        const offsets = [28, 18];
                        const translateY = offsets[i] ?? 18;
                        return (
                          <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.02 }} viewport={{ once: true }} className="w-96 flex-shrink-0 overflow-hidden transform transition-transform duration-300 rounded-t-[3.5rem]" style={{ transform: `translateY(${translateY}px)` }}>
                            <div className="relative">
                              <video src={video.src} controls className="w-full h-72 object-cover rounded-t-[3.5rem]" />
                              <div className="absolute left-4 top-4 rounded-full bg-[#021427]/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-md">
                                {video.name}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    <div className="flex gap-2 absolute right-0 top-1/2 transform -translate-y-1/2 z-20">
                      <button type="button" onClick={() => jordanRowRef.current?.scrollBy({ left: -320, behavior: 'smooth' })} className="h-10 w-10 rounded-full bg-white/6 border border-white/10 hover:bg-white/10 transition"><ChevronLeft className="h-4 w-4 text-white/90" /></button>
                      <button type="button" onClick={() => jordanRowRef.current?.scrollBy({ left: 320, behavior: 'smooth' })} className="h-10 w-10 rounded-full bg-white/6 border border-white/10 hover:bg-white/10 transition"><ChevronRight className="h-4 w-4 text-white/90" /></button>
                    </div>
                  </div>

                  <p className="mt-2 text-[#ffffffcc]" style={{ fontFamily: "'Lora', serif" }}>
                    Dive into Jordan's Red Sea coast and ancient sites — quick previews above.
                  </p>

                </div>
              </div>
            </article>
          </div>

        </div>
      </section>

        <div className="relative z-20 -mt-1 overflow-hidden border-y border-[#021427]/10 bg-gradient-to-r from-[#021427]/92 via-[#F59E0B]/20 to-[#021427]/92 px-4 py-3 backdrop-blur-md shadow-[0_10px_30px_rgba(2,20,39,0.08)]">
          <motion.div
            className="flex items-center gap-8 whitespace-nowrap"
            animate={{ x: [0, -420] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[
              "DISCOVER",
              "EXPLORE",
              "PLAN YOUR TRIP",
              "CURATED DESTINATIONS",
              "DISCOVER",
              "EXPLORE",
              "PLAN YOUR TRIP",
              "CURATED DESTINATIONS",
            ].map((item, index) => (
              <div key={`${item}-${index}`} className="flex items-center gap-2.5 flex-shrink-0">
                <span className="h-px w-8 bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent" />
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.42em] text-white/85"
                  style={{ fontFamily: "'Lora', 'Georgia', serif" }}
                >
                  {item}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#F59E0B] to-white shadow-[0_0_14px_rgba(245,158,11,0.55)]" />
              </div>
            ))}
          </motion.div>
        </div>

      <section className="relative pt-12 md:pt-16 pb-20 md:pb-28 overflow-hidden">
        {/* Background Layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/75 to-white/80" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#F59E0B]/8 via-transparent to-[#F59E0B]/5" />
        
        {/* Glass Effect with Animated Gradient */}
        <motion.div
          className="absolute inset-0 backdrop-blur-3xl"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(245,158,11,0.12) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(245,158,11,0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(245,158,11,0.12) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Floating Orbs */}
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-[#F59E0B]/15 to-orange-200/10 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-tl from-[#F59E0B]/10 to-orange-100/5 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, -50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="w-full lg:max-w-sm">
              <div className="flex items-center gap-3 rounded-full border border-[#021427]/15 bg-white/85 px-5 py-3 backdrop-blur-md shadow-[0_8px_20px_rgba(2,20,39,0.06)]">
                <Search className="h-4 w-4 text-[#021427]/70" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm text-[#021427] placeholder:text-[#021427]/50 focus:outline-none"
                  aria-label="Search destinations"
                />
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 lg:max-w-3xl lg:items-end">
              <div className="relative w-full lg:w-auto">
                <button
                  type="button"
                  onClick={() => setIsFilterOpen((current) => !current)}
                  className="inline-flex items-center gap-2 rounded-full border border-[#021427]/15 bg-white/85 px-4 py-2 text-sm text-[#021427] backdrop-blur-md shadow-[0_8px_20px_rgba(2,20,39,0.06)] transition-all duration-300 hover:bg-white"
                  style={{ fontFamily: "'Lora', 'Georgia', serif" }}
                  aria-expanded={isFilterOpen}
                  aria-controls="tour-filter-menu"
                >
                  <SlidersHorizontal className="h-4 w-4 text-[#F59E0B]" />
                  Filter
                </button>

                {isFilterOpen && (
                  <div
                    id="tour-filter-menu"
                    className="absolute right-0 top-full z-20 mt-3 w-56 rounded-[1.5rem] border border-white/50 bg-white/95 p-4 shadow-[0_20px_50px_rgba(2,20,39,0.14)] backdrop-blur-xl"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-medium text-[#021427]" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                        Tours 0 - 10
                      </p>
                      {(searchQuery || toursFilter !== 0) && (
                        <button
                          type="button"
                          onClick={() => {
                            setSearchQuery("");
                            setToursFilter(0);
                          }}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#021427]/15 text-[#021427] transition-colors duration-300 hover:bg-[#021427]/5"
                          aria-label="Clear filters"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {Array.from({ length: 11 }, (_, index) => index).map((num) => (
                        <label
                          key={num}
                          className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-all duration-300 ${
                            toursFilter === num
                              ? "border-[#F59E0B] bg-[#F59E0B]/10 text-[#F59E0B]"
                              : "border-[#021427]/10 bg-[#021427]/[0.02] text-[#021427] hover:bg-[#021427]/5"
                          }`}
                          style={{ fontFamily: "'Lora', 'Georgia', serif" }}
                        >
                          <input
                            type="checkbox"
                            checked={toursFilter === num}
                            onChange={() => setToursFilter(toursFilter === num ? 0 : num)}
                            className="h-4 w-4 rounded border-[#021427]/25 text-[#F59E0B] focus:ring-[#F59E0B]"
                            aria-label={`Filter by ${num} tours`}
                          />
                          {num}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map((destination, index) => (
              <motion.article
                key={destination.name}
                className="group relative overflow-hidden rounded-t-[9rem] rounded-b-[1.5rem] shadow-[0_20px_50px_rgba(2,20,39,0.16)] transition-all duration-500 hover:shadow-[0_30px_70px_rgba(245,158,11,0.2)]"
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
                whileHover={{ y: -12, scale: 1.02 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="relative overflow-hidden rounded-t-[9rem] rounded-b-[1.5rem]">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="h-[26rem] w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Multi-layer Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#021427]/80 via-[#021427]/30 to-[#F59E0B]/5" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#F59E0B]/0 via-transparent to-[#F59E0B]/12"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />

                  <motion.div
                    className="absolute left-5 right-5 bottom-5 rounded-[1.3rem] border border-white/40 bg-white/12 px-5 py-4 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    whileHover={{ scale: 1.02 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3
                          className="text-[1.9rem] leading-none text-white"
                          style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                        >
                          {destination.name}
                        </h3>

                        <div className="mt-2 flex items-center gap-2 text-white/85">
                          <MapPin className="h-4 w-4" />
                          <p
                            className="text-sm"
                            style={{ fontFamily: "'Lora', 'Georgia', serif" }}
                          >
                            {destination.tours} {destination.tours === 1 ? "Tour" : "Tours"}
                          </p>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                </div>
              </motion.article>
              ))
            ) : (
              <div className="col-span-full flex items-center justify-center py-20">
                <p className="text-lg text-[#021427]/70" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                  No destinations found
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}

export default Destination;
