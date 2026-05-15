import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import logo from "../../assets/logo.ico";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t, toggleLanguage, language } = useLanguage();

  const isActive = (path: string) => location.pathname === path;
  const languageLabel = language === "ar" ? "English" : "\u0627\u0644\u0639\u0631\u0628\u064a\u0629";
  const heroButtonClass =
    "group relative overflow-hidden rounded-full bg-gradient-to-r from-[#9a4b08] via-[#c46312] to-[#F59E0B] font-semibold text-white shadow-[0_14px_34px_rgba(154,75,8,0.28)] transition hover:shadow-[0_18px_42px_rgba(2,20,39,0.32)] hover:scale-[1.03]";

  const renderHeroButtonContent = (label: string) => (
    <>
      <motion.span
        className="absolute inset-y-0 -left-1/3 w-2/3 rounded-full bg-gradient-to-r from-transparent via-[#0a5d7a]/70 to-transparent blur-sm"
        animate={{ x: ["-35%", "210%", "-35%"] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="absolute inset-0 bg-gradient-to-b from-white/18 via-transparent to-[#021427]/18 opacity-80" />
      <span className="relative z-10">{label}</span>
    </>
  );

  const navLinks = [
    { labelKey: "home", path: "/" },
    { labelKey: "aboutUs", path: "/about" },
    { labelKey: "destinations", path: "/destinations" },
    { labelKey: "ourServices", path: "/our-services" },
    { labelKey: "faq", path: "/faq" },
    { labelKey: "offers", path: "/offers" },
    { labelKey: "contactUs", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-[#000816]/95 via-[#021427]/60 to-transparent border-b border-white/10" dir="ltr">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 bg-transparent rounded-full mx-2 sm:mx-4 lg:mx-6 px-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 -ml-1 sm:-ml-2 lg:-ml-4">
            <img src={logo} alt="Rainbow Travel & Tourism" className="h-12 w-12" />
            <div className="hidden sm:block">
              <div className="font-bold text-sm lg:text-base text-white">
                Rainbow Travel
              </div>
              <div className="text-xs text-amber-300">& Tourism</div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-5 xl:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-semibold text-[13px] tracking-wide transition-all duration-300 relative group whitespace-nowrap ${
                  isActive(link.path)
                    ? "text-amber-300"
                    : "text-white/90 hover:text-amber-300"
                }`}
                style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
              >
                {t(link.labelKey)}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 transform transition-all duration-300 ${
                  isActive(link.path) ? "bg-amber-300 scale-x-100" : "bg-amber-300 scale-x-0 group-hover:scale-x-100"
                }`} />
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            <Link to="/auth">
              <Button className={`${heroButtonClass} h-9 px-4 py-2 text-xs whitespace-nowrap xl:text-sm`}>
                {renderHeroButtonContent(t("loginSignup"))}
              </Button>
            </Link>

            <Button
              onClick={toggleLanguage}
              aria-label={language === "ar" ? "Switch to English" : "\u0627\u0644\u062a\u0628\u062f\u064a\u0644 \u0625\u0644\u0649 \u0627\u0644\u0639\u0631\u0628\u064a\u0629"}
              className={`${heroButtonClass} h-9 px-4 py-2 text-xs whitespace-nowrap xl:text-sm`}
            >
              {renderHeroButtonContent(languageLabel)}
            </Button>
          </div>

          <button
            className="lg:hidden text-white hover:text-amber-300 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden pb-6 space-y-4 bg-black/40 backdrop-blur-md rounded-2xl shadow-lg mx-2 sm:mx-4 mt-2 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2 px-4 rounded-lg transition-all ${
                  isActive(link.path)
                    ? "text-amber-300 bg-white/10 font-semibold"
                    : "text-white/80 hover:bg-white/10"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t(link.labelKey)}
              </Link>
            ))}

            <Link to="/auth" onClick={() => setIsOpen(false)}>
              <Button className={`${heroButtonClass} w-full`}>
                {renderHeroButtonContent(t("loginSignup"))}
              </Button>
            </Link>

            <Button
              onClick={() => {
                toggleLanguage();
                setIsOpen(false);
              }}
              aria-label={language === "ar" ? "Switch to English" : "\u0627\u0644\u062a\u0628\u062f\u064a\u0644 \u0625\u0644\u0649 \u0627\u0644\u0639\u0631\u0628\u064a\u0629"}
              className={`${heroButtonClass} w-full`}
            >
              {renderHeroButtonContent(languageLabel)}
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
