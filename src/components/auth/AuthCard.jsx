import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  Gem,
  Loader2,
  Lock,
  LogIn,
  Mail,
  ShieldCheck,
  User,
  UserPlus,
  Zap,
} from "lucide-react";
import { useState } from "react";
import api from "../../utilities/axiosInstance";
import CountdownTimer from "../common/CountdownTimer";

// Google doesn't ship a lucide icon, so here's the standard 4-color "G" mark
// (the same asset Google's own branding guidelines use for sign-in buttons).
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.616z" />
    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" />
    <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" />
    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.962L3.964 7.294C4.672 5.167 6.656 3.58 9 3.58z" />
  </svg>
);

const benefits = [
  { icon: ShieldCheck, text: "Bank-grade JWT session security" },
  { icon: Zap, text: "One-click Google sign in" },
  { icon: Gem, text: "Passwords encrypted, never stored in plain text" },
];

/**
 * Small reusable input with a leading icon and optional trailing element
 * (used here for the show/hide password toggle).
 */
const InputField = ({ icon: Icon, isGray, trailing, maxLength = 30, ...props }) => (
  <div
    className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 transition-colors ${isGray
      ? "border-slate-700 bg-slate-950 focus-within:border-cyan-600"
      : "border-slate-200 bg-slate-50 focus-within:border-indigo-400"
      }`}
  >
    <Icon size={16} className={isGray ? "text-slate-500" : "text-slate-400"} />
    <input
      {...props}
      maxLength={maxLength}
      className={`w-full bg-transparent text-sm outline-none ${isGray ? "text-slate-100 placeholder:text-slate-500" : "text-slate-900 placeholder:text-slate-400"
        }`}
    />
    {trailing}
  </div>
);

const AuthCard = ({ isGray }) => {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [otpTimerStart, setOtpTimerStart] = useState(null);

  const resetOtpState = () => {
    setOtpStep(false);
    setOtp("");
    setOtpMessage("");
    setOtpError(false);
  };

  const switchMode = (next) => {
    setMode(next);
    setSuccess(false);
    resetOtpState();
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // 🔧 No real backend here — replace this with a real axios/fetch call to
  // /api/auth/login or /api/auth/register (see the code tab below).
  const fakeSubmit = () => {
    setLoading(true);
    setSuccess(false);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (mode === "login") {
        fakeSubmit();
        return;
      }

      if (!otpStep) {
        setLoading(true);
        setSuccess(false);
        setOtpError(false);

        const res = await api.post("/auth/register", form);
        if (res.data.success) {
          alert(res.data.message);
          setLoading(false);
          setOtpStep(true);
          setOtpMessage(res.data.message);
          setOtpTimerStart(Date.now());
        } else {
          alert(res.data.message);
        }
        // setTimeout(() => {
        //   const nextOtp = generateOtp();
        //   setLoading(false);
        //   setOtpStep(true);
        //   setOtp("");
        //   setOtpMessage(`We sent a 6-digit code to ${form.email || "your email"}. Demo code: ${nextOtp}`);
        // }, 1100);
        return;
      }

      if (!otp.trim()) {
        setOtpError(true);
        return;
      }

      setLoading(true);
      setOtpTimerStart(null);
      const res = await api.post("/auth/verify-otp", { email: form.email, otp: otp });
      if (res.data.success) {
        alert("You have successfully registered!");
        setOtpStep(false);
        setOtp("");
        setOtpMessage("");
        setForm({ name: "", email: "", password: "" });
      }

    } catch (error) {
      console.error("Error during form submission:", error);
      alert(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      setLoading(true);
      setOtpError(false);
      setOtp("");
      setOtpTimerStart(null);
      const res = await api.post("/auth/resend-otp", { email: form.email });
      if (res.data.success) {
        alert(res.data.message);
        setOtpTimerStart(Date.now());
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      alert(error.response?.data?.message || "An error occurred while resending OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const accentGradient = isGray
    ? "bg-gradient-to-r from-cyan-500 to-violet-600"
    : "bg-gradient-to-r from-indigo-600 to-fuchsia-600";

  return (
    <div
      className={`grid overflow-hidden rounded-3xl border shadow-xl lg:grid-cols-2 ${isGray ? "border-slate-800 shadow-black/30" : "border-slate-200 shadow-slate-200/60"
        }`}
    >
      {/* left branding panel — desktop only */}
      <div
        className={`relative hidden flex-col justify-between overflow-hidden p-8 lg:flex ${isGray
          ? "bg-gradient-to-br from-slate-900 via-slate-950 to-violet-950"
          : "bg-gradient-to-br from-indigo-600 via-fuchsia-600 to-rose-500"
          }`}
      >
        <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-white/10 blur-3xl" />

        <div className="relative">
          <span className="font-mono text-xs uppercase tracking-widest text-white/70">
            ReactAllCodeAndFeatures
          </span>
          <h3 className="mt-3 text-2xl font-bold leading-snug text-white">
            {mode === "login" ? "Welcome back, builder 👋" : "Join the catalogue 🚀"}
          </h3>
          <p className="mt-2 text-sm text-white/75">
            {mode === "login"
              ? "Log in to keep your unlocked features synced across devices."
              : "Create an account to track which feature pages you've unlocked."}
          </p>
        </div>

        <ul className="relative mt-8 space-y-3">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <li key={b.text} className="flex items-center gap-2.5 text-sm text-white/90">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15">
                  <Icon size={14} />
                </span>
                {b.text}
              </li>
            );
          })}
        </ul>
      </div>

      {/* right form panel */}
      <div className={`p-6 sm:p-8 ${isGray ? "bg-slate-900" : "bg-white"}`}>
        {/* segmented Login / Signup toggle */}
        <div
          className={`relative grid grid-cols-2 rounded-full p-1 ${isGray ? "bg-slate-950" : "bg-slate-100"
            }`}
        >
          <motion.div
            className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full ${accentGradient}`}
            animate={{ x: mode === "login" ? 0 : "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          />
          <button
            onClick={() => switchMode("login")}
            className={`relative z-10 rounded-full py-2 text-sm font-semibold transition-colors ${mode === "login" ? "text-white" : isGray ? "text-slate-400" : "text-slate-500"
              }`}
          >
            Log In
          </button>
          <button
            onClick={() => switchMode("signup")}
            className={`relative z-10 rounded-full py-2 text-sm font-semibold transition-colors ${mode === "signup" ? "text-white" : isGray ? "text-slate-400" : "text-slate-500"
              }`}
          >
            Sign Up
          </button>
        </div>

        {/* animated form swap */}
        <AnimatePresence mode="wait">
          <motion.form
            key={mode}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: mode === "login" ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: mode === "login" ? 16 : -16 }}
            transition={{ duration: 0.25 }}
            className="mt-6 space-y-3.5"
          >
            {mode === "signup" && (
              <InputField
                icon={User}
                isGray={isGray}
                name="name"
                maxLength={40}
                placeholder="Full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            )}

            <InputField
              icon={Mail}
              isGray={isGray}
              type="email"
              name="email"
              maxLength={40}
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />

            <InputField
              icon={Lock}
              isGray={isGray}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              maxLength={10}
              value={form.password}
              onChange={handleChange}
              required
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className={isGray ? "text-slate-500" : "text-slate-400"}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
            />

            <CountdownTimer
              startTime={otpTimerStart}
              duration={10 * 60 * 1000} // 10 minutes
            />

            {mode === "signup" && otpStep && (
              <div className="space-y-2.5">
                <InputField
                  icon={ShieldCheck}
                  isGray={isGray}
                  type="text"
                  name="otp"
                  maxLength={6}
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                    setOtpError(false);
                  }}
                  required
                  maxLength={6}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                />

                {otpMessage && (
                  <p className={`text-xs ${isGray ? "text-slate-400" : "text-slate-500"}`}>
                    {otpMessage}
                  </p>
                )}

                {otpError && (
                  <p className="text-xs text-rose-500">That code didn’t match. Please try again.</p>
                )}

              {!otpTimerStart &&  <button
                  type="button"
                  onClick={resendOtp}
                  className={`text-xs font-medium underline-offset-2 hover:underline ${isGray ? "text-cyan-400" : "text-indigo-600"}`}
                >
                  Resend code
                </button>}
              </div>
            )}

            {mode === "login" && (
              <div className="flex items-center justify-between pt-1 text-xs">
                <label className={`flex items-center gap-1.5 ${isGray ? "text-slate-400" : "text-slate-500"}`}>
                  <input type="checkbox" className="accent-indigo-600" />
                  Remember me
                </label>
                <button
                  type="button"
                  className={isGray ? "text-cyan-400 hover:underline" : "text-indigo-600 hover:underline"}
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] disabled:opacity-70 ${accentGradient}`}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Processing...
                </>
              ) : mode === "login" ? (
                <>
                  <LogIn size={16} /> Log In
                </>
              ) : otpStep ? (
                <>
                  <ShieldCheck size={16} /> Verify OTP
                </>
              ) : (
                <>
                  <UserPlus size={16} /> Create Account
                </>
              )}
            </button>

            {/* success banner */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3.5 py-2.5 text-xs text-emerald-500">
                    <CheckCircle2 size={15} />
                    {mode === "login" ? "Logged in successfully" : "Account created successfully"}{" "}
                    — demo only, no real account was made.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* divider */}
            <div className="flex items-center gap-3 pt-2">
              <span className={`h-px flex-1 ${isGray ? "bg-slate-800" : "bg-slate-200"}`} />
              <span className={`text-xs ${isGray ? "text-slate-500" : "text-slate-400"}`}>
                or continue with
              </span>
              <span className={`h-px flex-1 ${isGray ? "bg-slate-800" : "bg-slate-200"}`} />
            </div>

            <button
              type="button"
              onClick={fakeSubmit}
              disabled={loading}
              className={`flex w-full items-center justify-center gap-2.5 rounded-full border py-2.5 text-sm font-medium transition-colors disabled:opacity-70 ${isGray
                ? "border-slate-700 text-slate-200 hover:bg-slate-800"
                : "border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <p className={`pt-1 text-center text-xs ${isGray ? "text-slate-500" : "text-slate-400"}`}>
              {mode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("signup")}
                    className={isGray ? "font-medium text-cyan-400" : "font-medium text-indigo-600"}
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("login")}
                    className={isGray ? "font-medium text-cyan-400" : "font-medium text-indigo-600"}
                  >
                    Log in
                  </button>
                </>
              )}
            </p>
          </motion.form>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthCard;