import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { GalleryHorizontal, Code2, Image, Sparkles } from "lucide-react";
import Navbar from "../../../components/common/Navbar";
import CodeToggleSection from "../../../components/common/CodeToggleSection";
import SimpleCarousel from "../../../components/features/ui/imageCarousel/SimpleCarousel";
import AdvancedCarousel from "../../../components/features/ui/imageCarousel/AdvancedCarousel";
import PackageCarousel from "../../../components/features/ui/imageCarousel/PackageCarousel";
import Footer from "../../../components/common/Footer";
import CodeAccessModal from "../../../components/common/CodeAccessModal";


const useCases = ["Hero banners", "Product image galleries", "Testimonial sliders", "Onboarding screens"];

// Code strings mirror the actual demo components exactly, so "Show Code"
// always matches what's running above it.
const simpleCode = `
////Install these packages
//1. npm install framer-motion  (For smooth animation)
//2. npm install lucide-react   (For icons)

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "https://picsum.photos/id/1011/900/500",
  "https://picsum.photos/id/1012/900/500",
  "https://picsum.photos/id/1013/900/500",
];

const SimpleCarousel = () => {
  const [index, setIndex] = useState(0);

  const goNext = () => setIndex((prev) => (prev + 1) % images.length);
  const goPrev = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="h-72 w-full object-cover"
          alt="slide"
        />
      </AnimatePresence>

      <button
        onClick={goPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={goNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white"
      >
        <ChevronRight size={18} />
      </button>

      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={\`h-2 w-2 rounded-full \${i === index ? "bg-white" : "bg-white/40"}\`}
          />
        ))}
      </div>
    </div>
  );
};

export default SimpleCarousel;`;

const advancedCode = `import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const images = [
  "https://picsum.photos/id/1021/900/500",
  "https://picsum.photos/id/1024/900/500",
  "https://picsum.photos/id/1025/900/500",
  "https://picsum.photos/id/1027/900/500",
];

const SLIDE_DURATION = 4000; // ms

const AdvancedCarousel = () => {
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

  // left / right arrow key support
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

  return (
    <div
      className="w-full overflow-hidden rounded-2xl border border-slate-800"
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => setPlaying(true)}
    >
      {/* autoplay progress bar */}
      <div className="h-1 w-full bg-slate-800">
        {playing && (
          <motion.div
            key={index}
            className="h-full bg-cyan-400"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
          />
        )}
      </div>

      <div className="relative h-72 overflow-hidden">
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
            alt="slide"
          />
        </AnimatePresence>

        <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white">
          <ChevronLeft size={18} />
        </button>
        <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white">
          <ChevronRight size={18} />
        </button>
        <button onClick={() => setPlaying((p) => !p)} className="absolute right-3 top-3 rounded-full bg-black/40 p-1.5 text-white">
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>
      </div>

      {/* thumbnail strip */}
      <div className="flex gap-2 overflow-x-auto bg-slate-900 p-3">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => goTo(i, i > index ? 1 : -1)}
            className={\`h-12 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 \${
              i === index ? "border-cyan-400" : "border-transparent opacity-50"
            }\`}
          >
            <img src={src} className="h-full w-full object-cover" alt={\`thumb-\${i}\`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdvancedCarousel;`;

const packageCode = `// 1. Install the package
// npm install react-responsive-carousel

import React from "react";
import { Carousel } from "react-responsive-carousel";
// Required for the package's default arrows/dots/thumbs styling
import "react-responsive-carousel/lib/styles/carousel.min.css";

const images = [
  "https://picsum.photos/id/1035/900/500",
  "https://picsum.photos/id/1036/900/500",
  "https://picsum.photos/id/1041/900/500",
];

const PackageCarousel = () => {
  return (
    <Carousel
      showThumbs
      showStatus={false}
      infiniteLoop
      autoPlay
      interval={4000}
      swipeable
      emulateTouch
    >
      {images.map((src, i) => (
        <div key={i}>
          <img src={src} alt={\`slide-\${i}\`} />
        </div>
      ))}
    </Carousel>
  );
};

export default PackageCarousel;`;

