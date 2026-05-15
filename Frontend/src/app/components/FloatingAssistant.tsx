import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, ChevronDown, MessageCircleMore, Minus, Send, X } from "lucide-react";

import { useLanguage } from "../contexts/LanguageContext";
import {
  type Destination,
  type Offer,
  type Service,
  getAllDestinations,
  getAllOffers,
  getAllServices,
} from "../services/apiService";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

type QuickReply = {
  id: string;
  label: string;
};

type AssistantKnowledge = {
  offers: Offer[];
  services: Service[];
  destinations: Destination[];
};

const routeLabels = {
  ar: {
    "/": "الصفحة الرئيسية",
    "/about": "من نحن",
    "/offers": "العروض",
    "/contact": "اتصل بنا",
    "/destinations": "الوجهات",
    "/our-services": "الخدمات",
    "/faq": "الأسئلة الشائعة",
    "/auth": "تسجيل الدخول",
    "/booking": "الحجز",
  },
  en: {
    "/": "home page",
    "/about": "About page",
    "/offers": "Offers page",
    "/contact": "Contact page",
    "/destinations": "Destinations page",
    "/our-services": "Services page",
    "/faq": "FAQ page",
    "/auth": "login page",
    "/booking": "booking page",
  },
};

function normalizeText(value: string) {
  return value.toLowerCase().trim();
}

function getPageHint(pathname: string, language: "ar" | "en") {
  if (language === "ar") {
    const label = routeLabels.ar[pathname as keyof typeof routeLabels.ar] || "هذه الصفحة";
    if (pathname === "/offers") return `أنت الآن في صفحة ${label}. هنا يظهر أحدث العروض والباقات ويمكنك فتح تفاصيل كل عرض ثم الحجز مباشرة.`;
    if (pathname === "/destinations") return `أنت الآن في صفحة ${label}. هنا يمكنك استكشاف الوجهات ومقارنة الأماكن المناسبة لرحلتك.`;
    if (pathname === "/our-services") return `أنت الآن في صفحة ${label}. هنا ستجد خدمات السفر المتوفرة مثل الحجز، الفنادق، والتخطيط.`;
    if (pathname === "/contact") return `أنت الآن في صفحة ${label}. يمكنك إرسال رسالة مباشرة للشركة أو الاطلاع على وسائل التواصل.`;
    if (pathname === "/auth") return `أنت الآن في صفحة ${label}. من هنا يمكنك تسجيل الدخول أو إنشاء حساب جديد أو استعادة كلمة المرور.`;
    if (pathname === "/booking") return `أنت الآن في صفحة ${label}. هذه الصفحة مخصصة لتأكيد بيانات الرحلة وإتمام الحجز.`;
    return `أنت الآن في ${label}. أستطيع مساعدتك في العروض، الحجز، الخدمات، أو طريقة التواصل مع الشركة.`;
  }

  const label = routeLabels.en[pathname as keyof typeof routeLabels.en] || "this page";
  if (pathname === "/offers") return `You are on the ${label}. Here you can browse travel packages, open details, and continue to booking.`;
  if (pathname === "/destinations") return `You are on the ${label}. You can explore places and compare destinations for your next trip.`;
  if (pathname === "/our-services") return `You are on the ${label}. This page explains the available travel services and support options.`;
  if (pathname === "/contact") return `You are on the ${label}. You can send a message to the company or review contact details here.`;
  if (pathname === "/auth") return `You are on the ${label}. From here you can log in, create an account, or reset your password.`;
  if (pathname === "/booking") return `You are on the ${label}. This page is used to complete booking details and confirm the trip.`;
  return `You are on the ${label}. I can help with offers, booking, services, and how to contact the company.`;
}

function buildDatabaseSummary(knowledge: AssistantKnowledge, language: "ar" | "en") {
  const offerNames = knowledge.offers.slice(0, 3).map((item) => item.title).filter(Boolean);
  const serviceNames = knowledge.services.slice(0, 3).map((item) => item.title).filter(Boolean);
  const destinationNames = knowledge.destinations.slice(0, 3).map((item) => item.name).filter(Boolean);

  if (language === "ar") {
    return `تم تحميل ${knowledge.offers.length} عروض، ${knowledge.services.length} خدمات، و${knowledge.destinations.length} وجهات من قاعدة البيانات.${offerNames.length ? ` من العروض: ${offerNames.join("، ")}.` : ""}${serviceNames.length ? ` من الخدمات: ${serviceNames.join("، ")}.` : ""}${destinationNames.length ? ` من الوجهات: ${destinationNames.join("، ")}.` : ""}`;
  }

  return `Loaded ${knowledge.offers.length} offers, ${knowledge.services.length} services, and ${knowledge.destinations.length} destinations from the database.${offerNames.length ? ` Offers include: ${offerNames.join(", ")}.` : ""}${serviceNames.length ? ` Services include: ${serviceNames.join(", ")}.` : ""}${destinationNames.length ? ` Destinations include: ${destinationNames.join(", ")}.` : ""}`;
}

