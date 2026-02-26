import React from "react";

function Logo({ width = "100px", className = "" }) {
  return (
    <div className={className} style={{ width }}>
      <img
        src="/icon.svg"
        alt="Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
}

export default Logo;
