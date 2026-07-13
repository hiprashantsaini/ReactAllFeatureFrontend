import { createContext, useContext, useEffect, useState } from "react";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";

// ─── Context ─────────────────────────────────────────────────────────────────
const ToastContext = createContext();

// ─── Position map ─────────────────────────────────────────────────────────────
const positions = {
  "top-left":      { position: "top-5 left-5",             show: "translate-x-0 translate-y-0 opacity-100",    hide: "-translate-x-full opacity-0" },
  "top-center":    { position: "top-5 left-1/2 -translate-x-1/2", show: "-translate-x-1/2 translate-y-0 opacity-100", hide: "-translate-x-1/2 -translate-y-full opacity-0" },
  "top-right":     { position: "top-5 right-5",            show: "translate-x-0 translate-y-0 opacity-100",    hide: "translate-x-full opacity-0" },
  "bottom-left":   { position: "bottom-5 left-5",          show: "translate-x-0 translate-y-0 opacity-100",    hide: "-translate-x-full opacity-0" },
  "bottom-center": { position: "bottom-5 left-1/2 -translate-x-1/2", show: "-translate-x-1/2 translate-y-0 opacity-100", hide: "-translate-x-1/2 translate-y-full opacity-0" },
  "bottom-right":  { position: "bottom-5 right-5",         show: "translate-x-0 translate-y-0 opacity-100",    hide: "translate-x-full opacity-0" },
};

// ─── Toast type styles (project-themed) ───────────────────────────────────────
const toastStyles = {
  success: { icon: CheckCircle2,    darkAccent: "bg-emerald-500/15 text-emerald-400", lightAccent: "bg-emerald-50 text-emerald-600",  title: "Success"     },
  error:   { icon: XCircle,         darkAccent: "bg-red-500/15 text-red-400",         lightAccent: "bg-red-50 text-red-600",           title: "Error"       },
  warning: { icon: AlertTriangle,   darkAccent: "bg-amber-500/15 text-amber-400",     lightAccent: "bg-amber-50 text-amber-600",       title: "Warning"     },
  info:    { icon: Info,            darkAccent: "bg-cyan-500/15 text-cyan-400",       lightAccent: "bg-indigo-50 text-indigo-600",     title: "Information" },
};

