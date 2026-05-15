import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

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
import { useLanguage } from "../contexts/LanguageContext";
import { createComment, getAllComments, type CustomerComment } from "../services/apiService";

const services = [
  { title: "Flight Booking", titleKey: "flightBooking", image: flightBooking },
  { title: "Hotel Reservations", titleKey: "hotelReservations", image: hotelReservations },
  { title: "Tour Packages", titleKey: "tourPackages", image: tourPackages },
  { title: "Visa Assistance", titleKey: "visaAssistance", image: visaAssistance },
  { title: "Travel Planning", titleKey: "travelPlanning", image: travelPlanning },
  { title: "Group Travel", titleKey: "groupTravel", image: groupTravel },
];

type Testimonial = {
  quote: string;
  quoteKey?: string;
  name: string;
  location: string;
  locationKey?: string;
  initial: string;
  color: string;
};

const mapCommentToTestimonial = (comment: CustomerComment): Testimonial => ({
  quote: comment.comment,
  name: comment.name,
  location: comment.city,
  initial: comment.name.charAt(0).toUpperCase(),
  color: comment.color || "from-violet-400 to-purple-500",
});

export default function ServicesShowcase() {
  const { t } = useLanguage();
  const [page, setPage] = useState(0);
  const [testimonialPage, setTestimonialPage] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({ comment: "", name: "", city: "", phone: "" });
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      quote: "testimonialTurkey",
      quoteKey: "testimonialTurkey",
      name: "Ahmed Hassan",
      location: "Nablus",
      locationKey: "Nablus",
      initial: "A",
      color: "from-orange-400 to-orange-600",
    },
    {
      quote: "testimonialDubai",
      quoteKey: "testimonialDubai",
      name: "Sara Mahmoud",
      location: "Ramallah",
      locationKey: "Ramallah",
      initial: "S",
      color: "from-blue-600 to-indigo-600",
    },
    {
      quote: "testimonialDeals",
      quoteKey: "testimonialDeals",
      name: "Mohammed Ali",
      location: "Jenin",
      locationKey: "Jenin",
      initial: "M",
      color: "from-emerald-500 to-teal-500",
    },
    {
      quote: "Amazing work, Lina from Nablus! Everything looks super clean and creative 👏✨",
      name: "Lina",
      quoteKey: "testimonialLina",
      location: "Nablus",
      locationKey: "Nablus",
      initial: "L",
      color: "from-pink-400 to-rose-500",
    },
    {
      quote: "Great job, Sarah from Ramallah! The design is beautiful and very organized 🤍",
      name: "Sarah",
      quoteKey: "testimonialSarah",
      location: "Ramallah",
      locationKey: "Ramallah",
      initial: "S",
      color: "from-cyan-400 to-blue-500",
    },
    {
      quote: "Really impressive, Maya from Jenin! You can clearly see the effort and attention to detail 🌟",
      name: "Maya",
      quoteKey: "testimonialMaya",
      location: "Jenin",
      locationKey: "Jenin",
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

  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.comment.trim() && formData.name.trim() && formData.city.trim()) {
      try {
        const savedComment = await createComment({
          comment: formData.comment,
          name: formData.name,
          city: formData.city,
          phone: formData.phone,
        });
        setTestimonials((current) => [mapCommentToTestimonial(savedComment), ...current]);
        setShowSuccess(true);
        setFormData({ comment: "", name: "", city: "", phone: "" });
        setTimeout(() => setShowSuccess(false), 3000);
      } catch (error) {
        console.error("Failed to save comment", error);
      }
    }
  };

  useEffect(() => {
    getAllComments()
      .then((comments) => {
        if (comments.length) {
          setTestimonials(comments.map(mapCommentToTestimonial));
        }
      })
      .catch((error) => {
        console.error("Failed to load comments", error);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setPage((prev) => (prev + 1) % pages.length);
    }, 4200);

    return () => clearInterval(timer);
  }, [pages.length]);

  return (
    <section className="relative overflow-hidden px-6 py-20 lg:px-14" dir="ltr">
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
            {t("exploreYourWay")}
          </motion.p>

          <motion.h3
            className="text-5xl font-black leading-[1.05] bg-clip-text text-transparent bg-gradient-to-br from-blue-500 via-orange-500 to-orange-700"
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
            animate={{ y: [0, -4, 0], x: [0, 2, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          >
            {t("exploreDestinations")}
            <br />
            {t("ourServices")}
          </motion.h3>

          <img src={deco4} alt="decorative compass" className="mt-4 w-10 opacity-80" />

          <motion.div
            className="mt-7 h-1 w-28 rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-transparent"
            animate={{ opacity: [0.55, 1, 0.55], x: [0, 10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <Link to="/our-services" className="mt-8 inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#9a4b08] via-[#c46312] to-[#F59E0B] px-8 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(154,75,8,0.28)] transition hover:scale-[1.03] hover:shadow-[0_18px_42px_rgba(2,20,39,0.32)]">
            {t("view")}
            <ArrowRight className="h-4 w-4" />
          </Link>
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
                      {t(item.titleKey)}
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
            {t("specialOffers")}
          </p>

          <h4 className="mt-4 text-4xl md:text-5xl font-extrabold" style={{ fontFamily: "'Playfair Display', 'Georgia', serif", color: "var(--sidebar-primary)", textShadow: "0 6px 18px rgba(2,12,40,0.25)" }}>
            {t("dontMissDeals")}
          </h4>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "Istanbul Package",
              titleKey: "istanbulPackage",
              price: "$750",
              country: "Turkey",
              countryKey: "Turkey",
              length: "5 Days / 4 Nights",
              lengthKey: "fiveDaysFourNights",
              video: istanbulVid,
            },
            {
              title: "Aqaba Beach Trip",
              titleKey: "aqabaBeachTrip",
              price: "$400",
              country: "Jordan",
              countryKey: "Jordan",
              length: "4 Days / 3 Nights",
              lengthKey: "fourDaysThreeNights",
              video: aqabaVid,
            },
            {
              title: "Sharm El Sheikh Luxury",
              titleKey: "sharmElSheikhLuxury",
              price: "$900",
              country: "Egypt",
              countryKey: "Egypt",
              length: "5 Days / 4 Nights",
              lengthKey: "fiveDaysFourNights",
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
                    {t(offer.titleKey)}
                  </h5>
                </div>
              </div>

              <div className="px-5 py-4 bg-white/60 backdrop-blur-sm">
                <div className="mt-1 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--sidebar-primary)" }}>{t(offer.countryKey)}</p>
                    <p className="mt-1 text-sm" style={{ color: "rgba(2,12,40,0.75)" }}>{t(offer.lengthKey)}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-lg font-extrabold" style={{ color: "var(--sidebar-primary)", letterSpacing: "0.4px" }}>
                        {offer.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 text-center">
          <Link to="/offers" className="inline-flex min-w-[220px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#9a4b08] via-[#c46312] to-[#F59E0B] px-8 py-3 text-lg font-extrabold text-white shadow-[0_14px_34px_rgba(154,75,8,0.28)] transition hover:scale-[1.03] hover:shadow-[0_18px_42px_rgba(2,20,39,0.32)] md:text-xl">
            {t("viewAllOffers")}
          </Link>
        </div>

        {/* Testimonials / Customer Reviews */}
        <section className="mx-auto mt-20 max-w-[88rem] rounded-3xl p-8" style={{ background: "rgba(255, 140, 0, 0.08)" }}>
          {/* Leave a comment form - at top */}
          <div className="mx-auto mb-12 max-w-3xl rounded-2xl p-8" style={{ background: "rgba(255, 140, 0, 0.12)" }}>
            <h4 className="text-2xl font-extrabold mb-3 text-slate-800" style={{ fontFamily: "'Playfair Display', 'Georgia', serif", color: "var(--sidebar-primary)" }}>{t("leaveComment")}</h4>

            <form className="space-y-4" onSubmit={handleCommentSubmit}>
              <textarea 
                placeholder={t("yourComments")}
                value={formData.comment}
                onChange={(e) => setFormData({...formData, comment: e.target.value})}
                className="w-full rounded-xl border border-orange-200 bg-white/50 p-4 text-sm text-slate-900 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-400" 
                rows={5} 
              />

              <div className="grid gap-4 md:grid-cols-3">
                <input 
                  placeholder={t("yourName")}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="rounded-full border border-orange-200 bg-white/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-400" 
                />
                <input 
                  placeholder={t("city")}
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="rounded-full border border-orange-200 bg-white/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-400" 
                />
                <input 
                  placeholder={t("phone")}
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
                  {t("commentAdded")}
                </motion.div>
              )}

              <div className="mt-3">
                <button type="submit" className="inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#9a4b08] via-[#c46312] to-[#F59E0B] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(154,75,8,0.28)] transition hover:scale-[1.03] hover:shadow-[0_18px_42px_rgba(2,20,39,0.32)]">{t("submit")}</button>
              </div>
            </form>
          </div>

          {/* Testimonials below with slider */}
          <div className="mb-8 text-center">
            <h3 className="text-3xl font-extrabold text-slate-800" style={{ fontFamily: "'Playfair Display', 'Georgia', serif", color: "var(--sidebar-primary)" }}>
              {t("What Our Customers Say")}
            </h3>
            <p className="mt-2 text-sm text-slate-700">{t("Real experiences from happy travelers")}</p>
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
                    <p className="text-base text-slate-800 italic mb-4">"{testimonial.quoteKey ? t(testimonial.quoteKey) : testimonial.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br ${testimonial.color} text-white font-bold`}>
                        {testimonial.initial}
                      </div>
                      <div className="text-sm">
                        <div className="font-semibold text-slate-900">{testimonial.name}</div>
                        <div className="text-xs text-slate-700">{testimonial.locationKey ? t(testimonial.locationKey) : testimonial.location}</div>
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
