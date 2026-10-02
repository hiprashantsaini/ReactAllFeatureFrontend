import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sparkles, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";

/**
 * Navbar
 * - Sticky top navigation with a glassy / blurred background.
 * - "isGray" (passed down from HomePage) decides which color theme to render.
 * - The theme toggle button just dispatches a plain action object to Redux.
 *   In your real store, a "user" reducer would flip `isGray` on this action.
 */
const navLinks = [
  // { label: "Home", to: "/" },
  { label: "Features", to: "/#features" },
  { label: "How it works", to: "/#how-it-works" },
  { label: "Pricing", to: "/#pricing" },
];

const Navbar = ({ isGray }) => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { pathname } = useLocation();

  useEffect(() => {
    const sections = navLinks
      .filter((link) => link.to.startsWith("#"))
      .map((link) => document.querySelector(link.to))
      .filter(Boolean);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleSections.length > 0) {
          setActiveSection(`#${visibleSections[0].target.id}`);
        }
      },
      { rootMargin: "-80px 0px -65% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  // const scrollToSection = (event, target) => {
  //   event.preventDefault();
  //   const section = document.querySelector(target);

  //   if (section) {
  //     section.scrollIntoView({ behavior: "smooth", block: "start" });
  //     setActiveSection(target);
  //   }

  //   setOpen(false);
  // };

  const sectionLinkClass = (isActive, isMobile = false) =>
    `text-sm font-medium transition-colors ${isMobile ? "w-fit border-l-2 pl-3" : "border-b-2"} ${isActive
      ? isGray
        ? "text-cyan-400 border-cyan-400"
        : "text-indigo-600 border-indigo-600"
      : `border-transparent text-(--secondary-text) ${isGray
        ? "hover:text-cyan-400"
        : "hover:text-indigo-600"
      }`
    }`;

  const routeLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${isActive
      ? isGray
        ? "text-cyan-400 border-b-2 border-cyan-400"
        : "text-indigo-600 border-b-2 border-indigo-600"
      : `text-(--secondary-text) ${isGray
        ? "hover:text-cyan-400"
        : "hover:text-indigo-600"
      }`
    }`;

  const toggleTheme = () => {
    // Beginner-friendly inline dispatch — no separate action file needed.
    dispatch({ type: "user/toggleTheme" });
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-xl transition-colors duration-500 border-b border-(--primary-border) bg-(--secondary-bg) md:bg-(--secondary-bg)/40`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          {/* <img src={isGray ? "/logoDark.png" : "/logoLight.png"} className="h-10" /> */}
          <img src={isGray ? "/logo-gray.png" : "/logo-light.png"} className="h-10" />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          <NavLink
            to="/"
            className={routeLinkClass}
          >
            Home
          </NavLink>
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                className={`text-(--secondary-text) ${isGray
                  ? "hover:text-cyan-400"
                  : "hover:text-indigo-600"
                  }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="hidden items-center gap-3 md:flex">

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`flex h-9 w-9 items-center justify-center cursor-pointer rounded-full border border-(--primary-border) transition-colors ${isGray
              ? "text-amber-300 hover:bg-slate-800"
              : "text-indigo-600 hover:bg-slate-100"
              }`}
          >
            {isGray ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {userData ? (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `text-sm font-medium transition-all duration-300 ${isActive
                  ? isGray
                    ? "text-cyan-400 border-b-2 border-cyan-400"
                    : "text-indigo-600 border-b-2 border-indigo-600"
                  : `text-(--secondary-text) ${isGray
                    ? "hover:text-cyan-400"
                    : "hover:text-indigo-600"
                  }`
                }`
              }
            >
              Profile
            </NavLink>
          ) : (
            <NavLink
              to="/auth"
              className={({ isActive }) =>
                `text-sm font-medium transition-all duration-300 ${isActive
                  ? isGray
                    ? "text-cyan-400 border-b-2 border-cyan-400"
                    : "text-indigo-600 border-b-2 border-indigo-600"
                  : `text-(--secondary-text) ${isGray
                    ? "hover:text-cyan-400"
                    : "hover:text-indigo-600"
                  }`
                }`
              }
            >
              Login
            </NavLink>
          )}

          {userData?.hasProAccess ? null : (<a
            href="/#pricing"
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 ${isGray
              ? "bg-gradient-to-r from-cyan-500 to-violet-600 shadow-cyan-900/40"
              : "bg-gradient-to-r from-indigo-600 to-fuchsia-600 shadow-indigo-300/50"
              }`}
          >
            <Sparkles size={15} />
            Get Access
          </a>)}
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden text-(--primary-text)`}
          onClick={() => setOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`md:hidden border-t border-(--primary-border) bg-(--secondary-bg)`}
          >
            <div className="flex flex-col gap-4 px-6 py-5">
              <NavLink
                to="/"
                onClick={() => setOpen(false)}
                className={routeLinkClass}
              >
                Home
              </NavLink>
              {navLinks.map((link) => (
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`text-(--secondary-text) ${isGray
                    ? "hover:text-cyan-400"
                    : "hover:text-indigo-600"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              {userData ? (
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-all duration-300 ${isActive
                      ? isGray
                        ? "text-cyan-400 border-b-2 border-cyan-400"
                        : "text-indigo-600 border-b-2 border-indigo-600"
                      : `text-(--secondary-text) ${isGray
                        ? "hover:text-cyan-400"
                        : "hover:text-indigo-600"
                      }`
                    }`
                  }
                >
                  Profile
                </NavLink>
              ) : (
                <NavLink
                  to="/auth"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-all duration-300 ${isActive
                      ? isGray
                        ? "text-cyan-400 border-b-2 border-cyan-400"
                        : "text-indigo-600 border-b-2 border-indigo-600"
                      : `text-(--secondary-text) ${isGray
                        ? "hover:text-cyan-400"
                        : "hover:text-indigo-600"
                      }`
                    }`
                  }
                >
                  Login
                </NavLink>
              )}
              <button
                onClick={toggleTheme}
                className={`flex items-center gap-2 text-sm font-medium text-(--accent-color4)`}
              >
                {isGray ? <Sun size={16} /> : <Moon size={16} />}
                Switch theme
              </button>
              {userData?.hasProAccess ? null : (<a
                href="#pricing"
                className={`mt-1 rounded-full px-4 py-2 text-center text-sm font-semibold text-white ${isGray
                  ? "bg-gradient-to-r from-cyan-500 to-violet-600"
                  : "bg-gradient-to-r from-indigo-600 to-fuchsia-600"
                  }`}
              >
                Get Access
              </a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;