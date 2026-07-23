// import { useSelector } from "react-redux";
// import Footer from "../../components/common/Footer";
// import Navbar from "../../components/common/Navbar";

// const ProfilePage = () => {
//  const isGray = useSelector((state) => state.user.isGray);
//   return (
//        <div
//       className={`min-h-screen w-full transition-colors duration-500 ${
//         isGray ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
//       }`}
//     >
//       <Navbar isGray={isGray} />
//       <Footer isGray={isGray} />
//       </div>
//   )
// }

// export default ProfilePage

import { AnimatePresence, motion } from "framer-motion";
import {
    BadgeCheck,
    Bell,
    ChevronRight,
    Clock,
    Crown,
    Edit3,
    ExternalLink,
    Gem,
    LayoutGrid,
    Lock,
    LogOut,
    Mail,
    Moon,
    Package,
    ShieldCheck,
    Star,
    Sun,
    User,
    Zap,
} from "lucide-react";
import moment from "moment";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContext } from "../../../context/ToastProvider";
import Footer from "../../components/common/Footer";
import api from "../../utilities/axiosInstance";

// ─── Dummy Data ────────────────────────────────────────────────────────────────

const USER = {
    name: "Prashant Sharma",
    email: "prashant@example.com",
    avatar: null, // initials fallback
    joinedAt: "January 2025",
    plan: "Pro",
    featuresUnlocked: 9,
    featuresTotal: 24,
};

const PLAN_FEATURES = [
    { icon: Zap, label: "Unlimited feature previews" },
    { icon: ShieldCheck, label: "Priority support" },
    { icon: Gem, label: "Early access to new drops" },
    { icon: Bell, label: "Release notifications" },
];

const UNLOCKED_FEATURES = [
    { id: 1, name: "Infinite Scroll", category: "UX", unlockedOn: "12 Mar 2025", status: "active" },
    { id: 2, name: "Auth Card", category: "Auth", unlockedOn: "18 Mar 2025", status: "active" },
    { id: 3, name: "Toast Notifications", category: "Feedback", unlockedOn: "22 Mar 2025", status: "active" },
    { id: 4, name: "Carousel Pro", category: "UI", unlockedOn: "1 Apr 2025", status: "active" },
    { id: 5, name: "Data Table", category: "Data", unlockedOn: "5 Apr 2025", status: "active" },
    { id: 6, name: "Command Palette", category: "UX", unlockedOn: "10 Apr 2025", status: "active" },
    { id: 7, name: "Drag & Drop Board", category: "UI", unlockedOn: "14 Apr 2025", status: "active" },
    { id: 8, name: "OTP Verify Flow", category: "Auth", unlockedOn: "20 Apr 2025", status: "active" },
    { id: 9, name: "Countdown Timer", category: "Utility", unlockedOn: "28 Apr 2025", status: "active" },
];

const AVAILABLE_PLANS = [
    {
        id: "starter",
        name: "Starter",
        price: "Free",
        color: "slate",
        features: ["5 features/month", "Community support", "Basic previews"],
        current: false,
    },
    {
        id: "pro",
        name: "Pro",
        price: "₹499/mo",
        color: "indigo",
        features: ["Unlimited features", "Priority support", "Early access", "Release alerts"],
        current: true,
    },
    {
        id: "team",
        name: "Team",
        price: "₹999/mo",
        color: "violet",
        features: ["Everything in Pro", "5 seats", "Usage analytics", "Custom requests"],
        current: false,
    },
];

// ─── Tiny helpers ──────────────────────────────────────────────────────────────

const categoryColors = {
    UX: { light: "bg-amber-100 text-amber-700", dark: "bg-amber-900/30 text-amber-400" },
    Auth: { light: "bg-indigo-100 text-indigo-700", dark: "bg-indigo-900/30 text-indigo-400" },
    Feedback: { light: "bg-emerald-100 text-emerald-700", dark: "bg-emerald-900/30 text-emerald-400" },
    UI: { light: "bg-fuchsia-100 text-fuchsia-700", dark: "bg-fuchsia-900/30 text-fuchsia-400" },
    Data: { light: "bg-cyan-100 text-cyan-700", dark: "bg-cyan-900/30 text-cyan-400" },
    Utility: { light: "bg-rose-100 text-rose-700", dark: "bg-rose-900/30 text-rose-400" },
};

