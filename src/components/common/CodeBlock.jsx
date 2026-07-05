import React, { useState } from "react";
import { Lock, Copy, Check, Sparkles } from "lucide-react";

/**
 * CodeBlock
 * tabs: [{ id, label, badge?, code }]
 * When `locked` is true the code is blurred and unselectable, with a
 * call-to-action overlay that opens the CodeAccessModal via onUnlock.
 */
const CodeBlock = ({ isGray, tabs, locked, onUnlock }) => {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(tabs[active].code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard not available — fail silently, it's not critical.
    }
  };

  return (
    <div
      className={`overflow-hidden rounded-2xl border ${
        isGray ? "border-slate-800 bg-slate-950" : "border-slate-200 bg-slate-900"
      }`}
    >
      {/* tab bar */}
      <div
        className={`flex flex-wrap items-center justify-between gap-2 border-b px-4 py-2.5 ${
          isGray ? "border-slate-800" : "border-slate-800"
        }`}
      >
        <div className="flex flex-wrap gap-1.5">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs transition-colors ${
                active === i
                  ? isGray
                    ? "bg-slate-800 text-cyan-300"
                    : "bg-slate-800 text-indigo-300"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {tab.label}
              {tab.badge && (
                <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] text-emerald-400">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {!locked && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-xs text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          >
            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>

      {/* code area */}
      <div className="relative">
        <pre
          className={`max-h-[420px] overflow-auto p-5 font-mono text-[12.5px] leading-relaxed text-slate-300 sm:text-[13px] ${
            locked ? "pointer-events-none select-none blur-sm" : ""
          }`}
        >
          <code>{tabs[active].code}</code>
        </pre>

        {locked && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/70">
            <div className="flex flex-col items-center gap-3 px-4 text-center">
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full ${
                  isGray ? "bg-slate-800 text-cyan-300" : "bg-slate-800 text-indigo-300"
                }`}
              >
                <Lock size={18} />
              </span>
              <p className="text-sm font-semibold text-slate-100">This code is locked</p>
              <p className="max-w-xs text-xs text-slate-400">
                Unlock this feature to copy the full, working source code instantly.
              </p>
              <button
                onClick={onUnlock}
                className={`mt-1 flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white transition-transform hover:scale-105 ${
                  isGray
                    ? "bg-gradient-to-r from-cyan-500 to-violet-600"
                    : "bg-gradient-to-r from-indigo-600 to-fuchsia-600"
                }`}
              >
                <Sparkles size={13} />
                View plans
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeBlock;