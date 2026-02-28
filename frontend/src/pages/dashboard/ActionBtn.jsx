import React from "react";
import { Plus } from "lucide-react";

function ActionBtn() {
  return (
    <button
      className="fixed bottom-10 right-10 flex items-center gap-3 text-white px-6 py-4 rounded-full hover:scale-105 active:scale-95 transition-all z-20 font-black tracking-tight"
      style={{
        backgroundColor: "var(--color-primary-dark)",
        boxShadow: "0 15px 40px rgba(99, 102, 241, 0.35)",
      }}
    >
      <Plus size={24} strokeWidth={2.5} />
      <span>CREATE UPDATE</span>
    </button>
  );
}

export default ActionBtn;
