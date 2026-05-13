import { useState } from "react";
import { MapPin, Phone, Mail, Facebook, Instagram, Send } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { sendContactMessage } from "../services/apiService";
import { useLanguage } from "../contexts/LanguageContext";
import heroBg from "../../assets/h1-bg01.jpg";
import contactVideo from "@/assets/contact-us.mp4";

export function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await sendContactMessage(
        formData.name,
        formData.email,
        "Contact Form Message",
        formData.message
      );
      
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('failedToSendMessage');
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed text-[#021427]"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Hero */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000816]/85 via-[#021427]/70 to-[#F59E0B]/15 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-6xl md:text-7xl font-black mb-4 drop-shadow-lg"
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif", letterSpacing: '-0.02em' }}
          >
            <span className="bg-gradient-to-r from-white via-[#F59E0B] to-white bg-clip-text text-transparent">
              {t('contactUs')}
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-white/85 font-light max-w-2xl mx-auto drop-shadow-lg" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
            {t('getInTouch')}
          </p>
        </div>
      </section>

      {/* Intro + Video */}
      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-[#fff7ea]/94 to-[#f4dfbf]/96" />
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_35%,rgba(245,158,11,0.10),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.16),transparent_18%),radial-gradient(circle_at_72%_78%,rgba(245,158,11,0.08),transparent_22%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-6">
              <motion.div
                className="relative mx-auto h-full min-h-[38rem] max-w-[30rem] overflow-hidden rounded-t-[999px] rounded-b-[2rem] border border-white/55 bg-white/10 shadow-[0_26px_70px_rgba(2,20,39,0.12)]"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-transparent to-[#f59e0b]/10 z-10" />
                <video
                  src={contactVideo}
                  className="block h-full w-full object-cover object-center"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#fbf5ea] to-transparent z-20" />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#021427]/30 via-transparent to-transparent z-20" />
              </motion.div>
            </div>

            <div className="lg:col-span-6 lg:pl-6 xl:pl-10">
              <Card className="h-full overflow-hidden border-white/70 bg-white/70 backdrop-blur-md shadow-[0_22px_70px_rgba(2,20,39,0.09)]">
                <div className="relative overflow-hidden border-b border-[#021427]/8 bg-gradient-to-r from-[#fbf8f1] via-white to-[#f6e1c2] px-6 py-6 md:px-8 md:py-7 text-center">
                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#F59E0B]/12 blur-3xl" />
                  <div className="absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-[#021427]/8 blur-3xl" />
                  <p className="text-sm uppercase tracking-[0.35em] text-[#F59E0B]" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                    Send Us a Message
                  </p>
                  <h3 className="mt-3 text-3xl md:text-4xl font-black tracking-[-0.03em] text-[#021427]" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                    Let&apos;s plan something unforgettable.
                  </h3>
                  <p className="mx-auto mt-4 max-w-xl text-sm md:text-base leading-8 text-[#586271]" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                    Share your travel ideas and we&apos;ll turn them into a smooth, tailored plan with a premium touch.
                  </p>
                </div>

                <div className="p-5 md:p-6">
                  {submitted ? (
                    <div className="rounded-[2rem] border border-[#F59E0B]/20 bg-gradient-to-br from-[#fff8ee] via-white to-[#fdf0dc] p-8 text-center shadow-[0_16px_40px_rgba(2,20,39,0.06)]">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#021427] to-[#F59E0B] shadow-lg shadow-[#021427]/10">
                        <Send className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="text-2xl font-black text-[#021427]" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                        {t('messageSentSuccessfully')}
                      </h4>
                      <p className="mt-2 text-[#56606d]" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                        {t('thankYouContact')}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {error && (
                        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                          {error}
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="rounded-2xl border-[#021427]/15 bg-white/85 py-6 shadow-sm focus-visible:ring-[#F59E0B]"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="rounded-2xl border-[#021427]/15 bg-white/85 py-6 shadow-sm focus-visible:ring-[#F59E0B]"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="0597441666"
                          value={formData.phone}
                          onChange={handleChange}
                          className="rounded-2xl border-[#021427]/15 bg-white/85 py-6 shadow-sm focus-visible:ring-[#F59E0B]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us about your travel plans or ask us any questions..."
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={7}
                          className="min-h-[200px] rounded-[1.5rem] border-[#021427]/15 bg-white/85 shadow-sm focus-visible:ring-[#F59E0B] resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={loading}
                        className="w-full rounded-full bg-gradient-to-r from-[#021427] via-[#0e2340] to-[#F59E0B] py-6 text-base font-semibold shadow-[0_18px_40px_rgba(2,20,39,0.18)] transition-all duration-300 hover:from-[#0a1930] hover:to-[#ea8f06] disabled:opacity-50"
                      >
                        {loading ? t('sending') : 'Send Message'}
                        <Send className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-white/12 via-white/10 to-[#f59e0b]/8 backdrop-blur-md" />
        <div className="absolute inset-0 opacity-18 bg-[radial-gradient(circle_at_15%_18%,rgba(245,158,11,0.06),transparent_24%),radial-gradient(circle_at_84%_22%,rgba(255,255,255,0.16),transparent_18%),radial-gradient(circle_at_68%_82%,rgba(245,158,11,0.05),transparent_22%)]" />
        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white/20 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <Card className="overflow-hidden border-white/50 bg-white/10 backdrop-blur-2xl shadow-[0_20px_60px_rgba(2,20,39,0.08)]">
                <div className="p-6 md:p-7">
                  <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#F59E0B]" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                    Get in Touch
                  </p>
                  <h3 className="text-3xl md:text-4xl font-black tracking-[-0.03em] text-[#021427]" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                    We&apos;re here to help.
                  </h3>
                  <p className="mt-4 max-w-md text-sm md:text-base leading-8 text-[#586271]" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                    Send us a message or use the contact details below. We&apos;ll guide you from the first idea to the final booking.
                  </p>
                </div>
              </Card>

              <div className="grid gap-4">
                {[
                  {
                    icon: MapPin,
                    title: "Office Location",
                    lines: ["Nablus City Center", "Second Floor", "Nablus, Palestine"],
                  },
                  {
                    icon: Phone,
                    title: "Phone Number",
                    lines: ["0597441666", "Available 24/7 for inquiries"],
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    lines: ["info@rainbowtravel.ps", "We\'ll respond within 24 hours"],
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <Card key={item.title} className="border-white/50 bg-white/8 backdrop-blur-2xl shadow-[0_16px_45px_rgba(2,20,39,0.07)] transition-transform duration-300 hover:-translate-y-1">
                      <div className="flex items-start gap-4 p-5">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#021427] to-[#F59E0B] shadow-lg shadow-[#021427]/15">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#021427]" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                            {item.title}
                          </h4>
                          <div className="mt-2 space-y-1 text-sm md:text-base leading-7 text-[#56606d]" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                            {item.lines.map((line) => (
                              <p key={line}>{line}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <Card className="border-white/50 bg-white/8 backdrop-blur-2xl shadow-[0_20px_60px_rgba(2,20,39,0.08)]">
                <div className="p-5 md:p-6">
                  <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#F59E0B]" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                    Follow Us on Social Media
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <a href="https://www.facebook.com/RainbowPalestina/" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#021427] text-white shadow-md transition-transform hover:-translate-y-1">
                      <Facebook className="h-6 w-6" />
                    </a>
                    <a href="https://www.instagram.com/rainbowtours93/" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F59E0B] text-white shadow-md transition-transform hover:-translate-y-1">
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a href="https://www.tiktok.com/@rainbowtourspal" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#021427] text-white shadow-md transition-transform hover:-translate-y-1">
                      <SiTiktok className="h-6 w-6" />
                    </a>
                    <div className="ml-2 text-sm leading-7 text-[#56606d]" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                      <p>@RainbowTours</p>
                      <p>@Rinbowtours93</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-7">
              <Card className="overflow-hidden border-white/50 bg-white/10 backdrop-blur-2xl shadow-[0_22px_70px_rgba(2,20,39,0.09)]">
                <div className="p-5 md:p-6">
                  <div className="rounded-[2rem] border border-white/22 bg-white/8 p-5 md:p-6 shadow-[0_14px_40px_rgba(2,20,39,0.05)] backdrop-blur-2xl">
                    <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#F59E0B]" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                      Details
                    </p>
                    <div className="grid gap-4 sm:grid-cols-3">
                      {[
                        { icon: MapPin, title: "Office Location", text: ["Nablus City Center", "Second Floor", "Nablus, Palestine"] },
                        { icon: Phone, title: "Phone Number", text: ["0597441666", "Available 24/7 for inquiries"] },
                        { icon: Mail, title: "Email", text: ["info@rainbowtravel.ps", "We\'ll respond within 24 hours"] },
                      ].map((item) => {
                        const Icon = item.icon;
                        return (
                          <div key={item.title} className="rounded-[1.5rem] border border-white/60 bg-white/70 p-5">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#021427] to-[#F59E0B] text-white shadow-lg shadow-[#021427]/10">
                              <Icon className="h-5 w-5" />
                            </div>
                            <h4 className="mt-4 text-lg font-bold text-[#021427]" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                              {item.title}
                            </h4>
                            <div className="mt-2 space-y-1 text-sm leading-7 text-[#56606d]" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                              {item.text.map((line) => <p key={line}>{line}</p>)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <Card className="mt-5 border-white/50 bg-white/8 backdrop-blur-2xl shadow-[0_18px_50px_rgba(2,20,39,0.06)]">
                    <div className="p-5 md:p-6">
                      <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#F59E0B]" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                        Follow Us on Social Media
                      </p>
                      <div className="flex flex-wrap items-center gap-3">
                        <a href="https://www.facebook.com/RainbowPalestina/" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#021427] text-white shadow-md transition-transform hover:-translate-y-1">
                          <Facebook className="h-6 w-6" />
                        </a>
                        <a href="https://www.instagram.com/rainbowtours93/" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F59E0B] text-white shadow-md transition-transform hover:-translate-y-1">
                          <Instagram className="h-6 w-6" />
                        </a>
                        <a href="https://www.tiktok.com/@rainbowtourspal" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#021427] text-white shadow-md transition-transform hover:-translate-y-1">
                          <SiTiktok className="h-6 w-6" />
                        </a>
                        <div className="ml-2 text-sm leading-7 text-[#56606d]" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                          <p>@RainbowTours</p>
                          <p>@Rinbowtours93</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f59e0b]/5 via-white/3 to-white/5" />
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_25%_30%,rgba(245,158,11,0.08),transparent_28%),radial-gradient(circle_at_75%_25%,rgba(2,20,39,0.06),transparent_22%),radial-gradient(circle_at_45%_75%,rgba(245,158,11,0.06),transparent_25%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-12 md:mb-16 text-center">
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#F59E0B]" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
              Visit Us
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em] text-[#021427]" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
              Find Our Office
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#586271]" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
              Located in the heart of Nablus City Center, our office is easily accessible and ready to welcome you.
            </p>
          </div>

          {/* Map Container */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Map */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden border-white/50 bg-white/8 backdrop-blur-2xl shadow-[0_24px_80px_rgba(2,20,39,0.12)] h-full">
                <div className="relative h-[420px] md:h-[500px] overflow-hidden rounded-[2rem] m-4">
                  <div className="absolute inset-0 rounded-[1.5rem] overflow-hidden">
                    <iframe
                      title="Office Location Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3366.3449833335236!2d35.22558!3d32.2252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151c6cd2b5b5b5b5%3A0x1234567890abc!2sNablus%20City%20Center%2C%20Nablus!5e0!3m2!1sen!2sps!4v1234567890"
                      className="w-full h-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-[1.5rem] border-2 border-white/30 pointer-events-none shadow-[inset_0_0_40px_rgba(245,158,11,0.08)]" />
                </div>
              </Card>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              {[
                {
                  icon: MapPin,
                  title: "Address",
                  content: "Nablus City Center\nSecond Floor\nNablus, Palestine",
                },
                {
                  icon: Phone,
                  title: "Call Us",
                  content: "0597441666\n24/7 Support",
                },
                {
                  icon: Mail,
                  title: "Email Us",
                  content: "info@rainbowtravel.ps\nResponse: Within 24h",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <Card className="border-white/60 bg-white/12 backdrop-blur-2xl shadow-[0_18px_50px_rgba(2,20,39,0.08)] transition-all duration-300 hover:bg-white/16 hover:shadow-[0_20px_60px_rgba(2,20,39,0.12)] hover:-translate-y-1">
                      <div className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#021427] to-[#F59E0B] shadow-lg shadow-[#021427]/20">
                            <Icon className="h-7 w-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-black text-[#021427]" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                              {item.title}
                            </h4>
                            <div className="mt-3 whitespace-pre-line text-sm md:text-base leading-7 text-[#586271]" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                              {item.content}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <a
                  href="https://www.google.com/maps/place/Nablus+City+Center,+Nablus/@32.2252,35.22558"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-full bg-gradient-to-r from-[#021427] via-[#0e2340] to-[#F59E0B] px-8 py-4 text-center font-semibold text-white shadow-[0_18px_40px_rgba(2,20,39,0.18)] transition-all duration-300 hover:from-[#0a1930] hover:to-[#ea8f06] hover:shadow-[0_24px_48px_rgba(2,20,39,0.24)]"
                >
                  Get Directions
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}