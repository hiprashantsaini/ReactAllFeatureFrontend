import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { question: "What services do you provide?", answer: "We provide professional web development, mobile app development, UI/UX design, ERP solutions, API integration, and ongoing maintenance services tailored to your business needs." },
  { question: "How long does it take to complete a project?", answer: "The timeline depends on the project's complexity. A simple website may take 1–2 weeks, while larger applications or ERP systems can take several weeks or months. We provide a detailed timeline after understanding your requirements." },
  { question: "Do you provide support after project delivery?", answer: "Yes. We offer post-launch support, bug fixes, performance optimization, and maintenance packages to ensure your application continues to run smoothly." },
  { question: "Can you redesign my existing website?", answer: "Absolutely. We can modernize your existing website with a fresh design, improved performance, enhanced security, and a better user experience while preserving your valuable content." },
  { question: "How much does a website cost?", answer: "The cost depends on your specific requirements, including design, functionality, and integrations. Contact us for a free consultation and a customized quotation." },
];

const FAQItem = ({ item, isGray }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border-b last:border-b-0 transition-colors ${
        isGray ? "border-slate-800" : "border-slate-200"
      }`}
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span
          className={`text-sm font-semibold leading-snug transition-colors sm:text-base ${
            open
              ? isGray ? "text-cyan-300" : "text-indigo-600"
              : isGray ? "text-slate-200" : "text-slate-800"
          }`}
        >
          {item.question}
        </span>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className={`flex-shrink-0 ${
            open
              ? isGray ? "text-cyan-400" : "text-indigo-600"
              : isGray ? "text-slate-500" : "text-slate-400"
          }`}
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
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
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SimpleAccordion = ({ isGray }) => {
  return (
    <div
      className={`overflow-hidden rounded-2xl border ${
        isGray ? "border-slate-800 bg-slate-900/60" : "border-slate-200 bg-white"
      }`}
    >
      <div
        className={`border-b px-5 py-4 ${
          isGray ? "border-slate-800" : "border-slate-100"
        }`}
      >
        <h3
          className={`text-sm font-semibold ${
            isGray ? "text-slate-200" : "text-slate-800"
          }`}
        >
          Frequently Asked Questions
        </h3>
        <p className={`text-xs mt-0.5 ${isGray ? "text-slate-500" : "text-slate-400"}`}>
          Click any question to expand its answer.
        </p>
      </div>

      <div className="px-5">
        {faqs.map((item, i) => (
          <FAQItem key={i} item={item} isGray={isGray} />
        ))}
      </div>
    </div>
  );
};

export default SimpleAccordion;