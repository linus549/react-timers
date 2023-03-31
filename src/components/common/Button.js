import { forwardRef } from "react";

const Button = forwardRef(
  ({ type, variant, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type || "button"}
        className={
          (className || "") + (variant ? ` btn btn--${variant}` : " btn")
        }
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
