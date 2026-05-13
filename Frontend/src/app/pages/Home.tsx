import bg from "@/assets/h1-bg01.jpg";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import CompanyOverview from "../components/CompanyOverview";
import DestinationCarousel from "../components/DestinationCarousel";
import StatsCarousel from "../components/StatsCarousel";
import ServicesShowcase from "../components/ServicesShowcase";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MapPin, BadgeCheck } from "lucide-react";

import banner7 from "@/assets/h1-banner7.png";
import deco4 from "@/assets/h1-deco4.svg";
import deco5 from "@/assets/h1-deco5.svg";
import deco6 from "@/assets/h1-deco6.svg";

export function Home() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundAttachment: "fixed",
        }}
      />
      <div className="relative z-10">
        <Hero />
        <Marquee />
        <CompanyOverview />
        <DestinationCarousel />
        <StatsCarousel />
        <Marquee />
        <section className="relative w-full overflow-hidden bg-white py-10 pl-0 pr-6 lg:pr-14">
          <div className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              className="relative flex items-center justify-start"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
            >
              <img
                src={banner7}
                alt="Travel collage"
                className="w-full max-w-[700px] select-none object-contain"
              />
            </motion.div>

            <motion.div
              className="relative pl-0 lg:pl-8"
              initial={{ opacity: 0, x: 34 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
            >
              <motion.img
                src={deco5}
                alt="decorative birds"
                className="absolute -top-4 -left-16 w-24 opacity-75"
                animate={{ y: [0, -6, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              <p
                className="mb-4 text-[15px] font-medium italic tracking-wide text-orange-500"
                style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
              >
                Let&apos;s Go Together
              </p>

              <h2
                className="max-w-xl text-5xl font-black leading-[1.02] text-slate-900 lg:text-6xl"
                style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
              >
                Bringing Your Travel
                <br />
                Dreams To Life
              </h2>

              <motion.img
                src={deco4}
                alt="decorative compass"
                className="mt-5 w-14 opacity-75"
                animate={{ rotate: [0, 8, 0], y: [0, -4, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />

              <p className="mt-8 max-w-xl text-sm leading-7 text-slate-500 md:text-[15px]">
                Journey with us on fully customized itineraries through diverse waters — where private waves break, islands invite exploration, and biodiverse lands awaken your inner explorer.
              </p>

              <div className="mt-10 space-y-7">
                {[
                  {
                    icon: MapPin,
                    title: "Choose Destination",
                    text: "With nearly half a million attractions, hotels & more, you’re sure to find joy.",
                  },
                  {
                    icon: BadgeCheck,
                    title: "Check Availability",
                    text: "With nearly half a million attractions, hotels & more, you’re sure to find joy.",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Let’s Go",
                    text: "With nearly half a million attractions, hotels & more, you’re sure to find joy.",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="relative flex items-start gap-4">
                      {index < 2 ? (
                        <div className="absolute left-5 top-12 h-12 w-px border-l border-dashed border-orange-200" />
                      ) : null}

                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg shadow-orange-500/25">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div>
                        <h3 className="text-[22px] font-semibold leading-none text-slate-900" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                          {item.title}
                        </h3>
                        <p className="mt-2 max-w-lg text-sm leading-7 text-slate-500">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 flex items-center gap-4">
                <button className="inline-flex items-center gap-3 rounded-full bg-orange-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:bg-orange-600 hover:scale-[1.02]">
                  Contact Us
                  <ArrowRight className="h-4 w-4" />
                </button>
                <motion.img
                  src={deco6}
                  alt="decorative plane path"
                  className="w-28 opacity-90"
                  animate={{ x: [0, 6, 0], y: [0, -4, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </div>
        </section>
        <Marquee />
        <ServicesShowcase />
      </div>
    </div>
  );
}
