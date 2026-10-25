import { useRef, useState, useCallback } from "react";
import {
  AnimatePresence,
  cubicBezier,
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ChevronLeft, ChevronRight, VolumeX, Volume2 } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Slides – swap src/poster for the real assets later                 */
/* ------------------------------------------------------------------ */
type Slide = { id: string; src: string; poster: string; title: string };

const SLIDES: Slide[] = [
  { id: "s1", src: "/media/vid.mp4", poster: "/media/img3.jpg", title: "Cinematic reel" },
  { id: "s2", src: "/media/vid.mp4", poster: "/media/img1.jpg", title: "Lullaby" },
  { id: "s3", src: "/media/vid.mp4", poster: "/media/img8.jpeg", title: "Orchestra" },
  { id: "s4", src: "/media/vid.mp4", poster: "/media/img2.jpg", title: "Live performance" },
];

/* Final card geometry (matches the reference: ~70vw wide, ~85% tall, side cards peek) */
const CARD_W = 70.5; // vw
const CARD_H = 84; // vh
const GAP = 2; // vw between main card and side cards
const SIDE_W = 20; // vw (extends past the viewport edge, so it "peeks")

/* Scroll range (0–1 of the section) in which the zoom-out happens */
const END = 0.7;
const EASE = cubicBezier(0.22, 1, 0.36, 1);

function Clip({
  slide,
  muted = true,
  className = "",
}: {
  slide: Slide;
  muted?: boolean;
  className?: string;
}) {
  return (
    <video
      key={slide.id}
      className={`h-full w-full object-cover ${className}`}
      src={slide.src}
      poster={slide.poster}
      autoPlay
      loop
      muted={muted}
      playsInline
      preload="metadata"
    />
  );
}

export default function VideoZoom() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true);

  const count = SLIDES.length;
  const prev = SLIDES[(index - 1 + count) % count];
  const next = SLIDES[(index + 1) % count];
  const current = SLIDES[index];

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count),
    [count]
  );

  /* ---------------- scroll progress ---------------- */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // light spring = smooth, but still feels attached to the scrollbar
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.35 });

//   const ease = [0.22, 1, 0.36, 1] as const;
  const range = [0, END];

  const width = useTransform(p, range, ["100vw", `${CARD_W}vw`], { ease: EASE });
  const height = useTransform(p, range, ["100vh", `${CARD_H}vh`], { ease: EASE });
  const radius = useTransform(p, range, ["0px", "24px"], { ease: EASE });

  // the video inside is scaled up at first, then settles back -> real "zoom out"
  const videoScale = useTransform(p, range, [reduce ? 1 : 1.3, 1], { ease: EASE });

  // vignette is strong when full-bleed, fades as the card takes shape
  const vignette = useTransform(p, [0, END], [1, 0.25]);

  // side cards slide in from outside + fade
  const sideOpacity = useTransform(p, [0.3, END], [0, 1]);
  const leftX = useTransform(p, range, ["-12vw", "0vw"], { ease: EASE });
  const rightX = useTransform(p, range, ["12vw", "0vw"], { ease: EASE });

  // mute button only appears once the card has formed
  const muteOpacity = useTransform(p, [0.55, END], [0, 1]);

  const sideOffset = `calc(50% + ${CARD_W / 2 + GAP}vw)`;

  return (
    /* tall wrapper = scroll distance. Don't put overflow-hidden on any ancestor, it breaks sticky */
    <section ref={sectionRef} className="relative h-[260vh] ">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* ---------- LEFT peek card ---------- */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 flex items-center"
          style={{ right: sideOffset, width: `${SIDE_W}vw`, opacity: sideOpacity, x: leftX }}
        >
          <motion.div
            className="h-full w-full overflow-hidden rounded-[24px]"
            style={{ height }}
          >
            <Clip slide={prev} className="opacity-70" />
          </motion.div>
        </motion.div>

        {/* ---------- RIGHT peek card ---------- */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 flex items-center"
          style={{ left: sideOffset, width: `${SIDE_W}vw`, opacity: sideOpacity, x: rightX }}
        >
          <motion.div
            className="h-full w-full overflow-hidden rounded-[24px]"
            style={{ height }}
          >
            <Clip slide={next} className="opacity-70" />
          </motion.div>
        </motion.div>

        {/* ---------- MAIN video: full-screen -> card ---------- */}
        <motion.div
          className="relative z-10 overflow-hidden bg-neutral-950 will-change-[width,height]"
          style={{ width, height, borderRadius: radius }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={current.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ scale: videoScale }}
            >
              <Clip slide={current} muted={muted} />
            </motion.div>
          </AnimatePresence>

          {/* vignette / dark grade */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: vignette,
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,.65) 100%), linear-gradient(to bottom, rgba(0,0,0,.45), rgba(0,0,0,0) 25%)",
            }}
          />

          {/* arrows – sit on the screen edge in full-screen, inside the card after zoom-out */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous video"
            className="absolute left-3 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next video"
            className="absolute right-3 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* mute toggle */}
          <motion.button
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Unmute video" : "Mute video"}
            style={{ opacity: muteOpacity }}
            className="absolute bottom-5 right-5 z-20 grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}