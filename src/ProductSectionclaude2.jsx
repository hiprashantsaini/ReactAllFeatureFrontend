import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  ScrollText,
  PanelsTopLeft,
  Layers,
  Move,
  Table2,
  ListChecks,
  BarChart3,
  Rows3,
  Store,
  Newspaper,
  Briefcase,
  UserSearch,
  Megaphone,
  GraduationCap,
  BellRing,
  WifiOff,
} from "lucide-react";

/* ---------- content ---------- */

const PRODUCTS = [
  {
    id: "raf",
    name: "ReactAllFeatures",
    tagline: "Every React pattern, one live playground.",
    description:
      "A reference site of fully working pages — not snippets, full pages — for the patterns you rebuild on every project.",
    more:
      "Each page is production-shaped: real state, real edge cases, real responsiveness. Built to copy from, learn from, or hand to a junior dev as the answer key.",
    accent: "blue",
    mockup: "browser",
    tags: [
      { icon: ScrollText, label: "Infinite Scroll" },
      { icon: PanelsTopLeft, label: "Tabs & Panels" },
      { icon: Layers, label: "Modals & Drawers" },
      { icon: Move, label: "Drag & Drop" },
      { icon: Table2, label: "Data Tables" },
      { icon: ListChecks, label: "Form Wizards" },
      { icon: BarChart3, label: "Charts" },
      { icon: Rows3, label: "Virtualized Lists" },
    ],
  },
  {
    id: "gha",
    name: "GetHereAll",
    tagline: "Everything your village needs, in one place.",
    description:
      "A single hub for shop status, local news, work, and the notifications that actually matter — built vernacular-first, for low bandwidth.",
    more:
      "Shopkeepers post live open/closed status, employers and job seekers find each other directly, and admit cards, results, and announcements land as plain notifications — no app-hunting required.",
    accent: "gold",
    mockup: "phone",
    tags: [
      { icon: Store, label: "Shop Live Status" },
      { icon: Newspaper, label: "Local News" },
      { icon: Briefcase, label: "Work Providers" },
      { icon: UserSearch, label: "Work Seekers" },
      { icon: Megaphone, label: "Announcements" },
      { icon: GraduationCap, label: "Exams & Admit Cards" },
      { icon: BellRing, label: "Notifications" },
      { icon: WifiOff, label: "Offline-friendly" },
    ],
  },
];

/* ---------- motion helpers ---------- */

const headingContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const accentColor = (accent) => (accent === "gold" ? "var(--accent-gold)" : "var(--accent-blue)");

/* ---------- browser mockup (ReactAllFeatures) ---------- */

const TABS = ["Infinite Scroll", "Tabs", "Data Table"];

