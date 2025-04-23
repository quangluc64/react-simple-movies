import React from "react";
const Button = ({className, onClick, children, bgColor}) => {
  let bgClass = "bg-primary";
  switch (bgColor) {
    case "primary":
      bgClass = "bg-primary";
      break;
    case "secondary":
      bgClass = "bg-secondary";
      break;
    default:
  }
  return (
    <button
      className={`w-full px-6 py-3 rounded-lg font-bold text-xl mt-auto ${bgClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
