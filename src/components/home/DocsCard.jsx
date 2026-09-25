import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const DocsCard = ({ icon: Icon, title, description, tag, path, index = 0 }) => {
  return (
    <Link to={path} className="group block">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: index * 0.08 }}
        whileHover={{ y: -6 }}
        className="relative overflow-hidden rounded-3xl border border-(--primary-border) bg-(--secondary-bg) p-5 shadow-sm transition-all hover:border-(--primary-hover-border) hover:shadow-xl hover:shadow-indigo-100/30"
      >
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-(--accent-color1)/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-60" />

        <div className="relative flex items-start justify-between gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-(--primary-bg) text-(--accent-color1) ring-1 ring-(--primary-border)">
            <Icon size={18} />
          </span>
          <span className="rounded-full border border-(--primary-border) bg-(--primary-bg) px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-(--secondary-text)">
            {tag}
          </span>
        </div>

        <h3 className="relative mt-5 text-lg font-semibold text-(--primary-text)">
          {title}
        </h3>
        <p className="relative mt-2 text-sm leading-6 text-(--secondary-text)">
          {description}
        </p>

        <div className="relative mt-5 inline-flex items-center gap-2 text-sm font-medium text-(--accent-color1) transition-colors group-hover:text-(--primary-text)">
          Open docs
          <ArrowUpRight
            size={15}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>
      </motion.div>
    </Link>
  );
};

export default DocsCard;
