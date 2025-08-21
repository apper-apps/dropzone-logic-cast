import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({
  className,
  variant = "primary",
  size = "md",
  children,
  disabled = false,
  ...props
}, ref) => {
  const variants = {
    primary: "btn-primary text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed",
    success: "btn-success text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed",
    secondary: "bg-surface hover:bg-surface/80 text-slate-300 hover:text-white border border-slate-600 hover:border-slate-500",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-slate-400 hover:text-white hover:bg-surface/50",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={cn(
        "font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/30 hover:scale-105 disabled:hover:scale-100",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;