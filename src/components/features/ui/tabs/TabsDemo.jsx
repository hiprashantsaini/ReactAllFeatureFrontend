import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Bell, ShieldCheck, CheckCircle2, LogOut, Mail, Lock } from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: ShieldCheck },
];

/** Small animated on/off switch, reused across the Notifications + Security panels. */
const ToggleSwitch = ({ checked, onChange, isGray }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
      checked ? (isGray ? "bg-cyan-500" : "bg-indigo-600") : isGray ? "bg-slate-700" : "bg-slate-300"
    }`}
  >
    <motion.span
      className="absolute top-1 h-4 w-4 rounded-full bg-white shadow"
      animate={{ x: checked ? 22 : 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    />
  </button>
);

const Field = ({ icon: Icon, isGray, ...props }) => (
  <div
    className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 ${
      isGray ? "border-slate-700 bg-slate-950" : "border-slate-200 bg-slate-50"
    }`}
  >
    <Icon size={15} className={isGray ? "text-slate-500" : "text-slate-400"} />
    <input
      {...props}
      className={`w-full bg-transparent text-sm outline-none ${
        isGray ? "text-slate-100 placeholder:text-slate-500" : "text-slate-900 placeholder:text-slate-400"
      }`}
    />
  </div>
);

const TabsDemo = ({ isGray }) => {
  const [active, setActive] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [notifs, setNotifs] = useState({ email: true, push: false, digest: true });
  const [twoFA, setTwoFA] = useState(false);

  const accent = isGray ? "from-cyan-500 to-violet-600" : "from-indigo-600 to-fuchsia-600";

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className={`overflow-hidden rounded-2xl border ${isGray ? "border-slate-800 bg-slate-900/40" : "border-slate-200 bg-white"}`}>
      {/* tab bar */}
      <div className={`relative flex gap-6 overflow-x-auto border-b px-5 pt-4 ${isGray ? "border-slate-800" : "border-slate-200"}`}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`relative flex items-center gap-1.5 whitespace-nowrap pb-3 text-sm font-medium transition-colors ${
                isActive ? (isGray ? "text-cyan-300" : "text-indigo-600") : isGray ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Icon size={14} />
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="tabs-underline"
                  className={`absolute -bottom-px left-0 right-0 h-0.5 rounded-full bg-gradient-to-r ${accent}`}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* panels */}
      <div className="relative overflow-hidden p-6">
        <AnimatePresence mode="wait">
          {active === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <img src="https://i.pravatar.cc/100?img=33" alt="avatar" className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <p className={`text-sm font-semibold ${isGray ? "text-slate-100" : "text-slate-900"}`}>Ananya Singh</p>
                  <p className={`text-xs ${isGray ? "text-slate-500" : "text-slate-400"}`}>Pro member since 2024</p>
                </div>
              </div>
              <Field icon={User} isGray={isGray} defaultValue="Ananya Singh" />
              <Field icon={Mail} isGray={isGray} type="email" defaultValue="ananya@example.com" />
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSave}
                  className={`rounded-full bg-gradient-to-r px-5 py-2 text-sm font-semibold text-white ${accent}`}
                >
                  Save Changes
                </button>
                <AnimatePresence>
                  {saved && (
                    <motion.span
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1 text-xs text-emerald-500"
                    >
                      <CheckCircle2 size={14} /> Saved
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {active === "notifications" && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {[
                { key: "email", label: "Email notifications", desc: "Get an email when something needs your attention." },
                { key: "push", label: "Push notifications", desc: "Real-time alerts on your phone and desktop." },
                { key: "digest", label: "Weekly digest", desc: "A short summary every Monday morning." },
              ].map((row) => (
                <div key={row.key} className="flex items-center justify-between gap-4">
                  <div>
                    <p className={`text-sm font-medium ${isGray ? "text-slate-200" : "text-slate-800"}`}>{row.label}</p>
                    <p className={`text-xs ${isGray ? "text-slate-500" : "text-slate-400"}`}>{row.desc}</p>
                  </div>
                  <ToggleSwitch
                    isGray={isGray}
                    checked={notifs[row.key]}
                    onChange={(val) => setNotifs((p) => ({ ...p, [row.key]: val }))}
                  />
                </div>
              ))}
            </motion.div>
          )}

          {active === "security" && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <Field icon={Lock} isGray={isGray} type="password" placeholder="Current password" />
              <Field icon={Lock} isGray={isGray} type="password" placeholder="New password" />

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className={`text-sm font-medium ${isGray ? "text-slate-200" : "text-slate-800"}`}>Two-factor authentication</p>
                  <p className={`text-xs ${isGray ? "text-slate-500" : "text-slate-400"}`}>Adds an extra step when logging in.</p>
                </div>
                <ToggleSwitch isGray={isGray} checked={twoFA} onChange={setTwoFA} />
              </div>

              <button
                className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium ${
                  isGray ? "border-red-900 text-red-400 hover:bg-red-950/40" : "border-red-200 text-red-600 hover:bg-red-50"
                }`}
              >
                <LogOut size={14} />
                Log out of all devices
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TabsDemo;