import { X } from "lucide-react";
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

const toastStyles = {
  success: {
    icon: "✅",
    title: "Success",
    titleColor: isGray ? "text-gray-100" : "text-green-700",
    messageColor: isGray ? "text-gray-300" : "text-green-600",
    accent: isGray
      ? "bg-gray-700 text-gray-100"
      : "bg-green-100 text-green-600",
  },

  error: {
    icon: "❌",
    title: "Error",
    titleColor: isGray ? "text-gray-100" : "text-red-700",
    messageColor: isGray ? "text-gray-300" : "text-red-600",
    accent: isGray
      ? "bg-gray-700 text-gray-100"
      : "bg-red-100 text-red-600",
  },

  warning: {
    icon: "⚠️",
    title: "Warning",
    titleColor: isGray ? "text-gray-100" : "text-yellow-700",
    messageColor: isGray ? "text-gray-300" : "text-yellow-600",
    accent: isGray
      ? "bg-gray-700 text-gray-100"
      : "bg-yellow-100 text-yellow-600",
  },

  info: {
    icon: "ℹ️",
    title: "Information",
    titleColor: isGray ? "text-gray-100" : "text-blue-700",
    messageColor: isGray ? "text-gray-300" : "text-blue-600",
    accent: isGray
      ? "bg-gray-700 text-gray-100"
      : "bg-blue-100 text-blue-600",
  },
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
    const style = toastStyles[toast?.type || "info"];
    return (
        <>
            <div
                key={toast?.id || "empty"}
                onTransitionEnd={handleTransitionEnd}
                className={`fixed z-[9999] transition-all duration-300
          ${config.position}
          ${visible ? config.show : config.hide}
        `}
            >
                {toast && (
                    <div className={`min-w-[320px] max-w-md rounded-xl shadow-2xl px-5 py-4 flex gap-3 ${style.accent}`}>
                        <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center text-xl ${style.accent}`}
                        >
                            {style.icon}
                        </div>

                        <div className="flex-1">
                            <h4 className={`font-semibold ${style.titleColor}`}>
                                {toast.title || style.title}
                            </h4>

                            <p className={`mt-1 text-sm ${style.messageColor}`}>
                                {toast.message}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => {setVisible(false);setToast(null);}}
                            className={`ml-2 cursor-pointer rounded-full h-6 w-6 flex items-center justify-center text-sm font-semibold transition border hover:bg-white/15 ${isGray ? 'text-gray-100' : 'text-slate-900'}`}
                            aria-label="Close notification"
                        >
                            <X className="h-4 w-4" />
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