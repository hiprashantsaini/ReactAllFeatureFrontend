import  { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Free-to-use dummy images (Lorem Picsum)
const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1494526585095-c41746248156",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba",
];

/**
 * SimpleCarousel
 * The smallest possible carousel: one piece of state (the current index)
 * and two functions to move it. No autoplay, no extras — just the idea.
 */
const SimpleCarousel = ({ isGray }) => {
  const [index, setIndex] = useState(0);

  const goNext = () => setIndex((prev) => (prev + 1) % images.length);
  const goPrev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl border ${isGray ? "border-slate-800" : "border-slate-200"}`}>
      <div className="relative h-56 sm:h-72 lg:h-80">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 h-full w-full object-cover"
            alt={`slide-${index}`}
          />
        </AnimatePresence>

        <button
          onClick={goPrev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={goNext}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className={`flex items-center justify-center gap-2 py-3 ${isGray ? "bg-slate-900" : "bg-slate-50"}`}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 w-2 rounded-full transition-all ${
              i === index ? (isGray ? "w-5 bg-cyan-400" : "w-5 bg-indigo-600") : isGray ? "bg-slate-700" : "bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SimpleCarousel;