function getAssistantReply(
  question: string,
  pathname: string,
  language: "ar" | "en",
  knowledge: AssistantKnowledge,
  databaseReady: boolean,
) {
  const q = normalizeText(question);

  const offerNames = knowledge.offers.slice(0, 5).map((item) => item.title).filter(Boolean);
  const serviceNames = knowledge.services.slice(0, 5).map((item) => item.title).filter(Boolean);
  const destinationNames = knowledge.destinations.slice(0, 5).map((item) => item.name).filter(Boolean);
  const cheapestOffer = [...knowledge.offers]
    .filter((item) => typeof item.price === "number")
    .sort((a, b) => (a.price || 0) - (b.price || 0))[0];
  const topDestination = knowledge.destinations[0];

  if (language === "ar") {
    if (q.includes("قاعدة") || q.includes("داتا") || q.includes("database") || q.includes("كل المعلومات")) {
      return databaseReady
        ? buildDatabaseSummary(knowledge, language)
        : "حالياً لم أتمكن من تحميل البيانات من الـ backend، لذلك أحتاج أن يكون السيرفر شغال حتى أعرض المعلومات الحقيقية.";
    }
    if (q.includes("عرض") || q.includes("offers")) {
      if (databaseReady && offerNames.length) {
        return `العروض الحالية من قاعدة البيانات تشمل: ${offerNames.join("، ")}.${cheapestOffer ? ` أقل عرض سعرًا حاليًا هو ${cheapestOffer.title} بسعر ${cheapestOffer.price}.` : ""} يمكنك فتح صفحة العروض ثم متابعة الحجز مباشرة.`;
      }
      return "يمكنك فتح صفحة العروض لرؤية الباقات الحالية، ثم اختيار العرض المناسب والانتقال إلى صفحة الحجز مباشرة.";
    }
    if (q.includes("حجز") || q.includes("احجز") || q.includes("booking")) {
      return "لإتمام الحجز اختر العرض أو الخدمة أولاً، ثم انتقل إلى صفحة الحجز، واملأ البيانات المطلوبة مثل التاريخ وعدد المسافرين ومعلومات التواصل.";
    }
    if (q.includes("تواصل") || q.includes("اتصل") || q.includes("contact")) {
      return "يمكنك التواصل مع الشركة من صفحة اتصل بنا عبر نموذج الرسائل، كما يمكن للإدارة متابعة الرسائل من لوحة التحكم.";
    }
    if (q.includes("خدمة") || q.includes("services")) {
      if (databaseReady && serviceNames.length) {
        return `الخدمات المحمّلة من قاعدة البيانات تشمل: ${serviceNames.join("، ")}. صفحة الخدمات تعرض هذه العناصر بشكل أوضح للمستخدم مع تفاصيل كل خدمة.`;
      }
      return "الخدمات تشمل استكشاف الوجهات، العروض، تنظيم الرحلات، والحجز. صفحة الخدمات تعرض ذلك بشكل واضح للمستخدم.";
    }
    if (q.includes("وجه") || q.includes("destination")) {
      if (databaseReady && destinationNames.length) {
        return `الوجهات الموجودة حاليًا في قاعدة البيانات تشمل: ${destinationNames.join("، ")}.${topDestination ? ` مثال على وجهة معروضة: ${topDestination.name} في ${topDestination.country}.` : ""}`;
      }
      return "صفحة الوجهات تعرض أماكن السفر المقترحة وتساعد المستخدم على المقارنة واستكشاف الخيارات المناسبة.";
    }
    if (q.includes("دخول") || q.includes("حساب") || q.includes("login") || q.includes("signup")) {
      return "من صفحة تسجيل الدخول يمكنك إنشاء حساب أو الدخول إلى حسابك، كما أضفنا استعادة كلمة المرور عند الحاجة.";
    }
    if (q.includes("ادمن") || q.includes("لوحة") || q.includes("dashboard")) {
      return "لوحة الإدارة مرتبطة بالـ backend وتعرض المستخدمين، الحجوزات، وبعض بيانات الإدارة الحية لتسهيل المتابعة.";
    }
    if (q.includes("هاي الصفحة") || q.includes("هذه الصفحة") || q.includes("وين انا")) {
      return getPageHint(pathname, language);
    }
    return "أقدر أساعدك في الحجز، العروض، الوجهات، الخدمات، تسجيل الدخول، أو شرح الصفحة الحالية. اكتب سؤالك بشكل أقرب لما تريد.";
  }

  if (q.includes("database") || q.includes("all information") || q.includes("all data")) {
    return databaseReady
      ? buildDatabaseSummary(knowledge, language)
      : "I could not load backend data right now. The backend needs to be running so I can use real database information.";
  }
  if (q.includes("offer")) {
    if (databaseReady && offerNames.length) {
      return `Current database offers include: ${offerNames.join(", ")}.${cheapestOffer ? ` The lowest priced offer right now is ${cheapestOffer.title} at ${cheapestOffer.price}.` : ""}`;
    }
    return "You can open the Offers page to view available travel packages, then continue directly to booking from the selected offer.";
  }
  if (q.includes("book") || q.includes("booking")) {
    return "To complete a booking, choose an offer or service first, then fill in travel date, travelers, and contact details on the booking page.";
  }
  if (q.includes("contact") || q.includes("message")) {
    return "You can contact the company from the Contact page using the message form, and admins can review those messages in the dashboard.";
  }
  if (q.includes("service")) {
    if (databaseReady && serviceNames.length) {
      return `Services loaded from the database include: ${serviceNames.join(", ")}. The services page presents them with more detail to the customer.`;
    }
    return "The platform presents travel services, trip support, offers, and booking flows in one place for the customer.";
  }
  if (q.includes("destination")) {
    if (databaseReady && destinationNames.length) {
      return `Destinations currently available in the database include: ${destinationNames.join(", ")}.${topDestination ? ` One example is ${topDestination.name} in ${topDestination.country}.` : ""}`;
    }
    return "The Destinations page helps users explore and compare available places before making a booking decision.";
  }
  if (q.includes("login") || q.includes("account") || q.includes("signup") || q.includes("password")) {
    return "From the Auth page, users can sign up, log in, and use the forgot password flow when needed.";
  }
  if (q.includes("admin") || q.includes("dashboard")) {
    return "The admin dashboard is connected to backend data and helps manage users, bookings, and operational content.";
  }
  if (q.includes("this page") || q.includes("where am i")) {
    return getPageHint(pathname, language);
  }
  return "I can help with booking, offers, destinations, services, login, or explaining the current page. Ask me in a more specific way.";
}

