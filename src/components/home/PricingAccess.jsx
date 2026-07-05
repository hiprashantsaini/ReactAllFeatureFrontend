import React from "react";
import { motion } from "framer-motion";
import { CreditCard, Check, X, ShieldCheck } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    note: "Browse & learn",
    perks: [
      { text: "View every feature page live", included: true },
      { text: "Read partial / preview code", included: true },
      { text: "Full source code download", included: false },
      { text: "Private GitHub repo access", included: false },
    ],
  },
  {
    name: "Pro Access",
    price: "₹499",
    note: "One-time payment",
    highlighted: true,
    perks: [
      { text: "View every feature page live", included: true },
      { text: "Full copy-paste source for all pages", included: true },
      { text: "Private GitHub repo access", included: true },
      { text: "Lifetime free future updates", included: true },
    ],
  },
];

/**
 * In your real app, the "Unlock with Razorpay" button would:
 * 1. Call your Express API to create a Razorpay order.
 * 2. Open the Razorpay Checkout modal with that order id.
 * 3. On success, verify the payment signature on the server
 *    and mark the logged-in user as "isPro" in MongoDB.
 */
const PricingAccess = ({ isGray }) => {
  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl text-center">
        <span className={`font-mono text-xs uppercase tracking-widest ${isGray ? "text-cyan-400" : "text-indigo-600"}`}>
          04 / Unlock Access
        </span>
        <h2 className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl ${isGray ? "text-slate-50" : "text-slate-900"}`}>
          Pay once, copy forever
        </h2>
        <p className={`mt-3 text-sm sm:text-base ${isGray ? "text-slate-400" : "text-slate-600"}`}>
          Secure checkout powered by Razorpay. No subscriptions, no hidden fees.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className={`relative rounded-3xl border p-7 ${
              plan.highlighted
                ? isGray
                  ? "border-cyan-700 bg-slate-900 shadow-2xl shadow-cyan-900/30"
                  : "border-indigo-300 bg-white shadow-2xl shadow-indigo-200/60"
                : isGray
                ? "border-slate-800 bg-slate-900/50"
                : "border-slate-200 bg-white"
            }`}
          >
            {plan.highlighted && (
              <span
                className={`absolute -top-3 right-7 rounded-full px-3 py-1 text-xs font-semibold text-white ${
                  isGray
                    ? "bg-gradient-to-r from-cyan-500 to-violet-600"
                    : "bg-gradient-to-r from-indigo-600 to-fuchsia-600"
                }`}
              >
                Most popular
              </span>
            )}

            <h3 className={`text-lg font-semibold ${isGray ? "text-slate-100" : "text-slate-900"}`}>
              {plan.name}
            </h3>
            <p className={`mt-1 text-sm ${isGray ? "text-slate-500" : "text-slate-400"}`}>{plan.note}</p>
            <p className={`mt-4 text-4xl font-extrabold ${isGray ? "text-slate-50" : "text-slate-900"}`}>
              {plan.price}
            </p>

            <ul className="mt-6 space-y-3 text-left">
              {plan.perks.map((perk) => (
                <li key={perk.text} className="flex items-center gap-2.5 text-sm">
                  {perk.included ? (
                    <Check size={16} className={isGray ? "text-emerald-400" : "text-emerald-600"} />
                  ) : (
                    <X size={16} className={isGray ? "text-slate-600" : "text-slate-300"} />
                  )}
                  <span className={perk.included ? (isGray ? "text-slate-300" : "text-slate-600") : (isGray ? "text-slate-600" : "text-slate-400")}>
                    {perk.text}
                  </span>
                </li>
              ))}
            </ul>

            {plan.highlighted ? (
              <button
                className={`mt-7 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 ${
                  isGray
                    ? "bg-gradient-to-r from-cyan-500 to-violet-600"
                    : "bg-gradient-to-r from-indigo-600 to-fuchsia-600"
                }`}
              >
                <CreditCard size={16} />
                Unlock with Razorpay
              </button>
            ) : (
              <a
                href="#features"
                className={`mt-7 flex w-full items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold ${
                  isGray ? "border-slate-700 text-slate-200" : "border-slate-300 text-slate-700"
                }`}
              >
                Keep browsing free
              </a>
            )}
          </motion.div>
        ))}
      </div>

      <p
        className={`mx-auto mt-6 flex max-w-3xl items-center justify-center gap-2 text-center text-xs ${
          isGray ? "text-slate-500" : "text-slate-400"
        }`}
      >
        <ShieldCheck size={14} />
        Payments are verified server-side before access is unlocked — your card details never touch this app.
      </p>
    </section>
  );
};

export default PricingAccess;