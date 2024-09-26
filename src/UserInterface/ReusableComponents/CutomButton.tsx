import { cva, VariantProps } from "cva";
import { cn } from "../../CN";
import React from "react";

const buttonStyles = cva(
  "rounded-md flex items-center gap-4 justify-center py-3 px-6 transition-colors disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        small: "w-24",
        medium: "w-32",
        large: "w-40",
        variable: "w-auto",
        full: "w-full",
      },
      buttonColor: {
        primary:
          "bg-gold-500 text-text-color-900 hover:bg-gold-300 active:bg-gold-500",
        secondary:
          "bg-secondary-blue-500 hover:bg-secondary-blue-700 active:bg-secondary-blue-500",
        accent:
          "bg-rose-gold-500 hover:bg-rose-gold-700 active:bg-rose-gold-500 text-text-color-300",
      },
    },
    defaultVariants: {
      size: "full",
      buttonColor: "primary",
    },
  }
);

export interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, size, buttonColor, ...props }, ref) => {
    return (
      <button
        className={cn(buttonStyles({ size, buttonColor }), className)}
        ref={ref}
        {...props}
      ></button>
    );
  }
);

export { CustomButton };
