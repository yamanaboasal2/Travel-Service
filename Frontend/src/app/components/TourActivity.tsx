import { motion } from "framer-motion";
import { useState } from "react";

export default function TourActivity() {
  const [activeRegion, setActiveRegion] = useState("Africa");

  const regions = [
    { name: "Africa", color: "bg-orange-500" },
    { name: "North America", color: "bg-gray-300" },
    { name: "Latin America", color: "bg-blue-300" },
    { name: "Europe", color: "bg-purple-300" },
    { name: "Asia Pacific", color: "bg-teal-300" },
  ];

  // Sparkling effect animation
  const SparkleEffect = ({ x, y, delay }) => (
    <motion.div
      className="absolute w-2 h-2 bg-orange-400 rounded-full"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        y: [0, -20, -40],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
      }}
    />
  );

  return (
    <section className="relative w-full min-h-screen bg-white py-24 px-8 lg:px-16 overflow-hidden">
      {/* Sparkle Effects - Scattered around */}
      <SparkleEffect x={5} y={10} delay={0} />
      <SparkleEffect x={95} y={15} delay={0.3} />
      <SparkleEffect x={10} y={85} delay={0.6} />
      <SparkleEffect x={90} y={80} delay={0.9} />
      <SparkleEffect x={50} y={5} delay={1.2} />

      {/* Decorative circles */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 rounded-full bg-gradient-to-br from-orange-100 to-transparent opacity-30"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-gradient-to-tr from-teal-100 to-transparent opacity-30"
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* HEADER */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-orange-500 text-sm font-semibold tracking-widest mb-4"
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            TOUR ACTIVITY
          </motion.p>

          <motion.h2
            className="text-5xl lg:text-6xl font-black leading-tight mb-6 text-gray-800"
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Our Tour Package Ensures <br /> A Seamless And <br /> Memorable Adventure
          </motion.h2>

          <motion.p
            className="text-gray-600 text-lg font-light max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Discover extraordinary destinations and create unforgettable memories with our expertly curated tour packages.
          </motion.p>
        </motion.div>

        {/* REGION FILTERS */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {regions.map((region, index) => (
            <motion.button
              key={region.name}
              onClick={() => setActiveRegion(region.name)}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 relative overflow-hidden group ${
                activeRegion === region.name
                  ? "overflow-hidden bg-gradient-to-r from-[#9a4b08] via-[#c46312] to-[#F59E0B] text-white shadow-[0_14px_34px_rgba(154,75,8,0.28)] scale-105"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Hover sparkle effect */}
              {activeRegion === region.name && (
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              {region.name}
            </motion.button>
          ))}
        </motion.div>

        {/* FEATURED TOURS GRID */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <motion.div
              key={item}
              className="relative group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-orange-400 to-teal-400">
                <motion.div
                  className="w-full h-full bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500"
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Sparkle particles on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{
                    background: [
                      "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                      "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                      "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <motion.h3
                  className="text-xl font-bold text-gray-800 mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  Premium Tour {item}
                </motion.h3>
                <p className="text-gray-600 text-sm mb-4">
                  Experience the magic of {activeRegion} with our expertly guided tours.
                </p>

                {/* Button */}
                <button className="w-full overflow-hidden rounded-full bg-gradient-to-r from-[#9a4b08] via-[#c46312] to-[#F59E0B] py-3 font-semibold text-white shadow-[0_14px_34px_rgba(154,75,8,0.28)] transition hover:scale-[1.03] hover:shadow-[0_18px_42px_rgba(2,20,39,0.32)]">
                  Explore Now
                </button>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-400 to-transparent opacity-0 group-hover:opacity-100 rounded-bl-3xl transition-opacity" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
