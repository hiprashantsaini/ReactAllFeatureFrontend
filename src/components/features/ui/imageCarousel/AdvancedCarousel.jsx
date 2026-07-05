import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&h=500&fit=crop",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?w=900&h=500&fit=crop",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&h=500&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&h=500&fit=crop",
];

const SLIDE_DURATION = 4000; // ms

/**
 * AdvancedCarousel
 * Same core idea as SimpleCarousel, with extra controls layered on top:
 * - autoplay with a visual progress bar
 * - drag / swipe to change slides
 * - left/right arrow key support
 * - a clickable thumbnail strip
 */
const AdvancedCarousel = ({ isGray }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [playing, setPlaying] = useState(true);

  const goTo = useCallback((newIndex, dir) => {
    setDirection(dir);
    setIndex((newIndex + images.length) % images.length);
  }, []);

  const next = useCallback(() => goTo(index + 1, 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1, -1), [index, goTo]);

  // autoplay
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [playing, next]);

  // left / right arrow keys
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [next, prev]);

  // swipe / drag to change slides
  const handleDragEnd = (_, info) => {
    if (info.offset.x < -80) next();
    else if (info.offset.x > 80) prev();
  };

  const accent = isGray ? "bg-cyan-400" : "bg-indigo-600";

  return (
    <div
      className={`w-full overflow-hidden rounded-2xl border ${isGray ? "border-slate-800" : "border-slate-200"}`}
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => setPlaying(true)}
    >
      {/* autoplay progress bar */}
      <div className={`h-1 w-full ${isGray ? "bg-slate-800" : "bg-slate-200"}`}>
        {playing && (
          <motion.div
            key={index}
            className={`h-full ${accent}`}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
          />
        )}
      </div>

      <div className="relative h-56 overflow-hidden sm:h-72 lg:h-80">
        <AnimatePresence custom={direction} mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            initial={{ x: direction > 0 ? 90 : -90, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -90 : 90, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 h-full w-full cursor-grab object-cover active:cursor-grabbing"
            alt={`slide-${index}`}
          />
        </AnimatePresence>

        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
        >
          <ChevronRight size={18} />
        </button>
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label="Toggle autoplay"
          className="absolute right-3 top-3 rounded-full bg-black/40 p-1.5 text-white"
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>
      </div>

      {/* thumbnail strip */}
      <div className={`flex gap-2 overflow-x-auto p-3 ${isGray ? "bg-slate-900" : "bg-slate-50"}`}>
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => goTo(i, i > index ? 1 : -1)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-12 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-opacity ${
              i === index ? (isGray ? "border-cyan-400" : "border-indigo-600") : "border-transparent opacity-50"
            }`}
          >
            <img src={src} className="h-full w-full object-cover" alt={`thumb-${i}`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdvancedCarousel;