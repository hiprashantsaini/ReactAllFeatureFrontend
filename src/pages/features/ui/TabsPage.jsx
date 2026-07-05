import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { LayoutPanelTop, Code2, Layers, Sparkles, MonitorSmartphone } from "lucide-react";
import Navbar from "../../../components/common/Navbar";
import TabsDemo from "../../../components/features/ui/tabs/TabsDemo";
import CodeBlock from "../../../components/common/CodeBlock";
import Footer from "../../../components/common/Footer";
import CodeAccessModal from "../../../components/common/CodeAccessModal";


const useCases = ["Settings pages", "Product detail pages", "Dashboard panels", "Documentation sections"];

const scratchCode = `import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  { id: "profile", label: "Profile" },
  { id: "notifications", label: "Notifications" },
  { id: "security", label: "Security" },
];

const panels = {
  profile: <p>Edit your name, email and avatar here.</p>,
  notifications: <p>Choose what you want to be notified about.</p>,
  security: <p>Change your password and enable 2FA.</p>,
};

const Tabs = () => {
  const [active, setActive] = useState("profile");

  return (
    <div>
      {/* tab bar */}
      <div className="relative flex gap-6 border-b border-slate-200">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={\`relative pb-3 text-sm font-medium \${
                isActive ? "text-indigo-600" : "text-slate-400"
              }\`}
            >
              {tab.label}

              {/* shared layoutId = the underline glides between tabs */}
              {isActive && (
                <motion.div
                  layoutId="underline"
                  className="absolute -bottom-px left-0 right-0 h-0.5 bg-indigo-600"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* panel content, fades/slides when it changes */}
      <div className="relative mt-5 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {panels[active]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Tabs;`;

const headlessUiCode = `// npm install @headlessui/react

import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import { motion } from "framer-motion";

const tabs = ["Profile", "Notifications", "Security"];
const panels = [
  <p key="1">Edit your name, email and avatar here.</p>,
  <p key="2">Choose what you want to be notified about.</p>,
  <p key="3">Change your password and enable 2FA.</p>,
];

const Tabs = () => {
  // Headless UI manages tab state, ARIA roles and keyboard navigation for us —
  // we only need to track the index ourselves to draw the animated underline.
  const [selected, setSelected] = useState(0);

  return (
    <Tab.Group selectedIndex={selected} onChange={setSelected}>
      <Tab.List className="relative flex gap-6 border-b border-slate-200">
        {tabs.map((label, i) => (
          <Tab key={label} className="relative pb-3 text-sm font-medium text-slate-400 ui-selected:text-indigo-600 focus:outline-none">
            {label}
            {selected === i && (
              <motion.div
                layoutId="headless-underline"
                className="absolute -bottom-px left-0 right-0 h-0.5 bg-indigo-600"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
          </Tab>
        ))}
      </Tab.List>

      <Tab.Panels className="mt-5">
        {panels.map((panel, i) => (
          <Tab.Panel key={i}>{panel}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Tabs;`;

const TabsPage = () => {
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
        {/* <PageBreadcrumb isGray={isGray} current="Tabs" /> */}

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
              <LayoutPanelTop size={22} />
            </span>
            <div>
              <h1 className={`text-2xl font-extrabold tracking-tight sm:text-3xl ${isGray ? "text-slate-50" : "text-slate-900"}`}>
                Tabs
              </h1>
              <p className={`font-mono text-xs uppercase tracking-wider ${isGray ? "text-slate-500" : "text-slate-400"}`}>
                UI · Animated Underline
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
            <Layers size={15} />
            What are Tabs?
          </h2>
          <p className={`mt-3 text-sm leading-relaxed sm:text-base ${isGray ? "text-slate-300" : "text-slate-600"}`}>
            <strong>Tabs</strong> let you pack several related panels of content into the
            same space and switch between them with a click, instead of one long
            scrolling page. An <strong>animated underline</strong> that glides to the
            active tab gives instant, satisfying feedback about what's currently selected.
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
          <TabsDemo isGray={isGray} />
          <p className={`mt-2 text-xs ${isGray ? "text-slate-500" : "text-slate-400"}`}>
            A realistic settings panel — click between tabs and watch the underline glide.
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
            tabs={[
              { id: "scratch", label: "From Scratch", code: scratchCode },
              { id: "headlessui", label: "Using @headlessui/react", badge: "popular", code: headlessUiCode },
            ]}
          />
        </section>
      </main>

      <Footer isGray={isGray} />

      <CodeAccessModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        isGray={isGray}
        featureName="Tabs"
        onSelectPlan={() => setUnlocked(true)}
      />
    </div>
  );
};

export default TabsPage;