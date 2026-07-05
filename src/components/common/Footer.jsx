import { Code2} from "lucide-react";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";

const columns = [
  {
    title: "Explore",
    links: ["All Features", "How it works", "Pricing", "Changelog"],
  },
  {
    title: "Popular pages",
    links: ["Carousel", "Infinite Scroll", "Data Table", "Auth Flow"],
  },
  {
    title: "Resources",
    links: ["React Docs", "MERN Guide", "Contribute", "Support"],
  },
];

const Footer = ({ isGray }) => {
  return (
    <footer
      className={`border-t px-4 pt-14 pb-8 sm:px-6 lg:px-8 ${
        isGray ? "border-slate-800 bg-slate-950" : "border-slate-200 bg-slate-50"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  isGray
                    ? "bg-gradient-to-br from-cyan-500 to-violet-600"
                    : "bg-gradient-to-br from-indigo-500 to-fuchsia-500"
                }`}
              >
                <Code2 size={16} className="text-white" />
              </span>
              <span className={`font-mono text-sm font-bold ${isGray ? "text-slate-100" : "text-slate-900"}`}>
                ReactAllFeatures
              </span>
            </div>
            <p className={`mt-3 max-w-xs text-sm ${isGray ? "text-slate-500" : "text-slate-500"}`}>
              A growing library of real, working React + MERN feature pages for beginners.
            </p>
            <div className="mt-4 flex gap-3">
              {[BsGithub, BsTwitter, BsLinkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
                    isGray
                      ? "border-slate-800 text-slate-400 hover:text-cyan-400"
                      : "border-slate-200 text-slate-500 hover:text-indigo-600"
                  }`}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className={`text-sm font-semibold ${isGray ? "text-slate-200" : "text-slate-900"}`}>
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className={`text-sm ${
                        isGray ? "text-slate-500 hover:text-slate-200" : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className={`mt-12 flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs sm:flex-row ${
            isGray ? "border-slate-800 text-slate-500" : "border-slate-200 text-slate-400"
          }`}
        >
          <p>© {new Date().getFullYear()} ReactAllCodeAndFeatures. Built for learners.</p>
          <p>Made with React, Tailwind CSS &amp; Framer Motion</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;