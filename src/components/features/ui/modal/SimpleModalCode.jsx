import { useState } from "react";

const Modal = ({ visible = false, onClose = () => {} }) => {
  if (!visible) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-5"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-xl bg-white shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold">User Details</h2>

          <button
            onClick={onClose}
            className="text-2xl leading-none text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 p-6">
          <p className="mx-auto h-10 w-10 text-xl font-bold text-white bg-amber-400 flex items-center justify-center rounded-full">
            J
          </p>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Name</span>
              <span>John Doe</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Email</span>
              <span>john@example.com</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Role</span>
              <span>Frontend Developer</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Location</span>
              <span>New York, USA</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t bg-gray-50 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const ModalPage = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">Simple React Modal Example</h1>

      <button
        className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        onClick={() => setShow(true)}
      >
        Open Modal
      </button>

      <Modal visible={show} onClose={() => setShow(false)} />
    </div>
  );
};

export default ModalPage;