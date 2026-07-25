import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";
import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../src/utilities/axiosInstance";

export const ToastContext = createContext();

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

const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null);
    const [visible, setVisible] = useState(false);
    const isGray = useSelector((state) => state.user.isGray);
    const dispatch = useDispatch();

    const getUserData=async()=>{
        try{
          const res=await api.get("/auth/me",{widthCredentials:true});
          if(res.data){
            dispatch({type:"user/setUserData",payload:res.data.user});
          }
        }catch(error){
            console.error("Error fetching user data:", error);
        }
    }

    useEffect(()=>{
    getUserData();
    },[])

    console.log("isGray in ToastProvider:", isGray); // Debugging line to check the value of isGray

// const toastStyles = {
//   success: {
//     icon: "✅",
//     title: "Success",
//     titleColor: isGray ? "text-gray-100" : "text-green-700",
//     messageColor: isGray ? "text-gray-300" : "text-green-600",
//     accent: isGray
//       ? "bg-gray-700 text-gray-100"
//       : "bg-green-100 text-green-600",
//   },

//   error: {
//     icon: "❌",
//     title: "Error",
//     titleColor: isGray ? "text-gray-100" : "text-red-700",
//     messageColor: isGray ? "text-gray-300" : "text-red-600",
//     accent: isGray
//       ? "bg-gray-700 text-gray-100"
//       : "bg-red-100 text-red-600",
//   },

//   warning: {
//     icon: "⚠️",
//     title: "Warning",
//     titleColor: isGray ? "text-gray-100" : "text-yellow-700",
//     messageColor: isGray ? "text-gray-300" : "text-yellow-600",
//     accent: isGray
//       ? "bg-gray-700 text-gray-100"
//       : "bg-yellow-100 text-yellow-600",
//   },

//   info: {
//     icon: "ℹ️",
//     title: "Information",
//     titleColor: isGray ? "text-gray-100" : "text-blue-700",
//     messageColor: isGray ? "text-gray-300" : "text-blue-600",
//     accent: isGray
//       ? "bg-gray-700 text-gray-100"
//       : "bg-blue-100 text-blue-600",
//   },
// };


const toastStyles = {
  success: { icon: CheckCircle2,    darkAccent: "bg-emerald-500/15 text-emerald-400", lightAccent: "bg-emerald-50 text-emerald-600",  title: "Success"     },
  error:   { icon: XCircle,         darkAccent: "bg-red-500/15 text-red-400",         lightAccent: "bg-red-50 text-red-600",           title: "Error"       },
  warning: { icon: AlertTriangle,   darkAccent: "bg-amber-500/15 text-amber-400",     lightAccent: "bg-amber-50 text-amber-600",       title: "Warning"     },
  info:    { icon: Info,            darkAccent: "bg-cyan-500/15 text-cyan-400",       lightAccent: "bg-indigo-50 text-indigo-600",     title: "Information" },
};
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

    const handleTransitionEnd = () => {
        if (!visible) setToast(null);
    };

    const config = positions[toast?.position || "top-center"];
    // const style = toastStyles[toast?.type || "info"];
    const style  = toastStyles[toast?.type   || "info"];
    const Icon   = style?.icon;
    return (
        <>
      <div
        key={toast?.id || "empty"}
        onTransitionEnd={handleTransitionEnd}
        className={`fixed z-[200] transition-all duration-300 ${config.position} ${visible ? config.show : config.hide}`}
      >
        {toast && (
          <div
            className={`flex min-w-[300px] max-w-sm items-start gap-3 rounded-2xl border p-4 shadow-2xl ${
              isGray
                ? "border-slate-700 bg-slate-900"
                : "border-slate-200 bg-white"
            }`}
          >
            {/* icon */}
            <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${isGray ? style.darkAccent : style.lightAccent}`}>
              {Icon && <Icon size={17} />}
            </span>

            {/* text */}
            <div className="flex-1 pt-0.5">
              <p className={`text-sm font-semibold ${isGray ? "text-slate-100" : "text-slate-900"}`}>
                {toast.title || style.title}
              </p>
              <p className={`mt-0.5 text-xs leading-relaxed ${isGray ? "text-slate-400" : "text-slate-500"}`}>
                {toast.message}
              </p>
            </div>

            {/* close */}
            <button
              onClick={() => setVisible(false)}
              className={`flex-shrink-0 rounded-lg p-1 transition-colors ${isGray ? "text-slate-500 hover:bg-slate-800 hover:text-slate-300" : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"}`}
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>
            <ToastContext.Provider value={{ setToast: showToast }}>
                {children}
            </ToastContext.Provider>
        </>
    );
};

export default ToastProvider;