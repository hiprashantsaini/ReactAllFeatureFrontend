import { motion } from "framer-motion";
import { Rocket, ArrowRight } from "lucide-react";

const CTASection = ({ isGray }) => {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`relative mx-auto max-w-7xl overflow-hidden rounded-3xl px-8 py-14 text-center sm:px-16 ${
          isGray
            ? "bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900"
            : "bg-gradient-to-br from-indigo-600 via-fuchsia-600 to-rose-500"
        }`}
      >
        <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

        <Rocket size={28} className="mx-auto text-white" />
        <h2 className="relative mt-4 text-2xl font-extrabold text-white sm:text-3xl">
          Stop reading docs. Start copying real pages.
        </h2>
        <p className="relative mx-auto mt-3 max-w-xl text-sm text-white/80 sm:text-base">
          Jump into the catalogue and find the exact feature you need for your next MERN project.
        </p>
        <a
          href="#features"
          className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition-transform hover:scale-105"
        >
          Browse all features
          <ArrowRight size={16} />
        </a>
      </motion.div>
    </section>
  );
};

export default CTASection;