import { useState } from "react";
import { X, User, Mail, Briefcase, MapPin, Save } from "lucide-react";

const SimpleModal = ({ visible = false, onClose = () => {}, isGray }) => {
  if (!visible) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-md overflow-hidden rounded-2xl border shadow-2xl ${
          isGray ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"
        }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between border-b px-6 py-4 ${isGray ? "border-slate-800" : "border-slate-100"}`}>
          <h2 className={`text-lg font-bold ${isGray ? "text-slate-50" : "text-slate-900"}`}>
            User Details
          </h2>
          <button
            onClick={onClose}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
              isGray ? "text-slate-400 hover:bg-slate-800 hover:text-slate-100" : "text-slate-400 hover:bg-slate-100 hover:text-slate-800"
            }`}
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5 p-6">
          <div className="flex justify-center">
            <span className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold text-white ${
              isGray ? "bg-gradient-to-br from-cyan-500 to-violet-600" : "bg-gradient-to-br from-indigo-600 to-fuchsia-600"
            }`}>
              J
            </span>
          </div>

          <div className={`space-y-3 rounded-xl border p-4 ${isGray ? "border-slate-800 bg-slate-950/50" : "border-slate-100 bg-slate-50"}`}>
            {[
              { icon: User,     label: "Name",     value: "John Doe" },
              { icon: Mail,     label: "Email",    value: "john@example.com" },
              { icon: Briefcase,label: "Role",     value: "Frontend Developer" },
              { icon: MapPin,   label: "Location", value: "New York, USA" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center justify-between gap-4">
                <span className={`flex items-center gap-1.5 text-sm ${isGray ? "text-slate-500" : "text-slate-400"}`}>
                  <Icon size={13} /> {label}
                </span>
                <span className={`text-sm font-medium ${isGray ? "text-slate-200" : "text-slate-800"}`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={`flex justify-end gap-3 border-t px-6 py-4 ${isGray ? "border-slate-800 bg-slate-950/40" : "border-slate-100 bg-slate-50"}`}>
          <button
            onClick={onClose}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              isGray ? "border-slate-700 text-slate-300 hover:bg-slate-800" : "border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 ${
              isGray ? "bg-gradient-to-r from-cyan-500 to-violet-600" : "bg-gradient-to-r from-indigo-600 to-fuchsia-600"
            }`}
          >
            <Save size={14} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const SimpleModalDemo = ({ isGray }) => {
  const [show, setShow] = useState(false);

  return (
    <div className={`flex min-h-40 items-center justify-center rounded-2xl border ${
      isGray ? "border-slate-800 bg-slate-900/40" : "border-slate-200 bg-slate-50"
    }`}>
      <button
        onClick={() => setShow(true)}
        className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 ${
          isGray ? "bg-gradient-to-r from-cyan-500 to-violet-600" : "bg-gradient-to-r from-indigo-600 to-fuchsia-600"
        }`}
      >
        Open Modal
      </button>

      <SimpleModal visible={show} onClose={() => setShow(false)} isGray={isGray} />
    </div>
  );
};

export default SimpleModalDemo;