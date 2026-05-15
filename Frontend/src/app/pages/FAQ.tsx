import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { HelpCircle, Calendar, CreditCard, Phone, MapPin, PlaneTakeoff } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import heroBg from "../../assets/h1-bg01.jpg";
import { useLanguage } from "../contexts/LanguageContext";

const faqs = [
  { 
    q: "faqBookTripQuestion", 
    a: "faqBookTripAnswer",
    icon: Calendar,
    category: "faqBookingCategory"
  },
  { 
    q: "faqCustomizeQuestion", 
    a: "faqCustomizeAnswer",
    icon: MapPin,
    category: "faqCustomizationCategory"
  },
  { 
    q: "faqGroupTravelQuestion", 
    a: "faqGroupTravelAnswer",
    icon: HelpCircle,
    category: "faqServicesCategory"
  },
  { 
    q: "faqPaymentQuestion", 
    a: "faqPaymentAnswer",
    icon: CreditCard,
    category: "faqPaymentsCategory"
  },
  { 
    q: "faqSupportQuestion", 
    a: "faqSupportAnswer",
    icon: Phone,
    category: "faqSupportCategory"
  },
  {
    q: "faqTransfersQuestion",
    a: "faqTransfersAnswer",
    icon: PlaneTakeoff,
    category: "faqTransfersCategory"
  },
];

export function FAQ() {
  const { t } = useLanguage();

  return (
    <div
      className="min-h-screen bg-cover bg-center text-[#021427] md:bg-fixed"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000816]/85 via-[#021427]/70 to-[#F59E0B]/15 z-0" />

        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <h1
            className="mb-4 text-4xl font-black drop-shadow-lg sm:text-5xl md:text-7xl"
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif", letterSpacing: '-0.02em' }}
          >
            <span className="bg-gradient-to-r from-white via-[#F59E0B] to-white bg-clip-text text-transparent">
              {t("questionsAndAnswers")}
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-light text-white/85 drop-shadow-lg sm:text-2xl md:text-3xl" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
            {t("faqHeroDesc")}
          </p>
        </div>
      </section>

      {/* FAQ Content Section */}
      <section className="relative overflow-hidden bg-transparent py-8 sm:py-12 md:py-20">
        <div className="absolute inset-0 bg-transparent" />
        <div className="absolute inset-0 bg-white/28 backdrop-blur-[1px]" />
        <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_20%_35%,rgba(255,255,255,0.45),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.28),transparent_18%),radial-gradient(circle_at_72%_78%,rgba(255,255,255,0.22),transparent_22%)]" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden rounded-2xl border-white/60 bg-white/55 shadow-[0_18px_44px_rgba(80,52,31,0.12)] backdrop-blur-xl sm:rounded-[2rem] sm:shadow-[0_20px_50px_rgba(80,52,31,0.12)]">
              <Accordion type="single" collapsible className="w-full divide-y divide-[#ecdac7]/80">
                {faqs.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <AccordionItem key={item.q} value={`item-${index}`} className="border-none px-3 sm:px-6">
                      <AccordionTrigger className="group py-4 text-left hover:no-underline sm:py-5">
                        <div className="flex min-w-0 items-start gap-3 text-left sm:gap-4">
                          <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#E09800] text-white shadow-lg shadow-[#F59E0B]/30 transition-transform duration-300 group-data-[state=open]:scale-105 sm:h-12 sm:w-12">
                            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <span className="mb-2 inline-flex max-w-full rounded-full bg-[#F59E0B]/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8D6E63] sm:px-3 sm:text-xs sm:tracking-[0.3em]">
                              {t(item.category)}
                            </span>
                            <h3 className="text-base font-bold leading-snug text-[#3E2723] transition-colors duration-300 group-hover:text-[#5C4033] sm:text-lg">
                              {t(item.q)}
                            </h3>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 pl-[3.25rem] pr-2 text-sm leading-7 text-[#725d54] sm:pb-6 sm:pl-16 sm:pr-6">
                        {t(item.a)}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 rounded-2xl border border-white/60 bg-white/50 p-5 text-center shadow-[0_18px_44px_rgba(80,52,31,0.12)] backdrop-blur-xl sm:mt-12 sm:p-8 md:mt-16 md:rounded-[2rem] md:p-10"
          >
            <HelpCircle className="mx-auto mb-4 h-9 w-9 text-[#F59E0B] sm:h-10 sm:w-10" />
            <h2 className="mb-3 text-xl font-bold text-[#3E2723] sm:text-2xl md:text-3xl">{t("stillHaveQuestions")}</h2>
            <p className="mx-auto mb-6 max-w-2xl text-sm leading-7 text-[#725d54] sm:text-base">
              {t("faqCtaDesc")}
            </p>
            <Link to="/contact">
              <Button className="w-full overflow-hidden rounded-full bg-gradient-to-r from-[#9a4b08] via-[#c46312] to-[#F59E0B] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(154,75,8,0.28)] transition hover:scale-[1.03] hover:shadow-[0_18px_42px_rgba(2,20,39,0.32)] sm:w-auto sm:px-8 sm:text-base">
                {t("contactSupport")}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
