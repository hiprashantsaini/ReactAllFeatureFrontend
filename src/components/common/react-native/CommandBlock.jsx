import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

const CommandBlock = ({ children }) => {
  const [copied, setCopied] = useState(false);
  const command = String(children).trim();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy command:", error);
    }
  };

  return (
    <div className="group relative mt-3 overflow-hidden rounded-xl border border-(--primary-border) bg-(--primary-bg)">
      <div className="flex items-center justify-between border-b border-(--primary-border) px-4 py-2.5">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Terminal size={14} />
          <span>Terminal</span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-(--secondary-text) transition-colors hover:bg-slate-800 hover:text-white"
        >
          {copied ? (
            <>
              <Check size={13} />
              Copied
            </>
          ) : (
            <>
              <Copy size={13} />
              Copy
            </>
          )}
        </button>
      </div>

      <pre className="overflow-x-auto px-4 py-4 text-sm leading-6 text-(--primary-text)">
        <code>{command}</code>
      </pre>
    </div>
  );
};

export default CommandBlock;