export function FloatingAssistant() {
  const { language } = useLanguage();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [knowledge, setKnowledge] = useState<AssistantKnowledge>({
    offers: [],
    services: [],
    destinations: [],
  });
  const [databaseReady, setDatabaseReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    Promise.allSettled([getAllOffers(), getAllServices(), getAllDestinations()]).then((results) => {
      if (cancelled) return;

      const offers = results[0].status === "fulfilled" ? results[0].value : [];
      const services = results[1].status === "fulfilled" ? results[1].value : [];
      const destinations = results[2].status === "fulfilled" ? results[2].value : [];

      setKnowledge({ offers, services, destinations });
      setDatabaseReady(results.some((result) => result.status === "fulfilled"));
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const welcomeText =
      language === "ar"
        ? `أهلاً! أنا مساعد Rainbow. ${getPageHint(pathname, language)}${databaseReady ? ` ${buildDatabaseSummary(knowledge, language)}` : ""}`
        : `Hi! I'm the Rainbow assistant. ${getPageHint(pathname, language)}${databaseReady ? ` ${buildDatabaseSummary(knowledge, language)}` : ""}`;

    setMessages([{ id: Date.now(), role: "assistant", text: welcomeText }]);
  }, [pathname, language, databaseReady, knowledge]);

  const quickReplies = useMemo<QuickReply[]>(() => {
    if (language === "ar") {
      return [
        { id: "booking", label: "كيف أحجز؟" },
        { id: "offers", label: "وين العروض؟" },
        { id: "contact", label: "التواصل مع الشركة" },
        { id: "page", label: "اشرح الصفحة" },
      ];
    }

    return [
      { id: "booking", label: "How to book?" },
      { id: "offers", label: "Show offers" },
      { id: "contact", label: "Contact company" },
      { id: "page", label: "Explain page" },
    ];
  }, [language]);

  const quickReplyMap = useMemo<Record<string, string>>(
    () =>
      language === "ar"
        ? {
            booking: "كيف أحجز؟",
            offers: "وين العروض؟",
            contact: "كيف أتواصل مع الشركة؟",
            page: "اشرح لي هذه الصفحة",
          }
        : {
            booking: "How do I book?",
            offers: "Where are the offers?",
            contact: "How can I contact the company?",
            page: "Explain this page",
          },
    [language],
  );

  const submitQuestion = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      text: trimmed,
    };

    const assistantMessage: ChatMessage = {
      id: Date.now() + 1,
      role: "assistant",
      text: getAssistantReply(trimmed, pathname, language, knowledge, databaseReady),
    };

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setInput("");
    setIsOpen(true);
    setIsMinimized(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    submitQuestion(input);
  };

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[70] flex items-end justify-end">
      <AnimatePresence>
        {isOpen && !isMinimized ? (
          <motion.div
            key="assistant-panel"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="pointer-events-auto mb-3 flex max-h-[calc(100svh-6.5rem)] w-[calc(100vw-2rem)] max-w-[24rem] flex-col overflow-hidden rounded-[1.75rem] border border-[#f0d8c7] bg-[linear-gradient(180deg,rgba(255,247,242,0.98)_0%,rgba(255,251,248,0.96)_100%)] shadow-[0_20px_60px_rgba(58,28,10,0.18)] backdrop-blur-xl"
          >
            <div className="border-b border-[#ead5c8] bg-gradient-to-r from-[#f7e5da] via-[#fff7f2] to-[#f4dfd3] px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-[#4a2b1b]">
                    {language === "ar" ? "Rainbow Assistant" : "Rainbow Assistant"}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-[#7a5a47]">
                    {language === "ar"
                      ? "مساعد سريع لشرح الصفحة الحالية، الحجز، العروض، والخدمات."
                      : "Quick help for the current page, booking, offers, and services."}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsMinimized(true)}
                    className="rounded-full bg-white/70 p-2 text-[#7a5a47] transition hover:bg-white"
                    aria-label={language === "ar" ? "تصغير" : "Minimize"}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full bg-white/70 p-2 text-[#7a5a47] transition hover:bg-white"
                    aria-label={language === "ar" ? "إغلاق" : "Close"}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={
                      message.role === "assistant"
                        ? "mr-8 rounded-2xl rounded-tl-md border border-[#ead9cf] bg-white/90 px-4 py-3 text-sm leading-7 text-[#4a2b1b]"
                        : "ml-8 rounded-2xl rounded-tr-md bg-gradient-to-r from-[#c9751a] to-[#f0a122] px-4 py-3 text-sm leading-7 text-white"
                    }
                  >
                    {message.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[#ead5c8] px-4 py-3">
              <div className="mb-3 flex items-center justify-between rounded-full border border-[#ecd8cc] bg-white/80 px-4 py-2 text-sm text-[#8b6a56]">
                <span>{language === "ar" ? "أسئلة سريعة" : "Quick questions"}</span>
                <ChevronDown className="h-4 w-4" />
              </div>

              <div className="mb-3 flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.id}
                    type="button"
                    onClick={() => submitQuestion(quickReplyMap[reply.id])}
                    className="rounded-full border border-[#e7cfc2] bg-white/80 px-3 py-2 text-sm text-[#7a4a26] transition hover:border-[#d59349] hover:bg-[#fff5ed]"
                  >
                    {reply.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder={language === "ar" ? "اكتب سؤالك هنا..." : "Type your question here..."}
                  className="h-12 flex-1 rounded-full border border-[#ead5c8] bg-white/85 px-4 text-sm text-[#4a2b1b] outline-none placeholder:text-[#a18879]"
                />
                <button
                  type="submit"
                  className="inline-flex h-12 min-w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#df8a2a] to-[#f0a122] px-4 text-white shadow-[0_10px_24px_rgba(192,117,22,0.28)] transition hover:brightness-105"
                  aria-label={language === "ar" ? "إرسال" : "Send"}
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>

              <div className="mt-3 flex items-center justify-between text-xs text-[#8f725f]">
                <span>
                  {language === "ar" ? "روابط سريعة" : "Quick links"}
                </span>
                <div className="flex items-center gap-3">
                  <Link to="/offers" className="transition hover:text-[#b96a1f]">
                    {language === "ar" ? "العروض" : "Offers"}
                  </Link>
                  <Link to="/contact" className="transition hover:text-[#b96a1f]">
                    {language === "ar" ? "اتصل بنا" : "Contact"}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => {
          setIsOpen((current) => !current || isMinimized);
          setIsMinimized(false);
        }}
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#f4ddd0_0%,#fff7f2_100%)] px-4 py-3 text-sm font-semibold text-[#5a3421] shadow-[0_14px_34px_rgba(58,28,10,0.16)] ring-1 ring-[#edd9cb] transition hover:-translate-y-0.5"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#d67e1f] to-[#f0a122] text-white">
          {isOpen && !isMinimized ? <X className="h-5 w-5" /> : <MessageCircleMore className="h-5 w-5" />}
        </span>
        <span className="hidden sm:block">
          {language === "ar" ? "مساعد الموقع" : "Site Assistant"}
        </span>
        <span className="hidden rounded-full bg-white/80 p-1.5 sm:inline-flex">
          <Bot className="h-4 w-4 text-[#d67e1f]" />
        </span>
      </button>
    </div>
  );
}
