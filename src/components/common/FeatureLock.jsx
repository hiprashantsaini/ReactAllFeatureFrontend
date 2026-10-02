import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Clock, Lock, Wrench } from "lucide-react";
import { useEffect, useRef } from "react";

/**
 * Per-status look. `tone` points at your theme variables, so every color
 * follows the light / .gray-theme switch automatically.
 */
const STATUS = {
  soon: {
    Icon: Clock,
    tone: "var(--accent-color4)",
    label: "Coming soon",
    title: "This feature is on its way",
    description: "We're still building this. It will show up here as soon as it's ready.",
  },
  locked: {
    Icon: Lock,
    tone: "var(--accent-color1)",
    label: "Not in your plan",
    title: "This feature is locked",
    description: "Upgrade your plan to start using it.",
  },
  unavailable: {
    Icon: Wrench,
    tone: "var(--accent-color3)",
    label: "Unavailable",
    title: "Temporarily unavailable",
    description: "We're fixing something here. Please check back in a little while.",
  },
};

export default function FeatureLock({
  available = false, // true -> renders children normally, no overlay
  status = "soon", // "soon" | "locked" | "unavailable"
  title,
  description,
  actionLabel, // e.g. "Upgrade plan" (button hidden if omitted)
  onAction,
  className = "",
  children,
}) {
  const reduce = useReducedMotion();
  const contentRef = useRef(null);
  const cfg = STATUS[status] ?? STATUS.soon;
  const { Icon } = cfg;
  const locked = !available;

  // Keeps the blurred content out of the tab order & screen readers
  useEffect(() => {
    contentRef.current?.toggleAttribute("inert", locked);
  }, [locked]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={contentRef}
        aria-hidden={locked}
        className={`transition duration-300 ${
          locked ? "pointer-events-none select-none blur-[3px] saturate-75" : ""
        }`}
      >
        {children}
      </div>

      <AnimatePresence>
        {locked && (
          <motion.div
            role="status"
            style={{ "--tone": cfg.tone }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden rounded-[inherit] bg-[color-mix(in_srgb,var(--primary-bg)_72%,transparent)] p-4 backdrop-blur-md"
          >
            {/* soft glow in the status color */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color-mix(in_srgb,var(--tone)_18%,transparent)] blur-3xl" />

            {/* dotted grid, fades out toward the edges */}
            <div
              className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(var(--primary-border)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
            />

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="relative w-full max-w-sm rounded-2xl border border-[var(--primary-border)] bg-[var(--secondary-bg)] p-6 text-center shadow-[0_20px_50px_-20px_color-mix(in_srgb,var(--tone)_45%,transparent)] transition-colors hover:border-[var(--primary-hover-border)]"
            >
              {/* icon tile with a single slow pulse ring */}
              <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center">
                {!reduce && (
                  <motion.span
                    className="absolute inset-0 rounded-2xl border border-[var(--tone)]"
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[color-mix(in_srgb,var(--tone)_35%,transparent)] bg-[color-mix(in_srgb,var(--tone)_14%,transparent)] text-[var(--tone)]">
                  <Icon size={26} strokeWidth={2} />
                </span>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-[color-mix(in_srgb,var(--tone)_35%,transparent)] bg-[color-mix(in_srgb,var(--tone)_12%,transparent)] px-2.5 py-1 text-xs font-medium text-[var(--tone)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--tone)]" />
                {cfg.label}
              </span>

              <h3 className="mt-3 text-lg font-semibold tracking-tight text-[var(--primary-text)]">
                {title ?? cfg.title}
              </h3>
              <p className="mx-auto mt-1.5 max-w-[32ch] text-sm leading-relaxed text-[var(--secondary-text)]">
                {description ?? cfg.description}
              </p>

              {actionLabel && (
                <motion.button
                  type="button"
                  onClick={onAction}
                  whileHover={reduce ? undefined : { y: -1 }}
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                  className="group mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[var(--tone)] px-4 py-2.5 text-sm font-semibold text-[var(--primary-bg)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--tone)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--secondary-bg)]"
                >
                  {actionLabel}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────── Usage ─────────────

import FeatureLock from "./FeatureLock";

<FeatureLock available={false} status="soon" className="rounded-2xl">
  <AnalyticsPanel />
</FeatureLock>

<FeatureLock
  available={user.plan === "pro"}
  status="locked"
  title="Team reports are a Pro feature"
  actionLabel="Upgrade plan"
  onAction={() => navigate("/pricing")}
  className="rounded-2xl"
>
  <TeamReports />
</FeatureLock>

*/