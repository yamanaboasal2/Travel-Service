import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  CalendarCheck,
  ChevronRight,
  CircleDollarSign,
  Clock,
  CreditCard,
  Globe,
  Languages,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Package,
  Percent,
  Phone,
  Plane,
  Save,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import heroBg from "../../assets/h1-bg01.jpg";
import logo from "../../assets/logo.ico";
import {
  deleteBooking as deleteBackendBooking,
  deleteComment,
  deleteContactMessage,
  getAllBookings,
  getSystemHealth,
  getAllMessages,
  getAllUsers,
  getAdminComments,
  getStoredUser,
  loginUser,
  logoutUser,
  updateBooking as updateBackendBooking,
  updateUser as updateBackendUser,
  type AdminUserRecord as BackendUser,
  type Booking as BackendBooking,
  type ContactMessage,
  type CustomerComment,
  type SystemHealth,
} from "../services/apiService";
import { destinations, getAdminDestinations, saveAdminDestinations, type DestinationItem } from "./Destination";
import { getAdminOfferPackages, offers, saveAdminOfferPackages, type OfferPackage } from "./Offers";
import { getAdminServices, saveAdminServices, services, type ServiceItem } from "./OurServices";

type AdminSection = "overview" | "bookings" | "packages" | "destinations" | "services" | "offers" | "messages" | "users" | "analytics" | "settings";

const navItems: { id: AdminSection; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "bookings", label: "Bookings", icon: CalendarCheck },
  { id: "packages", label: "Packages", icon: Package },
  { id: "destinations", label: "Destinations", icon: MapPin },
  { id: "services", label: "Services", icon: Plane },
  { id: "offers", label: "Offers", icon: Percent },
  { id: "messages", label: "Messages", icon: Mail },
  { id: "users", label: "Users", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

const sectionTitles: Record<AdminSection, { title: string; subtitle: string }> = {
  overview: { title: "Dashboard Overview", subtitle: "Welcome back. Here's what's happening with your travel business." },
  bookings: { title: "Bookings", subtitle: "Track recent reservations, payments, and booking status." },
  packages: { title: "Packages", subtitle: "Manage the travel packages shown on the offers page." },
  destinations: { title: "Destinations", subtitle: "Review and manage destination cards across the website." },
  services: { title: "Services", subtitle: "Manage the services listed on the public services page." },
  offers: { title: "Offers", subtitle: "Control active package discounts and promotional prices." },
  messages: { title: "Messages", subtitle: "Review contact-us messages and customer comments." },
  users: { title: "Users", subtitle: "Customer and account management area." },
  analytics: { title: "Analytics", subtitle: "Business performance and conversion overview." },
  settings: { title: "Settings", subtitle: "Admin preferences and system controls." },
};

const statusStyles: Record<string, string> = {
  Completed: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
  completed: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
  Pending: "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
  pending: "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
  Cancelled: "bg-rose-100 text-rose-700 ring-1 ring-rose-200",
  cancelled: "bg-rose-100 text-rose-700 ring-1 ring-rose-200",
  confirmed: "bg-sky-100 text-sky-700 ring-1 ring-sky-200",
};

type AdminBookingRow = {
  id?: string;
  customer: string;
  package: string;
  amount: string;
  status: string;
  date: string;
};

type PackageDraft = {
  title: string;
  destination: string;
  duration: string;
  price: string;
  originalPrice: string;
  discount: string;
  description: string;
  bestFor: string;
  badge: string;
  video: string;
  mediaType: "image" | "video";
  includes: string;
  highlights: string;
};

type DestinationDraft = {
  name: string;
  tours: string;
  image: string;
};

type ServiceDraft = {
  title: string;
  description: string;
  features: string;
  image: string;
};

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "Active" | "Blocked";
  bookings: number;
  spent: string;
  joined: string;
};

type SystemStatusItem = {
  label: string;
  value: string;
  tone: "emerald" | "amber" | "rose" | "sky";
};

type ActivityItem = {
  color: string;
  title: string;
  time: string;
};

const defaultPackageDraft: PackageDraft = {
  title: "",
  destination: "",
  duration: "5 Days / 4 Nights",
  price: "$750",
  originalPrice: "",
  discount: "",
  description: "",
  bestFor: "Family Trips",
  badge: "New Package",
  video: offers[0].video,
  mediaType: "video",
  includes: "Hotel accommodation with breakfast\nAirport transfers\nGuided city tour\nProfessional tour guide",
  highlights: "Curated itinerary\nComfortable stay\nLocal experiences\nFlexible booking",
};

const defaultDestinationDraft: DestinationDraft = {
  name: "",
  tours: "3",
  image: destinations[0].image,
};

const defaultServiceDraft: ServiceDraft = {
  title: "",
  description: "",
  features: "Personalized planning\nFast support\nFlexible options\nTrusted partners",
  image: services[0].image,
};

const formatMoney = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

