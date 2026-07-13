import  { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, X } from "lucide-react";

const faqs = [
  { question: "What services do you provide?", answer: "We provide professional web development, mobile app development, UI/UX design, ERP solutions, API integration, and ongoing maintenance services tailored to your business needs.", category: "General" },
  { question: "How long does it take to complete a project?", answer: "The timeline depends on the project's complexity. A simple website may take 1–2 weeks, while larger applications or ERP systems can take several weeks or months. We provide a detailed timeline after understanding your requirements.", category: "Projects" },
  { question: "Do you provide support after project delivery?", answer: "Yes. We offer post-launch support, bug fixes, performance optimization, and maintenance packages to ensure your application continues to run smoothly.", category: "Support" },
  { question: "Can you redesign my existing website?", answer: "Absolutely. We can modernize your existing website with a fresh design, improved performance, enhanced security, and a better user experience while preserving your valuable content.", category: "Projects" },
  { question: "Do you develop mobile applications?", answer: "Yes. We develop cross-platform mobile applications using modern technologies such as React Native, allowing your app to run efficiently on both Android and iOS devices.", category: "Services" },
  { question: "Will my website be mobile-friendly?", answer: "Yes. Every website we develop is fully responsive, ensuring an excellent user experience across desktops, tablets, and smartphones.", category: "Services" },
  { question: "How much does a website cost?", answer: "The cost depends on your specific requirements, including design, functionality, and integrations. Contact us for a free consultation and a customized quotation.", category: "Pricing" },
  { question: "Do you provide SEO services?", answer: "Yes. We follow SEO best practices during development and also offer advanced SEO services to improve your website's visibility in search engine results.", category: "Services" },
  { question: "How can I get started?", answer: "Simply contact us with your project requirements. We'll discuss your goals, suggest the best solution, provide a project estimate, and begin development after approval.", category: "General" },
];

const categories = ["All", ...new Set(faqs.map((f) => f.category))];

// Wraps matched text in a highlighted span styled to the current theme
const Highlight = ({ text, query, isGray }) => {
  if (!query.trim()) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark
        key={i}
        className={`rounded px-0.5 ${
          isGray ? "bg-cyan-400/20 text-cyan-300" : "bg-indigo-100 text-indigo-700"
        }`}
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
};

const AdvancedFAQItem = ({ item, isOpen, onToggle, query, isGray }) => (
  <div
    className={`border-b last:border-b-0 transition-colors ${
      isGray ? "border-slate-800" : "border-slate-100"
    }`}
  >
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      className="group flex w-full items-center justify-between gap-4 py-4 text-left"
    >
      <span
        className={`text-sm font-medium leading-snug transition-colors ${
          isOpen
            ? isGray ? "text-cyan-300" : "text-indigo-600"
            : isGray ? "text-slate-200 group-hover:text-cyan-300" : "text-slate-800 group-hover:text-indigo-600"
        }`}
      >
        <Highlight text={item.question} query={query} isGray={isGray} />
      </span>

      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.25 }}
        className={`flex-shrink-0 ${
          isOpen
            ? isGray ? "text-cyan-400" : "text-indigo-500"
            : isGray ? "text-slate-600" : "text-slate-400"
        }`}
      >
        <ChevronDown size={17} />
      </motion.span>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p
            className={`pb-4 text-sm leading-relaxed ${
              isGray ? "text-slate-400" : "text-slate-500"
            }`}
          >
            <Highlight text={item.answer} query={query} isGray={isGray} />
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const AdvancedAccordion = ({ isGray }) => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return faqs.filter((f) => {
      const matchCat = activeCategory === "All" || f.category === activeCategory;
      const matchText = !q || f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
      return matchCat && matchText;
    });
  }, [query, activeCategory]);

  const handleToggle = (i) => setOpenIndex(openIndex === i ? null : i);

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    setOpenIndex(null);
  };

  const accentPill = isGray
    ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white border-transparent"
    : "bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white border-transparent";

  const inactivePill = isGray
    ? "bg-slate-800 text-slate-400 border-slate-700 hover:border-cyan-700 hover:text-cyan-300"
    : "bg-white text-slate-500 border-slate-200 hover:border-indigo-300 hover:text-indigo-600";

  return (
    <div
      className={`overflow-hidden rounded-2xl border ${
        isGray ? "border-slate-800 bg-slate-900/60" : "border-slate-200 bg-white"
      }`}
    >
      {/* header */}
      <div className={`border-b px-5 py-5 ${isGray ? "border-slate-800" : "border-slate-100"}`}>
        <h3 className={`text-sm font-semibold ${isGray ? "text-slate-200" : "text-slate-800"}`}>
          Search &amp; Filter FAQs
        </h3>
        <p className={`mt-0.5 text-xs ${isGray ? "text-slate-500" : "text-slate-400"}`}>
          Filter by category or search for any keyword.
        </p>

        {/* search bar */}
        <div className="relative mt-4">
          <Search size={14} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${isGray ? "text-slate-500" : "text-slate-400"}`} />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpenIndex(null); }}
            placeholder="Search questions…"
            className={`w-full rounded-xl border py-2.5 pl-9 pr-9 text-sm outline-none transition-colors ${
              isGray
                ? "border-slate-700 bg-slate-950 text-slate-100 placeholder:text-slate-500 focus:border-cyan-600"
                : "border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white"
            }`}
          />
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                onClick={() => setQuery("")}
                className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-full ${
                  isGray ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <X size={14} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* category pills */}
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                activeCategory === cat ? accentPill : inactivePill
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* result count */}
        <AnimatePresence>
          {(query || activeCategory !== "All") && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`mt-2 text-xs ${isGray ? "text-slate-500" : "text-slate-400"}`}
            >
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} found
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* list */}
      <div className="px-5">
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeCategory + query}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filtered.map((item, i) => (
                <AdvancedFAQItem
                  key={i}
                  item={item}
                  isOpen={openIndex === i}
                  onToggle={() => handleToggle(i)}
                  query={query}
                  isGray={isGray}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`py-12 text-center text-sm ${isGray ? "text-slate-500" : "text-slate-400"}`}
            >
              No questions match your search.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdvancedAccordion;