import React from "react";
import { CheckCircle2, Trash2 } from "lucide-react";

const ToastNotification = ({ toast }) => (
  <div
    className={`fixed bottom-6 right-6 flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl border transition-all duration-300 transform ${
      toast.show ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
    } ${toast.type === "error" ? "bg-red-50 text-red-700 border-red-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"} z-50`}
  >
    {toast.type === "error" ? <Trash2 className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
    <span className="font-semibold text-sm">{toast.message}</span>
  </div>
);

export default ToastNotification;

