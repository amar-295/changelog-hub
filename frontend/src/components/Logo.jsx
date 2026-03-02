import React from "react";
import PropTypes from "prop-types";

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

Logo.propTypes = {
  width: PropTypes.string,
  className: PropTypes.string,
};

export default Logo;
