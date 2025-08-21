import React from "react";
import { cn } from "@/utils/cn";

const Card = React.forwardRef(({
  className,
  children,
  hover = true,
  ...props
}, ref) => {
  return (
    <div
      className={cn(
        "bg-surface/60 border border-slate-600/50 rounded-xl glass-subtle shadow-lg",
        hover && "card-hover cursor-pointer",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;