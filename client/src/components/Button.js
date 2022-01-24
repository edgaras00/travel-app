import React from "react";
import "../styles/button.css";

const Button = ({ size, text, handleClick, disabled, className }) => {
  const buttonClass = `button-${size}`;
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`button-component ${buttonClass} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
