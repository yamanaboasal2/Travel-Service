import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import logo from "../../assets/logo.ico";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isRTL, t, toggleLanguage, language } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Destinations", path: "/destinations" },
    { name: "Our Services", path: "/our-services" },
    { name: "FAQ", path: "/faq" },
    { name: "Offers", path: "/offers" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-[#000816]/95 via-[#021427]/60 to-transparent border-b border-white/10" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 bg-transparent rounded-full mx-2 sm:mx-4 lg:mx-6 px-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 -ml-1 sm:-ml-2 lg:-ml-4">
            <img src={logo} alt="Rainbow Travel & Tourism" className="h-12 w-12" />
            <div className="hidden sm:block">
              <div className="font-bold text-sm lg:text-base text-white">
                Rainbow Travel
              </div>
              <div className="text-xs text-amber-300">& Tourism</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
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
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 transform transition-all duration-300 ${
                  isActive(link.path) ? "bg-amber-300 scale-x-100" : "bg-amber-300 scale-x-0 group-hover:scale-x-100"
                }`} />
              </Link>
            ))}
          </div>

          {/* Get in Touch Button & Language */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            <Link to="/auth">
              <Button className="rounded-full bg-gradient-to-r from-[#F59E0B] to-orange-500 hover:from-[#e39700] hover:to-orange-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all px-4 py-2 h-9 text-xs xl:text-sm whitespace-nowrap">
                Login or Sign Up
              </Button>
            </Link>

            <Button
              onClick={toggleLanguage}
              className="rounded-full bg-gradient-to-r from-[#F59E0B] to-orange-500 hover:from-[#e39700] hover:to-orange-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all px-4 py-2 h-9 text-xs xl:text-sm whitespace-nowrap"
            >
              English
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white hover:text-amber-300 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
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
                {link.name}
              </Link>
            ))}
            
            <Link to="/auth" onClick={() => setIsOpen(false)}>
              <Button className="w-full rounded-full bg-gradient-to-r from-[#F59E0B] to-orange-500 hover:from-[#e39700] hover:to-orange-600 text-white font-semibold">
                Login or Sign Up
              </Button>
            </Link>

            <Button
              onClick={() => {
                toggleLanguage();
                setIsOpen(false);
              }}
              className="w-full rounded-full bg-gradient-to-r from-[#F59E0B] to-orange-500 hover:from-[#e39700] hover:to-orange-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              English
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}