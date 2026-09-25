import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Aditi Sharma",
    role: "CS Final Year Student",
    avatar: "https://i.pravatar.cc/150?img=47",
    text: "The infinite scroll and data table pages alone saved me a full day on my college project.",
  },
  {
    name: "Rohan Mehta",
    role: "Self-taught Developer",
    avatar: "https://i.pravatar.cc/150?img=12",
    text: "Every page actually explains why the code works, not just what to paste. Huge for beginners.",
  },
  {
    name: "Sneha Iyer",
    role: "Frontend Intern",
    avatar: "https://i.pravatar.cc/150?img=32",
    text: "Copied the multi-step form pattern straight into my internship project. Worked first try.",
  },
];

const Testimonials = ({ isGray }) => {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <span className={`font-mono text-xs uppercase tracking-widest text-(--accent-color2)`}>
          05 / From Learners
        </span>
        <h2 className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl text-(--primary-text)`}>
          What other beginners are building
        </h2>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={`rounded-2xl border p-6 border-(--primary-border) bg-(--primary-bg) shadow-sm`}
          >
            <Quote size={20} className={"text-(--accent-color1)"} />
            <p className={`mt-3 text-sm leading-relaxed text-(--primary-text)`}>
              {t.text}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
              <div>
                <p className={`text-sm font-semibold text-(--primary-text)`}>
                  {t.name}
                </p>
                <p className={`text-xs text-(--secondary-text)`}>{t.role}</p>
              </div>
            </div>
            <div className="mt-3 flex gap-0.5">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} size={14} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;