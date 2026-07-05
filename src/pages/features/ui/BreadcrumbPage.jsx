import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ChevronsRight, Code2, Map, Sparkles, MonitorSmartphone } from "lucide-react";

import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import PageBreadcrumb from "../../components/shared/PageBreadcrumb";
import CodeBlock from "../../components/shared/CodeBlock";
import CodeAccessModal from "../../components/shared/CodeAccessModal";
import BreadcrumbDemo from "../../components/features/breadcrumb/BreadcrumbDemo";

const useCases = ["E-commerce category pages", "Admin dashboards", "Documentation sites", "File explorers"];

const scratchCode = `import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumb = () => {
  const location = useLocation();
  // "/products/men/shoes" -> ["products", "men", "shoes"]
  const segments = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center gap-1.5 text-sm">
      <Link to="/" className="flex items-center gap-1 text-slate-500 hover:text-indigo-600">
        <Home size={14} />
        Home
      </Link>

      {segments.map((segment, i) => {
        const path = "/" + segments.slice(0, i + 1).join("/");
        const isLast = i === segments.length - 1;
        const label = segment.replace(/-/g, " ");

        return (
          <span key={path} className="flex items-center gap-1.5">
            <ChevronRight size={14} className="text-slate-400" />
            {isLast ? (
              <span className="font-semibold capitalize text-slate-900">{label}</span>
            ) : (
              <Link to={path} className="capitalize text-slate-500 hover:text-indigo-600">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;`;

const packageCode = `// 1. Install the package
// npm install use-react-router-breadcrumbs

import React from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { ChevronRight } from "lucide-react";

// Optional: give specific dynamic routes a friendlier label
const routes = [
  { path: "/products/:id", breadcrumb: "Product Details" },
];

const Breadcrumb = () => {
  const breadcrumbs = useBreadcrumbs(routes);

  return (
    <nav className="flex items-center gap-1.5 text-sm">
      {breadcrumbs.map(({ match, breadcrumb }, i) => (
        <span key={match.pathname} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={14} className="text-slate-400" />}
          <Link to={match.pathname} className="text-slate-500 hover:text-indigo-600">
            {breadcrumb}
          </Link>
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;`;

const BreadcrumbPage = () => {
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
        <PageBreadcrumb isGray={isGray} current="Breadcrumb" />

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
              <ChevronsRight size={22} />
            </span>
            <div>
              <h1 className={`text-2xl font-extrabold tracking-tight sm:text-3xl ${isGray ? "text-slate-50" : "text-slate-900"}`}>
                Breadcrumb Trail
              </h1>
              <p className={`font-mono text-xs uppercase tracking-wider ${isGray ? "text-slate-500" : "text-slate-400"}`}>
                Navigation · React Router
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
            {unlocked ? "Code Unlocked" : "Get Code"}
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
            <Map size={15} />
            What is a Breadcrumb?
          </h2>
          <p className={`mt-3 text-sm leading-relaxed sm:text-base ${isGray ? "text-slate-300" : "text-slate-600"}`}>
            A <strong>breadcrumb trail</strong> shows exactly where a page sits inside a
            site's structure — like a trail of links from the Home page down to the
            current page — e.g. <span className="font-mono">Home / Products / Shoes</span>.
            It lets people jump back to any parent page in a single click.
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

        {/* live demo */}
        <section className="mt-8">
          <h2 className={`mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide ${isGray ? "text-cyan-400" : "text-indigo-600"}`}>
            <MonitorSmartphone size={15} />
            Live Preview
          </h2>
          <BreadcrumbDemo isGray={isGray} />
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
            tabs={[
              { id: "scratch", label: "From Scratch", code: scratchCode },
              { id: "package", label: "Using a popular package", badge: "popular", code: packageCode },
            ]}
          />
        </section>
      </main>

      <Footer isGray={isGray} />

      <CodeAccessModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        isGray={isGray}
        featureName="Breadcrumb"
        onSelectPlan={() => setUnlocked(true)}
      />
    </div>
  );
};

export default BreadcrumbPage;