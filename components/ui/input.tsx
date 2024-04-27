import * as React from "react";
import { cn } from "@/lib/utils";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isPassword?: boolean;
  showPasswordIcon?: boolean;
  isDisabled?: boolean;
  variant?: "underline"; // New variant option
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      isPassword,
      showPasswordIcon,
      isDisabled,
      variant,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const inputType = isPassword
      ? showPassword
        ? "text"
        : "password"
      : type || "text";

    // Define classes based on the variant
    const inputClasses = cn(
      "flex h-10 w-full bg-white px-3 py-2 text-sm focus:outline-none",
      {
        "border-b border-primary bg-transparent placeholder:text-[#7A7676]":
          variant === "underline", // Apply bottom border if specified
      },
      className
    );

    return (
      <div className="relative">
        <input
          ref={ref}
          type={isPassword ? inputType : type}
          className={inputClasses}
          disabled={isDisabled}
          {...props}
        />
        {isPassword && showPasswordIcon && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 px-2 flex items-center focus:outline-none"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
