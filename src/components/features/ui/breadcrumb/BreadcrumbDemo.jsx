import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, ChevronRight } from "lucide-react";

// Sample route depths so visitors can see the trail grow/shrink live —
// no real router needed for the demo.
const samplePaths = [
  ["Home"],
  ["Home", "Products"],
  ["Home", "Products", "Men's Shoes"],
  ["Home", "Products", "Men's Shoes", "Nike Air Max 90"],
];

const BreadcrumbDemo = ({ isGray }) => {
  const [depth, setDepth] = useState(2);
  const path = samplePaths[depth];

  return (
    <div
      className={`overflow-hidden rounded-2xl border ${
        isGray ? "border-slate-800 bg-slate-900/60" : "border-slate-200 bg-white"
      }`}
    >
      {/* fake browser url bar */}
      <div
        className={`flex items-center gap-2 border-b px-4 py-3 ${
          isGray ? "border-slate-800 bg-slate-950" : "border-slate-100 bg-slate-50"
        }`}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className={`ml-3 truncate font-mono text-xs ${isGray ? "text-slate-500" : "text-slate-400"}`}>
          yourapp.com/{path.slice(1).join("/").toLowerCase().replace(/\s+/g, "-") || ""}
        </span>
      </div>

      <div className="p-6">
        {/* the actual breadcrumb trail */}
        <nav className="flex flex-wrap items-center gap-1.5">
          <AnimatePresence mode="popLayout">
            {path.map((crumb, i) => {
              const isLast = i === path.length - 1;
              return (
                <motion.span
                  key={crumb + i}
                  layout
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                  className="flex items-center gap-1.5"
                >
                  {i > 0 && (
                    <ChevronRight size={14} className={isGray ? "text-slate-600" : "text-slate-400"} />
                  )}
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className={`flex items-center gap-1 text-sm ${
                      isLast
                        ? `font-semibold ${isGray ? "text-cyan-300" : "text-indigo-600"}`
                        : `${isGray ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800"}`
                    }`}
                  >
                    {i === 0 && <Home size={13} />}
                    {crumb}
                  </a>
                </motion.span>
              );
            })}
          </AnimatePresence>
        </nav>

        {/* depth controls */}
        <div className="mt-6 flex flex-wrap gap-2">
          {samplePaths.map((_, i) => (
            <button
              key={i}
              onClick={() => setDepth(i)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                depth === i
                  ? isGray
                    ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white"
                    : "bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white"
                  : isGray
                  ? "bg-slate-800 text-slate-400 hover:text-slate-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Level {i + 1}
            </button>
          ))}
        </div>
        <p className={`mt-3 text-xs ${isGray ? "text-slate-500" : "text-slate-400"}`}>
          Click a level to simulate navigating deeper into a site — watch the trail grow.
        </p>
      </div>
    </div>
  );
};

export default BreadcrumbDemo;