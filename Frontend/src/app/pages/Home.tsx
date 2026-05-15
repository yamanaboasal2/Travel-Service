import bg from "@/assets/h1-bg01.jpg";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import CompanyOverview from "../components/CompanyOverview";
import DestinationCarousel from "../components/DestinationCarousel";
import StatsCarousel from "../components/StatsCarousel";
import ServicesShowcase from "../components/ServicesShowcase";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MapPin, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

import banner7 from "@/assets/h1-banner7.png";
import deco4 from "@/assets/h1-deco4.svg";
import deco5 from "@/assets/h1-deco5.svg";
import deco6 from "@/assets/h1-deco6.svg";

export function Home() {
  const { t } = useLanguage();
  const travelSteps = [
    {
      icon: MapPin,
      title: t("chooseDestination"),
      text: t("chooseDestinationDesc"),
    },
    {
      icon: BadgeCheck,
      title: t("checkAvailability"),
      text: t("checkAvailabilityDesc"),
    },
    {
      icon: CheckCircle2,
      title: t("letsGo"),
      text: t("letsGoDesc"),
    },
  ];

  return (
    <div className="relative isolate min-h-screen overflow-hidden" dir="ltr">
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat md:bg-fixed"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      />
      <div className="relative z-10">
        <Hero />
        <Marquee />
        <CompanyOverview />
        <DestinationCarousel />
        <StatsCarousel />
        <Marquee />
        <section className="relative w-full overflow-hidden bg-white px-4 py-12 sm:px-6 lg:py-14 lg:pl-0 lg:pr-14">
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <motion.div
              className="relative flex items-center justify-center lg:justify-start"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
            >
              <img
                src={banner7}
                alt="Travel collage"
                className="mx-auto w-full max-w-[520px] select-none object-contain sm:max-w-[620px] lg:ml-0 lg:mr-auto lg:max-w-[700px]"
              />
            </motion.div>

            <motion.div
              className="relative text-center lg:pl-8 lg:text-left"
              initial={{ opacity: 0, x: 34 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
            >
              <motion.img
                src={deco5}
                alt="decorative birds"
                className="absolute -left-2 -top-10 hidden w-16 opacity-75 sm:block lg:-left-16 lg:-top-4 lg:w-24"
                animate={{ y: [0, -6, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              <p
                className="mb-4 text-sm font-medium italic tracking-wide text-orange-500 md:text-[15px]"
                style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
              >
                {t("letsGoTogether")}
              </p>

              <h2
                className="mx-auto max-w-xl text-3xl font-black leading-[1.06] text-slate-900 sm:text-4xl lg:mx-0 lg:text-6xl"
                style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
              >
                {t("bringingTravel")}
                <br />
                {t("dreamsToLife")}
              </h2>

              <motion.img
                src={deco4}
                alt="decorative compass"
                className="mx-auto mt-5 w-12 opacity-75 lg:mx-0 lg:w-14"
                animate={{ rotate: [0, 8, 0], y: [0, -4, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />

              <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-500 md:text-[15px] lg:mx-0 lg:mt-8">
                {t("journeyDesc")}
              </p>

              <div className="mx-auto mt-8 max-w-xl space-y-6 text-left lg:mx-0 lg:mt-10 lg:space-y-7">
                {travelSteps.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="relative flex items-start gap-3 sm:gap-4">
                      {index < 2 ? (
                        <div className="absolute left-[18px] top-11 h-10 w-px border-l border-dashed border-orange-200 sm:left-5 sm:top-12 sm:h-12" />
                      ) : null}

                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg shadow-orange-500/25 sm:h-10 sm:w-10">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold leading-none text-slate-900 sm:text-[22px]" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
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

              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:mt-10 lg:justify-start">
                <Link to="/contact" className="inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#9a4b08] via-[#c46312] to-[#F59E0B] px-8 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(154,75,8,0.28)] transition hover:scale-[1.03] hover:shadow-[0_18px_42px_rgba(2,20,39,0.32)] sm:w-auto">
                  {t("contactUs")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <motion.img
                  src={deco6}
                  alt="decorative plane path"
                  className="w-24 opacity-90 sm:w-28"
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
