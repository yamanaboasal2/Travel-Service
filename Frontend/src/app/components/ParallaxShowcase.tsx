import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import heroBg from "../../assets/h1-bg01.jpg";
import paralax1 from "../../assets/paralax1.jpg";
import paralax2 from "../../assets/paralax2.jpg";
import paralax3 from "../../assets/paralax3.jpg";
import paralax4 from "../../assets/paralax4.jpg";
import paralax5 from "../../assets/paralax5.jpg";
import parlax6 from "../../assets/parlax6.jpg";
import paralax7 from "../../assets/paralax7.jpg";
import paralax8 from "../../assets/paralax8.jpg";
import paralax9 from "../../assets/paralax9.jpg";
import paralax10 from "../../assets/paralax10.jpg";

const imageList = [
  { id: 1, src: paralax1, label: "Coastal escape" },
  { id: 2, src: paralax2, label: "Mountain road" },
  { id: 3, src: paralax3, label: "City break" },
  { id: 4, src: paralax4, label: "Golden sunset" },
  { id: 5, src: paralax5, label: "Island view" },
  { id: 6, src: parlax6, label: "Hidden trail" },
  { id: 7, src: paralax7, label: "Blue water" },
  { id: 8, src: paralax8, label: "Travel moment" },
  { id: 9, src: paralax9, label: "Open horizon" },
  { id: 10, src: paralax10, label: "Dream route" },
];

type GalleryImage = (typeof imageList)[number];

