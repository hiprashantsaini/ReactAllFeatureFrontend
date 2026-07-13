//npm install framer-motion   ///for smooth animations

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const modalVariants = {
  scale: {
    hidden: { opacity: 0, scale: 0.7 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.7 },
  },

  slideUp: {
    hidden: { opacity: 0, y: 150 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 150 },
  },

  slideDown: {
    hidden: { opacity: 0, y: -150 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -150 },
  },

  slideLeft: {
    hidden: { opacity: 0, x: -250 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -250 },
  },

  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  },
};

function Modal({
  visible,
  onClose,
  title,
  children,
  variant = "scale",
}) {
  useEffect(() => {
    if (!visible) return;

    document.body.style.overflow = "hidden";
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-5"
        >
          <motion.div
            variants={modalVariants[variant]}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-xl font-bold">{title}</h2>

              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 p-6">
              {children}
            </div>

            <div className="flex justify-end gap-3 border-t p-4">
              <button
                onClick={onClose}
                className="rounded-lg border px-5 py-2 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={onClose}
                className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
              >
                Continue
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const ModalPage = () => {
  const [modal, setModal] = useState({
    open: false,
    variant: "scale",
  });

  const openModal = (variant) => {
    setModal({
      open: true,
      variant,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="mb-8 text-4xl font-bold">
        Framer Motion Modal Variants
      </h1>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => openModal("scale")}
          className="rounded bg-blue-600 px-5 py-3 text-white"
        >
          Scale Modal
        </button>

        <button
          onClick={() => openModal("slideUp")}
          className="rounded bg-green-600 px-5 py-3 text-white"
        >
          Slide Up
        </button>

        <button
          onClick={() => openModal("slideDown")}
          className="rounded bg-purple-600 px-5 py-3 text-white"
        >
          Slide Down
        </button>

        <button
          onClick={() => openModal("slideLeft")}
          className="rounded bg-orange-600 px-5 py-3 text-white"
        >
          Slide Left
        </button>

        <button
          onClick={() => openModal("fade")}
          className="rounded bg-red-600 px-5 py-3 text-white"
        >
          Fade
        </button>
      </div>

      <Modal
        visible={modal.open}
        variant={modal.variant}
        title="Production Ready Modal"
        onClose={() =>
          setModal({
            ...modal,
            open: false,
          })
        }
      >

        {/* Write here your own code  */}
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Exercitationem, consequatur.
        </p>

        <p className="text-gray-700">
          This modal demonstrates reusable animations using Framer Motion.
        </p>

        <div className="rounded-lg bg-gray-100 p-4">
          <h3 className="font-semibold">Dummy User</h3>

          <p>Name: John Doe</p>

          <p>Email: john@example.com</p>

          <p>Role: Frontend Developer</p>
        </div>
      </Modal>
    </div>
  );
}

export default ModalPage;
