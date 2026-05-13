import { motion } from "framer-motion";
import { ArrowRight, Globe2, Headset, Sparkles, BadgeCheck } from "lucide-react";
import avatar1 from '../../assets/h1-avatar-1.jpg';
import avatar2 from '../../assets/h1-avatar-2.jpg';
import avatar3 from '../../assets/h1-avatar-3.jpg';
import avatar4 from '../../assets/h1-avatar-4.jpg';
import pg02 from '../../assets/h1-bg02.jpg';

export default function StatsCarousel() {
  const stats = [
    {
      value: "10+",
      label: "Years Experience",
      icon: Sparkles,
      accent: "from-orange-500/80 to-amber-400/60",
      delay: 0.1,
    },
    {
      value: "5000+",
      label: "Happy Travelers",
      icon: BadgeCheck,
      accent: "from-teal-600/80 to-cyan-400/50",
      delay: 0.2,
    },
    {
      value: "50+",
      label: "Destinations",
      icon: Globe2,
      accent: "from-slate-900/80 to-slate-700/60",
      delay: 0.3,
    },
    {
      value: "24/7",
      label: "Customer Support",
      icon: Headset,
      accent: "from-amber-500/80 to-orange-500/60",
      delay: 0.4,
    },
  ];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-24 px-6 lg:px-16">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${pg02})`,
        }}
      />

      <div className="absolute inset-0 bg-slate-900/12" />
      <div className="absolute inset-0 bg-gradient-to-br from-amber-300/42 via-orange-400/18 to-slate-900/8" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.48),transparent_34%),radial-gradient(circle_at_78%_28%,rgba(249,115,22,0.28),transparent_36%),radial-gradient(circle_at_50%_78%,rgba(255,165,0,0.22),transparent_30%)]" />

      <svg className="absolute inset-0 h-full w-full opacity-55" preserveAspectRatio="none" viewBox="0 0 1200 700">
        <defs>
          <linearGradient id="statsWaveA" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(251,191,36,0.0)" />
            <stop offset="36%" stopColor="rgba(251,191,36,0.48)" />
            <stop offset="68%" stopColor="rgba(249,115,22,0.32)" />
            <stop offset="100%" stopColor="rgba(255,165,0,0.0)" />
          </linearGradient>
          <linearGradient id="statsWaveB" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
          </linearGradient>
        </defs>

        <motion.path
          d="M0 255 C 150 220, 240 310, 420 278 S 720 190, 920 250 S 1080 315, 1200 265 L 1200 700 L 0 700 Z"
          fill="url(#statsWaveA)"
          animate={{
            d: [
              "M0 255 C 150 220, 240 310, 420 278 S 720 190, 920 250 S 1080 315, 1200 265 L 1200 700 L 0 700 Z",
              "M0 265 C 140 340, 270 205, 430 290 S 730 330, 920 240 S 1090 205, 1200 272 L 1200 700 L 0 700 Z",
              "M0 255 C 150 220, 240 310, 420 278 S 720 190, 920 250 S 1080 315, 1200 265 L 1200 700 L 0 700 Z",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.path
          d="M0 145 C 180 110, 320 195, 520 150 S 840 95, 1200 145"
          stroke="url(#statsWaveB)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="12 14"
          animate={{
            d: [
              "M0 145 C 180 110, 320 195, 520 150 S 840 95, 1200 145",
              "M0 155 C 170 200, 360 85, 530 165 S 820 210, 1200 140",
              "M0 145 C 180 110, 320 195, 520 150 S 840 95, 1200 145",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      <motion.div
        className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-orange-400/38 blur-3xl"
        animate={{ opacity: [0.35, 0.72, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-300/28 blur-3xl"
        animate={{ opacity: [0.2, 0.5, 0.2], x: [0, -18, 0], y: [0, -12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-center">
          <motion.div
            className="text-white"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-xl shadow-lg shadow-black/10 mb-8">
              <div className="flex -space-x-3">
                <div className="w-9 h-9 rounded-full border border-white/60 overflow-hidden">
                  <img src={avatar1} alt="Traveler 1" className="w-full h-full object-cover" />
                </div>
                <div className="w-9 h-9 rounded-full border border-white/60 overflow-hidden">
                  <img src={avatar2} alt="Traveler 2" className="w-full h-full object-cover" />
                </div>
                <div className="w-9 h-9 rounded-full border border-white/60 overflow-hidden">
                  <img src={avatar3} alt="Traveler 3" className="w-full h-full object-cover" />
                </div>
                <div className="w-9 h-9 rounded-full border border-white/60 overflow-hidden">
                  <img src={avatar4} alt="Traveler 4" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="text-sm font-semibold tracking-wide text-white/95">
                50+ People Joined
              </div>
            </div>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-700 via-slate-900 to-blue-900"
              style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Travel stats that feel alive.
            </motion.h2>

            <motion.p
              className="max-w-xl text-base md:text-lg leading-8 text-slate-800/90 mb-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18 }}
              viewport={{ once: true }}
            >
              Explore premium travel experiences with a glass-style showcase that blends motion, depth, and soft fade effects over the background.
            </motion.p>

            <motion.button
              className="inline-flex items-center gap-3 rounded-full border border-orange-500/60 bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-2xl shadow-orange-500/40 transition-transform hover:bg-orange-600"
              whileHover={{ scale: 1.04, x: 4 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.24 }}
              viewport={{ once: true }}
            >
              About Us
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={stat.label}
                  className="relative overflow-hidden rounded-[2rem] border border-amber-700/30 bg-amber-700/12 p-6 md:p-7 text-amber-700 shadow-[0_24px_80px_rgba(15,23,42,0.35)] backdrop-blur-2xl"
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.75, delay: stat.delay }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.accent} opacity-0`}
                    animate={{ opacity: [0.04, 0.22, 0.04] }}
                    transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl"
                    animate={{ opacity: [0.15, 0.45, 0.15], scale: [1, 1.12, 1] }}
                    transition={{ duration: 7 + index, repeat: Infinity, ease: "easeInOut" }}
                  />

                  <div className="relative flex h-full flex-col justify-between gap-10">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-700/40 bg-amber-700/18 backdrop-blur-xl">
                        <Icon className="h-5 w-5 text-amber-700" />
                      </div>
                      <motion.div
                        className="h-2 w-20 rounded-full bg-amber-700/40"
                        animate={{ opacity: [0.25, 0.8, 0.25], scaleX: [1, 1.12, 1] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>

                    <div>
                      <motion.div
                        className="mb-3 text-5xl md:text-6xl font-black tracking-tight"
                        animate={{ opacity: [0.78, 1, 0.78] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-sm md:text-base font-semibold tracking-[0.18em] uppercase text-amber-700/85">
                        {stat.label}
                      </div>
                    </div>

                    <div className="h-px w-full bg-gradient-to-r from-amber-700/60 via-amber-700/20 to-transparent" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
