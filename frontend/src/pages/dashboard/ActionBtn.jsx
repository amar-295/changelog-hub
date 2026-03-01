import React from "react";
import { Plus } from "lucide-react";

function ActionBtn() {
  return (
    <button
      className="fixed bottom-8 right-8 flex items-center gap-2 text-white px-4 py-2.5 rounded-lg hover:opacity-90 active:scale-95 transition-all z-20 font-semibold text-sm shadow-lg cursor-pointer"
      style={{
        backgroundColor: "var(--color-primary)",
      }}
    >
      <Plus size={18} strokeWidth={2} />
      <span>New Release</span>
    </button>
  );
}

export default ActionBtn;
