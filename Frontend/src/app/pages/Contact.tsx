import { useState } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";
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
        t("contactFormSubject"),
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
      className="min-h-screen bg-cover bg-center text-[#021427] md:bg-fixed"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-20 sm:py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000816]/85 via-[#021427]/70 to-[#F59E0B]/15 z-0" />

        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <h1
            className="mb-4 text-4xl font-black drop-shadow-lg sm:text-5xl md:text-7xl"
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif", letterSpacing: '-0.02em' }}
          >
            <span className="bg-gradient-to-r from-white via-[#F59E0B] to-white bg-clip-text text-transparent">
              {t('contactUs')}
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-light text-white/85 drop-shadow-lg sm:text-2xl md:text-3xl" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
            {t('getInTouch')}
          </p>
        </div>
      </section>

      {/* Intro + Video */}
      <section className="relative overflow-hidden py-8 sm:py-12 md:py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-[#fff7ea]/94 to-[#f4dfbf]/96" />
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_35%,rgba(245,158,11,0.10),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.16),transparent_18%),radial-gradient(circle_at_72%_78%,rgba(245,158,11,0.08),transparent_22%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-6 md:gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <motion.div
                className="relative mx-auto aspect-[4/5] w-full max-w-[19rem] overflow-hidden rounded-t-[999px] rounded-b-[1.5rem] border border-white/55 bg-white/10 shadow-[0_20px_50px_rgba(2,20,39,0.12)] sm:max-w-[24rem] md:max-w-[28rem] lg:h-full lg:min-h-[34rem] lg:max-w-[30rem] lg:rounded-b-[2rem] lg:shadow-[0_26px_70px_rgba(2,20,39,0.12)]"
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
                <div className="absolute inset-x-0 top-0 z-20 h-12 bg-gradient-to-b from-[#fbf5ea] to-transparent sm:h-16 md:h-20" />
                <div className="absolute inset-x-0 bottom-0 z-20 h-16 bg-gradient-to-t from-[#021427]/30 via-transparent to-transparent sm:h-24 md:h-28" />
              </motion.div>
            </div>

            <div className="min-w-0 lg:col-span-6 lg:pl-6 xl:pl-10">
              <Card className="h-full overflow-hidden border-white/70 bg-white/70 backdrop-blur-md shadow-[0_22px_70px_rgba(2,20,39,0.09)]">
                <div className="relative overflow-hidden border-b border-[#021427]/8 bg-gradient-to-r from-[#fbf8f1] via-white to-[#f6e1c2] px-4 py-5 text-center sm:px-6 sm:py-6 md:px-8 md:py-7">
                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#F59E0B]/12 blur-3xl" />
                  <div className="absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-[#021427]/8 blur-3xl" />
                  <p className="text-xs uppercase tracking-[0.22em] text-[#F59E0B] sm:text-sm sm:tracking-[0.35em]" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                    {t("sendUsMessage")}
                  </p>
                  <h3 className="mt-3 text-2xl font-black tracking-[-0.03em] text-[#021427] sm:text-3xl md:text-4xl" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                    {t("contactPlanTitle")}
                  </h3>
                  <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#0e2340] md:mt-4 md:text-base md:leading-8" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                    {t("contactPlanDesc")}
                  </p>
                </div>

                <div className="p-4 sm:p-5 md:p-6">
                  {submitted ? (
                    <div className="rounded-[1.5rem] border border-[#F59E0B]/20 bg-gradient-to-br from-[#fff8ee] via-white to-[#fdf0dc] p-5 text-center shadow-[0_16px_40px_rgba(2,20,39,0.06)] sm:p-8">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#021427] to-[#F59E0B] shadow-lg shadow-[#021427]/10">
                        <Send className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="text-xl font-black text-[#021427] sm:text-2xl" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                        {t('messageSentSuccessfully')}
                      </h4>
                      <p className="mt-2 text-[#0e2340]" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                        {t('thankYouContact')}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                      {error && (
                        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                          {error}
                        </div>
                      )}

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">{t("name")}</Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder={t("enterYourName")}
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="min-h-12 rounded-2xl border-[#021427]/15 bg-white/85 py-5 shadow-sm focus-visible:ring-[#F59E0B] sm:py-6"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">{t("email")}</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder={t("emailPlaceholder")}
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="min-h-12 rounded-2xl border-[#021427]/15 bg-white/85 py-5 shadow-sm focus-visible:ring-[#F59E0B] sm:py-6"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">{t("phone")}</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="0597441666"
                          value={formData.phone}
                          onChange={handleChange}
                          className="min-h-12 rounded-2xl border-[#021427]/15 bg-white/85 py-5 shadow-sm focus-visible:ring-[#F59E0B] sm:py-6"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">{t("message")}</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder={t("contactMessagePlaceholder")}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={7}
                          className="min-h-[150px] resize-none rounded-[1.5rem] border-[#021427]/15 bg-white/85 shadow-sm focus-visible:ring-[#F59E0B] sm:min-h-[200px]"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={loading}
                        className="w-full rounded-full bg-gradient-to-r from-[#021427] via-[#0e2340] to-[#F59E0B] py-5 text-sm font-semibold shadow-[0_18px_40px_rgba(2,20,39,0.18)] transition-all duration-300 hover:from-[#0a1930] hover:to-[#ea8f06] disabled:opacity-50 sm:py-6 sm:text-base"
                      >
                        {loading ? t('sending') : t('sendMessage')}
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

      {/* Map Section */}
      <section className="relative overflow-hidden py-10 sm:py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f59e0b]/5 via-white/3 to-white/5" />
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_25%_30%,rgba(245,158,11,0.08),transparent_28%),radial-gradient(circle_at_75%_25%,rgba(2,20,39,0.06),transparent_22%),radial-gradient(circle_at_45%_75%,rgba(245,158,11,0.06),transparent_25%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-8 text-center sm:mb-12 md:mb-16">
            <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[#F59E0B] sm:text-sm sm:tracking-[0.35em]" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
              {t("visitUs")}
            </p>
            <h2 className="text-3xl font-black tracking-[-0.03em] text-[#021427] sm:text-4xl md:text-5xl" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
              {t("findOurOffice")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#0e2340] sm:mt-4 sm:text-lg sm:leading-8" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
              {t("contactOfficeIntro")}
            </p>
          </div>

          {/* Map Container */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-10">
            {/* Map */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden border-white/50 bg-white/8 backdrop-blur-2xl shadow-[0_24px_80px_rgba(2,20,39,0.12)] h-full">
                <div className="relative m-2 h-[300px] overflow-hidden rounded-[1.4rem] sm:m-4 sm:h-[380px] sm:rounded-[2rem] md:h-[500px]">
                  <div className="absolute inset-0 overflow-hidden rounded-[1.1rem] sm:rounded-[1.5rem]">
                    <iframe
                      title={t("officeLocationMap")}
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3366.3449833335236!2d35.22558!3d32.2252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151c6cd2b5b5b5b5%3A0x1234567890abc!2sNablus%20City%20Center%2C%20Nablus!5e0!3m2!1sen!2sps!4v1234567890"
                      className="w-full h-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-[1.1rem] border-2 border-white/30 shadow-[inset_0_0_40px_rgba(245,158,11,0.08)] sm:rounded-[1.5rem]" />
                </div>
              </Card>
            </div>

            {/* Info Cards */}
            <div className="space-y-3 sm:space-y-4">
              {[
                {
                  icon: MapPin,
                  title: "address",
                  content: "contactAddressContent",
                },
                {
                  icon: Phone,
                  title: "callUs",
                  content: "contactPhoneContent",
                },
                {
                  icon: Mail,
                  title: "emailUs",
                  content: "contactEmailContent",
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
                      <div className="p-4 sm:p-6">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#021427] to-[#F59E0B] shadow-lg shadow-[#021427]/20 sm:h-14 sm:w-14 sm:rounded-2xl">
                            <Icon className="h-5 w-5 text-white sm:h-7 sm:w-7" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-lg font-black text-[#021427] sm:text-xl" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                              {t(item.title)}
                            </h4>
                            <div className="mt-2 break-words whitespace-pre-line text-sm leading-6 text-[#0e2340] md:mt-3 md:text-base md:leading-7" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
                              {t(item.content)}
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
                  className="block w-full rounded-full bg-gradient-to-r from-[#021427] via-[#0e2340] to-[#F59E0B] px-5 py-3.5 text-center text-sm font-semibold text-white shadow-[0_18px_40px_rgba(2,20,39,0.18)] transition-all duration-300 hover:from-[#0a1930] hover:to-[#ea8f06] hover:shadow-[0_24px_48px_rgba(2,20,39,0.24)] sm:px-8 sm:py-4 sm:text-base"
                >
                  {t("getDirections")}
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
