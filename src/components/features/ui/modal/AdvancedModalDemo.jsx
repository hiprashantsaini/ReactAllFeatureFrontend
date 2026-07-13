import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, User, Mail, Briefcase } from "lucide-react";

const modalVariants = {
  scale: {
    hidden:  { opacity: 0, scale: 0.7 },
    visible: { opacity: 1, scale: 1 },
    exit:    { opacity: 0, scale: 0.7 },
  },
  slideUp: {
    hidden:  { opacity: 0, y: 150 },
    visible: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: 150 },
  },
  slideDown: {
    hidden:  { opacity: 0, y: -150 },
    visible: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -150 },
  },
  slideLeft: {
    hidden:  { opacity: 0, x: -250 },
    visible: { opacity: 1, x: 0 },
    exit:    { opacity: 0, x: -250 },
  },
  fade: {
    hidden:  { opacity: 0 },
    visible: { opacity: 1 },
    exit:    { opacity: 0 },
  },
};

const variantButtons = [
  { key: "scale",     label: "Scale",      color: "from-violet-500 to-indigo-600" },
  { key: "slideUp",   label: "Slide Up",   color: "from-cyan-500 to-blue-600" },
  { key: "slideDown", label: "Slide Down", color: "from-emerald-500 to-teal-600" },
  { key: "slideLeft", label: "Slide Left", color: "from-amber-500 to-orange-500" },
  { key: "fade",      label: "Fade",       color: "from-rose-500 to-pink-600" },
];

const Modal = ({ visible, onClose, title, children, variant = "scale", isGray }) => {
  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", onKey);
    };
  }, [visible, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5 backdrop-blur-sm"
        >
          <motion.div
            variants={modalVariants[variant]}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.32, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-lg overflow-hidden rounded-2xl border shadow-2xl ${
              isGray ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"
            }`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between border-b px-6 py-4 ${isGray ? "border-slate-800" : "border-slate-100"}`}>
              <div>
                <h2 className={`text-lg font-bold ${isGray ? "text-slate-50" : "text-slate-900"}`}>{title}</h2>
                <p className={`mt-0.5 text-xs ${isGray ? "text-slate-500" : "text-slate-400"}`}>
                  Animation: <span className={isGray ? "text-cyan-400" : "text-indigo-500"}>{variant}</span>
                </p>
              </div>
              <button
                onClick={onClose}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                  isGray ? "text-slate-400 hover:bg-slate-800 hover:text-slate-100" : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                }`}
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="space-y-4 p-6">
              {children}
            </div>

            {/* Footer */}
            <div className={`flex justify-end gap-3 border-t px-6 py-4 ${isGray ? "border-slate-800 bg-slate-950/40" : "border-slate-100 bg-slate-50"}`}>
              <button
                onClick={onClose}
                className={`rounded-full border px-4 py-2 text-sm font-medium ${
                  isGray ? "border-slate-700 text-slate-300 hover:bg-slate-800" : "border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className={`rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 ${
                  isGray ? "bg-gradient-to-r from-cyan-500 to-violet-600" : "bg-gradient-to-r from-indigo-600 to-fuchsia-600"
                }`}
              >
                Continue
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AdvancedModalDemo = ({ isGray }) => {
  const [modal, setModal] = useState({ open: false, variant: "scale" });

  return (
    <div className={`rounded-2xl border p-6 ${isGray ? "border-slate-800 bg-slate-900/40" : "border-slate-200 bg-white"}`}>
      <p className={`mb-4 text-xs font-medium uppercase tracking-wider ${isGray ? "text-slate-500" : "text-slate-400"}`}>
        Click a variant to open the modal with that animation:
      </p>

      <div className="flex flex-wrap gap-2.5">
        {variantButtons.map(({ key, label, color }) => (
          <button
            key={key}
            onClick={() => setModal({ open: true, variant: key })}
            className={`rounded-full bg-gradient-to-r px-4 py-2 text-xs font-semibold text-white shadow-sm transition-transform hover:scale-105 ${color}`}
          >
            {label}
          </button>
        ))}
      </div>

      <Modal
        visible={modal.open}
        variant={modal.variant}
        title="Production Ready Modal"
        onClose={() => setModal({ ...modal, open: false })}
        isGray={isGray}
      >
        <p className={`text-sm leading-relaxed ${isGray ? "text-slate-300" : "text-slate-600"}`}>
          This modal demonstrates reusable animations using Framer Motion. The same
          component accepts a <code className={`rounded px-1 font-mono text-xs ${isGray ? "bg-slate-800 text-cyan-300" : "bg-slate-100 text-indigo-600"}`}>variant</code> prop —
          no duplicate code needed.
        </p>

        <div className={`rounded-xl border p-4 ${isGray ? "border-slate-800 bg-slate-950/60" : "border-slate-100 bg-slate-50"}`}>
          <p className={`mb-2 text-xs font-semibold uppercase tracking-wider ${isGray ? "text-slate-500" : "text-slate-400"}`}>
            Dummy User
          </p>
          {[
            { icon: User,      label: "John Doe" },
            { icon: Mail,      label: "john@example.com" },
            { icon: Briefcase, label: "Frontend Developer" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className={`flex items-center gap-2 py-1 text-sm ${isGray ? "text-slate-300" : "text-slate-700"}`}>
              <Icon size={13} className={isGray ? "text-slate-500" : "text-slate-400"} />
              {label}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default AdvancedModalDemo;