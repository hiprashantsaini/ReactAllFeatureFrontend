import { motion } from "framer-motion";
import {
  ArrowDownToLine,
  BarChart3,
  Bell,
  Calendar,
  ChevronDown,
  ChevronsRight,
  CreditCard,
  GalleryHorizontal,
  Info,
  LayoutPanelTop,
  ListChecks,
  Loader,
  Lock,
  LogIn,
  Maximize2,
  MousePointerClick,
  Move,
  Rows3,
  Search,
  ShieldCheck,
  Star,
  SunMoon,
  Table2,
  Upload,
  Wifi,
} from "lucide-react";
import { useState } from "react";
import FeatureCard from "./FeatureCard";

// Every entry here becomes its own dedicated page later (see suggested routes).
const features = [
  { id: "image-carousel", icon: GalleryHorizontal, title: "Image Carousel", tag: "UI", path: "/features/image-carousel", description: "Auto-playing, swipeable image slider with dots & arrow controls." },
  { id: "infinite-scroll", icon: ArrowDownToLine, title: "Infinite Scroll", tag: "Data", path: "/features/infinite-scroll", description: "Loads more items automatically as the user scrolls down." },
  { id: "accordion-faq", icon: ChevronDown, title: "Accordion / FAQ", tag: "UI", path: "/features/accordion", description: "Expandable panels with smooth height animation." },
  { id: "tabs", icon: LayoutPanelTop, title: "Tabs", tag: "UI", path: "/features/tabs", description: "Animated underline tabs for switching between content panels." },
  { id: "modal-dialog", icon: Maximize2, title: "Modal / Dialog", tag: "UI", path: "/features/modal", description: "Accessible popup dialog with backdrop blur and exit animation." },
  { id: "toast-notifications", icon: Bell, title: "Toast Notifications", tag: "Feedback", path: "/features/toast", description: "Stackable success / error toasts that auto-dismiss." },
  { id: "drag-drop", icon: Move, title: "Drag & Drop", tag: "Interaction", path: "/features/drag-drop", description: "Reorderable list and a mini Kanban board using drag events." },
  { id: "multi-step-form", icon: ListChecks, title: "Multi-step Form", tag: "Forms", path: "/features/multi-step-form", description: "Wizard-style form with progress indicator and step validation." },
  { id: "form-validation", icon: ShieldCheck, title: "Form Validation", tag: "Forms", path: "/features/form-validation", description: "React Hook Form + schema validation with inline error messages." },
  { id: "data-table", icon: Table2, title: "Data Table", tag: "Data", path: "/features/data-table", description: "Sortable, filterable, paginated table built from scratch." },
  { id: "virtualized-list", icon: Rows3, title: "Virtualized List", tag: "Performance", path: "/features/virtualized-list", description: "Renders only visible rows to handle 10,000+ items smoothly." },
  { id: "debounced-search", icon: Search, title: "Debounced Search", tag: "Hooks", path: "/features/debounced-search", description: "Custom useDebounce hook to delay API calls while typing." },
  { id: "theme-switcher", icon: SunMoon, title: "Dark / Light Theme", tag: "Redux", path: "/features/theme-switcher", description: "Global theme toggle powered by the Redux user slice." },
  { id: "charts-graphs", icon: BarChart3, title: "Charts & Graphs", tag: "Data Viz", path: "/features/charts", description: "Bar, line and pie charts built with a lightweight charting lib." },
  { id: "file-upload", icon: Upload, title: "File Upload", tag: "Forms", path: "/features/file-upload", description: "Drag-to-upload with image preview and a progress bar." },
  { id: "context-menu", icon: MousePointerClick, title: "Context Menu", tag: "Interaction", path: "/features/context-menu", description: "Custom right-click menu positioned at the cursor." },
  { id: "tooltip-popover", icon: Info, title: "Tooltip & Popover", tag: "UI", path: "/features/tooltip", description: "Hover/click tooltips that auto-flip to stay on screen." },
  { id: "star-rating", icon: Star, title: "Star Rating", tag: "UI", path: "/features/rating", description: "Hover-to-preview, click-to-set star rating component." },
  { id: "skeleton-loading", icon: Loader, title: "Skeleton Loading", tag: "UX", path: "/features/skeleton-loading", description: "Animated placeholder shimmer shown while data is fetching." },
  { id: "realtime-chat", icon: Wifi, title: "Realtime Chat", tag: "MERN", path: "/features/realtime-chat", description: "Socket.io powered chat room with live typing indicator." },
  { id: "auth-login-signup", icon: LogIn, title: "Auth: Login & Signup", tag: "MERN", path: "/features/demo-auth", description: "JWT based authentication flow against an Express + MongoDB API." },
  { id: "protected-routes", icon: Lock, title: "Protected Routes", tag: "Routing", path: "/features/protected-routes", description: "Route guards that redirect unauthenticated users to login." },
  { id: "date-picker", icon: Calendar, title: "Date Picker", tag: "Forms", path: "/features/date-picker", description: "Custom calendar dropdown for picking a single date or range." },
  { id: "razorpay-checkout", icon: CreditCard, title: "Razorpay Checkout", tag: "Payments", path: "/features/razorpay-checkout", description: "Order creation + checkout to unlock the full source access." },
  { id: "breadcrumb-trail", icon: ChevronsRight, title: "Breadcrumb Trail", tag: "Navigation", path: "/features/breadcrumb", description: "Dynamic breadcrumb generated from the current route path." },
];

const FILTERS = ["All", "UI", "Forms", "Data", "MERN"];

const FeaturesShowcase = ({ isGray }) => {
  const [filter, setFilter] = useState("All");

  const visible =
    filter === "All" ? features : features.filter((f) => f.tag === filter);

  return (
    <section id="features" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className={`font-mono text-xs uppercase tracking-widest ${
              isGray ? "text-cyan-400" : "text-indigo-600"
            }`}
          >
            01 / The Catalogue
          </span>
          <h2
            className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl ${
              isGray ? "text-slate-50" : "text-slate-900"
            }`}
          >
            One feature. One page. One pattern.
          </h2>
          <p className={`mt-3 text-sm sm:text-base ${isGray ? "text-slate-400" : "text-slate-600"}`}>
            Each card below links to a standalone page with full, working,
            beginner-friendly code you can copy straight into your own MERN app.
          </p>
        </div>

        {/* Filter pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === f
                  ? isGray
                    ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white"
                    : "bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white"
                  : isGray
                  ? "bg-slate-900 text-slate-400 hover:text-slate-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {visible.map((feature, i) => (
            <FeatureCard key={feature.id} {...feature} isGray={isGray} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;