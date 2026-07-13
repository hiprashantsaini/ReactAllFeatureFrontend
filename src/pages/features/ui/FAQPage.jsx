import { motion } from "framer-motion";
import {
  ChevronDown as AccordionIcon,
  Code2,
  Layers,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

import CodeAccessModal from "../../../components/common/CodeAccessModal";
import CodeToggleSection from "../../../components/common/CodeToggleSection";
import Footer from "../../../components/common/Footer";
import Navbar from "../../../components/common/Navbar";
import AdvancedAccordion from "../../../components/features/ui/faq/AdvancedAccordion";
import RawAdvancedFAQPage from "../../../components/features/ui/faq/AdvancedFAQPage?raw";
import SimpleAccordion from "../../../components/features/ui/faq/SimpleAccordion";
import RawSimpleFaq from "../../../components/features/ui/faq/SimpleFAQPage?raw"; //To take as text. With backtick there was coming error because of inner backtick

const AccordionOrFaqPage = () => {
  const isGray = useSelector((state) => state.user.isGray);
  const [unlocked, setUnlocked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-500 ${
        isGray ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <Navbar isGray={isGray} />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ── header ── */}
        <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                isGray
                  ? "bg-gradient-to-br from-cyan-500/20 to-violet-600/20 text-cyan-300"
                  : "bg-gradient-to-br from-indigo-100 to-fuchsia-100 text-indigo-600"
              }`}
            >
              <AccordionIcon size={22} />
            </span>
            <div>
              <h1
                className={`text-2xl font-extrabold tracking-tight sm:text-3xl ${isGray ? "text-slate-50" : "text-slate-900"}`}
              >
                Accordion / FAQ
              </h1>
              <p
                className={`font-mono text-xs uppercase tracking-wider ${isGray ? "text-slate-500" : "text-slate-400"}`}
              >
                UI · Smooth Height Animation · 3 variants
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

        {/* Definition */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`mt-8 rounded-2xl border p-6 ${
            isGray
              ? "border-slate-800 bg-slate-900/60"
              : "border-slate-200 bg-white"
          }`}
        >
          <h2
            className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide ${
              isGray ? "text-cyan-400" : "text-indigo-600"
            }`}
          >
            <Layers size={15} />
            What is FAQ (Frequently Asked Questions)?
          </h2>

          <p
            className={`mt-3 text-sm leading-relaxed sm:text-base ${
              isGray ? "text-slate-300" : "text-slate-600"
            }`}
          >
            <strong>FAQ (Frequently Asked Questions)</strong> is a common UI
            pattern used to display answers to frequently asked questions in a
            clean and organized manner. Instead of showing all answers at once,
            each question can be expanded or collapsed independently using an
            accordion. This improves readability, saves screen space, and allows
            users to quickly find the information they need.
          </p>

          {/* Simple FAQ */}
          <div className="mt-6">
            <h3
              className={`text-sm font-semibold ${
                isGray ? "text-cyan-300" : "text-indigo-600"
              }`}
            >
              1. Simple FAQ
            </h3>

            <p
              className={`mt-2 text-sm leading-relaxed ${
                isGray ? "text-slate-300" : "text-slate-600"
              }`}
            >
              This implementation uses a CSS transition on{" "}
              <code>max-height</code> to create a smooth expand/collapse
              animation. Since CSS cannot animate between <code>height: 0</code>{" "}
              and <code>height: auto</code>, using <code>max-height</code>{" "}
              provides numeric values that the browser can interpolate. The
              container is also given <code>overflow-hidden</code> so content
              remains clipped until the animation finishes. This approach is
              simple, lightweight, and works well when the content height stays
              within a reasonable limit.
            </p>
          </div>

          {/* Advanced FAQ */}
          <div className="mt-5">
            <h3
              className={`text-sm font-semibold ${
                isGray ? "text-cyan-300" : "text-indigo-600"
              }`}
            >
              2. Advanced FAQ
            </h3>

            <p
              className={`mt-2 text-sm leading-relaxed ${
                isGray ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Advanced FAQ components are designed for larger applications and
              knowledge bases. They typically support features such as searching
              questions, filtering by category, allowing only one accordion to
              stay open at a time, highlighting matched search terms, smooth
              icon animations, accessibility using <code>aria-expanded</code>,
              keyboard navigation, lazy loading, and dynamically measuring
              content height with <code>scrollHeight</code> instead of relying
              on a fixed <code>max-height</code>. These enhancements improve
              usability, accessibility, and scalability for production
              applications.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "Help Centers",
              "Documentation",
              "Landing Pages",
              "Knowledge Base",
              "Support Portals",
              "Company Websites",
              "Product Pages",
              "Admin Panels",
            ].map((item) => (
              <span
                key={item}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  isGray
                    ? "bg-slate-800 text-slate-300"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </motion.section>

        {/* ── three variants ── */}
        <div className="mt-8 space-y-6">
          <CodeToggleSection
            isGray={isGray}
            index={1}
            title="Simple FAQ Accordion"
            description="Every item manages its own open/closed state independently — multiple panels can be open at the same time. The smoothest entry point for understanding the accordion pattern."
            demo={<SimpleAccordion isGray={isGray} />}
            code={RawSimpleFaq}
            locked={!unlocked}
            onUnlock={() => setModalOpen(true)}
          />

          <CodeToggleSection
            isGray={isGray}
            index={2}
            title="Advanced FAQ — Search, Filter &amp; Highlight"
            description="One panel open at a time. Includes a live search box with a clear button, category filter pills that reset the open state, animated result count, and keyword highlighting inside questions and answers."
            demo={<AdvancedAccordion isGray={isGray} />}
            code={RawAdvancedFAQPage}
            locked={!unlocked}
            onUnlock={() => setModalOpen(true)}
          />
        </div>

        <p
          className={`mt-6 flex items-center gap-1.5 text-xs ${isGray ? "text-slate-500" : "text-slate-400"}`}
        >
          <Sparkles size={13} />
          Unlocking once reveals the full source for all three accordion
          variants.
        </p>
      </main>

      <Footer isGray={isGray} />

      <CodeAccessModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        isGray={isGray}
        featureName="Accordion / FAQ"
        onSelectPlan={() => setUnlocked(true)}
      />
    </div>
  );
};

export default AccordionOrFaqPage;
