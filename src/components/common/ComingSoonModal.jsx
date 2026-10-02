// import { AnimatePresence, motion } from "framer-motion";
// import { useEffect } from "react";

// const ComingSoonModal = ({ show, onClose }) => {
//     useEffect(() => {
//         if (show) {
//             setTimeout(() => {
//                 onClose()
//             }, 3000)
//         }
//     }, [show])
//     return (
//         <AnimatePresence>
//             {show && (
                
//                 <motion.div initial={{ opacity: 0, bottom: 0 }} animate={{ opacity: 1, bottom: 1 }} transition={{ duration: 0.4, delay: 0.2 }} className="absolute inset-0 z-50 bg-gray-400/20 backdrop-blur-sm">
//                 Coming Soon
//             </motion.div>
        
//         )}
//         </AnimatePresence>
//     )
// }

// export default ComingSoonModal;
import { AnimatePresence, motion } from "framer-motion";
import { Clock, X } from "lucide-react";
import { useEffect } from "react";

/**
 * Absolute overlay — sirf parent card ke upar dikhega.
 * Parent me `relative overflow-hidden` hona chahiye (FeatureCard me already hai).
 */
const ComingSoonModal = ({
  show,
  onClose,
  title = "Coming soon",
  description = "This feature is currently under development. It will be available here as soon as it's ready.",
}) => {
  useEffect(() => {
    if (!show) return;
    if(show){
        setTimeout(() => {
            onClose()
        }, 5000);
    }
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show, onClose]);

  const item = {
    hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          initial={{
            y: "100%",
            opacity: 0,
            backdropFilter: "blur(0px)",
            WebkitBackdropFilter: "blur(0px)",
          }}
          animate={{
            y: 0,
            opacity: 1,
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
          exit={{
            y: "100%",
            opacity: 0,
            backdropFilter: "blur(0px)",
            WebkitBackdropFilter: "blur(0px)",
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-(--secondary-bg)/80 p-5 text-center"
        >
          {/* glow */}
          <div className="pointer-events-none absolute -bottom-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-(--accent-color1) opacity-20 blur-3xl" />

          <motion.button
            variants={item}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.25 }}
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 cursor-pointer rounded-lg p-1.5 text-(--secondary-text) transition-colors hover:bg-(--primary-bg) hover:text-(--primary-text)"
          >
            <X size={16} />
          </motion.button>

          <motion.span
            variants={item}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            className="relative flex p-2 items-center justify-center rounded-xl border border-(--primary-border) bg-(--primary-bg) text-(--accent-color1)"
          >
            <Clock size={20} />
          </motion.span>

          <motion.h4
            variants={item}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.22 }}
            className="relative mt-3 text-base font-semibold text-(--primary-text)"
          >
            {title}
          </motion.h4>

          <motion.p
            variants={item}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.29 }}
            className="relative mt-1 max-w-[28ch] text-sm leading-relaxed text-(--secondary-text)"
          >
            {description}
          </motion.p>

          <motion.button
            variants={item}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.36 }}
            onClick={onClose}
            className="relative mt-4 cursor-pointer rounded-lg bg-(--accent-color1) px-4 py-2 text-sm font-semibold text-(--primary-bg) transition-opacity hover:opacity-90"
          >
            Got it
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ComingSoonModal;