import { createContext, useContext, useEffect, useState } from "react";

const ToastContext = createContext();

const positions = {
  "top-left": {
    position: "top-5 left-5",
    show: "translate-x-0 translate-y-0 opacity-100",
    hide: "-translate-x-full opacity-0",
  },

  "top-center": {
    position: "top-5 left-1/2 -translate-x-1/2",
    show: "-translate-x-1/2 translate-y-0 opacity-100",
    hide: "-translate-x-1/2 -translate-y-full opacity-0",
  },

  "top-right": {
    position: "top-5 right-5",
    show: "translate-x-0 translate-y-0 opacity-100",
    hide: "translate-x-full opacity-0",
  },

  "bottom-left": {
    position: "bottom-5 left-5",
    show: "translate-x-0 translate-y-0 opacity-100",
    hide: "-translate-x-full opacity-0",
  },

  "bottom-center": {
    position: "bottom-5 left-1/2 -translate-x-1/2",
    show: "-translate-x-1/2 translate-y-0 opacity-100",
    hide: "-translate-x-1/2 translate-y-full opacity-0",
  },

  "bottom-right": {
    position: "bottom-5 right-5",
    show: "translate-x-0 translate-y-0 opacity-100",
    hide: "translate-x-full opacity-0",
  },
};

const toastStyles = {
  success: {
    icon: "✅",
    title: "Success",
    accent: "bg-green-100 text-green-600",
  },
  error: {
    icon: "❌",
    title: "Error",
    accent: "bg-red-100 text-red-600",
  },
  warning: {
    icon: "⚠️",
    title: "Warning",
    accent: "bg-yellow-100 text-yellow-600",
  },
  info: {
    icon: "ℹ️",
    title: "Information",
    accent: "bg-blue-100 text-blue-600",
  },
};

const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const [visible, setVisible] = useState(false);

  // Store the incoming toast + flip visible to true on the next frame
  // so the browser paints the "hide" position first, then transitions
  // to "show". Setting both in one render would skip the animation.
  //
  // `id` is stamped on every new toast and used as a React `key` below.
  // Without it, a new toast reuses the same DOM node as the previous
  // one, so the CSS transition interpolates the transform from the
  // OLD corner's hidden position to the NEW corner's shown position —
  // which is why it looked like it was "coming from center". A fresh
  // key forces a fresh node that starts at the correct hidden spot.
  const showToast = (data) => {
    setToast({ ...data, id: Date.now() });
    setVisible(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
  };
  //  requestAnimationFrame() waits until the browser's next paint before running your code.
  // Using it twice guarantees the hidden state is rendered first, allowing CSS transitions to animate smoothly to the visible state.

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  // Only clear the toast data once the exit transition has actually
  // finished. This is the key fix: previously `toast` was set to null
  // immediately, which made `config` fall back to "top-center" mid
  // animation, so every toast appeared to exit from the center instead
  // of its own corner.
  const handleTransitionEnd = () => {
    if (!visible) setToast(null);
  };

  const config = positions[toast?.position || "top-center"];
  const style = toastStyles[toast?.type || "info"];
  return (
    <>
      <div
        key={toast?.id || "empty"}
        onTransitionEnd={handleTransitionEnd}
        className={`fixed z-50 transition-all duration-300
          ${config.position}
          ${visible ? config.show : config.hide}
        `}
      >
        {toast && (
          <div className="min-w-[320px] max-w-md rounded-xl border border-gray-200 bg-white shadow-2xl px-5 py-4 flex gap-3">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center text-xl ${style.accent}`}
            >
              {style.icon}
            </div>

            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">
                {toast.title || style.title}
              </h4>

              <p className="mt-1 text-sm text-gray-600">{toast.message}</p>
            </div>
          </div>
        )}
      </div>
      <ToastContext.Provider value={{ setToast: showToast }}>
        {children}
      </ToastContext.Provider>
    </>
  );
};

const buttons = [
  ["Top Left", "top-left","success"],
  ["Top Center", "top-center","success"],
  ["Top Right", "top-right","error"],
  ["Bottom Left", "bottom-left","warning"],
  ["Bottom Center", "bottom-center","info"],
  ["Bottom Right", "bottom-right","error"],
];


// Now anywhere this toast as in this page 
const WorkPage = () => {
  const { setToast } = useContext(ToastContext);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl border p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Toast Notification
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Click any button to preview a toast position.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {buttons.map(([label, position,type]) => (
            <button
              key={position}
              onClick={() =>
                setToast({
                  type: type,
                  message: `Toast shown at ${label}`,
                  position,
                })
              }
              className="rounded-xl bg-slate-900 text-white py-3 font-medium transition-all duration-200 hover:bg-slate-800 hover:-translate-y-1 active:translate-y-0 active:scale-95 shadow-lg"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ToastNotificationPage = () => {
  return (
    <ToastProvider>
      <WorkPage />
    </ToastProvider>
  );
};

export default ToastNotificationPage;