import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  ChevronRight,
  Code2,
  Hammer,
  Image as ImageIcon,
  Menu,
  Navigation,
  RefreshCw,
  Settings2,
  Sheet,
  Smartphone,
  Sparkles,
  SunMoon,
  Waypoints,
  X
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { PiTabs } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import { BackToHomeBtn } from "../../components/common/BackToHomeBtn";
import { toggleTheme } from "../../redux/userSlice";

const navItems = [
  {
    label: "Setup Commands",
    to: "/react-native/setup-commands",
    icon: Settings2,
  },
  {
    label: "Build Commands",
    to: "/react-native/build-commands",
    icon: Hammer,
  },
  {
    label: "Image Viewer",
    to: "/react-native/image-viewer",
    icon: ImageIcon,
  },
  {
    label: "Bottom Sheet",
    to: "/react-native/bottom-sheet",
    icon: Sheet,
  },
  {
    label: "Bottom Tabs",
    to: "/react-native/bottom-tabs",
    icon: PiTabs,
  },
  {
    label: "Refresh Screen Data",
    to: "/react-native/refresh-screen-data",
    icon: RefreshCw,
  },
  {
    label: "Simple Reusable Animation",
    to: "/react-native/simple-reusable-animation",
    icon: Sparkles,
  },
  {
    label: "Navigation Setup",
    to: "/react-native/navigation-setup",
    icon: Navigation,
  },
  {
    label: "Route & Navigation",
    to: "/react-native/route-navigation",
    icon: Waypoints,
  },
];

const ReactNativeLayout = () => {
  const isGray = useSelector((state) => state.user.isGray);
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();

  const titleName = useMemo(() => {
    const navItem = navItems.find((item) => item.to === location.pathname);
    if (navItem) return navItem.label;
    return 'setup-commands';
  }, [location]);

  const scrollRef = useRef(null);
  const headingRef = useRef(null);
  const [showStickyTitle, setShowStickyTitle] = useState(false);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleScroll = () => {
      const heading = headingRef.current;
      if (!heading) return;

      const headingRect = heading.getBoundingClientRect();
      const mainRect = element.getBoundingClientRect();

      // Heading has gone above the visible main area
      setShowStickyTitle(headingRect.bottom <= mainRect.top + 10);
    };

    element.addEventListener("scroll", handleScroll);

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="flex h-screen flex-col bg-(--primary-bg) text-(--primary-text) transition-colors duration-300 overflow-hidden">
      <header className="sticky top-0 z-50 shrink-0 border-b border-(--primary-border) bg-(--secondary-bg) backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-(--primary-border) bg-(--primary-bg) text-(--secondary-text) transition-colors hover:text-(--accent-color1) lg:hidden"
              aria-label="Toggle documentation menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-(--primary-bg) text-(--accent-color1) ring-1 ring-(--primary-border)">
                <Smartphone size={19} />
              </div>

              <div>
                <div className="text-sm font-bold text-(--primary-text)">
                  React Native Docs
                </div>

                <BackToHomeBtn/>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-(--primary-border) bg-(--primary-bg) px-3 py-1.5 text-xs font-medium text-(--secondary-text) sm:flex">
              <Code2 size={13} />
              React Native
            </div>

            <button
              type="button"
              onClick={handleThemeToggle}
              aria-label={
                isGray ? "Switch to light theme" : "Switch to dark theme"
              }
              title={isGray ? "Light theme" : "Dark theme"}
              className="flex h-9 w-9 items-center justify-center cursor-pointer rounded-xl border border-(--primary-border) bg-(--secondary-bg) text-(--secondary-text) transition-all hover:border-(--primary-hover-border) hover:text-(--accent-color1)"
            >
              <SunMoon size={17} />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col lg:flex-row">
        <aside className="hidden w-64 shrink-0 overflow-y-auto border-r border-(--primary-border) lg:block">
          <div className="sticky top-0 p-5">
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-(--secondary-text)">
              <BookOpen size={14} />
              Documentation
            </div>

            <nav className="space-y-1">
              {navItems.map(({ label, to, icon: Icon }) => {
                const isActive =
                  location.pathname === to ||
                  location.pathname.startsWith(`${to}/`);

                return (
                  <Link
                    key={to}
                    to={to}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-(--accent-color1)/60 hover:bg-(--primary-bg) hover:text-(--primary-text) ${
                      isActive
                        ? "border-(--accent-color1)/50 bg-(--primary-bg) text-(--primary-text) shadow-sm"
                        : "border-(--primary-border) bg-(--secondary-bg) text-(--accent-color1)"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon size={15} />
                      {label}
                    </div>

                    <ChevronRight size={14} />
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm pt-14 lg:hidden"
            onClick={closeMobileMenu}
          >
            <div
              className="h-full w-72 max-w-[82vw] overflow-y-auto border-r border-(--primary-border) bg-(--secondary-bg) p-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-(--secondary-text)">
                  <BookOpen size={14} />
                  Documentation
                </div>

                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-(--primary-border) bg-(--primary-bg) text-(--secondary-text)"
                  aria-label="Close docs menu"
                >
                  <X size={16} />
                </button>
              </div>

              <nav className="space-y-2">
                {navItems.map(({ label, to, icon: Icon }) => {
                  const isActive =
                    location.pathname === to ||
                    location.pathname.startsWith(`${to}/`);

                  return (
                    <Link
                      key={to}
                      to={to}
                      onClick={closeMobileMenu}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-(--accent-color1)/60 hover:bg-(--primary-bg) hover:text-(--primary-text) ${
                        isActive
                          ? "border-(--accent-color1)/50 bg-(--primary-bg) text-(--primary-text) shadow-sm"
                          : "border-(--primary-border) bg-(--primary-bg) text-(--accent-color1)"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={15} />
                        {label}
                      </div>

                      <ChevronRight size={14} />
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        <main
          ref={scrollRef}
          className="min-h-0 min-w-0 flex-1 overflow-y-auto "
        >
          {/* Sticky page title */}
          <AnimatePresence>
            {showStickyTitle && titleName && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="sticky top-0 z-30 border-b px-6 py-3 backdrop-blur-md"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--primary-bg) 90%, transparent)",
                  borderColor: "var(--primary-border)",
                }}
              >
                <h2
                  className="text-lg font-bold"
                  style={{ color: "var(--primary-text)" }}
                >
                  {titleName}
                </h2>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            className="min-h-full"
          >
            <Outlet context={{ headingRef }} />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default ReactNativeLayout;
