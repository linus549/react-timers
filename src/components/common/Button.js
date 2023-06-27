import { forwardRef } from "react";

const Button = forwardRef(
  ({ type, variant, className: propsClassName, children, ...props }, ref) => {
    let className = "btn";

    if (variant) {
      className += ` btn--${variant}`;
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    return (
      <button
        ref={ref}
        type={type ?? "button"}
        className={className}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
