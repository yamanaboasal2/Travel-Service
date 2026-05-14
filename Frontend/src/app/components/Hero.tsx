import { motion } from "framer-motion";

import bg from "@/assets/h1-bg01.jpg";
import plane from "@/assets/h1-airplane.png";
import heart from "@/assets/h1-heart.png"
import banner1 from "@/assets/h1-banner1.jpg";
import banner2 from "@/assets/h1-banner2.jpg";
import planLeft from "@/assets/h1-planleft.png";
import planLeft2 from "@/assets/h1-planleft2.png";
import planRight from "@/assets/h1-planright.png";
import { useLanguage } from "../contexts/LanguageContext";
import { Link } from "react-router-dom";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full h-[100vh] overflow-hidden" dir="ltr">

      {/* SOFT MULTI-LAYER BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 top-0 left-0 w-full"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundAttachment: "fixed",
        }}
      />
      {/* Dominant navy -> orange wavy overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000816]/95 via-[#021427]/68 to-[#F59E0B]/22 z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_24%,rgba(245,158,11,0.2),transparent_22%),radial-gradient(circle_at_80%_30%,rgba(0,6,18,0.72),transparent_30%),radial-gradient(circle_at_54%_78%,rgba(255,255,255,0.04),transparent_20%)] z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-[#000816]/30 z-[1]" />

      <motion.div
        className="absolute left-1/2 top-1/2 z-[1] h-[36vh] w-[140vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-gradient-to-r from-[#000816]/20 via-transparent to-[#F59E0B]/18 blur-3xl"
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
        className="absolute inset-x-0 top-[46%] z-[2] h-40 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/8 to-transparent blur-2xl"
        animate={{ opacity: [0.2, 0.5, 0.2], y: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute left-12 top-10 h-72 w-72 rounded-full bg-gradient-to-br from-[#F59E0B]/22 to-transparent blur-3xl z-[2]"
        animate={{ opacity: [0.16, 0.48, 0.16], scale: [1, 1.06, 1] }}
        transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute right-16 bottom-12 h-96 w-96 rounded-full bg-gradient-to-tr from-[#000816]/22 to-transparent blur-3xl z-[2]"
        animate={{ opacity: [0.12, 0.4, 0.12], x: [0, -18, 0], y: [0, -8, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* DECO OVERLAY removed per design request */}

      {/* CONTENT */}
      <div className="relative z-[10] flex items-center justify-between h-full px-8 lg:px-16 gap-8 -ml-10">
        {/* FLOATING TILTED CARDS WITH FLIGHT PATH - FIXED LEFT SIDE */}
        <div className="pointer-events-none absolute left-0 top-20 z-[18] hidden h-72 w-80 md:block lg:left-0">
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
            className="absolute right-20 top-0 h-56 w-44 overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/15"
            style={{ rotate: "-12deg" }}
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05, rotate: "-10deg" }}
          >
            <img src={banner2} className="h-full w-full object-cover" />
          </motion.div>

          <motion.div
            className="absolute -right-16 bottom-0 h-56 w-44 overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/15"
            style={{ rotate: "12deg" }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            whileHover={{ scale: 1.05, rotate: "10deg" }}
          >
            <img src={banner1} className="h-full w-full object-cover" />
          </motion.div>
        </div>

        {/* LEFT SIDE - TEXT & CARDS & DECORATIONS */}
        <div className="text-white flex flex-col justify-center items-center text-center relative w-full">
          
          {/* LEFT DECORATIVE SHAPES - BRIGHT AND CLEAR */}
          <motion.img
            src={planLeft}
            className="absolute left-0 -bottom-40 w-56 h-56 z-[3] opacity-85"
            animate={{ y: [-10, 10, -10], rotate: [0, 3, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.img
            src={planLeft2}
            className="absolute -left-32 bottom-0 w-80 h-80 z-[2] opacity-75"
            animate={{ y: [-5, 15, -5], rotate: [0, -2, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.img
            src={planRight}
            className="absolute right-32 -bottom-32 w-72 h-72 z-[3] opacity-80"
            animate={{ y: [0, 20, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* TEXT CONTENT - CENTERED */}
          <motion.p 
            className="text-amber-200 text-sm mb-2 font-semibold tracking-wider relative z-20" 
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif", letterSpacing: '0.1em' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("heroKicker")}
          </motion.p>

          <motion.h1 
            className="text-6xl lg:text-7xl font-black leading-none mb-4 relative z-20 drop-shadow-lg max-w-2xl bg-clip-text text-transparent bg-gradient-to-r from-white via-[#F59E0B] to-[#cfe6f7]"
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif", letterSpacing: '-0.01em' }}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("heroTitleLine1")} <br /> {t("heroTitleLine2")}
          </motion.h1>

          {/* separator removed per request */}

          <motion.p 
            className="text-base opacity-95 mt-2 mb-4 font-light tracking-wide relative z-20 max-w-lg text-white/90"
            style={{ fontFamily: "'Lora', 'Georgia', serif", letterSpacing: '0.05em' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t("heroSubtitle")}
          </motion.p>

          <Link to="/booking" className="relative z-20 w-fit">
          <motion.button 
            className="w-fit px-8 py-3 bg-orange-500 text-white rounded-full font-semibold transition transform hover:scale-110 shadow-lg relative z-20 mt-4 hover:bg-orange-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t("bookNow")} →
          </motion.button>
          </Link>

        </div>

        {/* RIGHT SIDE - OVAL CONTAINER & DECORATIONS */}
        <div className="relative flex-1 flex items-center justify-center h-full">

          {/* RIGHT DECORATIVE SHAPE - HIDDEN SINCE MOVED TO LEFT */}

          {/* FLIGHT PATH RIGHT */}
          <motion.svg 
            className="absolute right-20 top-40 w-80 h-40 z-[5] opacity-70"
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
            className="absolute w-[520px] h-[560px] overflow-visible z-[5] -right-20 top-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* HEART ABOVE AIRPLANE (kept) */}
            <motion.img
              src={heart}
              className="absolute z-50"
              style={{ width: '400px', height: '400px', top: '70px', left: '80px', transform: 'translateX(-50%)', pointerEvents: 'none', objectFit: 'contain' }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />

            <img
              src={plane}
              className="w-full h-full object-cover"
              style={{ filter: 'drop-shadow(0 0 12px rgba(0,0,0,0.25))' }}
            />
          </motion.div>


        </div>
      </div>
    </section>
  );
}
