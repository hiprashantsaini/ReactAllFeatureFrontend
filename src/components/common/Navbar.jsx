import { AnimatePresence, motion } from "framer-motion";
import { Code2, Menu, Moon, Sparkles, Sun, X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

/**
 * Navbar
 * - Sticky top navigation with a glassy / blurred background.
 * - "isGray" (passed down from HomePage) decides which color theme to render.
 * - The theme toggle button just dispatches a plain action object to Redux.
 *   In your real store, a "user" reducer would flip `isGray` on this action.
 */
const navLinks = [
  { label: "Home", to: "/" },
  { label: "Features", to: "#features" },
  { label: "How it works", to: "#how-it-works" },
  { label: "Pricing", to: "#pricing" },
];

const Navbar = ({ isGray }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    // Beginner-friendly inline dispatch — no separate action file needed.
    dispatch({ type: "user/toggleTheme" });
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-colors duration-500 ${
        isGray
          ? "bg-slate-950/80 border-slate-800"
          : "bg-white/70 border-slate-200"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-lg ${
              isGray
                ? "bg-gradient-to-br from-cyan-500 to-violet-600"
                : "bg-gradient-to-br from-indigo-500 to-fuchsia-500"
            }`}
          >
            <Code2 size={18} className="text-white" />
          </span>
          <span
            className={`font-mono text-sm sm:text-base font-bold tracking-tight ${
              isGray ? "text-slate-100" : "text-slate-900"
            }`}
          >
            React<span className="text-violet-500">All</span>Features
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                className={`text-sm font-medium transition-colors ${
                  isGray
                    ? "text-slate-300 hover:text-cyan-400"
                    : "text-slate-600 hover:text-indigo-600"
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
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
              isGray
                ? "border-slate-700 text-amber-300 hover:bg-slate-800"
                : "border-slate-200 text-indigo-600 hover:bg-slate-100"
            }`}
          >
            {isGray ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a
            href="#pricing"
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 ${
              isGray
                ? "bg-gradient-to-r from-cyan-500 to-violet-600 shadow-cyan-900/40"
                : "bg-gradient-to-r from-indigo-600 to-fuchsia-600 shadow-indigo-300/50"
            }`}
          >
            <Sparkles size={15} />
            Get Access
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden ${isGray ? "text-slate-200" : "text-slate-800"}`}
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
            className={`md:hidden border-t ${
              isGray ? "border-slate-800 bg-slate-950" : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex flex-col gap-4 px-6 py-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.to}
                  onClick={() => setOpen(false)}
                  className={`text-sm font-medium ${
                    isGray ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={toggleTheme}
                className={`flex items-center gap-2 text-sm font-medium ${
                  isGray ? "text-amber-300" : "text-indigo-600"
                }`}
              >
                {isGray ? <Sun size={16} /> : <Moon size={16} />}
                Switch theme
              </button>
              <a
                href="#pricing"
                className={`mt-1 rounded-full px-4 py-2 text-center text-sm font-semibold text-white ${
                  isGray
                    ? "bg-gradient-to-r from-cyan-500 to-violet-600"
                    : "bg-gradient-to-r from-indigo-600 to-fuchsia-600"
                }`}
              >
                Get Access
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;