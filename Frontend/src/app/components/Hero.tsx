import { motion } from "framer-motion";

import bg from "@/assets/h1-bg01.jpg";
import plane from "@/assets/h1-airplane.png";
// import heart from "@/assets/h1-heart.png"
import banner1 from "@/assets/h1-banner1.jpg";
import banner2 from "@/assets/h1-banner2.jpg";
import planLeft from "@/assets/h1-planleft.png";
import planLeft2 from "@/assets/h1-planleft2.png";
import planRight from "@/assets/h1-planright.png";
import { useLanguage } from "../contexts/LanguageContext";
import { ProtectedBookingLink } from "./ProtectedBookingLink";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full overflow-hidden lg:h-[100vh]" dir="ltr">

      {/* SOFT MULTI-LAYER BACKGROUND */}
      <div
        className="absolute inset-0 left-0 top-0 z-0 w-full bg-cover bg-center md:bg-fixed"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      />
      {/* Dominant navy -> orange wavy overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000816]/95 via-[#021427]/68 to-[#F59E0B]/22 z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_24%,rgba(245,158,11,0.2),transparent_22%),radial-gradient(circle_at_80%_30%,rgba(0,6,18,0.72),transparent_30%),radial-gradient(circle_at_54%_78%,rgba(255,255,255,0.04),transparent_20%)] z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-[#000816]/30 z-[1]" />

      <motion.div
        className="absolute left-1/2 top-1/2 z-[1] h-[28vh] w-[160vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-gradient-to-r from-[#000816]/20 via-transparent to-[#F59E0B]/18 blur-3xl sm:h-[32vh] lg:h-[36vh] lg:w-[140vw]"
        animate={{ opacity: [0.28, 0.6, 0.28], scale: [1, 1.02, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.svg
        className="absolute inset-x-0 top-1/2 z-[2] h-[46vh] w-full -translate-y-1/2 opacity-45 blur-[0.5px]"
        preserveAspectRatio="none"
        viewBox="0 0 1200 420"
      >
        <defs>
          <linearGradient id="heroWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,8,22,0.0)" />
            <stop offset="28%" stopColor="rgba(1,6,18,0.36)" />
            <stop offset="64%" stopColor="rgba(245,158,11,0.28)" />
            <stop offset="100%" stopColor="rgba(245,158,11,0.08)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,180 C120,140 210,96 360,134 S610,238 760,194 S1010,104 1200,150 L1200,420 L0,420 Z"
          fill="url(#heroWaveGradient)"
          animate={{
            d: [
              "M0,180 C120,140 210,96 360,134 S610,238 760,194 S1010,104 1200,150 L1200,420 L0,420 Z",
              "M0,192 C140,232 240,104 390,162 S620,104 790,182 S1000,240 1200,148 L1200,420 L0,420 Z",
              "M0,180 C120,140 210,96 360,134 S610,238 760,194 S1010,104 1200,150 L1200,420 L0,420 Z",
            ],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>

      <motion.div
        className="absolute inset-x-0 top-[46%] z-[2] h-24 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/8 to-transparent blur-2xl sm:h-32 lg:h-40"
        animate={{ opacity: [0.2, 0.5, 0.2], y: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute left-0 top-6 z-[2] h-40 w-40 rounded-full bg-gradient-to-br from-[#F59E0B]/22 to-transparent blur-3xl sm:left-8 sm:top-10 sm:h-56 sm:w-56 lg:left-12 lg:h-72 lg:w-72"
        animate={{ opacity: [0.16, 0.48, 0.16], scale: [1, 1.06, 1] }}
        transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-8 right-0 z-[2] h-52 w-52 rounded-full bg-gradient-to-tr from-[#000816]/22 to-transparent blur-3xl sm:right-8 sm:h-72 sm:w-72 lg:right-16 lg:bottom-12 lg:h-96 lg:w-96"
        animate={{ opacity: [0.12, 0.4, 0.12], x: [0, -18, 0], y: [0, -8, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* DECO OVERLAY removed per design request */}

      {/* CONTENT */}
      <div className="relative z-[10] flex min-h-[100svh] flex-col justify-center gap-6 px-4 pb-8 pt-24 sm:px-6 sm:pt-28 md:pt-32 lg:h-full lg:min-h-0 lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:px-16 lg:pb-0 lg:pt-0">
        {/* Side banner images hidden per request; keep this block for later. */}
        {false && (
        <div className="pointer-events-none absolute left-10 top-28 z-[18] hidden h-72 w-80 md:block lg:left-10">
          <motion.svg
            className="absolute -top-20 -left-40 z-[5] h-40 w-96 opacity-75"
            viewBox="0 0 300 150"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.path
              d="M 20 100 Q 100 20 250 50"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.7 }}
            />
          </motion.svg>

          <motion.div
            className="absolute right-20 top-4 h-56 w-44 overflow-hidden rounded-3xl shadow-2xl"
            style={{ rotate: "-12deg" }}
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05, rotate: "-10deg" }}
          >
            <img src={banner2} className="h-full w-full object-cover" />
          </motion.div>

          <motion.div
            className="absolute -right-36 top-10 h-44 w-80 overflow-visible"
            style={{ rotate: "12deg" }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            whileHover={{ scale: 1.05, rotate: "10deg" }}
          >
            <img
              src={banner1}
              className="h-full w-full object-contain object-center"
              style={{ filter: "drop-shadow(0 18px 28px rgba(0,0,0,0.28))" }}
            />
          </motion.div>
        </div>
        )}

        {/* LEFT SIDE - TEXT & CARDS & DECORATIONS */}
        <div className="relative order-2 flex w-full flex-1 flex-col items-center justify-center text-center text-white lg:order-1 lg:items-start lg:self-center lg:pl-16 lg:text-left lg:-translate-y-6 xl:pl-24">
          
          {/* LEFT DECORATIVE SHAPES - BRIGHT AND CLEAR */}
          <motion.img
            src={planLeft}
            className="absolute -bottom-20 left-0 z-[3] hidden h-36 w-36 opacity-85 sm:block lg:-bottom-40 lg:h-56 lg:w-56"
            animate={{ y: [-10, 10, -10], rotate: [0, 3, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.img
            src={planLeft2}
            className="absolute bottom-0 -left-16 z-[2] hidden h-48 w-48 opacity-75 sm:block lg:-left-32 lg:h-80 lg:w-80"
            animate={{ y: [-5, 15, -5], rotate: [0, -2, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.img
            src={planRight}
            className="absolute -bottom-12 right-2 z-[3] hidden h-44 w-44 opacity-80 sm:block lg:right-32 lg:-bottom-32 lg:h-72 lg:w-72"
            animate={{ y: [0, 20, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* TEXT CONTENT */}
          <motion.p 
            className="relative z-20 mb-3 text-xs font-semibold uppercase text-amber-200 sm:text-sm lg:mb-2"
            style={{ fontFamily: "'Lora', 'Georgia', serif", letterSpacing: 0 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("heroKicker")}
          </motion.p>

          <motion.h1 
            className="relative z-20 mb-3 max-w-2xl bg-gradient-to-r from-white via-[#F59E0B] to-[#cfe6f7] bg-clip-text text-4xl font-black leading-[0.94] text-transparent drop-shadow-lg sm:text-5xl lg:mb-4 lg:text-[5.8rem] xl:text-[6.5rem]"
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif", letterSpacing: 0 }}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("heroTitleLine1")} <br /> {t("heroTitleLine2")}
          </motion.h1>

          {/* separator removed per request */}

          <motion.p 
            className="relative z-20 mb-5 mt-1 max-w-md text-sm font-light leading-7 text-white/90 opacity-95 sm:text-base sm:leading-8 lg:mb-6"
            style={{ fontFamily: "'Lora', 'Georgia', serif", letterSpacing: 0 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t("heroSubtitle")}
          </motion.p>

          <ProtectedBookingLink className="relative z-20 w-full sm:w-fit">
          <motion.button 
            className="group relative z-20 mt-4 w-full overflow-hidden rounded-full bg-gradient-to-r from-[#9a4b08] via-[#c46312] to-[#F59E0B] px-8 py-3 font-semibold text-white shadow-[0_18px_42px_rgba(154,75,8,0.34)] transition hover:shadow-[0_22px_54px_rgba(2,20,39,0.34)] sm:w-fit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.span
              className="absolute inset-y-0 -left-1/3 w-2/3 rounded-full bg-gradient-to-r from-transparent via-[#0a5d7a]/70 to-transparent blur-sm"
              animate={{ x: ["-35%", "210%", "-35%"] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="absolute inset-0 bg-gradient-to-b from-white/18 via-transparent to-[#021427]/18 opacity-80" />
            <span className="relative z-10">{t("bookNow")} →</span>
          </motion.button>
          </ProtectedBookingLink>

        </div>

        {/* RIGHT SIDE - OVAL CONTAINER & DECORATIONS */}
        <div className="relative order-1 flex w-full flex-none items-center justify-center lg:order-2 lg:h-full lg:flex-1 lg:justify-end">

          {/* RIGHT DECORATIVE SHAPE - HIDDEN SINCE MOVED TO LEFT */}

          {/* FLIGHT PATH RIGHT */}
          <motion.svg 
            className="absolute right-2 top-8 z-[5] hidden h-24 w-40 opacity-70 sm:right-8 sm:top-16 sm:block sm:h-28 sm:w-56 lg:right-20 lg:top-40 lg:h-40 lg:w-80"
            viewBox="0 0 300 150"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.path 
              d="M 280 80 Q 200 20 50 60"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.7 }}
            />
          </motion.svg>

          {/* AIRPLANE (removed oval background) */}
          <motion.div
            className="relative z-[5] mx-auto h-[16rem] w-[18rem] overflow-visible sm:h-[22rem] sm:w-[24rem] md:h-[28rem] md:w-[30rem] lg:absolute lg:right-0 lg:top-[46%] lg:mx-0 lg:h-[560px] lg:w-[520px] lg:-translate-y-1/2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* HEART ABOVE AIRPLANE - commented out for preview without it.
            <motion.img
              src={heart}
              className="absolute z-50"
              style={{ width: '400px', height: '400px', top: '70px', left: '80px', transform: 'translateX(-50%)', pointerEvents: 'none', objectFit: 'contain' }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            */}

            <img
              src={plane}
              className="h-full w-full object-cover"
              style={{ filter: 'drop-shadow(0 0 12px rgba(0,0,0,0.25))' }}
            />
          </motion.div>


        </div>
      </div>
    </section>
  );
}