// ─── Provider ─────────────────────────────────────────────────────────────────
const ToastProvider = ({ children, isGray }) => {
  const [toast, setToastState] = useState(null);
  const [visible, setVisible] = useState(false);

  const showToast = (data) => {
    setToastState({ ...data, id: Date.now() });
    setVisible(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleTransitionEnd = () => {
    if (!visible) setToastState(null);
  };

  const config = positions[toast?.position || "top-right"];
  const style  = toastStyles[toast?.type   || "info"];
  const Icon   = style?.icon;

  return (
    <>
      {/* Toast node */}
      <div
        key={toast?.id || "empty"}
        onTransitionEnd={handleTransitionEnd}
        className={`fixed z-[200] transition-all duration-300 ${config.position} ${visible ? config.show : config.hide}`}
      >
        {toast && (
          <div
            className={`flex min-w-[300px] max-w-sm items-start gap-3 rounded-2xl border p-4 shadow-2xl ${
              isGray
                ? "border-slate-700 bg-slate-900"
                : "border-slate-200 bg-white"
            }`}
          >
            {/* icon */}
            <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${isGray ? style.darkAccent : style.lightAccent}`}>
              {Icon && <Icon size={17} />}
            </span>

            {/* text */}
            <div className="flex-1 pt-0.5">
              <p className={`text-sm font-semibold ${isGray ? "text-slate-100" : "text-slate-900"}`}>
                {toast.title || style.title}
              </p>
              <p className={`mt-0.5 text-xs leading-relaxed ${isGray ? "text-slate-400" : "text-slate-500"}`}>
                {toast.message}
              </p>
            </div>

            {/* close */}
            <button
              onClick={() => setVisible(false)}
              className={`flex-shrink-0 rounded-lg p-1 transition-colors ${isGray ? "text-slate-500 hover:bg-slate-800 hover:text-slate-300" : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"}`}
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      <ToastContext.Provider value={{ setToast: showToast }}>
        {children}
      </ToastContext.Provider>
    </>
  );
};

// ─── Demo buttons config ───────────────────────────────────────────────────────
const positionButtons = [
  ["Top Left",      "top-left"],
  ["Top Center",    "top-center"],
  ["Top Right",     "top-right"],
  ["Bottom Left",   "bottom-left"],
  ["Bottom Center", "bottom-center"],
  ["Bottom Right",  "bottom-right"],
];

const typeButtons = [
  { type: "success", label: "Success",  darkColor: "bg-emerald-500/15 text-emerald-400 border-emerald-800",  lightColor: "bg-emerald-50 text-emerald-700 border-emerald-200", message: "Your changes have been saved successfully." },
  { type: "error",   label: "Error",    darkColor: "bg-red-500/15 text-red-400 border-red-800",              lightColor: "bg-red-50 text-red-700 border-red-200",             message: "Something went wrong. Please try again." },
  { type: "warning", label: "Warning",  darkColor: "bg-amber-500/15 text-amber-400 border-amber-800",        lightColor: "bg-amber-50 text-amber-700 border-amber-200",       message: "Your session is about to expire." },
  { type: "info",    label: "Info",     darkColor: "bg-cyan-500/15 text-cyan-400 border-cyan-800",           lightColor: "bg-indigo-50 text-indigo-700 border-indigo-200",    message: "A new version is available. Refresh to update." },
];

// ─── Inner demo UI ─────────────────────────────────────────────────────────────
const ToastDemoInner = ({ isGray }) => {
  const { setToast } = useContext(ToastContext);
  const [activeType, setActiveType] = useState("success");
  const [activePos, setActivePos]   = useState("top-right");

  const fire = () => setToast({
    type: activeType,
    position: activePos,
    message: typeButtons.find((b) => b.type === activeType)?.message,
  });

  return (
    <div className={`overflow-hidden rounded-2xl border ${isGray ? "border-slate-800 bg-slate-900/40" : "border-slate-200 bg-white"}`}>

      {/* type selector */}
      <div className={`border-b px-5 py-4 ${isGray ? "border-slate-800" : "border-slate-100"}`}>
        <p className={`mb-3 text-xs font-semibold uppercase tracking-wider ${isGray ? "text-slate-500" : "text-slate-400"}`}>
          1 · Pick a type
        </p>
        <div className="flex flex-wrap gap-2">
          {typeButtons.map((b) => (
            <button
              key={b.type}
              onClick={() => setActiveType(b.type)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                activeType === b.type
                  ? isGray ? b.darkColor  : b.lightColor
                  : isGray ? "border-slate-800 text-slate-500 hover:border-slate-600" : "border-slate-200 text-slate-500 hover:border-slate-300"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* position selector */}
      <div className={`border-b px-5 py-4 ${isGray ? "border-slate-800" : "border-slate-100"}`}>
        <p className={`mb-3 text-xs font-semibold uppercase tracking-wider ${isGray ? "text-slate-500" : "text-slate-400"}`}>
          2 · Pick a position
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {positionButtons.map(([label, pos]) => (
            <button
              key={pos}
              onClick={() => setActivePos(pos)}
              className={`rounded-xl border py-2.5 text-xs font-medium transition-all ${
                activePos === pos
                  ? isGray
                    ? "border-cyan-700 bg-slate-800 text-cyan-300"
                    : "border-indigo-300 bg-indigo-50 text-indigo-700"
                  : isGray
                  ? "border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* fire button */}
      <div className="flex items-center justify-between px-5 py-4">
        <p className={`text-xs ${isGray ? "text-slate-500" : "text-slate-400"}`}>
          Type: <span className={`font-semibold ${isGray ? "text-slate-200" : "text-slate-700"}`}>{activeType}</span>
          {" · "}Position: <span className={`font-semibold ${isGray ? "text-slate-200" : "text-slate-700"}`}>{activePos}</span>
        </p>
        <button
          onClick={fire}
          className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 ${
            isGray ? "bg-gradient-to-r from-cyan-500 to-violet-600" : "bg-gradient-to-r from-indigo-600 to-fuchsia-600"
          }`}
        >
          Show Toast
        </button>
      </div>
    </div>
  );
};

// ─── Exported wrapper (provides context) ──────────────────────────────────────
const ToastDemo = ({ isGray }) => (
  <ToastProvider isGray={isGray}>
    <ToastDemoInner isGray={isGray} />
  </ToastProvider>
);

export default ToastDemo;