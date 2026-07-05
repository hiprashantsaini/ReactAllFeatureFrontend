import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Clean, commented, beginner-friendly code — no clever one-liners.",
  "Modern animated UI for every single feature page, not just the home page.",
  "Real MERN examples: pages talk to an actual Express + MongoDB backend.",
  "New feature pages added every week, free updates for Pro members.",
];

const WhyChooseUs = ({ isGray }) => {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div
            className={`overflow-hidden rounded-3xl border shadow-2xl ${
              isGray ? "border-slate-800" : "border-slate-200"
            }`}
          >
            {/* Free-to-use Unsplash photo */}
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80"
              alt="Developer writing React code on a laptop"
              className="h-80 w-full object-cover sm:h-96"
            />
          </div>
          <div
            className={`absolute -bottom-6 -right-6 hidden rounded-2xl border px-5 py-4 shadow-xl sm:block ${
              isGray ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"
            }`}
          >
            <p className={`font-mono text-xs ${isGray ? "text-slate-500" : "text-slate-400"}`}>npm run dev</p>
            <p className="mt-1 text-sm font-semibold text-emerald-500">✓ Compiled successfully</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={`font-mono text-xs uppercase tracking-widest ${isGray ? "text-cyan-400" : "text-indigo-600"}`}>
            03 / Why This Project
          </span>
          <h2 className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl ${isGray ? "text-slate-50" : "text-slate-900"}`}>
            Built for people who learn by reading real code
          </h2>
          <ul className="mt-7 space-y-4">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <CheckCircle2
                  size={20}
                  className={`mt-0.5 flex-shrink-0 ${isGray ? "text-cyan-400" : "text-indigo-600"}`}
                />
                <span className={`text-sm sm:text-base ${isGray ? "text-slate-300" : "text-slate-600"}`}>
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;