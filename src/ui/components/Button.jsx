import { useState } from 'react';

const Button = ({
  children,
  variant = "primary",     
  size = "md",
  type = "button",
  disabled = false,
  isLoading = false,
  fullWidth = false,
  className = "",
  onClick,
  ...props
}) => {
  const baseStyles = "font-medium rounded-lg focus:outline-none transition-all active:scale-95 flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
    outline: "border border-gray-300 hover:bg-gray-100 text-gray-700",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const buttonClasses = `
    ${baseStyles}
    ${variants[variant] || variants.primary}
    ${sizes[size] || sizes.md}
    ${fullWidth ? "w-full" : ""}
    ${disabled || isLoading ? "opacity-60 cursor-not-allowed" : ""}
    ${className}
  `;

  return (
    <button
      type={type}
      className={buttonClasses.trim()}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading && (
        <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
      )}
      {children}
    </button>
  );
};

export default Button;