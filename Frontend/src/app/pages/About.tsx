import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Award,
  Users,
  TrendingUp,
  Heart,
  Shield,
  Sparkles,
} from "lucide-react";
import { Card } from "../components/ui/card";
import Marquee from "../components/Marquee";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "../components/ui/button";
import aboutBanner1 from "../../assets/about-banner-1.jpg";
import aboutBanner2 from "../../assets/about-banner-2.jpg";
import aboutBanner3 from "../../assets/about-banner-3.jpg";
import teamLead from "../../assets/ourteam.jpg";
import heroBg from "../../assets/h1-bg01.jpg";

export function About() {
  const { t, flexDirection } = useLanguage();
  const team = [
    { name: t("teamLeadName"), role: t("teamLeadRole"), image: teamLead, note: t("teamLeadNote") },
  ];
  const values = [
    {
      icon: Award,
      title: "competitivePrices",
      description: "pricesDesc",
      color: "from-gray-400 to-gray-600",
    },
    {
      icon: Heart,
      title: "excellentService",
      description: "serviceDesc",
      color: "from-gray-400 to-gray-600",
    },
    {
      icon: Shield,
      title: "organizedTrips",
      description: "organizedDesc",
      color: "from-gray-400 to-gray-600",
    },
    {
      icon: Sparkles,
      title: "continuousOffers",
      description: "offersDesc",
      color: "from-gray-400 to-gray-600",
    },
  ];

  const stats = [
    { number: "10+", label: t('yearsExperience') },
    { number: "5000+", label: t('happyTravelers') },
    { number: "50+", label: t('destinations') },
    { number: "24/7", label: t('customerSupport') },
  ];

  return (
    <div 
      className="min-h-screen bg-cover bg-center md:bg-fixed"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      {/* About Us Title Section */}
      <section className="relative overflow-hidden py-20 sm:py-24 md:py-28 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000816]/85 via-[#021427]/70 to-[#F59E0B]/15 z-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 
            className="mb-4 text-4xl font-black drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif", letterSpacing: '-0.02em' }}
          >
            <span className="bg-gradient-to-r from-white via-[#F59E0B] to-white bg-clip-text text-transparent">
              {t("aboutUs")}
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-light text-white/85 drop-shadow-lg sm:text-xl md:text-2xl lg:text-3xl" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
            {t("aboutHeroSubtitle")}
          </p>
        </div>
      </section>

      {/* Why Choose Us Section - screenshot style */}
      <section className="relative overflow-hidden bg-[#fbf8f1] py-16 sm:py-20 lg:py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_18%_22%,rgba(245,158,11,0.10),transparent_26%),radial-gradient(circle_at_78%_16%,rgba(2,20,39,0.08),transparent_22%),radial-gradient(circle_at_70%_82%,rgba(2,20,39,0.06),transparent_18%)]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-6">
            {/* Images Left */}
            <div className="lg:col-span-6">
              <div className="mx-auto grid max-w-3xl grid-cols-12 items-stretch gap-3 sm:gap-4 lg:mx-0 lg:gap-5">
                <motion.div
                  className="col-span-6 row-span-2 min-h-[18rem] overflow-hidden bg-transparent shadow-none sm:min-h-[22rem] lg:min-h-[30rem]"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={aboutBanner1}
                    alt={t("travelDestinationAlt")}
                    className="h-full w-full object-cover rounded-[44%_44%_10%_46%]"
                  />
                </motion.div>

                <motion.div
                  className="col-span-6 overflow-hidden bg-transparent shadow-none"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={aboutBanner2}
                    alt={t("adventureExperienceAlt")}
                    className="h-36 w-full rounded-full object-cover sm:h-44 lg:h-[14.5rem]"
                  />
                </motion.div>

                <motion.div
                  className="col-span-6 col-start-7 overflow-hidden bg-transparent shadow-none"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={aboutBanner3}
                    alt={t("culturalTourAlt")}
                    className="h-36 w-full rounded-full object-cover sm:h-44 lg:h-[14.5rem]"
                  />
                </motion.div>
              </div>
            </div>

            {/* Content Right */}
            <div className="lg:col-span-6 lg:pl-3 xl:pl-6">
              <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
                <p
                  className="text-[#F59E0B] text-base md:text-lg mb-3"
                  style={{ fontFamily: "'Lora', 'Georgia', serif" }}
                >
                  {t("letsGoTogether")}
                </p>

                <h2
                  className="text-3xl font-black leading-[1.02] tracking-[-0.04em] text-[#021427] sm:text-4xl md:text-5xl lg:text-[3.8rem] lg:leading-[0.96]"
                  style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                >
                  {t("planYourTrip")}
                  <br />
                  {t("withUs")}
                </h2>

                <p
                  className="mx-auto max-w-lg text-sm leading-7 text-[#5f6675] md:text-base lg:mx-0"
                  style={{ fontFamily: "'Lora', 'Georgia', serif" }}
                >
                  {t("aboutPlanningDesc")}
                </p>

                <div className="mx-auto mt-8 max-w-lg space-y-5 lg:mx-0">
                  <div className="flex items-start gap-4 text-left">
                    <span className="mt-2 h-3 w-3 rounded-full bg-[#F59E0B] shadow-[0_0_0_6px_rgba(245,158,11,0.12)]" />
                    <div>
                      <h4 className="text-xl md:text-2xl text-[#021427] mb-1.5" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                        {t("exclusiveTrip")}
                      </h4>
                      <p className="text-[#6b7280] text-sm md:text-base leading-7" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                        {t("exclusiveTripDesc")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 text-left">
                    <span className="mt-2 h-3 w-3 rounded-full bg-[#F59E0B] shadow-[0_0_0_6px_rgba(245,158,11,0.12)]" />
                    <div>
                      <h4 className="text-xl md:text-2xl text-[#021427] mb-1.5" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                        {t("professionalGuide")}
                      </h4>
                      <p className="text-[#6b7280] text-sm md:text-base leading-7" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                        {t("professionalGuideDesc")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center lg:justify-start">
                  <Link to="/contact">
                    <Button className="overflow-hidden rounded-full bg-gradient-to-r from-[#9a4b08] via-[#c46312] to-[#F59E0B] px-6 py-4 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(154,75,8,0.28)] transition hover:scale-[1.03] hover:shadow-[0_18px_42px_rgba(2,20,39,0.32)] sm:px-7 sm:py-5 sm:text-base">
                      {t("Contact Us")} →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="relative overflow-hidden py-20 sm:py-24 md:py-28 lg:py-32">
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#000816]/85 via-[#021427]/70 to-[#F59E0B]/15 z-0" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 
            className="mb-6 text-4xl font-black leading-tight drop-shadow-lg sm:text-5xl md:mb-8 md:text-6xl lg:text-7xl"
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif", letterSpacing: '-0.01em' }}
          >
            <span className="bg-gradient-to-r from-white via-[#F59E0B] to-white bg-clip-text text-transparent">
              {t("ourStory")}
            </span>
          </h2>

          <div className="relative">
            {/* Decorative wavy elements */}
            <svg className="absolute left-1/2 top-0 z-0 h-16 w-full max-w-2xl -translate-x-1/2 opacity-30 sm:-top-12 sm:h-24" viewBox="0 0 1200 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,40 Q300,20 600,40 T1200,40 L1200,80 L0,80 Z" fill="url(#waveGradient1)" />
              <defs>
                <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="50%" stopColor="#000612" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
            </svg>

            <p className="relative z-10 mx-auto max-w-3xl text-base font-light leading-relaxed text-white/95 sm:text-lg md:text-xl lg:text-2xl" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
              {t("aboutStoryMain")}
            </p>

            {/* Another wavy element */}
            <svg className="absolute bottom-0 left-1/2 z-0 h-16 w-full max-w-2xl -translate-x-1/2 opacity-30 sm:-bottom-12 sm:h-24" viewBox="0 0 1200 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,40 Q300,60 600,40 T1200,40 L1200,0 L0,0 Z" fill="url(#waveGradient2)" />
              <defs>
                <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="50%" stopColor="#052a4a" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
            </svg>

            <p className="relative z-10 mx-auto mt-8 max-w-2xl text-sm font-light leading-relaxed text-white/85 sm:mt-10 sm:text-base lg:mt-12 lg:text-lg" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
              {t("aboutStorySecond")}
            </p>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="relative overflow-hidden py-8 sm:py-10 md:py-6">
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-white">{t("ourTeam")}</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-black text-[#021427]" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
              {t("teamTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm md:text-base leading-7 text-white" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
              {t("teamDesc")}
            </p>
          </div>

          <motion.div className="flex justify-center" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0 }} viewport={{ once: true }}>
            <div className="text-center">
              {/* Decorative arc above image */}
              <div className="mb-5 flex justify-center">
                <div className="relative h-8 w-44 pointer-events-none sm:h-10 sm:w-60">
                  <svg viewBox="0 0 320 64" className="w-full h-full" preserveAspectRatio="none">
                    <path d="M 10 64 Q 160 -15 310 64" fill="none" stroke="#8D6E63" strokeWidth="2.5" opacity="0.5" />
                  </svg>
                </div>
              </div>

              {/* Circular Image */}
              <div className="flex justify-center mb-5">
                <div className="relative">
                  <img 
                    src={team[0].image} 
                    alt={team[0].name} 
                    className="h-36 w-36 rounded-full object-cover border-4 border-white/70 shadow-[0_20px_60px_rgba(80,52,31,0.15)] sm:h-44 sm:w-44 md:h-48 md:w-48" 
                  />
                </div>
              </div>

              {/* Text Content - Below Image */}
              <div className="relative z-10 max-w-xs px-2 sm:px-0">
                <div className="flex items-center justify-center gap-2 text-white mb-2">
                  <Users className="h-4 w-4" />
                  <span className="text-sm font-semibold uppercase tracking-[0.3em]">{team[0].role}</span>
                </div>
                <h3 className="text-2xl font-black text-[#3E2723] sm:text-3xl" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>{team[0].name}</h3>
                <p className="mt-3 text-sm leading-7 text-white" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>{team[0].note}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee Divider */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#000816] via-[#021427] to-[#000816] py-4 sm:py-5">
        <div className="relative">
          <Marquee>
            <div className="mx-4 text-base font-semibold text-white drop-shadow-md sm:mx-6 sm:text-xl" style={{ fontFamily: "'Playfair Display', 'Georgia', serif", letterSpacing: '0.05em' }}>
              {t("aboutMarqueeText")}
            </div>
          </Marquee>
        </div>
      </section>

      {/* Core Values - Enhanced Section */}
      <section className="relative overflow-hidden bg-white py-14 sm:py-16">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#F59E0B] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#2C4A7C] rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="mb-10 text-center sm:mb-12">
            <h2 
              className="mb-4 text-3xl font-black sm:text-4xl md:text-5xl"
              style={{ fontFamily: "'Playfair Display', 'Georgia', serif", letterSpacing: '-0.01em' }}
            >
              <span className="bg-gradient-to-r from-[#2C4A7C] via-[#F59E0B] to-[#2C4A7C] bg-clip-text text-transparent">
                {t('ourCoreValues')}
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-base font-light text-gray-600 sm:text-lg" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
              {t("coreValuesDesc")}
            </p>
          </div>

          {/* Values Cards Grid */}
          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3 lg:gap-8">
            {[
              {
                icon: Users,
                title: t('customerFirst'),
                description: t('customerFirstDesc'),
                number: '01',
                color: 'from-blue-500 to-blue-600',
              },
              {
                icon: Shield,
                title: t('trustReliability'),
                description: t('trustReliabilityDesc'),
                number: '02',
                color: 'from-purple-500 to-purple-600',
              },
              {
                icon: TrendingUp,
                title: t('continuousImprovement'),
                description: t('continuousImprovementDesc'),
                number: '03',
                color: 'from-green-500 to-green-600',
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-gray-300 hover:shadow-2xl sm:p-6 md:p-8"
                >
                  {/* Card overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Accent line at top */}
                  <div className={`absolute top-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r ${item.color} transition-all duration-500`} />

                  <div className="relative z-10">
                    {/* Number Badge */}
                    <div className="inline-block mb-4">
                      <span className={`text-3xl font-black bg-gradient-to-r ${item.color} bg-clip-text text-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-500`}>
                        {item.number}
                      </span>
                    </div>

                    {/* Icon Container */}
                    <div className="mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-400 to-gray-600 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg sm:h-14 sm:w-14">
                        <Icon className="h-6 w-6 text-white sm:h-7 sm:w-7" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 
                      className="text-lg font-bold mb-3 text-gray-900 group-hover:text-[#2C4A7C] transition-colors duration-300"
                      style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                      {item.description}
                    </p>

                    {/* Hover arrow */}
                    <div className="hidden">
                      <span className="transform group-hover:translate-x-2 transition-transform duration-500">→</span>
                    </div>
                  </div>

                  {/* Subtle corner accent */}
                  <div className="absolute -bottom-8 -right-8 w-20 h-20 rounded-full bg-gradient-to-br from-[#F59E0B]/5 to-[#2C4A7C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Location Info + CTA Combined Section */}
      <section className="relative overflow-hidden bg-cover bg-center md:bg-fixed" style={{
        backgroundImage: `url(${heroBg})`,
      }}>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/35 z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/35 to-black/60 z-0" />
        
        {/* Top fade transition */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-100 to-transparent z-20" />

        {/* Decorative elements */}
        <div className="absolute right-2 top-1/4 h-44 w-44 rounded-full bg-[#F59E0B]/15 blur-3xl animate-pulse sm:right-10 sm:h-80 sm:w-80" />
        <div className="absolute bottom-1/4 left-2 h-40 w-40 rounded-full bg-[#021427]/20 blur-3xl animate-pulse sm:left-10 sm:h-72 sm:w-72" style={{ animationDelay: '1s' }} />

        <div className="relative z-10">
          {/* Location Info */}
          <div className="hidden">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/18 backdrop-blur-md rounded-3xl p-8 md:p-10 text-white border border-white/25 shadow-2xl overflow-hidden relative ring-1 ring-white/10">
                {/* Subtle decorative accent */}
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                
                <div className="relative z-10 text-center max-w-2xl mx-auto">
                  <h2 
                    className="text-3xl md:text-4xl font-bold mb-4 text-white"
                    style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                  >
                    {t('visitOurOffice')}
                  </h2>
                  <p className="text-sm md:text-base text-white/85 mb-8 leading-relaxed" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                    {t('officeLocationDesc')}
                  </p>

                  <div className="space-y-3 bg-white/14 rounded-2xl p-6 border border-white/20">
                    <p className="text-sm md:text-base text-white/90 flex items-center justify-center gap-3">
                      <span className="text-[#F59E0B] text-lg">📍</span>
                      <span>{t('officeAddress')}</span>
                    </p>
                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <p className="text-sm md:text-base text-white/90 flex items-center justify-center gap-3">
                      <span className="text-[#F59E0B] text-lg">📞</span>
                      <span>{t('phoneNumber')}</span>
                    </p>
                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <p className="text-sm md:text-base text-white/90 flex items-center justify-center gap-3">
                      <span className="text-[#F59E0B] text-lg">✉️</span>
                      <span>{t('emailAddress')}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section - Merged */}
          <div className="px-4 pb-8 pt-16 sm:px-6 sm:pt-20 md:pb-10 md:pt-24 lg:px-8">
            <div className="max-w-4xl mx-auto relative z-10 text-center">
              <div className="absolute inset-x-10 top-0 h-40 bg-white/6 blur-3xl rounded-full -z-10" />
              <h2 
                className="mb-6 text-2xl font-bold leading-tight sm:text-3xl md:mb-7 md:text-4xl"
                style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
              >
                <span className="bg-gradient-to-r from-white via-[#F59E0B] to-white bg-clip-text text-transparent">
                  {t("Ready to Start Your Journey?")}
                </span>
              </h2>

              <p 
                className="mb-8 text-sm font-light text-white/85 sm:text-base md:mb-10"
                style={{ fontFamily: "'Lora', 'Georgia', serif" }}
              >
                {t("aboutCtaDesc")}
              </p>

              <div className={`flex flex-col sm:${flexDirection()} gap-4 justify-center items-center mb-8`}>
                <Link to="/contact">
                  <button className="group relative w-full overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:w-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F59E0B] to-orange-500 group-hover:from-orange-600 group-hover:to-orange-700 transition-all duration-300" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <span className="relative z-10 text-white">
                      {t('Get in Touch')} →
                    </span>
                  </button>
                </Link>

                <Link to="/offers">
                  <button className="group relative w-full overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:w-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F59E0B] to-orange-500 group-hover:from-orange-600 group-hover:to-orange-700 transition-all duration-300" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <span className="relative z-10 text-white">
                      {t('viewOffers')} ✨
                    </span>
                  </button>
                </Link>
              </div>

              <div className="h-1 w-16 mx-auto bg-gradient-to-r from-[#F59E0B] via-white to-[#F59E0B] rounded-full" />
            </div>
          </div>
        </div>

        {/* Wave decoration at bottom - enhanced */}
        <svg className="absolute bottom-0 left-0 right-0 w-full h-auto opacity-30" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradientBottom" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#021427" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#021427" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,30 Q300,0 600,30 T1200,30 L1200,120 L0,120 Z"
            fill="url(#waveGradientBottom)"
            animate={{ d: [
              "M0,30 Q300,0 600,30 T1200,30 L1200,120 L0,120 Z",
              "M0,40 Q300,15 600,40 T1200,40 L1200,120 L0,120 Z",
              "M0,30 Q300,0 600,30 T1200,30 L1200,120 L0,120 Z"
            ] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </section>
    </div>
  );
}
