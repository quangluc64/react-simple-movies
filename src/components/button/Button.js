import React from "react";
const Button = ({className="", onClick, children, bgColor, full = false, ...props}) => {
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
      className={`${full ? "w-full" : "w-auto"} px-6 py-3 rounded-lg font-bold text-xl mt-auto ${bgClass} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
