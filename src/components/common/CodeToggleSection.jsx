import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, ChevronDown } from "lucide-react";
import CodeBlock from "./CodeBlock";

/**
 * CodeToggleSection
 * One "variant" block: a live demo, a description, and a Show/Hide Code
 * toggle that expands a CodeBlock underneath. Locking still works exactly
 * like before — `locked` + `onUnlock` come from the page (driven by the
 * single CodeAccessModal), so buying once unlocks every variant at once.
 */
const CodeToggleSection = ({ isGray, index, title, description, demo, code, locked, onUnlock }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 ${
        isGray ? "border-slate-800 bg-slate-900/40" : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg font-mono text-sm font-bold ${
            isGray ? "bg-slate-800 text-cyan-300" : "bg-slate-100 text-indigo-600"
          }`}
        >
          {index}
        </span>
        <div>
          <h3 className={`text-base font-semibold sm:text-lg ${isGray ? "text-slate-100" : "text-slate-900"}`}>
            {title}
          </h3>
          <p className={`mt-1 text-sm leading-relaxed ${isGray ? "text-slate-400" : "text-slate-500"}`}>
            {description}
          </p>
        </div>
      </div>

      {/* live demo */}
      <div className="mt-5">{demo}</div>

      {/* show / hide code toggle */}
      <button
        onClick={() => setOpen((p) => !p)}
        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium transition-colors ${
          isGray
            ? "border-slate-800 text-slate-300 hover:bg-slate-800"
            : "border-slate-200 text-slate-600 hover:bg-slate-50"
        }`}
      >
        <Code2 size={15} />
        {open ? "Hide Code" : "Show Code"}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={15} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4">
              <CodeBlock
                isGray={isGray}
                locked={locked}
                onUnlock={onUnlock}
                tabs={[{ id: "code", label: title, code }]}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CodeToggleSection;