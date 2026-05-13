import { motion } from "framer-motion";

export default function Marquee() {
  const items = [
    "EXPERIENCE THE WORLD",
    "NATURAL FREEDOM",
    "INSPIRING JOURNEYS",
    "TOP DESTINATIONS",
    "EXPLORE NOW",
  ];

  return (
    <section className="relative w-full overflow-hidden py-5 md:py-7">
      {/* Animated wave background */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 200">
        <defs>
          <linearGradient id="marqueeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(15,23,42,0.92)" />
            <stop offset="44%" stopColor="rgba(249,115,22,0.42)" />
            <stop offset="100%" stopColor="rgba(245,158,11,0.18)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,80 Q300,30 600,80 T1200,80 L1200,200 L0,200 Z"
          fill="url(#marqueeGradient)"
          animate={{
            d: [
              "M0,80 Q300,30 600,80 T1200,80 L1200,200 L0,200 Z",
              "M0,100 Q300,60 600,100 T1200,100 L1200,200 L0,200 Z",
              "M0,80 Q300,30 600,80 T1200,80 L1200,200 L0,200 Z",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Overlay for color depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-orange-500/10 to-amber-700/15" />

      {/* Content */}
      <div className="relative z-10 overflow-hidden">
        <motion.div
          className="flex gap-10 whitespace-nowrap"
          animate={{ x: [0, -1200] }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* First set */}
          {items.map((item, index) => (
            <div
              key={`first-${index}`}
              className="flex items-center gap-10 flex-shrink-0"
            >
              <span className="text-xl md:text-2xl lg:text-3xl font-black text-white/90 tracking-[0.22em] drop-shadow-lg">
                {item}
              </span>
              <motion.span
                className="text-2xl md:text-3xl text-amber-300/80"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ✦
              </motion.span>
            </div>
          ))}

          {/* Second set (for infinite loop) */}
          {items.map((item, index) => (
            <div
              key={`second-${index}`}
              className="flex items-center gap-10 flex-shrink-0"
            >
              <span className="text-xl md:text-2xl lg:text-3xl font-black text-white/90 tracking-[0.22em] drop-shadow-lg">
                {item}
              </span>
              <motion.span
                className="text-2xl md:text-3xl text-amber-300/80"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
              >
                ✦
              </motion.span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
