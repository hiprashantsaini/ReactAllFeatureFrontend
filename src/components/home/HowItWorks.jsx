import React from "react";
import { motion } from "framer-motion";
import { Compass, Copy, Rocket } from "lucide-react";

const steps = [
  {
    icon: Compass,
    title: "Browse a feature",
    description: "Pick any page from the catalogue — carousel, infinite scroll, auth, payments, anything.",
  },
  {
    icon: Copy,
    title: "Copy the code",
    description: "Every page ships with short, commented, beginner-friendly React + Express code.",
  },
  {
    icon: Rocket,
    title: "Build your app",
    description: "Drop it into your own MERN project and ship the feature in minutes, not hours.",
  },
];

const HowItWorks = ({ isGray }) => {
  return (
    <section id="how-it-works" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl text-center">
        <span className={`font-mono text-xs uppercase tracking-widest ${isGray ? "text-cyan-400" : "text-indigo-600"}`}>
          02 / The Flow
        </span>
        <h2 className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl ${isGray ? "text-slate-50" : "text-slate-900"}`}>
          Learning, in three honest steps
        </h2>
      </div>

      <div className="relative mx-auto mt-14 grid max-w-5xl gap-8 sm:grid-cols-3">
        {/* connecting line on desktop */}
        <div
          className={`absolute left-0 right-0 top-7 hidden h-px sm:block ${
            isGray ? "bg-slate-800" : "bg-slate-200"
          }`}
        />
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center"
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-2xl border shadow-md ${
                  isGray
                    ? "border-slate-800 bg-slate-900 text-cyan-300"
                    : "border-slate-200 bg-white text-indigo-600"
                }`}
              >
                <Icon size={22} />
              </span>
              <h3 className={`mt-5 text-lg font-semibold ${isGray ? "text-slate-100" : "text-slate-900"}`}>
                {step.title}
              </h3>
              <p className={`mt-2 max-w-xs text-sm ${isGray ? "text-slate-400" : "text-slate-500"}`}>
                {step.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;