const Avatar = ({ name, size = 56 }) => {
    const initials = name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
    return (
        <div
            style={{ width: size, height: size, fontSize: size * 0.36 }}
            className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 font-bold text-white shadow-lg"
        >
            {initials}
        </div>
    );
};

const SectionLabel = ({ icon: Icon, label, isGray }) => (
    <div className="mb-4 flex items-center gap-2">
        <Icon size={15} className={isGray ? "text-cyan-400" : "text-indigo-500"} />
        <span
            className={`font-mono text-xs font-semibold uppercase tracking-widest ${isGray ? "text-slate-400" : "text-slate-500"}`}
        >
            {label}
        </span>
    </div>
);

const Card = ({ children, isGray, className = "" }) => (
    <div
        className={`rounded-2xl border p-5 sm:p-6 ${isGray
            ? "border-slate-800 bg-slate-900"
            : "border-slate-200 bg-white shadow-sm shadow-slate-100"
            } ${className}`}
    >
        {children}
    </div>
);

// ─── Sub-sections ──────────────────────────────────────────────────────────────

const ProfileCard = ({ isGray,userData }) => (
    <Card isGray={isGray}>
        <SectionLabel icon={User} label="Account" isGray={isGray} />
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
            <Avatar name={userData.name} size={64} />
            <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                    <h2 className={`text-lg font-bold truncate ${isGray ? "text-slate-100" : "text-slate-900"}`}>
                        {userData.name}
                    </h2>
                    <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${isGray
                            ? "bg-cyan-900/40 text-cyan-400"
                            : "bg-indigo-100 text-indigo-700"
                            }`}
                    >
                        <Crown size={11} /> {USER.plan}
                    </span>
                </div>
                <p className={`mt-0.5 text-sm ${isGray ? "text-slate-400" : "text-slate-500"}`}>
                    {userData.email}
                </p>
                <p className={`mt-1 text-xs ${isGray ? "text-slate-600" : "text-slate-400"}`}>
                    Member since {moment(userData.createdAt).format("DD-MMM-YYYY")}
                </p>
            </div>
            <button
                className={`flex items-center gap-1.5 self-start rounded-xl border px-3.5 py-2 text-xs font-medium transition-colors sm:self-auto ${isGray
                    ? "border-slate-700 text-slate-300 hover:bg-slate-800"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
            >
                <Edit3 size={13} /> Edit profile
            </button>
        </div>

        {/* progress bar */}
        <div className="mt-5">
            <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className={isGray ? "text-slate-400" : "text-slate-500"}>
                    Features unlocked
                </span>
                <span className={`font-semibold ${isGray ? "text-slate-200" : "text-slate-800"}`}>
                    {USER.featuresUnlocked} / {USER.featuresTotal}
                </span>
            </div>
            <div className={`h-2 overflow-hidden rounded-full ${isGray ? "bg-slate-800" : "bg-slate-100"}`}>
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(USER.featuresUnlocked / USER.featuresTotal) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                />
            </div>
        </div>
    </Card>
);

const StatsRow = ({ isGray }) => {
    const stats = [
        { label: "Plan", value: USER.plan, icon: Crown },
        { label: "Features Unlocked", value: USER.featuresUnlocked, icon: LayoutGrid },
        { label: "Member Since", value: "Jan '25", icon: Clock },
        { label: "Support Tier", value: "Priority", icon: Star },
    ];
    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s, i) => (
                <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 + 0.1 }}
                >
                    <Card isGray={isGray} className="flex flex-col gap-1.5">
                        <s.icon size={16} className={isGray ? "text-cyan-400" : "text-indigo-500"} />
                        <p className={`text-xl font-bold ${isGray ? "text-slate-100" : "text-slate-900"}`}>
                            {s.value}
                        </p>
                        <p className={`text-xs ${isGray ? "text-slate-500" : "text-slate-400"}`}>{s.label}</p>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
};

