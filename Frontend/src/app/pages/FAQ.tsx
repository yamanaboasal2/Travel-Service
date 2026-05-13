import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { HelpCircle, Calendar, CreditCard, Phone, MapPin, PlaneTakeoff } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import heroBg from "../../assets/h1-bg01.jpg";

const faqs = [
  { 
    q: "How do I book a trip?", 
    a: "Choose a destination or tour, submit the booking form, and our team will confirm the details with you.",
    icon: Calendar,
    category: "Booking"
  },
  { 
    q: "Can I customize my itinerary?", 
    a: "Yes. We can tailor flights, hotels, tours, and transfers around your budget and travel style.",
    icon: MapPin,
    category: "Customization"
  },
  { 
    q: "Do you offer group travel support?", 
    a: "Absolutely. We handle group trips with dedicated planning and coordination.",
    icon: HelpCircle,
    category: "Services"
  },
  { 
    q: "What payment methods are accepted?", 
    a: "Payment options depend on your booking and will be shared during confirmation.",
    icon: CreditCard,
    category: "Payments"
  },
  { 
    q: "How can I contact support?", 
    a: "You can reach us through the contact page, by phone, or by email anytime.",
    icon: Phone,
    category: "Support"
  },
  {
    q: "Do you offer airport pickup and drop-off?",
    a: "Yes. We can arrange airport transfers and private pickup or drop-off services based on your trip details.",
    icon: PlaneTakeoff,
    category: "Transfers"
  },
];

export function FAQ() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed text-[#021427]"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Hero Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000816]/85 via-[#021427]/70 to-[#F59E0B]/15 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-6xl md:text-7xl font-black mb-4 drop-shadow-lg"
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif", letterSpacing: '-0.02em' }}
          >
            <span className="bg-gradient-to-r from-white via-[#F59E0B] to-white bg-clip-text text-transparent">
              Questions and Answers
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-white/85 font-light max-w-2xl mx-auto drop-shadow-lg" style={{ fontFamily: "'Lora', 'Georgia', serif" }}>
            Find answers to your travel questions
          </p>
        </div>
      </section>

      {/* FAQ Content Section */}
      <section className="relative overflow-hidden bg-transparent py-12 md:py-20">
        <div className="absolute inset-0 bg-transparent" />
        <div className="absolute inset-0 bg-white/28 backdrop-blur-[1px]" />
        <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_20%_35%,rgba(255,255,255,0.45),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.28),transparent_18%),radial-gradient(circle_at_72%_78%,rgba(255,255,255,0.22),transparent_22%)]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden rounded-[2rem] border-white/60 bg-white/55 shadow-[0_20px_50px_rgba(80,52,31,0.12)] backdrop-blur-xl">
              <Accordion type="single" collapsible className="w-full divide-y divide-[#ecdac7]/80">
                {faqs.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <AccordionItem key={item.q} value={`item-${index}`} className="border-none px-4 sm:px-6">
                      <AccordionTrigger className="group py-5 text-left hover:no-underline">
                        <div className="flex items-start gap-4 text-left">
                          <div className="mt-0.5 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#E09800] text-white shadow-lg shadow-[#F59E0B]/30 transition-transform duration-300 group-data-[state=open]:scale-105">
                            <Icon className="h-5 w-5" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <span className="mb-2 inline-flex rounded-full bg-[#F59E0B]/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#8D6E63]">
                              {item.category}
                            </span>
                            <h3 className="text-lg font-bold leading-snug text-[#3E2723] transition-colors duration-300 group-hover:text-[#5C4033]">
                              {item.q}
                            </h3>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-6 pl-16 pr-4 text-sm leading-7 text-[#725d54] sm:pr-6">
                        {item.a}
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
            className="mt-16 rounded-[2rem] border border-white/60 bg-white/50 p-8 shadow-[0_20px_50px_rgba(80,52,31,0.12)] backdrop-blur-xl text-center sm:p-10"
          >
            <HelpCircle className="h-10 w-10 text-[#F59E0B] mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3E2723] mb-3">Still have questions?</h2>
            <p className="text-base text-[#725d54] mb-6 max-w-2xl mx-auto">
              Our support team is ready to help you plan the perfect journey. Reach out anytime.
            </p>
            <Link to="/contact">
              <Button className="rounded-full bg-[#F59E0B] px-8 py-3 text-white font-semibold hover:bg-[#E09800] shadow-lg shadow-[#F59E0B]/30 hover:shadow-[#F59E0B]/50 transition-all duration-300">
                Contact Support
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