const ImageCarouselPage = () => {
  const isGray = useSelector((state) => state.user.isGray);
  const [unlocked, setUnlocked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-500 ${
        isGray ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <Navbar isGray={isGray} />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* <PageBreadcrumb isGray={isGray} current="Image Carousel" /> */}

        {/* header */}
        <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                isGray
                  ? "bg-gradient-to-br from-cyan-500/20 to-violet-600/20 text-cyan-300"
                  : "bg-gradient-to-br from-indigo-100 to-fuchsia-100 text-indigo-600"
              }`}
            >
              <GalleryHorizontal size={22} />
            </span>
            <div>
              <h1 className={`text-2xl font-extrabold tracking-tight sm:text-3xl ${isGray ? "text-slate-50" : "text-slate-900"}`}>
                Image Carousel
              </h1>
              <p className={`font-mono text-xs uppercase tracking-wider ${isGray ? "text-slate-500" : "text-slate-400"}`}>
                UI · Animation · 3 ways to build it
              </p>
            </div>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 ${
              isGray
                ? "bg-gradient-to-r from-cyan-500 to-violet-600"
                : "bg-gradient-to-r from-indigo-600 to-fuchsia-600"
            }`}
          >
            <Code2 size={16} />
            {unlocked ? "Code Unlocked" : "Get Code"}
          </button>
        </div>

        {/* definition */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`mt-8 rounded-2xl border p-6 ${
            isGray ? "border-slate-800 bg-slate-900/60" : "border-slate-200 bg-white"
          }`}
        >
          <h2 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide ${isGray ? "text-cyan-400" : "text-indigo-600"}`}>
            <Image size={15} />
            What is a Carousel?
          </h2>
          <p className={`mt-3 text-sm leading-relaxed sm:text-base ${isGray ? "text-slate-300" : "text-slate-600"}`}>
            A <strong>carousel</strong> (also called a slider) shows multiple images or
            pieces of content in the same space by cycling through them one at a time —
            usually with next/previous arrows, dot indicators, and optional autoplay.
            Below are three real ways to build one, from the simplest possible version
            to a ready-made package.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {useCases.map((u) => (
              <span
                key={u}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  isGray ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"
                }`}
              >
                {u}
              </span>
            ))}
          </div>
        </motion.section>

        {/* three variants */}
        <div className="mt-8 space-y-6">
          <CodeToggleSection
            isGray={isGray}
            index={1}
            title="Simple Carousel"
            description="The most basic version — one piece of state, two buttons, and dot navigation. Start here to understand the core idea."
            demo={<SimpleCarousel isGray={isGray} />}
            code={simpleCode}
            locked={!unlocked}
            onUnlock={() => setModalOpen(true)}
          />

          <CodeToggleSection
            isGray={isGray}
            index={2}
            title="Advanced Carousel (with controls)"
            description="Adds autoplay with a progress bar, swipe/drag support, left/right arrow-key navigation, and a clickable thumbnail strip."
            demo={<AdvancedCarousel isGray={isGray} />}
            code={advancedCode}
            locked={!unlocked}
            onUnlock={() => setModalOpen(true)}
          />

          <CodeToggleSection
            isGray={isGray}
            index={3}
            title="Using react-responsive-carousel"
            description="A popular, battle-tested npm package — arrows, dots, swipe and thumbnails all come built in, with almost no custom code needed."
            demo={<PackageCarousel isGray={isGray} />}
            code={packageCode}
            locked={!unlocked}
            onUnlock={() => setModalOpen(true)}
          />
        </div>

        <p className={`mt-6 flex items-center gap-1.5 text-xs ${isGray ? "text-slate-500" : "text-slate-400"}`}>
          <Sparkles size={13} />
          Buying this feature unlocks the code for all three versions above.
        </p>
      </main>

      <Footer isGray={isGray} />

      <CodeAccessModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        isGray={isGray}
        featureName="Image Carousel"
        onSelectPlan={() => setUnlocked(true)}
      />
    </div>
  );
};

export default ImageCarouselPage;