import { motion } from "framer-motion";
import { LayoutGrid, Layers, GraduationCap, Infinity as InfinityIcon } from "lucide-react";

const stats = [
  { icon: LayoutGrid, value: "50+", label: "Feature pages" },
  { icon: Layers, value: "MERN", label: "Full stack examples" },
  { icon: GraduationCap, value: "100%", label: "Beginner friendly" },
  { icon: InfinityIcon, value: "Lifetime", label: "Access on purchase" },
];

const StatsSection = ({ isGray }) => {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div
        className={`mx-auto grid max-w-7xl grid-cols-2 gap-4 rounded-3xl border p-6 sm:grid-cols-4 sm:p-8 ${
          isGray
            ? "border-slate-800 bg-slate-900/60"
            : "border-slate-200 bg-white shadow-xl shadow-slate-200/60"
        }`}
      >
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col items-center gap-2 text-center"
            >
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
                className={`text-xl font-bold sm:text-2xl ${
                  isGray ? "text-slate-50" : "text-slate-900"
                }`}
              >
                {stat.value}
              </span>
              <span
                className={`text-xs sm:text-sm ${isGray ? "text-slate-400" : "text-slate-500"}`}
              >
                {stat.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default StatsSection;