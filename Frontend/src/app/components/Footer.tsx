import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import logo from "../../assets/logo.ico";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Offers", path: "/offers" },
  { name: "Contact", path: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0b1d35] text-white">
      <div className="mx-auto max-w-[88rem] px-6 py-12 lg:px-14">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Rainbow Travel & Tourism" className="h-14 w-14" />
            <div>
              <p className="text-2xl font-black leading-tight">Rainbow Travel</p>
              <p className="text-sm font-semibold text-orange-400">& Tourism</p>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.9fr_1fr_0.9fr]">
          <div className="border-b border-white/10 pb-8 lg:border-b-0 lg:border-r lg:border-white/10 lg:pb-0 lg:pr-8">
            <h3 className="text-3xl font-black leading-tight">Rainbow Travel & Tourism</h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">
              Your trusted travel partner in Nablus, providing complete travel solutions and memorable experiences around the world.
            </p>
          </div>

          <div className="lg:border-r lg:border-white/10 lg:pr-8">
            <h4 className="mb-4 text-xl font-bold text-orange-300">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="transition-colors hover:text-orange-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:border-r lg:border-white/10 lg:pr-8">
            <h4 className="mb-4 text-xl font-bold text-orange-300">Contact Us</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-300" />
                <span>
                  Nablus City Center, Second Floor
                  <br />
                  Nablus, Palestine
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-orange-300" />
                <a href="tel:0597441666" className="transition-colors hover:text-orange-300">
                  0597441666
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-orange-300" />
                <a href="mailto:info@rainbowtravel.ps" className="transition-colors hover:text-orange-300">
                  info@rainbowtravel.ps
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xl font-bold text-orange-300">Follow Us</h4>
            <div className="mb-4 flex gap-2.5">
              <a
                href="https://www.facebook.com/RainbowPalestina/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 transition hover:border-orange-300 hover:bg-orange-400 hover:text-slate-900"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/rainbowtours93?igsh=aDVqZjEzazN3dzQ5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 transition hover:border-orange-300 hover:bg-orange-400 hover:text-slate-900"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.tiktok.com/@rainbowtourspal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 transition hover:border-orange-300 hover:bg-orange-400 hover:text-slate-900"
              >
                <SiTiktok className="h-4 w-4" />
              </a>
            </div>
            <div className="space-y-1.5 text-sm text-white/80">
              <p>@RainbowTours</p>
              <p>@Rinbowtours93</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-5 text-center text-xs text-white/60">
          <p>© 2026 Rainbow Travel & Tourism. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