export function ParallaxShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [cards, setCards] = useState<GalleryImage[]>(imageList);
  const [exitDirection, setExitDirection] = useState(1);
  const [isResetting, setIsResetting] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const visibleCards = useMemo(() => cards.slice(0, 6), [cards]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["24px", "-24px"]);
  const deckY = useTransform(scrollYProgress, [0, 1], ["46px", "-34px"]);

  useEffect(() => {
    if (cards.length !== 0) return;

    setIsResetting(true);
    const timer = window.setTimeout(() => {
      setCards(imageList);
      setIsResetting(false);
    }, 760);

    return () => window.clearTimeout(timer);
  }, [cards.length]);

  useEffect(() => {
    const updateViewport = () => setIsCompact(window.innerWidth < 640);
    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const dismissTopCard = (direction: number) => {
    setExitDirection(direction);
    setCards((current) => current.slice(1));
  };

  const stackX = isCompact ? 8 : 18;
  const stackY = isCompact ? 10 : 14;
  const cardScaleStep = isCompact ? 0.035 : 0.045;
  const dismissDistance = isCompact ? 78 : 115;
  const dismissVelocity = isCompact ? 520 : 720;
  const exitX = isCompact ? 520 : 900;

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-[#021427] py-16 text-white sm:py-20 md:py-28 lg:py-32" dir="ltr">
      <motion.div
        className="absolute inset-[-10%] bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})`, y: backgroundY }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#021427]/92 via-[#073947]/78 to-[#0a5d7a]/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(245,158,11,0.23),transparent_30%),radial-gradient(circle_at_84%_20%,rgba(126,224,255,0.19),transparent_32%)]" />
      <div className="absolute left-0 right-0 top-16 h-px bg-gradient-to-r from-transparent via-[#F59E0B]/80 to-transparent" />
      <div className="absolute left-0 right-0 bottom-16 h-px bg-gradient-to-r from-transparent via-[#7ee0ff]/60 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:gap-12 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:gap-14 lg:px-10">
        <motion.div style={{ y: titleY }} className="text-center lg:text-left">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.34em] text-white/60 sm:mb-4 sm:text-xs sm:tracking-[0.55em]">
            Travel Gallery
          </p>
          <h2
            className="text-[clamp(2.55rem,13vw,4rem)] font-black leading-[1.02] sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
          >
            Swipe Into
            <span className="block bg-gradient-to-r from-[#F59E0B] via-[#ffd08a] to-[#7ee0ff] bg-clip-text text-transparent">
              the Journey
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-[32rem] text-sm font-semibold leading-7 text-white/76 sm:text-base md:text-lg lg:mx-0">
            Drag the front photo to the right or left. It leaves the screen, the next memory steps forward, and the full stack returns when the gallery is done.
          </p>
          <div className="mt-6 inline-flex rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-black text-white/80 backdrop-blur-md sm:mt-8 sm:px-5 sm:text-sm">
            {cards.length ? `${imageList.length - cards.length + 1} / ${imageList.length}` : "Resetting gallery"}
          </div>
        </motion.div>

        <motion.div style={{ y: deckY }} className="relative mx-auto h-[min(112vw,410px)] w-[min(82vw,320px)] sm:h-[440px] sm:w-full sm:max-w-[420px] md:h-[520px] md:max-w-[500px]">
          <div className="absolute inset-0 rounded-[1.55rem] bg-white/8 blur-2xl sm:rounded-[2rem]" />
          <div className="absolute inset-x-5 bottom-2 h-16 rounded-full bg-black/35 blur-3xl sm:inset-x-8 sm:h-20" />

          <div className="relative h-full w-full" style={{ perspective: 1500 }}>
            <AnimatePresence custom={exitDirection} mode="popLayout">
              {visibleCards.map((card, index) => {
                const isTop = index === 0;
                const stackOffset = index;

                return (
                  <motion.div
                    key={card.id}
                    custom={exitDirection}
                    className="absolute inset-0 select-none overflow-hidden rounded-[1.55rem] border border-white/18 bg-white/10 shadow-[0_30px_85px_rgba(0,0,0,0.42)] backdrop-blur-sm sm:rounded-[2rem]"
                    drag={isTop ? "x" : false}
                    dragElastic={0.68}
                    dragMomentum={false}
                    onDragEnd={(_, info) => {
                      const distance = info.offset.x;
                      const velocity = info.velocity.x;
                      if (Math.abs(distance) > dismissDistance || Math.abs(velocity) > dismissVelocity) {
                        dismissTopCard(distance >= 0 || velocity >= 0 ? 1 : -1);
                      }
                    }}
                    initial={{
                      x: stackOffset * stackX,
                      y: stackOffset * stackY,
                      rotateZ: stackOffset * (isCompact ? -1.8 : -2.6),
                      rotateY: stackOffset * (isCompact ? -2.5 : -4),
                      scale: 1 - stackOffset * cardScaleStep,
                      opacity: stackOffset < 5 ? 1 : 0,
                    }}
                    animate={{
                      x: stackOffset * stackX,
                      y: stackOffset * stackY,
                      rotateZ: stackOffset * (isCompact ? -1.8 : -2.6),
                      rotateY: stackOffset * (isCompact ? -2.5 : -4),
                      scale: 1 - stackOffset * cardScaleStep,
                      opacity: stackOffset < 5 ? 1 : 0,
                      filter: `brightness(${1 - stackOffset * 0.08}) saturate(${1 - stackOffset * 0.05})`,
                    }}
                    exit={(direction: number) => ({
                      x: direction * exitX,
                      y: isCompact ? -42 : -70,
                      rotateZ: direction * (isCompact ? 16 : 22),
                      rotateY: direction * (isCompact ? 22 : 34),
                      scale: 0.96,
                      opacity: 0,
                      transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                    })}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 28,
                    }}
                    whileDrag={{
                      scale: 1.025,
                      rotateZ: 0,
                      boxShadow: "0 44px 110px rgba(0,0,0,0.54)",
                    }}
                    style={{
                      zIndex: imageList.length - index,
                      cursor: isTop ? "grab" : "default",
                      pointerEvents: isTop ? "auto" : "none",
                      touchAction: "pan-y",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <img src={card.src} alt={card.label} className="h-full w-full object-cover" draggable={false} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#021427]/58 via-transparent to-white/10" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 sm:bottom-5 sm:left-5 sm:right-5 sm:gap-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/58 sm:text-xs sm:tracking-[0.28em]">
                          Rainbow Travel
                        </p>
                        <p className="mt-1 text-xl font-black text-white drop-shadow-lg sm:mt-2 sm:text-2xl">
                          {card.label}
                        </p>
                      </div>
                      {isTop && (
                        <span className="rounded-full bg-white/18 px-3 py-1.5 text-[10px] font-black text-white/85 backdrop-blur-md sm:px-4 sm:py-2 sm:text-xs">
                          Drag
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {isResetting && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center rounded-[1.55rem] border border-white/18 bg-white/10 px-4 text-center text-xs font-black uppercase tracking-[0.2em] text-white/75 backdrop-blur-md sm:rounded-[2rem] sm:text-sm sm:tracking-[0.28em]"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                Rebuilding stack
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
