import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import flightBooking from "@/assets/Flight Bookingjpg.jpg";
import hotelReservations from "@/assets/Hotel Reservations.jpg";
import tourPackages from "@/assets/Tour Packages.jpg";
import visaAssistance from "@/assets/Visa Assistance.jpg";
import travelPlanning from "@/assets/Travel Planning.jpg";
import groupTravel from "@/assets/Group Travel.jpg";
import deco4 from "@/assets/h1-deco4.svg";
import istanbulVid from "@/assets/Istanbul Package.mp4";
import aqabaVid from "@/assets/Aqaba Beach Trip.mp4";
import sharmVid from "@/assets/Sharm El Sheikh Luxury Package.mp4";

const services = [
  { title: "Flight Booking", image: flightBooking },
  { title: "Hotel Reservations", image: hotelReservations },
  { title: "Tour Packages", image: tourPackages },
  { title: "Visa Assistance", image: visaAssistance },
  { title: "Travel Planning", image: travelPlanning },
  { title: "Group Travel", image: groupTravel },
];

export default function ServicesShowcase() {
  const [page, setPage] = useState(0);
  const [testimonialPage, setTestimonialPage] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({ comment: "", name: "", city: "", phone: "" });
  const [testimonials, setTestimonials] = useState([
    {
      quote: "Rainbow Travel made our trip to Turkey unforgettable! Everything was perfectly organized, from flights to hotel bookings. Highly recommended!",
      name: "Ahmed Hassan",
      location: "Nablus",
      initial: "A",
      color: "from-orange-400 to-orange-600",
    },
    {
      quote: "Best travel agency in Palestine! The staff is professional and helpful. Our Dubai vacation was amazing thanks to their excellent service.",
      name: "Sara Mahmoud",
      location: "Ramallah",
      initial: "S",
      color: "from-blue-600 to-indigo-600",
    },
    {
      quote: "Competitive prices and excellent deals! Rainbow Travel helped us find the perfect package within our budget. Will definitely book again!",
      name: "Mohammed Ali",
      location: "Jenin",
      initial: "M",
      color: "from-emerald-500 to-teal-500",
    },
    {
      quote: "Amazing work, Lina from Nablus! Everything looks super clean and creative 👏✨",
      name: "Lina",
      location: "Nablus",
      initial: "L",
      color: "from-pink-400 to-rose-500",
    },
    {
      quote: "Great job, Sarah from Ramallah! The design is beautiful and very organized 🤍",
      name: "Sarah",
      location: "Ramallah",
      initial: "S",
      color: "from-cyan-400 to-blue-500",
    },
    {
      quote: "Really impressive, Maya from Jenin! You can clearly see the effort and attention to detail 🌟",
      name: "Maya",
      location: "Jenin",
      initial: "M",
      color: "from-yellow-400 to-amber-500",
    },
  ]);

  const pages = useMemo(() => {
    return [services.slice(0, 3), services.slice(3, 6)];
  }, []);
  const testimonialPages = useMemo(() => {
    const pages = [];
    for (let i = 0; i < testimonials.length; i += 3) {
      pages.push(testimonials.slice(i, i + 3));
    }
    return pages;
  }, [testimonials]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (formData.comment.trim() && formData.name.trim() && formData.city.trim()) {
      const newTestimonial = {
        quote: formData.comment,
        name: formData.name,
        location: formData.city,
        initial: formData.name.charAt(0).toUpperCase(),
        color: "from-violet-400 to-purple-500",
      };
      setTestimonials([...testimonials, newTestimonial]);
      setShowSuccess(true);
      setFormData({ comment: "", name: "", city: "", phone: "" });
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setPage((prev) => (prev + 1) % pages.length);
    }, 4200);

    return () => clearInterval(timer);
  }, [pages.length]);

  return (
    <section className="relative overflow-hidden px-6 py-20 lg:px-14">
      <div className="absolute inset-0 bg-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.08)_45%,rgba(255,255,255,0.12)_100%)] backdrop-blur-xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-orange-500/8" />

      <div className="relative mx-auto grid max-w-[88rem] items-center gap-12 lg:grid-cols-[0.74fr_1.26fr]">
        <div>
          <motion.p
            className="mb-3 text-[15px] italic tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-orange-500 to-blue-600"
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
            animate={{ y: [0, -3, 0], x: [0, 4, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            Explore Your Way
          </motion.p>

          <motion.h3
            className="text-5xl font-black leading-[1.05] bg-clip-text text-transparent bg-gradient-to-br from-blue-500 via-orange-500 to-orange-700"
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
            animate={{ y: [0, -4, 0], x: [0, 2, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          >
            Explore
            <br />
            Our Services
          </motion.h3>

          <img src={deco4} alt="decorative compass" className="mt-4 w-10 opacity-80" />

          <motion.div
            className="mt-7 h-1 w-28 rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-transparent"
            animate={{ opacity: [0.55, 1, 0.55], x: [0, 10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <button className="mt-8 inline-flex items-center gap-3 rounded-full bg-orange-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:bg-orange-600">
            View
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="relative overflow-hidden p-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
            >
              {pages[page].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="group relative h-[430px] overflow-hidden rounded-t-[10rem] rounded-b-lg bg-white/50 shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />

                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between px-2 py-2">
                    <p
                      className="text-[34px] leading-none text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.65)]"
                      style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                    >
                      {item.title}
                    </p>
                    <ArrowRight className="h-4 w-4 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 flex items-center justify-center gap-2">
            {pages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx)}
                className={`h-2.5 rounded-full transition-all ${page === idx ? "w-8 bg-orange-500" : "w-2.5 bg-slate-300"}`}
                aria-label={`Show slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Special Offers: three video cards */}
      <div className="relative mx-auto mt-16 max-w-[88rem]">
        <div className="mb-6 text-center">
          <p className="inline-block rounded-full px-5 py-2 text-sm md:text-base lg:text-lg font-extrabold tracking-wider uppercase" style={{ background: "rgba(2,12,40,0.08)", color: "var(--sidebar-primary)", letterSpacing: "0.9px", boxShadow: "0 8px 20px rgba(2,12,40,0.06)" }}>
            Special Offers
          </p>

          <h4 className="mt-4 text-4xl md:text-5xl font-extrabold" style={{ fontFamily: "'Playfair Display', 'Georgia', serif", color: "var(--sidebar-primary)", textShadow: "0 6px 18px rgba(2,12,40,0.25)" }}>
            Don't miss out on our amazing travel deals
          </h4>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "Istanbul Package",
              price: "$750",
              country: "Turkey",
              length: "5 Days / 4 Nights",
              video: istanbulVid,
            },
            {
              title: "Aqaba Beach Trip",
              price: "$400",
              country: "Jordan",
              length: "4 Days / 3 Nights",
              video: aqabaVid,
            },
            {
              title: "Sharm El Sheikh Luxury",
              price: "$900",
              country: "Egypt",
              length: "5 Days / 4 Nights",
              video: sharmVid,
            },
          ].map((offer) => (
            <article
              key={offer.title}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/30 to-slate-50 shadow-lg"
            >
              <div className="relative h-80 w-full overflow-hidden rounded-t-2xl bg-black">
                <video
                  src={offer.video}
                  className="h-full w-full object-cover object-center"
                  autoPlay
                  muted
                  loop
                  playsInline
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(2,12,40,0.78)] to-transparent" />

                <div className="absolute left-4 bottom-4 right-4">
                  <h5 className="text-3xl font-extrabold text-white drop-shadow-lg" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                    {offer.title}
                  </h5>
                </div>
              </div>

              <div className="px-5 py-4 bg-white/60 backdrop-blur-sm">
                <div className="mt-1 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--sidebar-primary)" }}>{offer.country}</p>
                    <p className="mt-1 text-sm" style={{ color: "rgba(2,12,40,0.75)" }}>{offer.length}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-lg font-extrabold" style={{ color: "var(--sidebar-primary)", letterSpacing: "0.4px" }}>
                        {offer.price}
                      </p>
                    </div>

                    <button className="rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-600">
                      View Offer
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 text-center">
          <button
            className="rounded-full px-8 py-3 text-lg md:text-xl font-extrabold"
            style={{
              background: "var(--sidebar-primary)",
              color: "white",
              boxShadow: "0 18px 40px rgba(2,12,40,0.22)",
              minWidth: 220,
            }}
          >
            View All Offers
          </button>
        </div>

        {/* Testimonials / Customer Reviews */}
        <section className="mx-auto mt-20 max-w-[88rem] rounded-3xl p-8" style={{ background: "rgba(255, 140, 0, 0.08)" }}>
          {/* Leave a comment form - at top */}
          <div className="mx-auto mb-12 max-w-3xl rounded-2xl p-8" style={{ background: "rgba(255, 140, 0, 0.12)" }}>
            <h4 className="text-2xl font-extrabold mb-3 text-slate-800" style={{ fontFamily: "'Playfair Display', 'Georgia', serif", color: "var(--sidebar-primary)" }}>Leave a comment</h4>

            <form className="space-y-4" onSubmit={handleCommentSubmit}>
              <textarea 
                placeholder="Your comments" 
                value={formData.comment}
                onChange={(e) => setFormData({...formData, comment: e.target.value})}
                className="w-full rounded-xl border border-orange-200 bg-white/50 p-4 text-sm text-slate-900 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-400" 
                rows={5} 
              />

              <div className="grid gap-4 md:grid-cols-3">
                <input 
                  placeholder="Your name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="rounded-full border border-orange-200 bg-white/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-400" 
                />
                <input 
                  placeholder="City" 
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="rounded-full border border-orange-200 bg-white/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-400" 
                />
                <input 
                  placeholder="Phone" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="rounded-full border border-orange-200 bg-white/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-400" 
                />
              </div>

              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-lg bg-green-100 p-3 text-center text-sm font-semibold text-green-700"
                >
                  Comment added successfully!
                </motion.div>
              )}

              <div className="mt-3">
                <button type="submit" className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-orange-600 transition">Submit</button>
              </div>
            </form>
          </div>

          {/* Testimonials below with slider */}
          <div className="mb-8 text-center">
            <h3 className="text-3xl font-extrabold text-slate-800" style={{ fontFamily: "'Playfair Display', 'Georgia', serif", color: "var(--sidebar-primary)" }}>
              What Our Customers Say
            </h3>
            <p className="mt-2 text-sm text-slate-700">Real experiences from happy travelers</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={testimonialPage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="grid gap-6 md:grid-cols-3">
                {testimonialPages[testimonialPage]?.map((testimonial) => (
                  <blockquote key={testimonial.name} className="rounded-2xl p-6" style={{ background: "rgba(255, 140, 0, 0.12)" }}>
                    <p className="text-base text-slate-800 italic mb-4">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br ${testimonial.color} text-white font-bold`}>
                        {testimonial.initial}
                      </div>
                      <div className="text-sm">
                        <div className="font-semibold text-slate-900">{testimonial.name}</div>
                        <div className="text-xs text-slate-700">{testimonial.location}</div>
                      </div>
                    </div>
                  </blockquote>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonialPages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setTestimonialPage(idx)}
                className={`h-2.5 rounded-full transition-all ${testimonialPage === idx ? "w-8 bg-orange-500" : "w-2.5 bg-orange-300"}`}
                aria-label={`Show testimonials ${idx + 1}`}
              />
            ))}
          </div>
        </section>

      </div>
    </section>
  );
}
