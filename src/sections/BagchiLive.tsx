import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import img from "../../public/media/img2.jpg"

/**
 * JobKurianHero
 * Default: sharp photo, title sits softly over it.
 * Hover / focus / tap: photo blurs + darkens, title lights up in its gradient,
 * BOOK NOW / KNOW MORE pills fade in above it.
 *
 * Deps:   npm i framer-motion
 * Font:   add to index.html <head> (swap for your logo font / SVG if you have one):
 *         <link href="https://fonts.googleapis.com/css2?family=Sancreek&display=swap" rel="stylesheet" />
 * Tailwind (v3 tailwind.config / v4 @theme):  fontFamily: { logo: ["Sancreek", "serif"] }
 */

const buttonsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const buttonItem: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: 10, transition: { duration: 0.25 } },
};

const pill =
  "inline-flex h-14 w-56 items-center justify-center rounded-full border border-white/40 " +
  "bg-white/5 text-sm uppercase tracking-[0.12em] text-[#e9d5c8] backdrop-blur-sm " +
  "transition-colors duration-300 hover:bg-white/15 hover:border-white/70 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9967a]";

export default function BagchiLive() {
  const [active, setActive] = useState(false);

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-black"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setActive(false);
      }}
      onClick={() => setActive((v) => !v)} // tap-to-toggle on touch devices
    >
      {/* Background photo */}
      <img
        src={img}
        alt="Job Kurian Live band"
        draggable={false}
        className={[
          "absolute inset-0 h-full w-full object-cover",
          "transition-[filter,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          active
            ? "scale-110 blur-[14px] brightness-[0.45] saturate-[0.9]"
            : "scale-100 blur-0 brightness-100",
        ].join(" ")}
      />

      {/* Warm vignette / dark wash that deepens on hover */}
      <div
        className={[
          "pointer-events-none absolute inset-0 transition-opacity duration-700",
          "bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.75)_100%)]",
          active ? "opacity-100" : "opacity-40",
        ].join(" ")}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-10 px-6">
        {/* Buttons (appear on hover) */}
        <div className="h-14">
          <AnimatePresence>
            {active && (
              <motion.div
                key="cta"
                variants={buttonsContainer}
                initial="hidden"
                animate="show"
                exit="exit"
                className="flex flex-wrap items-center justify-center gap-7"
              >
                <motion.a
                  variants={buttonItem}
                  href="#book"
                  className={pill}
                  onClick={(e) => e.stopPropagation()}
                >
                  Book Now
                </motion.a>
                <motion.a
                  variants={buttonItem}
                  href="#about"
                  className={pill}
                  onClick={(e) => e.stopPropagation()}
                >
                  Know More
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Title lockup */}
        <motion.h1
          animate={{ scale: active ? 1.03 : 1, y: active ? -6 : 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex select-none flex-col items-center font-logo leading-none"
          aria-label="Job Kurian Live"
        >
          <span
            className={[
              "bg-gradient-to-r from-[#dcc3b8] via-[#d9a28b] to-[#d9825f] bg-clip-text text-transparent",
              "text-[clamp(4rem,14vw,12rem)] uppercase tracking-tight",
              "transition-opacity duration-700",
              active ? "opacity-100" : "opacity-75",
            ].join(" ")}
          >
            Job Kurian
          </span>

          <span
            className={[
              "mt-2 flex items-center gap-3 text-[clamp(1.5rem,4vw,3.5rem)] uppercase tracking-[0.15em] text-[#d9a28b]",
              "transition-opacity duration-700",
              active ? "opacity-100" : "opacity-75",
            ].join(" ")}
          >
            <span className="h-2.5 w-4 rounded-full bg-current" />
            Live
            <span className="h-2.5 w-4 rounded-full bg-current" />
          </span>
        </motion.h1>
      </div>
    </section>
  );
}