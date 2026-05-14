import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

export default function CompanyOverview() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 px-8 lg:px-16 overflow-hidden" dir="ltr">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-orange-200 to-transparent opacity-20"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gradient-to-tr from-teal-200 to-transparent opacity-20"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Accent lines */}
      <motion.div
        className="absolute top-40 left-0 w-1 h-32 bg-gradient-to-b from-orange-400 to-transparent"
        animate={{ scaleY: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 right-0 w-1 h-40 bg-gradient-to-t from-teal-400 to-transparent"
        animate={{ scaleY: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* MAIN CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HEADER */}
        <motion.div
          className="mb-12 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Company Name with animation */}
          <motion.div
            className="mb-8 inline-block"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex items-center gap-3 mb-3"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <p className="text-orange-500 font-semibold tracking-widest text-xs">
                {t("homeCompanyKicker")}
              </p>
              <div className="w-2 h-2 rounded-full bg-orange-500" />
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-5xl lg:text-6xl font-black leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-orange-600 to-teal-600"
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Rainbow Travel <br /> & Tourism
          </motion.h1>

          <motion.div
            className="relative h-1 w-32 mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-400 to-transparent" />
          </motion.div>

          {/* Main description */}
          <motion.p
            className="mb-0 max-w-3xl text-center text-lg font-light leading-relaxed text-gray-700"
            style={{ fontFamily: "'Lora', 'Georgia', serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {t("homeCompanyDesc")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