const BrowserMockup = ({ accent }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % TABS.length), 2600);
    return () => clearInterval(t);
  }, []);

  const rows = Array.from({ length: 6 });

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-[0_30px_70px_-40px_rgba(76,111,255,0.6)]">
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-[var(--line)] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 rounded-full bg-[var(--bg-soft)] px-3 py-1 font-mono text-[10px] text-[var(--muted)]">
          reactallfeatures.dev
        </span>
      </div>

      {/* tabs */}
      <div className="relative flex gap-5 border-b border-[var(--line)] px-4 pt-3">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            className={`relative pb-2.5 text-xs font-medium transition-colors ${
              active === i ? "text-[var(--text)]" : "text-[var(--muted)]"
            }`}
          >
            {tab}
            {active === i && (
              <motion.span
                layoutId="raf-tab-underline"
                className="absolute -bottom-px left-0 right-0 h-[2px]"
                style={{ backgroundColor: accentColor(accent) }}
              />
            )}
          </button>
        ))}
      </div>

      {/* infinite scroll viewport */}
      <div className="h-40 overflow-hidden p-3">
        <motion.div
          animate={{ y: ["0%", "-50%"] }}
          transition={{ duration: 8, ease: "linear", repeat: Infinity }}
          className="flex flex-col gap-2"
        >
          {rows.concat(rows).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 rounded-lg border border-[var(--line)] bg-[var(--bg)] px-3 py-2"
            >
              <span
                className="h-6 w-6 shrink-0 rounded-md"
                style={{ backgroundColor: `${accentColor(accent)}33` }}
              />
              <span className="h-2 flex-1 rounded-full bg-[var(--line)]" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

/* ---------- phone mockup (GetHereAll) ---------- */

const NOTIFICATIONS = [
  "New work posted 2km away",
  "Mandi price updated for wheat",
  "Admit card released — check now",
];

const PhoneMockup = ({ accent }) => {
  const [note, setNote] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setNote((i) => (i + 1) % NOTIFICATIONS.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="mx-auto w-[240px] rounded-[2.25rem] border-[6px] border-[var(--line)] bg-[var(--surface)] p-2.5 shadow-[0_30px_70px_-40px_rgba(255,180,67,0.6)]">
      <div className="mx-auto mb-2 h-4 w-20 rounded-full bg-[var(--bg-soft)]" />

      <div className="rounded-2xl bg-[var(--bg)] p-3">
        <div className="flex items-center justify-between">
          <span className="font-display text-xs font-semibold text-[var(--text)]">GetHereAll</span>
          <BellRing size={13} style={{ color: accentColor(accent) }} />
        </div>

        {/* shop status card */}
        <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-2.5">
          <Store size={16} className="text-[var(--muted)]" />
          <div className="flex-1">
            <p className="text-[11px] font-medium text-[var(--text)]">Sharma Kirana Store</p>
            <p className="flex items-center gap-1 text-[9px] text-[var(--muted)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Open now
            </p>
          </div>
        </div>

        {/* news ticker */}
        <div className="mt-2 overflow-hidden rounded-lg bg-[var(--bg-soft)] px-2.5 py-1.5">
          <motion.p
            animate={{ x: ["100%", "-120%"] }}
            transition={{ duration: 9, ease: "linear", repeat: Infinity }}
            className="whitespace-nowrap text-[9px] text-[var(--muted)]"
          >
            📰 Local news: new water pipeline sanctioned for the block &nbsp;&nbsp;•&nbsp;&nbsp; block office open till 5pm
          </motion.p>
        </div>

        {/* notification */}
        <div className="mt-2 h-10 overflow-hidden rounded-lg border border-[var(--line)] px-2.5">
          <AnimatePresence mode="wait">
            <motion.p
              key={note}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="flex h-10 items-center gap-1.5 text-[9.5px] text-[var(--text)]"
            >
              <Megaphone size={11} style={{ color: accentColor(accent) }} className="shrink-0" />
              {NOTIFICATIONS[note]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="mx-auto mt-2.5 h-1 w-16 rounded-full bg-[var(--bg-soft)]" />
    </div>
  );
};

/* ---------- product row ---------- */

const ProductRow = ({ product, index }) => {
  const [open, setOpen] = useState(false);
  const reversed = index % 2 === 1;
  const color = accentColor(product.accent);

  return (
    <div
      className={`flex flex-col items-center gap-14 lg:gap-10 ${
        reversed ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      <motion.div
        variants={headingContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="w-full max-w-lg"
      >
        <motion.span variants={fadeUp} className="font-mono text-xs tracking-[0.18em] text-[var(--muted)]">
          PRODUCT 0{index + 1}
        </motion.span>
        <motion.h3
          variants={fadeUp}
          className="mt-3 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text)]"
        >
          {product.name}
        </motion.h3>
        <motion.p variants={fadeUp} className="mt-2 text-sm sm:text-base font-medium" style={{ color }}>
          {product.tagline}
        </motion.p>
        <motion.p variants={fadeUp} className="mt-3 text-sm sm:text-base leading-relaxed text-[var(--muted)]">
          {product.description}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-5 flex flex-wrap gap-2">
          {product.tags.map((t) => (
            <span
              key={t.label}
              className="flex items-center gap-1.5 rounded-full border border-[var(--line)] px-3 py-1.5 text-xs text-[var(--muted)]"
            >
              <t.icon size={12} style={{ color }} />
              {t.label}
            </span>
          ))}
        </motion.div>

        <motion.div variants={fadeUp}>
          <AnimatePresence>
            {open && (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="mt-4 overflow-hidden text-sm leading-relaxed text-[var(--muted)]"
              >
                {product.more}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-7 flex flex-wrap items-center gap-4">
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent-blue)]"
          >
            Know more about product
            <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
          {/* Replace href with the live product URL when it's ready */}
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="group inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium text-white transition hover:brightness-110"
            style={{ backgroundColor: color }}
          >
            View product
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
        className="flex w-full justify-center lg:flex-1"
      >
        {product.mockup === "browser" ? (
          <BrowserMockup accent={product.accent} />
        ) : (
          <PhoneMockup accent={product.accent} />
        )}
      </motion.div>
    </div>
  );
};

/* ---------- section ---------- */

const ProductsSection = () => {
  return (
    <section id="products" className="relative overflow-hidden bg-[var(--bg)] py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_10%,var(--bg-soft),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          variants={headingContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="max-w-2xl"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(76,111,255,0.35)] px-4 py-1.5 font-mono text-[11px] tracking-[0.18em] text-[var(--accent-blue)] uppercase"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-gold)]" />
            Our products
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-6 font-display text-3xl sm:text-5xl font-semibold tracking-tight text-[var(--text)] leading-[1.1]"
          >
            Built in-house,
            <br />
            <span className="italic text-[var(--accent-blue)]">used</span> in the wild.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-base sm:text-lg leading-relaxed text-[var(--muted)]">
            Two products we build and maintain ourselves — proof we ship the
            same quality we sell.
          </motion.p>
        </motion.div>

        <div className="mt-20 flex flex-col gap-28 sm:gap-32">
          {PRODUCTS.map((p, i) => (
            <ProductRow key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;