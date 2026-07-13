import { motion } from "framer-motion";
import { Code2, Layers, Maximize2, Sparkles } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

import CodeAccessModal from "../../../components/common/CodeAccessModal";
import CodeToggleSection from "../../../components/common/CodeToggleSection";
import Footer from "../../../components/common/Footer";
import Navbar from "../../../components/common/Navbar";
import AdvancedModalDemo from "../../../components/features/ui/modal/AdvancedModalDemo";
import SimpleModalDemo from "../../../components/features/ui/modal/SimpleModalDemo";


// ?raw tells Vite to import these files as plain strings — no escaping needed,
// the code is shown exactly as written in the file.
import advancedCode from "../../../components/features/ui/modal/AdvancedModalCode.jsx?raw";
import simpleCode from "../../../components/features/ui/modal/SimpleModalCode.jsx?raw";


const useCases = ["Confirmation dialogs", "User detail drawers", "Image lightboxes", "Form overlays"];

const ModalPage = () => {
  const isGray = useSelector((state) => state.user.isGray);
  const [unlocked, setUnlocked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-500 overflow-hidden ${
        isGray ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <Navbar isGray={isGray} />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

        {/* header */}
        <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                isGray
                  ? "bg-gradient-to-br from-cyan-500/20 to-violet-600/20 text-cyan-300"
                  : "bg-gradient-to-br from-indigo-100 to-fuchsia-100 text-indigo-600"
              }`}
            >
              <Maximize2 size={22} />
            </span>
            <div>
              <h1 className={`text-2xl font-extrabold tracking-tight sm:text-3xl ${isGray ? "text-slate-50" : "text-slate-900"}`}>
                Modal / Dialog
              </h1>
              <p className={`font-mono text-xs uppercase tracking-wider ${isGray ? "text-slate-500" : "text-slate-400"}`}>
                UI · Overlay · Framer Motion Variants
              </p>
            </div>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 ${
              isGray
                ? "bg-gradient-to-r from-cyan-500 to-violet-600"
                : "bg-gradient-to-r from-indigo-600 to-fuchsia-600"
            }`}
          >
            <Code2 size={16} />
            {unlocked ? "✓ Code Unlocked" : "Get Code"}
          </button>
        </div>

        {/* definition */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`mt-8 rounded-2xl border p-6 ${
            isGray ? "border-slate-800 bg-slate-900/60" : "border-slate-200 bg-white"
          }`}
        >
          <h2 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide ${isGray ? "text-cyan-400" : "text-indigo-600"}`}>
            <Layers size={15} />
            What is a Modal?
          </h2>
          <p className={`mt-3 text-sm leading-relaxed sm:text-base ${isGray ? "text-slate-300" : "text-slate-600"}`}>
            A <strong>modal</strong> (or dialog) is a panel that appears on top of the
            current page, blocking interaction with everything behind it until it's
            dismissed. It's perfect for confirmations, forms, detail views and
            lightboxes — anything that deserves focused attention without navigating
            away. The key UX rules: <strong>click backdrop to close</strong>,{" "}
            <strong>Escape key to close</strong>, and <strong>scroll lock</strong> while
            open so the background doesn't shift unexpectedly.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {useCases.map((u) => (
              <span
                key={u}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  isGray ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"
                }`}
              >
                {u}
              </span>
            ))}
          </div>
        </motion.section>

        {/* variants */}
        <div className="mt-8 space-y-6">
          <CodeToggleSection
            isGray={isGray}
            index={1}
            title="Simple Modal"
            description="No animation library needed — just a conditional render with a fixed overlay. Covers the three fundamentals: backdrop click closes it, stopPropagation prevents accidental close, and a clean header/body/footer layout."
            demo={<SimpleModalDemo isGray={isGray} />}
            code={simpleCode}
            locked={!unlocked}
            onUnlock={() => setModalOpen(true)}
          />

          <CodeToggleSection
            isGray={isGray}
            index={2}
            title="Modal with Framer Motion Variants"
            description="A single reusable Modal component that accepts a variant prop — scale, slideUp, slideDown, slideLeft or fade. Includes Escape key support, scroll lock, and AnimatePresence for a clean exit animation."
            demo={<AdvancedModalDemo isGray={isGray} />}
            code={advancedCode}
            locked={!unlocked}
            onUnlock={() => setModalOpen(true)}
          />
        </div>

        <p className={`mt-6 flex items-center gap-1.5 text-xs ${isGray ? "text-slate-500" : "text-slate-400"}`}>
          <Sparkles size={13} />
          Unlocking reveals both modal variants — the original code, no changes made.
        </p>
      </main>

      <Footer isGray={isGray} />

      <CodeAccessModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        isGray={isGray}
        featureName="Modal / Dialog"
        onSelectPlan={() => setUnlocked(true)}
      />
    </div>
  );
};

export default ModalPage;