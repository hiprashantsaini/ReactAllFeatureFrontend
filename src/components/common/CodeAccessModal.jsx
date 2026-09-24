import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Lock, ShieldCheck, X, Zap } from "lucide-react";
import { useState } from "react";
import { RAZOR_PAY_TEST_KEY } from "../../../config";
import api from "../../utilities/axiosInstance";

const plans = [
  {
    id: "single",
    name: "This Feature Only",
    price: "₹9",
    amount: 900,
    desc: "Unlock just this page's code",
    perks: ["Full source code", "Both code versions shown below", "Copy & download"],
  },
  {
    id: "pro",
    name: "Pro Access",
    price: "₹499",
    amount: 49900,
    desc: "Unlock every feature, forever",
    perks: ["Everything in single", "All 50+ current pages", "All future pages, free"],
    highlighted: true,
  },
];

/**
 * CodeAccessModal
 * Shown when the user clicks "Get Code" on any feature page.
 * Selecting a plan currently just simulates a short "processing" delay
 * and then unlocks the code block — swap `handleChoose` for a real
 * Razorpay order + verify flow when you wire up payments.
 */
const CodeAccessModal = ({ open, onClose, isGray, featureName, onSelectPlan }) => {
  const [loadingPlan, setLoadingPlan] = useState(null);

  // const handleChoose = (planId) => {
  //   if (loadingPlan) return;
  //   setLoadingPlan(planId);
  //   // 🔧 Replace this timeout with a real Razorpay checkout call later:
  //   // 1. POST /api/payment/order  -> get order id
  //   // 2. open Razorpay checkout with that order id
  //   // 3. on success, POST /api/payment/verify -> mark user unlocked
  //   setTimeout(() => {
  //     setLoadingPlan(null);
  //     onSelectPlan(planId);
  //     onClose();
  //   }, 1300);
  // };

  //display razorpay
  // const handlePayment = async (plan) => {
  //   try {
  //     const payload = {
  //       plan: plan.id,
  //       amount: plan.amount,
  //       featureId: plan.id === 'single' ? plan.featureId : null,
  //     }

  //     const response = await api.post("/subscription/create-order", payload)

  //     const order = response.data.order;

  //     console.log("Order of create order :", order);

  //     // Open Razorpay Checkout
  //     const options = {
  //       key: RAZOR_PAY_TEST_KEY, // Replace with your Razorpay key_id
  //       amount: order.amount, // Amount is in currency subunits.
  //       currency: order.currency,
  //       name: 'React All Features',
  //       description: 'Test Transaction',
  //       order_id: order.id, // This is the order_id created in the backend
  //       handler: async function (response) {
  //         const data = {
  //           orderCreationId: order.id,
  //           razorpayPaymentId: response.razorpay_payment_id,
  //           razorpayOrderId: response.razorpay_order_id,
  //           razorpaySignature: response.razorpay_signature,
  //           plan: order,
  //         };
  //         const result = await api.post("/subscription/verify-payment", data);
  //         console.log("result verify payment:", result)
  //       },
  //       prefill: {
  //         name: '<name>',
  //         email: '<email>',
  //         contact: '9999999999'
  //       },
  //       theme: {
  //         color: '#F37254'
  //       },
  //     };

  //     const rzp = new window.Razorpay(options);
  //     // 👇 add this — you're currently flying blind on errors
  //     rzp.on("payment.failed", function (response) {
  //       console.log("Payment failed:", response.error);
  //     });
  //     rzp.open();
  //   } catch (error) {
  //     console.log("handlePayment error :", error);
  //   }
  // }

      function loadScript(src){
        return new Promise((resolve)=>{
            const script=document.createElement("script");
            script.src=src;
            script.onload=()=>{
                resolve(true);
            };
            script.onerror=()=>{
                resolve(false);
            };
            document.body.appendChild(script);     
        });
    };

  const handlePayment = async (plan) => {
  try {
    const payload = {
      plan: plan.id,
      amount: plan.amount,
      featureId: plan.id === 'single' ? plan.featureId : null,
    };

            const res=await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if(!res){
            console.error(`Verify error :${res}`);
            return;
        }

    const response = await api.post("/subscription/create-order", payload);
    const order = response.data.order;

    console.log("✅ Order created:", order);
    console.log("✅ Key being used:", RAZOR_PAY_TEST_KEY);

    if (!order.id) {
      console.error("❌ order.id is missing!", order);
      return;
    }

    if (!RAZOR_PAY_TEST_KEY) {
      console.error("❌ Razorpay key is undefined!");
      return;
    }

    const options = {
      key: RAZOR_PAY_TEST_KEY,
      amount: order.amount,
      currency: order.currency,
      name: 'React All Features',
      description: 'Test Transaction',
      order_id: order.id,
      handler: async function (response) {
        console.log("✅ Payment success response:", response);
        const result = await api.post("/subscription/verify-payment", {
          orderCreationId: order.id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          plan: plan.id,
        });
        console.log("✅ Verify result:", result);
      },
      modal: {
        ondismiss: function () {
          console.log("⚠️ Razorpay modal was closed by user");
        },
        escape: false,
        confirm_close: true,
      },
      prefill: {
        name: 'Test User',
        email: 'test@gmail.com',
        contact: '9999999999',
      },
      theme: { color: '#F37254' },
    };

    console.log("✅ Razorpay options:", options);
    console.log("✅ Razorpay options:", options);

// 👇 add these two lines right after
console.log("window.Razorpay:", window.Razorpay);
console.log("typeof window.Razorpay:", typeof window.Razorpay);

    if (!window.Razorpay) {
      console.error("❌ window.Razorpay is not loaded! Check your script tag.");
      return;
    }

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      console.error("❌ Payment failed:");
      console.error("Code:", response.error.code);
      console.error("Description:", response.error.description);
      console.error("Reason:", response.error.reason);
      console.error("Full error:", response.error);
    });

    rzp.open();

  } catch (error) {
    console.error("❌ handlePayment crashed:", error);
  }
};
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => !loadingPlan && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-lg rounded-3xl border p-6 sm:p-8 ${isGray ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"
              }`}
          >
            <button
              onClick={onClose}
              disabled={!!loadingPlan}
              className={`absolute right-4 top-4 rounded-full p-1.5 ${isGray ? "text-slate-500 hover:bg-slate-800" : "text-slate-400 hover:bg-slate-100"
                }`}
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${isGray
                  ? "bg-gradient-to-br from-cyan-500/20 to-violet-600/20 text-cyan-300"
                  : "bg-gradient-to-br from-indigo-100 to-fuchsia-100 text-indigo-600"
                  }`}
              >
                <Lock size={16} />
              </span>
              <div>
                <h3 className={`text-lg font-bold ${isGray ? "text-slate-50" : "text-slate-900"}`}>
                  Unlock {featureName} code
                </h3>
                <p className={`text-xs ${isGray ? "text-slate-500" : "text-slate-400"}`}>
                  Pick a plan to reveal the full source below
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-2xl border p-5 ${plan.highlighted
                    ? isGray
                      ? "border-cyan-700 bg-slate-950"
                      : "border-indigo-300 bg-indigo-50/40"
                    : isGray
                      ? "border-slate-800"
                      : "border-slate-200"
                    }`}
                >
                  {plan.highlighted && (
                    <span
                      className={`absolute -top-2.5 right-4 flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-white ${isGray
                        ? "bg-gradient-to-r from-cyan-500 to-violet-600"
                        : "bg-gradient-to-r from-indigo-600 to-fuchsia-600"
                        }`}
                    >
                      <Zap size={10} /> BEST VALUE
                    </span>
                  )}
                  <p className={`text-sm font-semibold ${isGray ? "text-slate-100" : "text-slate-900"}`}>
                    {plan.name}
                  </p>
                  <p className={`mt-0.5 text-xs ${isGray ? "text-slate-500" : "text-slate-400"}`}>{plan.desc}</p>
                  <p className={`mt-3 text-2xl font-extrabold ${isGray ? "text-slate-50" : "text-slate-900"}`}>
                    {plan.price}
                  </p>

                  <ul className="mt-3 space-y-1.5">
                    {plan.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-1.5 text-xs">
                        <Check size={13} className={`mt-0.5 ${isGray ? "text-emerald-400" : "text-emerald-600"}`} />
                        <span className={isGray ? "text-slate-400" : "text-slate-600"}>{perk}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    // onClick={() => handleChoose(plan.id)}
                    onClick={() => handlePayment({ ...plan, featureId: 'image-carousel' })}
                    disabled={!!loadingPlan}
                    className={`mt-5 flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03] disabled:opacity-70 ${plan.highlighted
                      ? isGray
                        ? "bg-gradient-to-r from-cyan-500 to-violet-600"
                        : "bg-gradient-to-r from-indigo-600 to-fuchsia-600"
                      : isGray
                        ? "bg-slate-800"
                        : "bg-slate-800"
                      }`}
                  >
                    {loadingPlan === plan.id ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Choose this plan"
                    )}
                  </button>
                </div>
              ))}
            </div>

            <p
              className={`mt-5 flex items-center justify-center gap-1.5 text-center text-[11px] ${isGray ? "text-slate-500" : "text-slate-400"
                }`}
            >
              <ShieldCheck size={12} />
              Demo only — Razorpay checkout will be connected here later.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CodeAccessModal;