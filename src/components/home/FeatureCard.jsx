import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * FeatureCard
 * One tile per React feature/page. Kept generic and reusable so the same
 * card can later be reused on a "/features" listing page too.
 */
const FeatureCard = ({ icon: Icon, title, description, tag, path, isGray, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 8) * 0.05 }}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-2xl border p-5 transition-colors hover:border-(--primary-hover-border) bg-(--secondary-bg) border-(--primary-border) ${
        isGray
          ? ""
          : " shadow-sm hover:shadow-lg hover:shadow-indigo-100"
      }`}
    >
      {/* corner glow on hover */}
      <div
        className={`absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-60 ${
          isGray ? "bg-cyan-500" : "bg-fuchsia-400"
        }`}
      />

      <div className="relative flex items-start justify-between">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            isGray
              ? "bg-gradient-to-br from-cyan-500/20 to-violet-600/20 text-cyan-300"
              : "bg-gradient-to-br from-indigo-100 to-fuchsia-100 text-indigo-600"
          }`}
        >
          <Icon size={18} />
        </span>
        <span
          className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-(--secondary-text) bg-(--primary-bg)`}
        >
          {tag}
        </span>
      </div>

      <h3
        className={`relative mt-4 text-base font-semibold text-(--primary-text)`}
      >
        {title}
      </h3>
      <p className={`relative mt-1.5 text-sm leading-relaxed text-(--secondary-text)`}>
        {description}
      </p>

      <Link
        to={path}
        className={`relative mt-4 inline-flex items-center gap-1 text-sm font-medium text-(--accent-color1) ${
          isGray ? " hover:text-cyan-300" : " hover:text-indigo-700"
        }`}
      >
        View page
        <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </motion.div>
  );
};

export default FeatureCard;