const formatDate = (value?: string) => {
  if (!value) {
    return "New account";
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "New account" : date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
};

const formatTimeAgo = (value?: string) => {
  if (!value) {
    return "Just now";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Just now";
  }

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.max(0, Math.floor(diffMs / 60000));

  if (diffMinutes < 1) {
    return "Just now";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
};

const getDatabaseLabel = (health?: SystemHealth | null) => {
  if (!health?.database) {
    return "Unknown";
  }

  switch (health.database.status) {
    case "connected":
      return "Healthy";
    case "connecting":
      return "Connecting";
    case "disconnecting":
      return "Disconnecting";
    default:
      return "Offline";
  }
};

const getDatabaseTone = (health?: SystemHealth | null): SystemStatusItem["tone"] => {
  if (!health?.database) {
    return "amber";
  }

  if (health.database.status === "connected") {
    return "emerald";
  }

  if (health.database.status === "connecting") {
    return "sky";
  }

  return "rose";
};

const mapBackendUser = (backendUser: BackendUser, userBookings: BackendBooking[]): AdminUser => {
  const userId = backendUser._id || backendUser.id || backendUser.email;
  const relatedBookings = userBookings.filter((booking) => {
    const bookingUserId = typeof booking.userId === "string" ? booking.userId : "";
    return bookingUserId === userId || booking.customer?.email?.toLowerCase() === backendUser.email.toLowerCase();
  });
  const spent = relatedBookings.reduce((total, booking) => total + Number(booking.totalPrice || 0), 0);

  return {
    id: userId,
    name: backendUser.name,
    email: backendUser.email,
    role: backendUser.role,
    status: backendUser.status === "blocked" ? "Blocked" : "Active",
    bookings: relatedBookings.length,
    spent: formatMoney(spent),
    joined: formatDate(backendUser.createdAt),
  };
};

function BookingsTable({
  rows,
  onDelete,
  onStatusChange,
}: {
  rows?: AdminBookingRow[];
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: BackendBooking["status"]) => void;
}) {
  const visibleRows = rows || [];

  return (
    <section className="overflow-hidden rounded-2xl border border-white/50 bg-white/42 shadow-[0_18px_50px_rgba(10,93,122,0.1)] backdrop-blur-2xl">
      <div className="border-b border-white/55 px-4 py-4 sm:px-5">
        <h2 className="text-xl font-black text-[#162F3A]">Recent Bookings</h2>
      </div>

      <div className="grid gap-3 p-3 sm:hidden">
        {visibleRows.length === 0 ? (
          <div className="rounded-2xl border border-white/55 bg-white/55 p-5 text-sm font-bold text-[#6E8189]">
            No bookings found from the backend yet.
          </div>
        ) : visibleRows.map((booking) => (
          <article key={booking.id || booking.customer} className="rounded-2xl border border-white/55 bg-white/55 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0a5d7a]/10 text-xs font-black text-[#0a5d7a]">
                    {booking.customer.split(" ").map((part) => part[0]).join("")}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-black text-[#193945]">{booking.customer}</p>
                    <p className="mt-1 line-clamp-2 text-xs font-bold text-[#6E8189]">{booking.package}</p>
                  </div>
                </div>
              </div>
              <span className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-black ${statusStyles[booking.status]}`}>{booking.status}</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-white/55 p-3">
                <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#6E8189]">Amount</p>
                <p className="mt-1 font-black text-[#0D2530]">{booking.amount}</p>
              </div>
              <div className="rounded-xl bg-white/55 p-3">
                <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#6E8189]">Date</p>
                <p className="mt-1 font-bold text-[#31596A]">{booking.date}</p>
              </div>
            </div>

            {booking.id ? (
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onStatusChange?.(booking.id!, booking.status === "completed" ? "pending" : "completed")}
                  className="rounded-full bg-[#0a5d7a]/10 px-3 py-2 text-xs font-black text-[#0a5d7a]"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete?.(booking.id!)}
                  className="rounded-full bg-rose-100 px-3 py-2 text-xs font-black text-rose-700"
                >
                  Delete
                </button>
              </div>
            ) : null}
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-white/35 text-xs uppercase tracking-[0.12em] text-[#6E8189]">
            <tr>
              <th className="px-5 py-3 font-black">Customer</th>
              <th className="px-5 py-3 font-black">Package</th>
              <th className="px-5 py-3 font-black">Amount</th>
              <th className="px-5 py-3 font-black">Status</th>
              <th className="px-5 py-3 text-right font-black">Date</th>
              <th className="px-5 py-3 text-right font-black">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/55">
            {visibleRows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-sm font-bold text-[#6E8189]">
                  No bookings found from the backend yet.
                </td>
              </tr>
            ) : visibleRows.map((booking) => (
              <tr key={booking.id || booking.customer} className="transition hover:bg-white/35">
                <td className="px-5 py-4 font-bold text-[#193945]">
                  <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0a5d7a]/10 text-xs text-[#0a5d7a]">
                    {booking.customer.split(" ").map((part) => part[0]).join("")}
                  </span>
                  {booking.customer}
                </td>
                <td className="px-5 py-4 font-medium text-[#31596A]">{booking.package}</td>
                <td className="px-5 py-4 font-black text-[#0D2530]">{booking.amount}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-black ${statusStyles[booking.status]}`}>{booking.status}</span>
                </td>
                <td className="px-5 py-4 text-right font-medium text-[#6E8189]">{booking.date}</td>
                <td className="px-5 py-4 text-right">
                  {booking.id ? (
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onStatusChange?.(booking.id!, booking.status === "completed" ? "pending" : "completed")}
                        className="rounded-full bg-[#0a5d7a]/10 px-3 py-1 text-xs font-black text-[#0a5d7a]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete?.(booking.id!)}
                        className="rounded-full bg-rose-100 px-3 py-1 text-xs font-black text-rose-700"
                      >
                        Delete
                      </button>
                    </div>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function EmptyAdminSection({ title }: { title: string }) {
  return (
    <section className="rounded-2xl border border-white/50 bg-white/42 p-8 text-center shadow-[0_18px_50px_rgba(10,93,122,0.1)] backdrop-blur-2xl">
      <h2 className="text-2xl font-black text-[#162F3A]">{title}</h2>
      <p className="mt-2 text-sm font-semibold text-[#6E8189]">This admin page is ready for the next management tools.</p>
    </section>
  );
}

function SettingsPanel() {
  const inputClass = "mt-2 h-11 w-full rounded-xl border border-white/60 bg-white/65 px-4 text-sm font-semibold text-[#193945] outline-none transition placeholder:text-[#6E8189]/70 focus:border-[#F46C28] focus:bg-white";
  const labelClass = "text-xs font-black uppercase tracking-[0.12em] text-[#6E8189]";

  return (
    <section className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-2xl border border-white/50 bg-white/42 p-5 shadow-[0_18px_50px_rgba(10,93,122,0.1)] backdrop-blur-2xl">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-black text-[#162F3A]">
              <Globe className="h-5 w-5 text-[#F46C28]" />
              Company Profile
            </h2>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700 ring-1 ring-emerald-200">Live</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className={labelClass}>Company Name</span>
              <input className={inputClass} defaultValue="Rainbow Travel & Tourism" />
            </label>
            <label>
              <span className={labelClass}>Website URL</span>
              <input className={inputClass} defaultValue="rainbowtravel.ps" />
            </label>
            <label className="md:col-span-2">
              <span className={labelClass}>Short Description</span>
              <textarea
                className="mt-2 min-h-24 w-full rounded-xl border border-white/60 bg-white/65 px-4 py-3 text-sm font-semibold leading-6 text-[#193945] outline-none transition placeholder:text-[#6E8189]/70 focus:border-[#F46C28] focus:bg-white"
                defaultValue="Your trusted travel partner in Nablus, providing complete travel solutions and memorable experiences around the world."
              />
            </label>
          </div>
        </article>

        <article className="rounded-2xl border border-white/50 bg-white/42 p-5 shadow-[0_18px_50px_rgba(10,93,122,0.1)] backdrop-blur-2xl">
          <h2 className="mb-5 flex items-center gap-2 text-xl font-black text-[#162F3A]">
            <Mail className="h-5 w-5 text-[#F46C28]" />
            Contact Details
          </h2>
          <div className="space-y-4">
            <label>
              <span className={labelClass}>Support Email</span>
              <div className="relative">
                <Mail className="absolute left-4 top-[1.15rem] h-4 w-4 text-[#F46C28]" />
                <input className={`${inputClass} pl-11`} defaultValue="info@rainbowtravel.ps" />
              </div>
            </label>
            <label>
              <span className={labelClass}>Phone Number</span>
              <div className="relative">
                <Phone className="absolute left-4 top-[1.15rem] h-4 w-4 text-[#F46C28]" />
                <input className={`${inputClass} pl-11`} defaultValue="0597441666" />
              </div>
            </label>
            <label>
              <span className={labelClass}>Office Location</span>
              <div className="relative">
                <MapPin className="absolute left-4 top-[1.15rem] h-4 w-4 text-[#F46C28]" />
                <input className={`${inputClass} pl-11`} defaultValue="Nablus City Center, Second Floor, Nablus, Palestine" />
              </div>
            </label>
          </div>
        </article>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <article className="rounded-2xl border border-white/50 bg-white/42 p-5 shadow-[0_18px_50px_rgba(10,93,122,0.1)] backdrop-blur-2xl">
          <h2 className="mb-5 flex items-center gap-2 text-xl font-black text-[#162F3A]">
            <CalendarCheck className="h-5 w-5 text-[#F46C28]" />
            Booking Rules
          </h2>
          <div className="space-y-4">
            <label>
              <span className={labelClass}>Default Booking Status</span>
              <select className={inputClass} defaultValue="Pending">
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Manual Review</option>
              </select>
            </label>
            <label>
              <span className={labelClass}>Minimum Advance Booking</span>
              <select className={inputClass} defaultValue="24 Hours">
                <option>12 Hours</option>
                <option>24 Hours</option>
                <option>48 Hours</option>
                <option>7 Days</option>
              </select>
            </label>
            <SettingToggle title="Allow instant confirmation" enabled />
            <SettingToggle title="Send booking email alerts" enabled />
          </div>
        </article>

        <article className="rounded-2xl border border-white/50 bg-white/42 p-5 shadow-[0_18px_50px_rgba(10,93,122,0.1)] backdrop-blur-2xl">
          <h2 className="mb-5 flex items-center gap-2 text-xl font-black text-[#162F3A]">
            <CreditCard className="h-5 w-5 text-[#F46C28]" />
            Pricing
          </h2>
          <div className="space-y-4">
            <label>
              <span className={labelClass}>Default Currency</span>
              <select className={inputClass} defaultValue="USD">
                <option>USD</option>
                <option>JOD</option>
                <option>ILS</option>
                <option>EUR</option>
              </select>
            </label>
            <label>
              <span className={labelClass}>Maximum Offer Discount</span>
              <select className={inputClass} defaultValue="55%">
                <option>25%</option>
                <option>35%</option>
                <option>45%</option>
                <option>55%</option>
              </select>
            </label>
            <SettingToggle title="Show old price on offers" enabled />
            <SettingToggle title="Hide expired offers automatically" enabled />
          </div>
        </article>

        <article className="rounded-2xl border border-white/50 bg-white/42 p-5 shadow-[0_18px_50px_rgba(10,93,122,0.1)] backdrop-blur-2xl">
          <h2 className="mb-5 flex items-center gap-2 text-xl font-black text-[#162F3A]">
            <Lock className="h-5 w-5 text-[#F46C28]" />
            Security
          </h2>
          <div className="space-y-4">
            <SettingToggle title="Require admin login" enabled />
            <SettingToggle title="Protect dashboard route" enabled />
            <SettingToggle title="Notify on new admin login" />
            <label>
              <span className={labelClass}>Session Timeout</span>
              <select className={inputClass} defaultValue="2 Hours">
                <option>30 Minutes</option>
                <option>1 Hour</option>
                <option>2 Hours</option>
                <option>8 Hours</option>
              </select>
            </label>
          </div>
        </article>
      </div>

      <article className="rounded-2xl border border-white/50 bg-white/42 p-5 shadow-[0_18px_50px_rgba(10,93,122,0.1)] backdrop-blur-2xl">
        <div className="grid gap-5 lg:grid-cols-3">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-black text-[#162F3A]">
              <Languages className="h-5 w-5 text-[#F46C28]" />
              Display
            </h2>
            <p className="mt-2 text-sm font-semibold text-[#6E8189]">Public website defaults and admin display options.</p>
          </div>
          <label>
            <span className={labelClass}>Default Language</span>
            <select className={inputClass} defaultValue="English">
              <option>English</option>
              <option>Arabic</option>
            </select>
          </label>
          <label>
            <span className={labelClass}>Business Hours</span>
            <div className="relative">
              <Clock className="absolute left-4 top-[1.15rem] h-4 w-4 text-[#F46C28]" />
              <input className={`${inputClass} pl-11`} defaultValue="09:00 AM - 06:00 PM" />
            </div>
          </label>
        </div>
      </article>

      <article className="rounded-2xl border border-white/50 bg-white/42 p-5 shadow-[0_18px_50px_rgba(10,93,122,0.1)] backdrop-blur-2xl">
        <h2 className="mb-5 flex items-center gap-2 text-xl font-black text-[#162F3A]">
          <Globe className="h-5 w-5 text-[#F46C28]" />
          Social Links
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          <label>
            <span className={labelClass}>Facebook</span>
            <input className={inputClass} defaultValue="https://www.facebook.com/RainbowPalestina/" />
          </label>
          <label>
            <span className={labelClass}>Instagram</span>
            <input className={inputClass} defaultValue="https://www.instagram.com/rainbowtours93?igsh=aDVqZjEzazN3dzQ5" />
          </label>
          <label>
            <span className={labelClass}>TikTok</span>
            <input className={inputClass} defaultValue="https://www.tiktok.com/@rainbowtourspal" />
          </label>
          <label>
            <span className={labelClass}>Primary Handle</span>
            <input className={inputClass} defaultValue="@RainbowTours" />
          </label>
          <label>
            <span className={labelClass}>Instagram Handle</span>
            <input className={inputClass} defaultValue="@Rinbowtours93" />
          </label>
          <label>
            <span className={labelClass}>Footer Rating</span>
            <input className={inputClass} defaultValue="Average rating 4.9/5 from 597 reviews" />
          </label>
        </div>
      </article>

      <div className="flex justify-end">
        <button className="inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#9a4b08] via-[#c46312] to-[#F59E0B] px-6 py-3 text-sm font-black text-white shadow-[0_14px_34px_rgba(154,75,8,0.28)] transition hover:scale-[1.03] hover:shadow-[0_18px_42px_rgba(2,20,39,0.32)]">
          <Save className="h-4 w-4" />
          Save Settings
        </button>
      </div>
    </section>
  );
}

function SettingToggle({ title, enabled = false }: { title: string; enabled?: boolean }) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-xl border border-white/55 bg-white/55 px-4 py-3 text-sm font-bold text-[#31596A]">
      <span>{title}</span>
      <input type="checkbox" defaultChecked={enabled} className="h-5 w-5 rounded border-[#D7CCC8] accent-[#F46C28]" />
    </label>
  );
}

function AddPackageForm({
  draft,
  onChange,
  onCancel,
  onSubmit,
}: {
  draft: PackageDraft;
  onChange: (draft: PackageDraft) => void;
  onCancel: () => void;
  onSubmit: () => void;
}) {
  const inputClass = "mt-2 h-11 w-full rounded-xl border border-white/60 bg-white/70 px-4 text-sm font-semibold text-[#193945] outline-none transition placeholder:text-[#6E8189]/70 focus:border-[#F46C28] focus:bg-white";
  const labelClass = "text-xs font-black uppercase tracking-[0.12em] text-[#6E8189]";
  const handleMediaUpload = (file?: File) => {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onChange({
        ...draft,
        video: String(reader.result),
        mediaType: file.type.startsWith("image/") ? "image" : "video",
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mb-5 rounded-2xl border border-white/60 bg-white/50 p-4 shadow-[0_18px_45px_rgba(10,93,122,0.08)] backdrop-blur-2xl sm:p-5">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-black text-[#162F3A]">Add New Package</h3>
          <p className="mt-1 text-sm font-semibold text-[#6E8189]">The package will appear here and on the public Offers page.</p>
        </div>
        <button type="button" onClick={onCancel} className="rounded-full bg-white/70 px-4 py-2 text-xs font-black text-[#805B4E] transition hover:bg-white sm:self-start">
          Cancel
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <label>
          <span className={labelClass}>Package Title</span>
          <input className={inputClass} value={draft.title} onChange={(event) => onChange({ ...draft, title: event.target.value })} placeholder="Jerusalem Heritage Tour" />
        </label>
        <label>
          <span className={labelClass}>Destination</span>
          <input className={inputClass} value={draft.destination} onChange={(event) => onChange({ ...draft, destination: event.target.value })} placeholder="Jerusalem, Palestine" />
        </label>
        <label>
          <span className={labelClass}>Duration</span>
          <input className={inputClass} value={draft.duration} onChange={(event) => onChange({ ...draft, duration: event.target.value })} placeholder="4 Days / 3 Nights" />
        </label>
        <label>
          <span className={labelClass}>Current Price</span>
          <input className={inputClass} value={draft.price} onChange={(event) => onChange({ ...draft, price: event.target.value })} placeholder="$650" />
        </label>
        <label>
          <span className={labelClass}>Old Price</span>
          <input className={inputClass} value={draft.originalPrice} onChange={(event) => onChange({ ...draft, originalPrice: event.target.value })} placeholder="$800" />
        </label>
        <label>
          <span className={labelClass}>Discount</span>
          <input className={inputClass} value={draft.discount} onChange={(event) => onChange({ ...draft, discount: event.target.value })} placeholder="20" />
        </label>
        <label>
          <span className={labelClass}>Badge</span>
          <input className={inputClass} value={draft.badge} onChange={(event) => onChange({ ...draft, badge: event.target.value })} placeholder="Limited Deal" />
        </label>
        <label>
          <span className={labelClass}>Best For</span>
          <input className={inputClass} value={draft.bestFor} onChange={(event) => onChange({ ...draft, bestFor: event.target.value })} placeholder="Culture Lovers" />
        </label>
        <label>
          <span className={labelClass}>Media Style</span>
          <select className={inputClass} value={draft.video} onChange={(event) => onChange({ ...draft, video: event.target.value })}>
            {offers.map((offer) => (
              <option key={offer.id} value={offer.video}>
                {offer.title}
              </option>
            ))}
          </select>
        </label>
        <label className="md:col-span-2 xl:col-span-3">
          <span className={labelClass}>Upload Photo or Video</span>
          <input
            type="file"
            accept="image/*,video/*"
            className="mt-2 block w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-sm font-semibold text-[#193945] file:mr-4 file:rounded-full file:border-0 file:bg-[#F46C28] file:px-4 file:py-2 file:text-sm file:font-black file:text-white"
            onChange={(event) => handleMediaUpload(event.target.files?.[0])}
          />
          <p className="mt-2 text-xs font-semibold text-[#6E8189]">
            Uploaded media is saved locally in this browser and will appear on the Offers page.
          </p>
        </label>
        <div className="md:col-span-2 xl:col-span-3 overflow-hidden rounded-2xl border border-white/60 bg-white/55">
          <div className="h-52 bg-[#0a5d7a]/10">
            {draft.mediaType === "image" ? (
              <img src={draft.video} alt="Package preview" className="h-full w-full object-cover" />
            ) : (
              <video src={draft.video} className="h-full w-full object-cover" controls muted />
            )}
          </div>
        </div>
        <label className="md:col-span-2 xl:col-span-3">
          <span className={labelClass}>Description</span>
          <textarea
            className="mt-2 min-h-24 w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-sm font-semibold leading-6 text-[#193945] outline-none transition placeholder:text-[#6E8189]/70 focus:border-[#F46C28] focus:bg-white"
            value={draft.description}
            onChange={(event) => onChange({ ...draft, description: event.target.value })}
            placeholder="Write a package description like the existing offers..."
          />
        </label>
        <label className="md:col-span-1 xl:col-span-3">
          <span className={labelClass}>Package Includes</span>
          <textarea
            className="mt-2 min-h-24 w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-sm font-semibold leading-6 text-[#193945] outline-none transition focus:border-[#F46C28] focus:bg-white"
            value={draft.includes}
            onChange={(event) => onChange({ ...draft, includes: event.target.value })}
          />
        </label>
        <label className="md:col-span-1 xl:col-span-3">
          <span className={labelClass}>Highlights</span>
          <textarea
            className="mt-2 min-h-24 w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-sm font-semibold leading-6 text-[#193945] outline-none transition focus:border-[#F46C28] focus:bg-white"
            value={draft.highlights}
            onChange={(event) => onChange({ ...draft, highlights: event.target.value })}
          />
        </label>
      </div>

      <div className="mt-5 flex justify-end">
        <button type="button" onClick={onSubmit} className="inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#9a4b08] via-[#c46312] to-[#F59E0B] px-6 py-3 text-sm font-black text-white shadow-[0_14px_34px_rgba(154,75,8,0.28)] transition hover:scale-[1.03] hover:shadow-[0_18px_42px_rgba(2,20,39,0.32)] sm:w-auto">
          <Package className="h-4 w-4" />
          Save Package
        </button>
      </div>
    </div>
  );
}

function AddDestinationForm({
  draft,
  onChange,
  onCancel,
  onSubmit,
}: {
  draft: DestinationDraft;
  onChange: (draft: DestinationDraft) => void;
  onCancel: () => void;
  onSubmit: () => void;
}) {
  const inputClass = "mt-2 h-11 w-full rounded-xl border border-white/60 bg-white/70 px-4 text-sm font-semibold text-[#193945] outline-none transition placeholder:text-[#6E8189]/70 focus:border-[#F46C28] focus:bg-white";
  const labelClass = "text-xs font-black uppercase tracking-[0.12em] text-[#6E8189]";
  const handleImageUpload = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange({ ...draft, image: String(reader.result) });
    reader.readAsDataURL(file);
  };

  return (
    <div className="mb-5 rounded-2xl border border-white/60 bg-white/50 p-4 shadow-[0_18px_45px_rgba(10,93,122,0.08)] backdrop-blur-2xl sm:p-5">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-black text-[#162F3A]">Add Destination</h3>
          <p className="mt-1 text-sm font-semibold text-[#6E8189]">New destinations appear in admin and on the public Destinations page.</p>
        </div>
        <button type="button" onClick={onCancel} className="rounded-full bg-white/70 px-4 py-2 text-xs font-black text-[#805B4E] transition hover:bg-white sm:self-start">Cancel</button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <label>
          <span className={labelClass}>Destination Name</span>
          <input className={inputClass} value={draft.name} onChange={(event) => onChange({ ...draft, name: event.target.value })} placeholder="Barcelona" />
        </label>
        <label>
          <span className={labelClass}>Tours Count</span>
          <input className={inputClass} value={draft.tours} onChange={(event) => onChange({ ...draft, tours: event.target.value })} placeholder="4" />
        </label>
        <label>
          <span className={labelClass}>Upload Image</span>
          <input type="file" accept="image/*" className="mt-2 block w-full rounded-xl border border-white/60 bg-white/70 px-4 py-2 text-sm font-semibold text-[#193945] file:mr-3 file:rounded-full file:border-0 file:bg-[#0a5d7a] file:px-3 file:py-2 file:text-xs file:font-black file:text-white" onChange={(event) => handleImageUpload(event.target.files?.[0])} />
        </label>
        <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/55 md:col-span-3">
          <img src={draft.image} alt="Destination preview" className="h-56 w-full object-cover" />
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <button type="button" onClick={onSubmit} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0a5d7a] px-6 py-3 text-sm font-black text-white shadow-lg shadow-[#0a5d7a]/20 transition hover:bg-[#08495f] sm:w-auto">
          <MapPin className="h-4 w-4" />
          Save Destination
        </button>
      </div>
    </div>
  );
}

function AddServiceForm({
  draft,
  onChange,
  onCancel,
  onSubmit,
}: {
  draft: ServiceDraft;
  onChange: (draft: ServiceDraft) => void;
  onCancel: () => void;
  onSubmit: () => void;
}) {
  const inputClass = "mt-2 h-11 w-full rounded-xl border border-white/60 bg-white/70 px-4 text-sm font-semibold text-[#193945] outline-none transition placeholder:text-[#6E8189]/70 focus:border-[#F46C28] focus:bg-white";
  const labelClass = "text-xs font-black uppercase tracking-[0.12em] text-[#6E8189]";
  const handleImageUpload = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange({ ...draft, image: String(reader.result) });
    reader.readAsDataURL(file);
  };

  return (
    <div className="mb-5 rounded-2xl border border-white/60 bg-white/50 p-4 shadow-[0_18px_45px_rgba(10,93,122,0.08)] backdrop-blur-2xl sm:p-5">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-black text-[#162F3A]">Add Service</h3>
          <p className="mt-1 text-sm font-semibold text-[#6E8189]">New services appear in admin and on the public Services page.</p>
        </div>
        <button type="button" onClick={onCancel} className="rounded-full bg-white/70 px-4 py-2 text-xs font-black text-[#805B4E] transition hover:bg-white sm:self-start">Cancel</button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label>
          <span className={labelClass}>Service Title</span>
          <input className={inputClass} value={draft.title} onChange={(event) => onChange({ ...draft, title: event.target.value })} placeholder="Airport VIP Transfer" />
        </label>
        <label>
          <span className={labelClass}>Upload Image</span>
          <input type="file" accept="image/*" className="mt-2 block w-full rounded-xl border border-white/60 bg-white/70 px-4 py-2 text-sm font-semibold text-[#193945] file:mr-3 file:rounded-full file:border-0 file:bg-[#F46C28] file:px-3 file:py-2 file:text-xs file:font-black file:text-white" onChange={(event) => handleImageUpload(event.target.files?.[0])} />
        </label>
        <label className="md:col-span-2">
          <span className={labelClass}>Description</span>
          <textarea className="mt-2 min-h-24 w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-sm font-semibold leading-6 text-[#193945] outline-none transition focus:border-[#F46C28] focus:bg-white" value={draft.description} onChange={(event) => onChange({ ...draft, description: event.target.value })} />
        </label>
        <label className="md:col-span-2">
          <span className={labelClass}>Features</span>
          <textarea className="mt-2 min-h-24 w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-sm font-semibold leading-6 text-[#193945] outline-none transition focus:border-[#F46C28] focus:bg-white" value={draft.features} onChange={(event) => onChange({ ...draft, features: event.target.value })} />
        </label>
        <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/55 md:col-span-2">
          <img src={draft.image} alt="Service preview" className="h-56 w-full object-cover" />
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <button type="button" onClick={onSubmit} className="inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#9a4b08] via-[#c46312] to-[#F59E0B] px-6 py-3 text-sm font-black text-white shadow-[0_14px_34px_rgba(154,75,8,0.28)] transition hover:scale-[1.03] hover:shadow-[0_18px_42px_rgba(2,20,39,0.32)] sm:w-auto">
          <Plane className="h-4 w-4" />
          Save Service
        </button>
      </div>
    </div>
  );
}

function UsersPanel({
  users,
  isLoading,
  error,
  search,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
  onToggleStatus,
  onToggleRole,
}: {
  users: AdminUser[];
  isLoading: boolean;
  error: string;
  search: string;
  statusFilter: "all" | "Active" | "Blocked";
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: "all" | "Active" | "Blocked") => void;
  onToggleStatus: (userId: string) => void;
  onToggleRole: (userId: string) => void;
}) {
  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase().trim();
    const matchesSearch = !query || user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query);
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  const activeCount = users.filter((user) => user.status === "Active").length;
  const blockedCount = users.filter((user) => user.status === "Blocked").length;
  const adminsCount = users.filter((user) => user.role === "admin").length;

  return (
    <section className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Active Users", activeCount, "bg-emerald-500"],
          ["Blocked Users", blockedCount, "bg-rose-500"],
          ["Admins", adminsCount, "bg-[#F46C28]"],
        ].map(([label, value, color]) => (
          <article key={label} className="rounded-2xl border border-white/50 bg-white/42 p-5 shadow-[0_18px_50px_rgba(10,93,122,0.1)] backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.12em] text-[#6E8189]">{label}</p>
                <p className="mt-2 text-3xl font-black text-[#162F3A]">{value}</p>
              </div>
              <span className={`h-11 w-11 rounded-xl ${color}`} />
            </div>
          </article>
        ))}
      </div>

      <section className="rounded-2xl border border-white/50 bg-white/42 p-4 shadow-[0_18px_50px_rgba(10,93,122,0.1)] backdrop-blur-2xl sm:p-5">
        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-black text-[#162F3A]">Users Management</h2>
            <p className="mt-1 text-sm font-semibold text-[#6E8189]">Manage accounts, roles, and access status.</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            <input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search users..."
              className="h-11 w-full rounded-xl border border-white/60 bg-white/70 px-4 text-sm font-semibold text-[#193945] outline-none transition placeholder:text-[#6E8189]/70 focus:border-[#F46C28] focus:bg-white"
            />
            <select
              value={statusFilter}
              onChange={(event) => onStatusFilterChange(event.target.value as "all" | "Active" | "Blocked")}
              className="h-11 w-full rounded-xl border border-white/60 bg-white/70 px-4 text-sm font-semibold text-[#193945] outline-none transition focus:border-[#F46C28] focus:bg-white"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>
        </div>

        <div className="grid gap-3 sm:hidden">
          {isLoading ? (
            <div className="rounded-2xl border border-white/55 bg-white/55 p-5 text-sm font-bold text-[#6E8189]">
              Loading users from backend...
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm font-bold text-rose-700">
              {error}
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="rounded-2xl border border-white/55 bg-white/55 p-5 text-sm font-bold text-[#6E8189]">
              No users found from the backend yet.
            </div>
          ) : filteredUsers.map((user) => (
            <article key={user.id} className="rounded-2xl border border-white/55 bg-white/55 p-4">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0a5d7a]/10 text-xs font-black text-[#0a5d7a]">
                  {user.name.split(" ").map((part) => part[0]).join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-black text-[#193945]">{user.name}</p>
                  <p className="mt-1 break-all text-xs font-semibold text-[#6E8189]">{user.email}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <span className={`rounded-xl px-3 py-2 text-center text-xs font-black ${user.role === "admin" ? "bg-[#F46C28]/12 text-[#F46C28]" : "bg-[#0a5d7a]/10 text-[#0a5d7a]"}`}>
                  {user.role}
                </span>
                <span className={`rounded-xl px-3 py-2 text-center text-xs font-black ${user.status === "Active" ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200" : "bg-rose-100 text-rose-700 ring-1 ring-rose-200"}`}>
                  {user.status}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-white/55 p-2">
                  <p className="text-[10px] font-black uppercase text-[#6E8189]">Bookings</p>
                  <p className="mt-1 font-black text-[#193945]">{user.bookings}</p>
                </div>
                <div className="rounded-xl bg-white/55 p-2">
                  <p className="text-[10px] font-black uppercase text-[#6E8189]">Spent</p>
                  <p className="mt-1 font-black text-[#F59E0B]">{user.spent}</p>
                </div>
                <div className="rounded-xl bg-white/55 p-2">
                  <p className="text-[10px] font-black uppercase text-[#6E8189]">Joined</p>
                  <p className="mt-1 text-xs font-bold text-[#31596A]">{user.joined}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button type="button" onClick={() => onToggleRole(user.id)} className="rounded-full bg-white/70 px-3 py-2 text-xs font-black text-[#0a5d7a] transition hover:bg-white">
                  {user.role === "admin" ? "Make User" : "Make Admin"}
                </button>
                <button type="button" onClick={() => onToggleStatus(user.id)} className={`rounded-full px-3 py-2 text-xs font-black text-white transition ${user.status === "Active" ? "bg-rose-500 hover:bg-rose-600" : "bg-emerald-600 hover:bg-emerald-700"}`}>
                  {user.status === "Active" ? "Block" : "Activate"}
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="hidden overflow-x-auto sm:block">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="bg-white/35 text-xs uppercase tracking-[0.12em] text-[#6E8189]">
              <tr>
                <th className="px-4 py-3 font-black">User</th>
                <th className="px-4 py-3 font-black">Role</th>
                <th className="px-4 py-3 font-black">Status</th>
                <th className="px-4 py-3 font-black">Bookings</th>
                <th className="px-4 py-3 font-black">Spent</th>
                <th className="px-4 py-3 font-black">Joined</th>
                <th className="px-4 py-3 text-right font-black">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/55">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-sm font-bold text-[#6E8189]">
                    Loading users from backend...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-sm font-bold text-rose-700">
                    {error}
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-sm font-bold text-[#6E8189]">
                    No users found from the backend yet.
                  </td>
                </tr>
              ) : filteredUsers.map((user) => (
                <tr key={user.id} className="transition hover:bg-white/35">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0a5d7a]/10 text-xs font-black text-[#0a5d7a]">
                        {user.name.split(" ").map((part) => part[0]).join("")}
                      </span>
                      <div>
                        <p className="font-black text-[#193945]">{user.name}</p>
                        <p className="text-xs font-semibold text-[#6E8189]">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${user.role === "admin" ? "bg-[#F46C28]/12 text-[#F46C28]" : "bg-[#0a5d7a]/10 text-[#0a5d7a]"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${user.status === "Active" ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200" : "bg-rose-100 text-rose-700 ring-1 ring-rose-200"}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-black text-[#193945]">{user.bookings}</td>
                  <td className="px-4 py-4 font-black text-[#F59E0B]">{user.spent}</td>
                  <td className="px-4 py-4 font-semibold text-[#6E8189]">{user.joined}</td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <button type="button" onClick={() => onToggleRole(user.id)} className="rounded-full bg-white/70 px-3 py-2 text-xs font-black text-[#0a5d7a] transition hover:bg-white">
                        {user.role === "admin" ? "Make User" : "Make Admin"}
                      </button>
                      <button type="button" onClick={() => onToggleStatus(user.id)} className={`rounded-full px-3 py-2 text-xs font-black text-white transition ${user.status === "Active" ? "bg-rose-500 hover:bg-rose-600" : "bg-emerald-600 hover:bg-emerald-700"}`}>
                        {user.status === "Active" ? "Block" : "Activate"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}

function MessagesPanel({
  messages,
  comments,
  onDeleteMessage,
  onDeleteComment,
}: {
  messages: ContactMessage[];
  comments: CustomerComment[];
  onDeleteMessage: (id: string) => void;
  onDeleteComment: (id: string) => void;
}) {
  return (
    <section className="grid gap-5 xl:grid-cols-2">
      <article className="rounded-2xl border border-white/50 bg-white/42 p-5 shadow-[0_18px_50px_rgba(10,93,122,0.1)] backdrop-blur-2xl">
        <h2 className="mb-4 text-xl font-black text-[#162F3A]">Contact Messages</h2>
        <div className="space-y-3">
          {messages.length === 0 && <p className="text-sm font-bold text-[#6E8189]">No contact messages yet.</p>}
          {messages.map((message) => (
            <div key={message._id} className="rounded-2xl bg-white/55 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-black text-[#193945]">{message.name}</p>
                  <p className="text-xs font-bold text-[#6E8189]">{message.email}</p>
                </div>
                <button type="button" onClick={() => onDeleteMessage(message._id)} className="rounded-full bg-rose-100 px-3 py-1 text-xs font-black text-rose-700">Delete</button>
              </div>
              <p className="mt-3 text-sm font-black text-[#0a5d7a]">{message.subject}</p>
              <p className="mt-1 text-sm font-medium leading-6 text-[#31596A]">{message.message}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-2xl border border-white/50 bg-white/42 p-5 shadow-[0_18px_50px_rgba(10,93,122,0.1)] backdrop-blur-2xl">
        <h2 className="mb-4 text-xl font-black text-[#162F3A]">Customer Comments</h2>
        <div className="space-y-3">
          {comments.length === 0 && <p className="text-sm font-bold text-[#6E8189]">No customer comments yet.</p>}
          {comments.map((comment) => (
            <div key={comment._id} className="rounded-2xl bg-white/55 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-black text-[#193945]">{comment.name}</p>
                  <p className="text-xs font-bold text-[#6E8189]">{comment.city} {comment.phone ? `- ${comment.phone}` : ""}</p>
                </div>
                <button type="button" onClick={() => onDeleteComment(comment._id)} className="rounded-full bg-rose-100 px-3 py-1 text-xs font-black text-rose-700">Delete</button>
              </div>
              <p className="mt-3 text-sm font-medium leading-6 text-[#31596A]">{comment.comment}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const user = getStoredUser();
  const [activeSection, setActiveSection] = useState<AdminSection>("overview");
  const [adminPackages, setAdminPackages] = useState<OfferPackage[]>(() => getAdminOfferPackages());
  const [adminDestinations, setAdminDestinations] = useState<DestinationItem[]>(() => getAdminDestinations());
  const [adminServices, setAdminServices] = useState<ServiceItem[]>(() => getAdminServices());
  const [serverBookings, setServerBookings] = useState<BackendBooking[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [customerComments, setCustomerComments] = useState<CustomerComment[]>([]);
  const [backendUsers, setBackendUsers] = useState<BackendUser[]>([]);
  const [hiddenPackageIds, setHiddenPackageIds] = useState<number[]>([]);
  const [hiddenDestinationNames, setHiddenDestinationNames] = useState<string[]>([]);
  const [hiddenServiceIds, setHiddenServiceIds] = useState<number[]>([]);
  const [isAddPackageOpen, setIsAddPackageOpen] = useState(false);
  const [isAddDestinationOpen, setIsAddDestinationOpen] = useState(false);
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isAddOfferOpen, setIsAddOfferOpen] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState<number | null>(null);
  const [editingDestinationName, setEditingDestinationName] = useState<string | null>(null);
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null);
  const [packageDraft, setPackageDraft] = useState<PackageDraft>(defaultPackageDraft);
  const [destinationDraft, setDestinationDraft] = useState<DestinationDraft>(defaultDestinationDraft);
  const [serviceDraft, setServiceDraft] = useState<ServiceDraft>(defaultServiceDraft);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [systemHealthChecked, setSystemHealthChecked] = useState(false);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState("");
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [userStatusFilter, setUserStatusFilter] = useState<"all" | "Active" | "Blocked">("all");
  const isAdmin = user?.role === "admin" || user?.email === "yamanabuasal20@gmail.com";
  const currentSection = sectionTitles[activeSection];
  const allPackages = [...adminPackages, ...offers].filter((offer) => !hiddenPackageIds.includes(offer.id));
  const allDestinations = [...adminDestinations, ...destinations].filter((destination) => !hiddenDestinationNames.includes(destination.name));
  const allServices = [...adminServices, ...services].filter((service) => !hiddenServiceIds.includes(service.id));
  const activeOffers = allPackages.filter((offer) => offer.discount);
  const bookingRows: AdminBookingRow[] = serverBookings.map((booking) => ({
    id: booking._id,
    customer: booking.customer?.name || "Guest Customer",
    package: booking.destination || booking.notes || "Custom Booking",
    amount: `$${booking.totalPrice || 0}`,
    status: booking.status,
    date: new Date(booking.createdAt).toLocaleDateString(),
  }));
  const totalRevenue = serverBookings.reduce((total, booking) => total + Number(booking.totalPrice || 0), 0);
  const activeUsersCount = adminUsers.filter((adminUser) => adminUser.status === "Active").length;
  const dashboardStats = [
    { label: "Total Bookings", value: serverBookings.length.toLocaleString(), change: "Live", helper: "from backend bookings", icon: CalendarCheck, color: "bg-[#F59E0B]" },
    { label: "Total Revenue", value: formatMoney(totalRevenue), change: "Live", helper: "from booking totals", icon: CircleDollarSign, color: "bg-[#0a5d7a]" },
    { label: "Active Users", value: activeUsersCount.toLocaleString(), change: `${adminUsers.length} total`, helper: "from backend users", icon: Users, color: "bg-[#14B8A6]" },
  ];
  const systemStatusItems: SystemStatusItem[] = [
    {
      label: "Server Status",
      value: systemHealth ? "Online" : systemHealthChecked ? "Offline" : "Checking",
      tone: systemHealth ? "emerald" : systemHealthChecked ? "rose" : "amber",
    },
    {
      label: "Database",
      value: getDatabaseLabel(systemHealth),
      tone: getDatabaseTone(systemHealth),
    },
    {
      label: "API Response",
      value: systemHealth?.apiResponseMs ? `${systemHealth.apiResponseMs}ms` : "--",
      tone: systemHealth?.apiResponseMs ? (systemHealth.apiResponseMs <= 150 ? "emerald" : systemHealth.apiResponseMs <= 400 ? "amber" : "rose") : "amber",
    },
  ];
  const recentActivity: ActivityItem[] = [
    ...serverBookings
      .filter((booking) => booking.createdAt)
      .map((booking) => ({
        color: "bg-emerald-500",
        title: `New booking from ${booking.customer?.name || "Guest Customer"}`,
        time: formatTimeAgo(booking.createdAt),
        createdAt: booking.createdAt,
      })),
    ...contactMessages
      .filter((message) => message.createdAt)
      .map((message) => ({
        color: "bg-[#0a5d7a]",
        title: `New message from ${message.name}`,
        time: formatTimeAgo(message.createdAt),
        createdAt: message.createdAt,
      })),
    ...customerComments
      .filter((comment) => comment.createdAt)
      .map((comment) => ({
        color: "bg-[#F59E0B]",
        title: `New comment by ${comment.name}`,
        time: formatTimeAgo(comment.createdAt),
        createdAt: comment.createdAt,
      })),
    ...backendUsers
      .filter((backendUser) => backendUser.createdAt)
      .map((backendUser) => ({
        color: "bg-violet-500",
        title: `New user joined: ${backendUser.name}`,
        time: formatTimeAgo(backendUser.createdAt),
        createdAt: backendUser.createdAt!,
      })),
  ]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)
    .map(({ color, title, time }) => ({ color, title, time }));

  useEffect(() => {
    getSystemHealth()
      .then((health) => {
        setSystemHealth(health);
        setSystemHealthChecked(true);
      })
      .catch((error) => {
        console.error("Failed to load system health", error);
        setSystemHealth(null);
        setSystemHealthChecked(true);
      });
    getAllBookings()
      .then(setServerBookings)
      .catch((error) => {
        console.error("Failed to load admin bookings", error);
      });
    getAllMessages()
      .then(setContactMessages)
      .catch((error) => {
        console.error("Failed to load contact messages", error);
      });
    getAdminComments()
      .then(setCustomerComments)
      .catch((error) => {
        console.error("Failed to load customer comments", error);
      });
    const loadUsers = async () => {
      setUsersLoading(true);
      setUsersError("");

      try {
        const users = await getAllUsers();
        setBackendUsers(users);
        setUsersLoaded(true);
      } catch (error) {
        console.error("Failed to load admin users", error);

        if (user?.email === "yamanabuasal20@gmail.com") {
          try {
            await loginUser("yamanabuasal20@gmail.com", "123");
            const users = await getAllUsers();
            setBackendUsers(users);
            setUsersLoaded(true);
            return;
          } catch (retryError) {
            console.error("Failed to refresh admin token and load users", retryError);
            const message = retryError instanceof Error ? retryError.message : "Backend refused the users request.";
            setUsersError(`Users could not load from backend: ${message}`);
            setUsersLoaded(true);
            return;
          }
        }

        const message = error instanceof Error ? error.message : "Backend refused the users request.";
        setUsersError(`Users could not load from backend: ${message}`);
        setUsersLoaded(true);
      } finally {
        setUsersLoading(false);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    if (usersLoaded) {
      setAdminUsers(backendUsers.map((backendUser) => mapBackendUser(backendUser, serverBookings)));
    }
  }, [backendUsers, serverBookings, usersLoaded]);

  if (!isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  const handleLogout = () => {
    logoutUser();
    navigate("/auth");
  };

  const openAddPackage = () => {
    setActiveSection("packages");
    setEditingPackageId(null);
    setPackageDraft(defaultPackageDraft);
    setIsAddPackageOpen(true);
  };

  const openAddOffer = () => {
    setActiveSection("offers");
    setEditingPackageId(null);
    setPackageDraft({ ...defaultPackageDraft, badge: "Limited Offer", discount: "10", originalPrice: "$950" });
    setIsAddOfferOpen(true);
  };

  const createPackage = () => {
    if (!packageDraft.title.trim() || !packageDraft.destination.trim() || !packageDraft.description.trim()) {
      window.alert("Please fill package title, destination, and description.");
      return;
    }

    const discount = Number(packageDraft.discount);
    const newPackage: OfferPackage = {
      id: Date.now(),
      title: packageDraft.title.trim(),
      destination: packageDraft.destination.trim(),
      duration: packageDraft.duration.trim() || "5 Days / 4 Nights",
      price: packageDraft.price.trim() || "$0",
      rating: 4.8,
      reviews: 0,
      description: packageDraft.description.trim(),
      includes: packageDraft.includes.split("\n").map((item) => item.trim()).filter(Boolean),
      highlights: packageDraft.highlights.split("\n").map((item) => item.trim()).filter(Boolean),
      video: packageDraft.video,
      mediaType: packageDraft.mediaType,
      bestFor: packageDraft.bestFor.trim() || "Travelers",
      badge: packageDraft.badge.trim() || "New Package",
      ...(packageDraft.originalPrice.trim() ? { originalPrice: packageDraft.originalPrice.trim() } : {}),
      ...(Number.isFinite(discount) && discount > 0 ? { discount } : {}),
    };

    const nextPackages = editingPackageId === null
      ? [newPackage, ...adminPackages]
      : adminPackages.some((offer) => offer.id === editingPackageId)
        ? adminPackages.map((offer) => offer.id === editingPackageId ? { ...newPackage, id: editingPackageId } : offer)
        : [{ ...newPackage, id: editingPackageId }, ...adminPackages];
    setAdminPackages(nextPackages);
    saveAdminOfferPackages(nextPackages);
    if (editingPackageId !== null) {
      setHiddenPackageIds((current) => current.includes(editingPackageId) ? current : [...current, editingPackageId]);
    }
    setEditingPackageId(null);
    setPackageDraft(defaultPackageDraft);
    setIsAddPackageOpen(false);
    setIsAddOfferOpen(false);
  };

  const createDestination = () => {
    if (!destinationDraft.name.trim()) {
      window.alert("Please fill destination name.");
      return;
    }

    const newDestination: DestinationItem = {
      name: destinationDraft.name.trim(),
      tours: Number(destinationDraft.tours) || 1,
      image: destinationDraft.image,
    };
    const nextDestinations = editingDestinationName === null
      ? [newDestination, ...adminDestinations]
      : adminDestinations.some((destination) => destination.name === editingDestinationName)
        ? adminDestinations.map((destination) => destination.name === editingDestinationName ? newDestination : destination)
        : [newDestination, ...adminDestinations];
    setAdminDestinations(nextDestinations);
    saveAdminDestinations(nextDestinations);
    if (editingDestinationName !== null && editingDestinationName !== newDestination.name) {
      setHiddenDestinationNames((current) => current.includes(editingDestinationName) ? current : [...current, editingDestinationName]);
    }
    setEditingDestinationName(null);
    setDestinationDraft(defaultDestinationDraft);
    setIsAddDestinationOpen(false);
  };

  const createService = () => {
    if (!serviceDraft.title.trim() || !serviceDraft.description.trim()) {
      window.alert("Please fill service title and description.");
      return;
    }

    const newService: ServiceItem = {
      id: Date.now(),
      title: serviceDraft.title.trim(),
      description: serviceDraft.description.trim(),
      features: serviceDraft.features.split("\n").map((item) => item.trim()).filter(Boolean),
      image: serviceDraft.image,
      icon: Plane,
      cta: "Learn More",
    };
    const nextServices = editingServiceId === null
      ? [newService, ...adminServices]
      : adminServices.some((service) => service.id === editingServiceId)
        ? adminServices.map((service) => service.id === editingServiceId ? { ...newService, id: editingServiceId } : service)
        : [{ ...newService, id: editingServiceId }, ...adminServices];
    setAdminServices(nextServices);
    saveAdminServices(nextServices);
    if (editingServiceId !== null) {
      setHiddenServiceIds((current) => current.includes(editingServiceId) ? current : [...current, editingServiceId]);
    }
    setEditingServiceId(null);
    setServiceDraft(defaultServiceDraft);
    setIsAddServiceOpen(false);
  };

  const editPackage = (offer: OfferPackage, mode: "packages" | "offers" = "packages") => {
    setActiveSection(mode);
    setEditingPackageId(offer.id);
    setPackageDraft({
      title: offer.title,
      destination: offer.destination,
      duration: offer.duration,
      price: offer.price,
      originalPrice: offer.originalPrice || "",
      discount: offer.discount ? String(offer.discount) : "",
      description: offer.description,
      bestFor: offer.bestFor,
      badge: offer.badge,
      video: offer.video,
      mediaType: offer.mediaType,
      includes: offer.includes.join("\n"),
      highlights: offer.highlights.join("\n"),
    });
    setIsAddPackageOpen(mode === "packages");
    setIsAddOfferOpen(mode === "offers");
  };

  const deletePackage = (packageId: number) => {
    const nextPackages = adminPackages.filter((offer) => offer.id !== packageId);
    setAdminPackages(nextPackages);
    saveAdminOfferPackages(nextPackages);
    if (!adminPackages.some((offer) => offer.id === packageId)) {
      setHiddenPackageIds((current) => current.includes(packageId) ? current : [...current, packageId]);
    }
  };

  const editDestination = (destination: DestinationItem) => {
    setEditingDestinationName(destination.name);
    setDestinationDraft({
      name: destination.name,
      tours: String(destination.tours),
      image: destination.image,
    });
    setIsAddDestinationOpen(true);
  };

  const deleteDestinationItem = (name: string) => {
    const nextDestinations = adminDestinations.filter((destination) => destination.name !== name);
    setAdminDestinations(nextDestinations);
    saveAdminDestinations(nextDestinations);
    if (!adminDestinations.some((destination) => destination.name === name)) {
      setHiddenDestinationNames((current) => current.includes(name) ? current : [...current, name]);
    }
  };

  const editService = (service: ServiceItem) => {
    setEditingServiceId(service.id);
    setServiceDraft({
      title: service.title,
      description: service.description,
      features: service.features.join("\n"),
      image: service.image,
    });
    setIsAddServiceOpen(true);
  };

  const deleteServiceItem = (serviceId: number) => {
    const nextServices = adminServices.filter((service) => service.id !== serviceId);
    setAdminServices(nextServices);
    saveAdminServices(nextServices);
    if (!adminServices.some((service) => service.id === serviceId)) {
      setHiddenServiceIds((current) => current.includes(serviceId) ? current : [...current, serviceId]);
    }
  };

  const deleteBookingRow = async (bookingId: string) => {
    await deleteBackendBooking(bookingId);
    setServerBookings((current) => current.filter((booking) => booking._id !== bookingId));
  };

  const changeBookingStatus = async (bookingId: string, status: BackendBooking["status"]) => {
    const updated = await updateBackendBooking(bookingId, { status });
    setServerBookings((current) => current.map((booking) => booking._id === bookingId ? updated : booking));
  };

  const removeContactMessage = async (messageId: string) => {
    await deleteContactMessage(messageId);
    setContactMessages((current) => current.filter((message) => message._id !== messageId));
  };

  const removeCustomerComment = async (commentId: string) => {
    await deleteComment(commentId);
    setCustomerComments((current) => current.filter((comment) => comment._id !== commentId));
  };

  const generateReport = () => {
    const report = [
      "Rainbow Travel Admin Report",
      `Generated: ${new Date().toLocaleString()}`,
      "",
      `Total bookings: ${bookingRows.length}`,
      `Total users: ${adminUsers.length}`,
      `Total revenue: ${formatMoney(totalRevenue)}`,
      `Visible packages: ${allPackages.length}`,
      `Admin-added packages: ${adminPackages.length}`,
      `Destinations: ${allDestinations.length}`,
      `Services: ${allServices.length}`,
      `Active offers: ${activeOffers.length}`,
    ].join("\n");

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "rainbow-travel-admin-report.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  const toggleUserStatus = async (userId: string) => {
    const targetUser = adminUsers.find((adminUser) => adminUser.id === userId);
    if (!targetUser) {
      return;
    }

    const nextStatus = targetUser.status === "Active" ? "Blocked" : "Active";
    setAdminUsers((currentUsers) =>
      currentUsers.map((adminUser) => adminUser.id === userId ? { ...adminUser, status: nextStatus } : adminUser)
    );

    try {
      const updatedUser = await updateBackendUser(userId, { status: nextStatus.toLowerCase() as BackendUser["status"] });
      setBackendUsers((currentUsers) => currentUsers.map((backendUser) => (backendUser._id || backendUser.id || backendUser.email) === userId ? updatedUser : backendUser));
    } catch (error) {
      console.error("Failed to update user status", error);
      setAdminUsers((currentUsers) =>
        currentUsers.map((adminUser) => adminUser.id === userId ? { ...adminUser, status: targetUser.status } : adminUser)
      );
    }
  };

  const toggleUserRole = async (userId: string) => {
    const targetUser = adminUsers.find((adminUser) => adminUser.id === userId);
    if (!targetUser) {
      return;
    }

    const nextRole = targetUser.role === "admin" ? "user" : "admin";
    setAdminUsers((currentUsers) =>
      currentUsers.map((adminUser) => adminUser.id === userId ? { ...adminUser, role: nextRole } : adminUser)
    );

    try {
      const updatedUser = await updateBackendUser(userId, { role: nextRole });
      setBackendUsers((currentUsers) => currentUsers.map((backendUser) => (backendUser._id || backendUser.id || backendUser.email) === userId ? updatedUser : backendUser));
    } catch (error) {
      console.error("Failed to update user role", error);
      setAdminUsers((currentUsers) =>
        currentUsers.map((adminUser) => adminUser.id === userId ? { ...adminUser, role: targetUser.role } : adminUser)
      );
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed text-[#1F2933]" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="min-h-screen bg-white/18 backdrop-blur-[2px]">
        <div className="flex min-h-screen">
          <aside className="hidden w-72 shrink-0 border-r border-white/45 bg-white/35 px-4 py-5 shadow-[20px_0_60px_rgba(10,93,122,0.12)] backdrop-blur-2xl lg:block">
            <div className="mb-8 flex items-center gap-3 rounded-2xl bg-white/45 p-3 ring-1 ring-white/55">
              <img src={logo} alt="Rainbow Travel" className="h-11 w-11 rounded-xl bg-white/80 p-1.5" />
              <div>
                <p className="text-sm font-black text-[#0a5d7a]">Rainbow Travel</p>
                <p className="text-xs font-semibold text-[#805B4E]">Admin Console</p>
              </div>
            </div>

            <nav className="space-y-1.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition ${
                    activeSection === item.id
                      ? "bg-[#F46C28] text-white shadow-lg shadow-[#F46C28]/25"
                      : "text-[#31596A] hover:bg-white/55 hover:text-[#F46C28]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  {activeSection === item.id && <ChevronRight className="h-4 w-4" />}
                </button>
              ))}
            </nav>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-8 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-[#805B4E] transition hover:bg-white/55 hover:text-[#F46C28]"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </aside>

          <main className="min-w-0 flex-1 px-3 py-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <header className="mb-4 flex flex-col gap-4 rounded-2xl border border-white/45 bg-white/35 p-4 shadow-[0_24px_70px_rgba(10,93,122,0.12)] backdrop-blur-2xl sm:mb-6 sm:rounded-3xl sm:p-5 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/55 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#F46C28]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Admin Panel
                  </div>
                  <h1 className="break-words text-2xl font-black tracking-tight text-[#162F3A] sm:text-3xl md:text-4xl">{currentSection.title}</h1>
                  <p className="mt-2 text-sm font-medium leading-6 text-[#5C6F77]">
                    {activeSection === "overview" ? `Welcome back, ${user?.name || "Admin"}. ${currentSection.subtitle}` : currentSection.subtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0a5d7a] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#0a5d7a]/20 transition hover:bg-[#08495f] lg:hidden"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </header>

              <nav className="sticky top-2 z-30 mb-4 overflow-x-auto rounded-2xl border border-white/45 bg-white/45 p-2 shadow-[0_18px_50px_rgba(10,93,122,0.12)] backdrop-blur-2xl lg:hidden">
                <div className="flex min-w-max gap-2">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveSection(item.id)}
                      className={`inline-flex h-10 items-center gap-2 rounded-xl px-3 text-xs font-black transition ${
                        activeSection === item.id
                          ? "bg-[#F46C28] text-white shadow-lg shadow-[#F46C28]/25"
                          : "bg-white/50 text-[#31596A] hover:bg-white"
                      }`}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </nav>

              {activeSection === "overview" && (
                <>
                  <section className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {dashboardStats.map((stat) => (
                      <article key={stat.label} className="rounded-2xl border border-white/50 bg-white/42 p-4 shadow-[0_18px_50px_rgba(10,93,122,0.1)] backdrop-blur-2xl sm:p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-black uppercase tracking-[0.12em] text-[#6E8189]">{stat.label}</p>
                            <p className="mt-3 text-2xl font-black text-[#0D2530] sm:text-3xl">{stat.value}</p>
                          </div>
                          <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-lg ${stat.color}`}>
                            <stat.icon className="h-5 w-5" />
                          </div>
                        </div>
                        <p className="mt-4 text-xs font-bold text-[#6E8189]">
                          <span className="text-emerald-600">{stat.change}</span> {stat.helper}
                        </p>
                      </article>
                    ))}
                  </section>

                  <div className="mt-4">
                    <BookingsTable rows={bookingRows} onDelete={deleteBookingRow} onStatusChange={changeBookingStatus} />
                  </div>

                  <section className="mt-4 grid gap-4 lg:grid-cols-[1.05fr_1fr_1fr]">
                    <article className="rounded-2xl border border-white/50 bg-white/42 p-4 shadow-[0_18px_50px_rgba(10,93,122,0.1)] backdrop-blur-2xl sm:p-5">
                      <h2 className="mb-4 text-xl font-black text-[#162F3A]">Quick Actions</h2>
                      <div className="grid gap-3">
                        <button type="button" onClick={openAddPackage} className="overflow-hidden rounded-xl bg-gradient-to-r from-[#9a4b08] via-[#c46312] to-[#F59E0B] px-4 py-3 text-sm font-black text-white shadow-[0_14px_34px_rgba(154,75,8,0.28)] transition hover:scale-[1.03] hover:shadow-[0_18px_42px_rgba(2,20,39,0.32)]">Add New Package</button>
                        <button type="button" onClick={() => setActiveSection("bookings")} className="rounded-xl bg-white/65 px-4 py-3 text-sm font-black text-[#0a5d7a] transition hover:bg-white">View All Bookings</button>
                        <button type="button" onClick={generateReport} className="rounded-xl bg-white/65 px-4 py-3 text-sm font-black text-[#0a5d7a] transition hover:bg-white">Generate Report</button>
                      </div>
                    </article>

                    <article className="rounded-2xl border border-white/50 bg-white/42 p-4 shadow-[0_18px_50px_rgba(10,93,122,0.1)] backdrop-blur-2xl sm:p-5">
                      <h2 className="mb-4 text-xl font-black text-[#162F3A]">System Status</h2>
                      <div className="space-y-4 text-sm font-bold text-[#31596A]">
                        {systemStatusItems.map(({ label, value, tone }) => (
                          <div key={label} className="flex items-center justify-between">
                            <span>{label}</span>
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-black ring-1 ${
                                tone === "emerald"
                                  ? "bg-emerald-100 text-emerald-700 ring-emerald-200"
                                  : tone === "sky"
                                    ? "bg-sky-100 text-sky-700 ring-sky-200"
                                    : tone === "rose"
                                      ? "bg-rose-100 text-rose-700 ring-rose-200"
                                      : "bg-amber-100 text-amber-700 ring-amber-200"
                              }`}
                            >
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </article>

                    <article className="rounded-2xl border border-white/50 bg-white/42 p-4 shadow-[0_18px_50px_rgba(10,93,122,0.1)] backdrop-blur-2xl sm:p-5">
                      <h2 className="mb-4 text-xl font-black text-[#162F3A]">Recent Activity</h2>
                      <div className="space-y-4 text-sm">
                        {recentActivity.length === 0 ? (
                          <p className="text-sm font-bold text-[#6E8189]">No recent backend activity yet.</p>
                        ) : recentActivity.map(({ color, title, time }) => (
                          <div key={title} className="flex gap-3">
                            <span className={`mt-1.5 h-2.5 w-2.5 rounded-full ${color}`} />
                            <div>
                              <p className="font-black text-[#193945]">{title}</p>
                              <p className="text-xs font-semibold text-[#6E8189]">{time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </article>
                  </section>
                </>
              )}

              {activeSection === "bookings" && <BookingsTable rows={bookingRows} onDelete={deleteBookingRow} onStatusChange={changeBookingStatus} />}

              {activeSection === "packages" && (
                <section className="rounded-2xl border border-white/50 bg-white/42 p-4 shadow-[0_18px_50px_rgba(10,93,122,0.1)] backdrop-blur-2xl sm:p-5">
                  <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-xl font-black text-[#162F3A]">Packages</h2>
                    <button type="button" onClick={openAddPackage} className="overflow-hidden rounded-full bg-gradient-to-r from-[#9a4b08] via-[#c46312] to-[#F59E0B] px-4 py-2 text-xs font-black text-white shadow-[0_14px_34px_rgba(154,75,8,0.28)] transition hover:scale-[1.03] hover:shadow-[0_18px_42px_rgba(2,20,39,0.32)]">Add Package</button>
                  </div>
                  {isAddPackageOpen && (
                    <AddPackageForm
                      draft={packageDraft}
                      onChange={setPackageDraft}
                      onCancel={() => {
                        setEditingPackageId(null);
                        setIsAddPackageOpen(false);
                      }}
                      onSubmit={createPackage}
                    />
                  )}
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {allPackages.map((offer) => (
                      <article key={offer.id} className="overflow-hidden rounded-2xl border border-white/55 bg-white/55">
                        <div className="relative h-40 bg-[#0a5d7a]/10">
                          {offer.mediaType === "image" ? (
                            <img src={offer.video} alt={offer.title} className="h-full w-full object-cover" />
                          ) : (
                            <video src={offer.video} className="h-full w-full object-cover" muted />
                          )}
                          {offer.discount && <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-black text-[#F46C28]">{offer.discount}% OFF</span>}
                        </div>
                        <div className="p-4">
                          <p className="text-base font-black text-[#193945]">{offer.title}</p>
                          <p className="mt-1 text-xs font-bold text-[#6E8189]">{offer.destination} · {offer.duration}</p>
                          <div className="mt-3 flex items-center justify-between text-sm font-black">
                            <span className="text-[#F59E0B]">{offer.price}</span>
                            <span className="rounded-full bg-[#0a5d7a]/10 px-3 py-1 text-xs text-[#0a5d7a]">{offer.badge}</span>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <button type="button" onClick={() => editPackage(offer, "packages")} className="flex-1 rounded-full bg-[#0a5d7a]/10 px-3 py-2 text-xs font-black text-[#0a5d7a]">Edit</button>
                            <button type="button" onClick={() => deletePackage(offer.id)} className="flex-1 rounded-full bg-rose-100 px-3 py-2 text-xs font-black text-rose-700">Delete</button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {activeSection === "destinations" && (
                <section className="rounded-2xl border border-white/50 bg-white/42 p-4 shadow-[0_18px_50px_rgba(10,93,122,0.1)] backdrop-blur-2xl sm:p-5">
                  <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-xl font-black text-[#162F3A]">Destinations</h2>
                    <button type="button" onClick={() => setIsAddDestinationOpen(true)} className="rounded-full bg-[#0a5d7a] px-4 py-2 text-xs font-black text-white shadow-lg shadow-[#0a5d7a]/20">Add Destination</button>
                  </div>
                  {isAddDestinationOpen && (
                    <AddDestinationForm
                      draft={destinationDraft}
                      onChange={setDestinationDraft}
                      onCancel={() => {
                        setEditingDestinationName(null);
                        setIsAddDestinationOpen(false);
                      }}
                      onSubmit={createDestination}
                    />
                  )}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {allDestinations.map((destination) => (
                      <article key={destination.name} className="overflow-hidden rounded-2xl border border-white/55 bg-white/55">
                        <img src={destination.image} alt={destination.name} className="h-36 w-full object-cover" />
                        <div className="p-4">
                          <p className="text-base font-black text-[#193945]">{destination.name}</p>
                          <p className="mt-1 text-xs font-bold text-[#6E8189]">{destination.tours} tours available</p>
                          <div className="mt-4 flex gap-2">
                            <button type="button" onClick={() => editDestination(destination)} className="flex-1 rounded-full bg-[#0a5d7a]/10 px-3 py-2 text-xs font-black text-[#0a5d7a]">Edit</button>
                            <button type="button" onClick={() => deleteDestinationItem(destination.name)} className="flex-1 rounded-full bg-rose-100 px-3 py-2 text-xs font-black text-rose-700">Delete</button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {activeSection === "services" && (
                <section className="rounded-2xl border border-white/50 bg-white/42 p-4 shadow-[0_18px_50px_rgba(10,93,122,0.1)] backdrop-blur-2xl sm:p-5">
                  <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-xl font-black text-[#162F3A]">Services</h2>
                    <button type="button" onClick={() => setIsAddServiceOpen(true)} className="overflow-hidden rounded-full bg-gradient-to-r from-[#9a4b08] via-[#c46312] to-[#F59E0B] px-4 py-2 text-xs font-black text-white shadow-[0_14px_34px_rgba(154,75,8,0.28)] transition hover:scale-[1.03] hover:shadow-[0_18px_42px_rgba(2,20,39,0.32)]">Add Service</button>
                  </div>
                  {isAddServiceOpen && (
                    <AddServiceForm
                      draft={serviceDraft}
                      onChange={setServiceDraft}
                      onCancel={() => {
                        setEditingServiceId(null);
                        setIsAddServiceOpen(false);
                      }}
                      onSubmit={createService}
                    />
                  )}
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {allServices.map((service) => (
                      <article key={service.id} className="rounded-2xl border border-white/55 bg-white/55 p-4">
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F59E0B]/15 text-[#F46C28]">
                            <service.icon className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="text-base font-black text-[#193945]">{service.title}</p>
                            <p className="mt-1 line-clamp-3 text-xs font-medium leading-5 text-[#6E8189]">{service.description}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                              <button type="button" onClick={() => editService(service)} className="rounded-full bg-[#0a5d7a]/10 px-3 py-2 text-xs font-black text-[#0a5d7a]">Edit</button>
                              <button type="button" onClick={() => deleteServiceItem(service.id)} className="rounded-full bg-rose-100 px-3 py-2 text-xs font-black text-rose-700">Delete</button>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {activeSection === "offers" && (
                <section className="rounded-2xl border border-white/50 bg-white/42 p-4 shadow-[0_18px_50px_rgba(10,93,122,0.1)] backdrop-blur-2xl sm:p-5">
                  <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-xl font-black text-[#162F3A]">Active Offers</h2>
                    <button type="button" onClick={openAddOffer} className="rounded-full bg-[#0a5d7a] px-4 py-2 text-xs font-black text-white shadow-lg shadow-[#0a5d7a]/20">Add Offer</button>
                  </div>
                  {isAddOfferOpen && (
                    <AddPackageForm
                      draft={packageDraft}
                      onChange={setPackageDraft}
                      onCancel={() => {
                        setEditingPackageId(null);
                        setIsAddOfferOpen(false);
                      }}
                      onSubmit={createPackage}
                    />
                  )}
                  <div className="grid gap-4 md:grid-cols-2">
                    {activeOffers.map((offer) => (
                      <article key={offer.id} className="rounded-2xl border border-white/55 bg-white/55 p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-base font-black text-[#193945]">{offer.title}</p>
                            <p className="mt-1 text-xs font-bold text-[#6E8189]">{offer.destination}</p>
                          </div>
                          <span className="rounded-full bg-[#F46C28]/12 px-3 py-1 text-xs font-black text-[#F46C28]">{offer.discount}% OFF</span>
                        </div>
                        <div className="mt-4 flex items-center gap-3 text-sm font-black">
                          <span className="text-[#6E8189] line-through">{offer.originalPrice}</span>
                          <span className="text-[#F59E0B]">{offer.price}</span>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <button type="button" onClick={() => editPackage(offer, "offers")} className="flex-1 rounded-full bg-[#0a5d7a]/10 px-3 py-2 text-xs font-black text-[#0a5d7a]">Edit</button>
                          <button type="button" onClick={() => deletePackage(offer.id)} className="flex-1 rounded-full bg-rose-100 px-3 py-2 text-xs font-black text-rose-700">Delete</button>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {activeSection === "users" && (
                <UsersPanel
                  users={adminUsers}
                  isLoading={usersLoading}
                  error={usersError}
                  search={userSearch}
                  statusFilter={userStatusFilter}
                  onSearchChange={setUserSearch}
                  onStatusFilterChange={setUserStatusFilter}
                  onToggleStatus={toggleUserStatus}
                  onToggleRole={toggleUserRole}
                />
              )}
              {activeSection === "messages" && (
                <MessagesPanel
                  messages={contactMessages}
                  comments={customerComments}
                  onDeleteMessage={removeContactMessage}
                  onDeleteComment={removeCustomerComment}
                />
              )}
              {activeSection === "analytics" && <EmptyAdminSection title="Analytics" />}
              {activeSection === "settings" && <SettingsPanel />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
