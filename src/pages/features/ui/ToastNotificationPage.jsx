import { motion } from "framer-motion";
import { Bell, Code2, Layers, MonitorSmartphone, Sparkles } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";


import Footer from "../../../components/common/Footer";

import CodeAccessModal from "../../../components/common/CodeAccessModal";
import CodeBlock from "../../../components/common/CodeBlock";
import Navbar from "../../../components/common/Navbar";
import toastCode from "../../../components/features/ui/toast/ToastCode.jsx?raw";
import ToastDemo from "../../../components/features/ui/toast/ToastDemo";

const useCases = ["Form submission feedback", "API error alerts", "Copy-to-clipboard confirm", "Background task updates"];

const ToastNotificationPage = () => {
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
              <Bell size={22} />
            </span>
            <div>
              <h1 className={`text-2xl font-extrabold tracking-tight sm:text-3xl ${isGray ? "text-slate-50" : "text-slate-900"}`}>
                Toast Notifications
              </h1>
              <p className={`font-mono text-xs uppercase tracking-wider ${isGray ? "text-slate-500" : "text-slate-400"}`}>
                Feedback · Context API · 6 positions · 4 types
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
            What is a Toast Notification?
          </h2>
          <p className={`mt-3 text-sm leading-relaxed sm:text-base ${isGray ? "text-slate-300" : "text-slate-600"}`}>
            A <strong>toast</strong> is a small, temporary message that appears at the
            edge of the screen to give the user quick feedback — like "Saved successfully"
            or "Something went wrong" — then disappears automatically after a few seconds
            without any user action. This implementation uses <strong>React Context</strong>{" "}
            to expose a <code className={`rounded px-1 font-mono text-xs ${isGray ? "bg-slate-800 text-cyan-300" : "bg-slate-100 text-indigo-600"}`}>setToast</code> function
            globally, so any component can fire a toast in one line. The animation
            uses <strong>CSS transitions</strong> (no extra library) combined with a
            double <code className={`rounded px-1 font-mono text-xs ${isGray ? "bg-slate-800 text-cyan-300" : "bg-slate-100 text-indigo-600"}`}>requestAnimationFrame</code>{" "}
            trick to guarantee the hide state renders first so the enter animation plays correctly every time.
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

        {/* how it works callout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={`mt-4 rounded-2xl border p-5 ${
            isGray ? "border-slate-800 bg-slate-900/40" : "border-indigo-100 bg-indigo-50/50"
          }`}
        >
          <p className={`text-xs font-semibold uppercase tracking-wider ${isGray ? "text-cyan-400" : "text-indigo-600"}`}>
            💡 Why double requestAnimationFrame?
          </p>
          <p className={`mt-2 text-sm leading-relaxed ${isGray ? "text-slate-400" : "text-slate-600"}`}>
            When you show a new toast, you first set it to the "hidden" (off-screen)
            state, then flip it to "visible" so the CSS transition plays. If you do both
            in the same render React batches them and skips the transition entirely. One{" "}
            <code className={`rounded px-1 font-mono text-xs ${isGray ? "bg-slate-800 text-cyan-300" : "bg-white text-indigo-600"}`}>rAF</code>{" "}
            isn't always enough because some browsers paint before running it. Two{" "}
            <code className={`rounded px-1 font-mono text-xs ${isGray ? "bg-slate-800 text-cyan-300" : "bg-white text-indigo-600"}`}>rAF</code>{" "}
            calls guarantee the hidden frame was actually painted before you switch to visible.
          </p>
        </motion.div>

        {/* live demo */}
        <section className="mt-8">
          <h2 className={`mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide ${isGray ? "text-cyan-400" : "text-indigo-600"}`}>
            <MonitorSmartphone size={15} />
            Live Preview
          </h2>
          <ToastDemo isGray={isGray} />
          <p className={`mt-2 text-xs ${isGray ? "text-slate-500" : "text-slate-400"}`}>
            Select a type and position, then click "Show Toast" — the notification
            will enter from the correct corner and auto-dismiss after 3 seconds.
          </p>
        </section>

        {/* code */}
        <section className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide ${isGray ? "text-cyan-400" : "text-indigo-600"}`}>
              <Sparkles size={15} />
              Get the Code
            </h2>
            {unlocked && (
              <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-medium text-emerald-500">
                ✓ Unlocked
              </span>
            )}
          </div>

          <CodeBlock
            isGray={isGray}
            locked={!unlocked}
            onUnlock={() => setModalOpen(true)}
            tabs={[{ id: "toast", label: "ToastNotificationPage.jsx", code: toastCode }]}
          />
        </section>
      </main>

      <Footer isGray={isGray} />

      <CodeAccessModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        isGray={isGray}
        featureName="Toast Notifications"
        onSelectPlan={() => setUnlocked(true)}
      />
    </div>
  );
};

export default ToastNotificationPage;