const CurrentPlanCard = ({ isGray }) => (
    <Card isGray={isGray}>
        <SectionLabel icon={Package} label="Current Plan" isGray={isGray} />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
                <div className="flex items-center gap-2">
                    <span
                        className={`text-2xl font-extrabold ${isGray ? "text-slate-100" : "text-slate-900"}`}
                    >
                        Pro
                    </span>
                    <BadgeCheck size={20} className={isGray ? "text-cyan-400" : "text-indigo-500"} />
                </div>
                <p className={`mt-0.5 text-sm ${isGray ? "text-slate-400" : "text-slate-500"}`}>
                    Renews on <strong>1 June 2025</strong> · ₹499/mo
                </p>
                <ul className="mt-4 space-y-2">
                    {PLAN_FEATURES.map((f) => (
                        <li key={f.label} className="flex items-center gap-2.5 text-sm">
                            <span
                                className={`flex h-6 w-6 items-center justify-center rounded-lg ${isGray ? "bg-slate-800" : "bg-indigo-50"
                                    }`}
                            >
                                <f.icon size={13} className={isGray ? "text-cyan-400" : "text-indigo-600"} />
                            </span>
                            <span className={isGray ? "text-slate-300" : "text-slate-600"}>{f.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-row gap-2 sm:flex-col">
                <button
                    className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-colors ${isGray
                        ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white"
                        : "bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white"
                        }`}
                >
                    Upgrade <ChevronRight size={13} />
                </button>
                <button
                    className={`flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs font-medium transition-colors ${isGray
                        ? "border-slate-700 text-slate-400 hover:bg-slate-800"
                        : "border-slate-200 text-slate-500 hover:bg-slate-50"
                        }`}
                >
                    Manage
                </button>
            </div>
        </div>
    </Card>
);

const PlansCompare = ({ isGray }) => (
    <Card isGray={isGray}>
        <SectionLabel icon={Gem} label="All Plans" isGray={isGray} />
        <div className="grid gap-3 sm:grid-cols-3">
            {AVAILABLE_PLANS.map((plan) => (
                <div
                    key={plan.id}
                    className={`relative rounded-xl border p-4 transition-all ${plan.current
                        ? isGray
                            ? "border-cyan-600 bg-cyan-950/30"
                            : "border-indigo-400 bg-indigo-50/50"
                        : isGray
                            ? "border-slate-800 bg-slate-950"
                            : "border-slate-200 bg-slate-50"
                        }`}
                >
                    {plan.current && (
                        <span
                            className={`absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full px-2.5 py-0.5 text-xs font-semibold ${isGray
                                ? "bg-cyan-500 text-slate-950"
                                : "bg-indigo-600 text-white"
                                }`}
                        >
                            Current
                        </span>
                    )}
                    <p className={`font-bold ${isGray ? "text-slate-100" : "text-slate-900"}`}>
                        {plan.name}
                    </p>
                    <p
                        className={`mt-0.5 text-lg font-extrabold ${isGray ? "text-cyan-400" : "text-indigo-600"
                            }`}
                    >
                        {plan.price}
                    </p>
                    <ul className="mt-3 space-y-1.5">
                        {plan.features.map((f) => (
                            <li key={f} className={`flex items-start gap-1.5 text-xs ${isGray ? "text-slate-400" : "text-slate-500"}`}>
                                <BadgeCheck size={12} className={`mt-px shrink-0 ${isGray ? "text-cyan-500" : "text-indigo-500"}`} />
                                {f}
                            </li>
                        ))}
                    </ul>
                    {!plan.current && (
                        <button
                            className={`mt-4 w-full rounded-lg py-2 text-xs font-semibold transition-colors ${isGray
                                ? "bg-slate-800 text-slate-200 hover:bg-slate-700"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                }`}
                        >
                            Switch
                        </button>
                    )}
                </div>
            ))}
        </div>
    </Card>
);

const UnlockedFeatures = ({ isGray }) => {
    const [filter, setFilter] = useState("All");
    const categories = ["All", ...Array.from(new Set(UNLOCKED_FEATURES.map((f) => f.category)))];
    const filtered =
        filter === "All" ? UNLOCKED_FEATURES : UNLOCKED_FEATURES.filter((f) => f.category === filter);

    return (
        <Card isGray={isGray}>
            <SectionLabel icon={LayoutGrid} label="Unlocked Features" isGray={isGray} />

            {/* category filter chips */}
            <div className="mb-4 flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${filter === cat
                            ? isGray
                                ? "bg-cyan-500 text-slate-950"
                                : "bg-indigo-600 text-white"
                            : isGray
                                ? "bg-slate-800 text-slate-400 hover:bg-slate-700"
                                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="space-y-2">
                <AnimatePresence mode="popLayout">
                    {filtered.map((feat, i) => {
                        const colMap = categoryColors[feat.category] || { light: "bg-slate-100 text-slate-600", dark: "bg-slate-800 text-slate-400" };
                        return (
                            <motion.div
                                key={feat.id}
                                layout
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: i * 0.04 }}
                                className={`flex items-center justify-between rounded-xl border px-4 py-3 ${isGray
                                    ? "border-slate-800 bg-slate-950 hover:border-slate-700"
                                    : "border-slate-100 bg-slate-50 hover:border-slate-200"
                                    } group transition-colors`}
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <span
                                        className={`shrink-0 rounded-lg px-2 py-0.5 text-xs font-semibold ${isGray ? colMap.dark : colMap.light
                                            }`}
                                    >
                                        {feat.category}
                                    </span>
                                    <span
                                        className={`truncate text-sm font-medium ${isGray ? "text-slate-200" : "text-slate-800"
                                            }`}
                                    >
                                        {feat.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 shrink-0 ml-3">
                                    <span className={`hidden text-xs sm:block ${isGray ? "text-slate-600" : "text-slate-400"}`}>
                                        {feat.unlockedOn}
                                    </span>
                                    <ExternalLink
                                        size={13}
                                        className={`opacity-0 group-hover:opacity-100 transition-opacity ${isGray ? "text-cyan-400" : "text-indigo-500"
                                            }`}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </Card>
    );
};

const SecurityCard = ({ isGray }) => (
    <Card isGray={isGray}>
        <SectionLabel icon={Lock} label="Security" isGray={isGray} />
        <div className="space-y-3">
            {[
                { label: "Change password", sub: "Last changed 3 months ago", icon: Lock },
                { label: "Two-factor authentication", sub: "Not enabled", icon: ShieldCheck },
                { label: "Active sessions", sub: "1 device", icon: User },
            ].map((item) => (
                <div
                    key={item.label}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 cursor-pointer transition-colors ${isGray
                        ? "border-slate-800 bg-slate-950 hover:border-slate-700"
                        : "border-slate-100 bg-slate-50 hover:border-slate-200"
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <item.icon size={15} className={isGray ? "text-slate-500" : "text-slate-400"} />
                        <div>
                            <p className={`text-sm font-medium ${isGray ? "text-slate-200" : "text-slate-800"}`}>
                                {item.label}
                            </p>
                            <p className={`text-xs ${isGray ? "text-slate-500" : "text-slate-400"}`}>{item.sub}</p>
                        </div>
                    </div>
                    <ChevronRight size={15} className={isGray ? "text-slate-600" : "text-slate-300"} />
                </div>
            ))}
        </div>
    </Card>
);

const DangerZone = ({ isGray,handleSignOut }) => (
    <Card isGray={isGray}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
                <Mail size={15} className={isGray ? "text-slate-500" : "text-slate-400"} />
                <div>
                    <p className={`text-sm font-medium ${isGray ? "text-slate-200" : "text-slate-800"}`}>
                        Notifications
                    </p>
                    <p className={`text-xs ${isGray ? "text-slate-500" : "text-slate-400"}`}>
                        Email me about new feature drops
                    </p>
                </div>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" defaultChecked className="peer sr-only" />
                <div className="peer h-5 w-9 rounded-full bg-slate-300 peer-checked:bg-indigo-600 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4" />
            </label>
        </div>

        <div
            className={`mt-4 flex items-center justify-between rounded-xl border px-4 py-3 ${isGray ? "border-rose-900/50 bg-rose-950/20" : "border-rose-100 bg-rose-50"
                }`}
        >
            <div>
                <p className="text-sm font-medium text-rose-500">Sign out</p>
                <p className={`text-xs ${isGray ? "text-rose-400/60" : "text-rose-400"}`}>
                    You'll need to log back in
                </p>
            </div>
            <button onClick={handleSignOut} className="flex items-center gap-1.5 rounded-lg bg-rose-500 px-3 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-80">
                <LogOut size={13} /> Sign out
            </button>
        </div>
    </Card>
);

// ─── Page ──────────────────────────────────────────────────────────────────────

const ProfilePage = () => {
    const {isGray,userData }= useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSigningOut, setIsSigningOut] = useState(false);
    const {setToast} = useContext(ToastContext);

    const toggleTheme = () => {
        dispatch({ type: "user/toggleTheme" });
    };

    const handleSignOut = async() => {
        if(!confirm("Are you sure you want to sign out?")) return;
        try{
          setIsSigningOut(true);
          const res= await api.post("/auth/logout",{withCredentials:true});
          if(res.data.success){
            dispatch({ type: "user/clearUserData" });
            setToast({ message: "You have been signed out.", type: "success" });
            navigate("/auth");
          }
        }catch(error){
          console.error("Error signing out:", error);
          setToast({ message: "Failed to sign out.", type: "error" });
        } finally {
          setIsSigningOut(false);
        }
    }

    if(!userData){
        navigate("/");
        return;
    }
    return (
        <div
            className={`min-h-screen w-full transition-colors duration-500 ${isGray ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
                }`}
        >

            {/* page hero strip */}
            <div
                className={`relative overflow-hidden border-b py-10 ${isGray
                    ? "bg-slate-950/80 border-slate-800"
                    : "bg-white/70 border-slate-200"
                    }`}
            >
                {/* ambient glow */}
                <div className="pointer-events-none absolute -left-20 top-0 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />
                <div className="pointer-events-none absolute -right-10 bottom-0 h-36 w-36 rounded-full bg-fuchsia-500/10 blur-3xl" />

                <div className="relative mx-auto max-w-5xl px-4 flex gap-4 sm:px-6 ">

                    <Link to="/" className="flex items-center gap-2">
                        <img src={isGray ? "/logoDark.png" : "/logoLight.png"} className="h-14" />
                    </Link>
                    <div>
                        <h1 className={`mt-1 text-2xl font-extrabold sm:text-3xl ${isGray ? "text-slate-100" : "text-slate-900"}`}>
                            Your Profile
                        </h1>
                        <p className={`mt-1 text-sm ${isGray ? "text-slate-400" : "text-slate-500"}`}>
                            Manage your account, plan, and unlocked features.
                        </p>
                    </div>
                    <div className="flex-1 flex items-center justify-end">
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${isGray
                                ? "border-slate-700 text-amber-300 hover:bg-slate-800"
                                : "border-slate-200 text-indigo-600 hover:bg-slate-100"
                                }`}
                        >
                            {isGray ? <Sun size={16} /> : <Moon size={16} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* main content */}
            <main className="mx-auto max-w-5xl space-y-4 px-4 py-8 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
                    <ProfileCard isGray={isGray} userData={userData} />
                </motion.div>

                <StatsRow isGray={isGray} />

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                    <CurrentPlanCard isGray={isGray} />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <PlansCompare isGray={isGray} />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                    <UnlockedFeatures isGray={isGray} />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <SecurityCard isGray={isGray} />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                    <DangerZone isGray={isGray} handleSignOut={handleSignOut} />
                </motion.div>
            </main>

            <Footer isGray={isGray} />
        </div>
    );
};

export default ProfilePage;