import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, PlayCircle, Terminal, Circle } from "lucide-react";

// The rotating list shown inside the fake "editor" — keeps the hero feeling alive
// without relying on a generic stat-block.
const liveFeatures = [
  "<Carousel />",
  "<InfiniteScroll />",
  "<Breadcrumb />",
  "<KanbanBoard />",
  "<RazorpayCheckout />",
  "<DataTable />",
];

const HeroSection = ({ isGray }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % liveFeatures.length);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24">
      {/* Ambient gradient blobs */}
      <div
        className={`pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full blur-3xl ${
          isGray ? "bg-violet-700/30" : "bg-fuchsia-300/40"
        }`}
      />
      <div
        className={`pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full blur-3xl ${
          isGray ? "bg-cyan-600/20" : "bg-indigo-300/40"
        }`}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wider ${
              isGray
                ? "border-slate-700 bg-slate-900 text-cyan-300"
                : "border-indigo-200 bg-indigo-50 text-indigo-600"
            }`}
          >
            <Circle size={8} className="fill-current" />
            MERN Stack · Beginner Friendly
          </span>

          <h1
            className={`mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl ${
              isGray ? "text-slate-50" : "text-slate-900"
            }`}
          >
            Every React feature,{" "}
            <span
              className={`bg-clip-text text-transparent ${
                isGray
                  ? "bg-gradient-to-r from-cyan-400 to-violet-400"
                  : "bg-gradient-to-r from-indigo-600 to-fuchsia-600"
              }`}
            >
              one page at a time.
            </span>
          </h1>

          <p
            className={`mt-5 max-w-xl text-base leading-relaxed sm:text-lg ${
              isGray ? "text-slate-400" : "text-slate-600"
            }`}
          >
            ReactAllCodeAndFeatures is a growing collection of real, working
            pages — carousels, infinite scroll, breadcrumbs, drag &amp; drop,
            payments and more — each with clean, copy-paste-ready MERN code
            built for beginners who learn best by example.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#features"
              className={`group flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 ${
                isGray
                  ? "bg-gradient-to-r from-cyan-500 to-violet-600 shadow-cyan-900/40"
                  : "bg-gradient-to-r from-indigo-600 to-fuchsia-600 shadow-indigo-300/50"
              }`}
            >
              Explore Features
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#how-it-works"
              className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors ${
                isGray
                  ? "border-slate-700 text-slate-200 hover:bg-slate-900"
                  : "border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <PlayCircle size={16} />
              See how it works
            </a>
          </div>
        </motion.div>

        {/* Right: signature animated "code window" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={`relative rounded-2xl border shadow-2xl ${
            isGray
              ? "border-slate-800 bg-slate-900 shadow-black/40"
              : "border-slate-200 bg-white shadow-slate-300/50"
          }`}
        >
          {/* window chrome */}
          <div
            className={`flex items-center gap-2 rounded-t-2xl border-b px-4 py-3 ${
              isGray ? "border-slate-800 bg-slate-950" : "border-slate-100 bg-slate-50"
            }`}
          >
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
            <span
              className={`ml-3 flex items-center gap-1.5 font-mono text-xs ${
                isGray ? "text-slate-500" : "text-slate-400"
              }`}
            >
              <Terminal size={12} /> HomePage.jsx
            </span>
          </div>

          <div className="p-6 font-mono text-sm sm:text-base">
            <p className={isGray ? "text-violet-400" : "text-fuchsia-600"}>
              import <span className={isGray ? "text-slate-200" : "text-slate-800"}>Feature</span> from{" "}
              <span className={isGray ? "text-emerald-400" : "text-emerald-600"}>"react"</span>;
            </p>
            <p className="mt-4">
              <span className={isGray ? "text-cyan-400" : "text-indigo-600"}>render</span>(
            </p>
            <div className="ml-4 mt-2 h-8 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={liveFeatures[index]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className={`inline-flex items-center font-semibold ${
                    isGray ? "text-amber-300" : "text-rose-500"
                  }`}
                >
                  {liveFeatures[index]}
                  <span className="ml-1 inline-block h-4 w-0.5 animate-pulse bg-current" />
                </motion.span>
              </AnimatePresence>
            </div>
            <p className="mt-2">);</p>
          </div>

          <div
            className={`flex items-center justify-between rounded-b-2xl border-t px-6 py-3 font-mono text-xs ${
              isGray ? "border-slate-800 text-slate-500" : "border-slate-100 text-slate-400"
            }`}
          >
            <span>50+ pages · growing weekly</span>
            <span className="text-emerald-500">● live</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;