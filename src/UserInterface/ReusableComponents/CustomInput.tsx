import { cva, VariantProps } from "cva";
import { cn } from "../../CN";
import React from "react";

const inputStyles = cva(
  "flex w-full justify-between h-9 py-1 px-3 rounded-md text-base file:bg-gold-500 file:border-0 file-mr-4 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 overflow-clip text-text-color-800 ",
  {
    variants: {
      variant: {
        primary:
          "bg-gold-200 file:bg-gold-500 file:text-text-color-200 border border-gold-200 text-text-color-800 focus:ring-gold-800 focus:border-gold-800 accent-gold-500",
        secondary:
          "bg-secondary-blue-200 file:bg-secondary-blue-500 file:text-text-color-200 border border-secondary-blue-200 text-text-color-800 focus:ring-secondary-blue-800 focus:border-secondaryBlue-800 accent-secondary-blue-500",
        accent:
          "bg-rose-gold-200 file:bg-rose-gold-500 file:text-text-color-200 border-rose-gold-200 text-text-color-800 focus:ring-rose-gold-800 focus:border-rose-gold-800 accent-rose-gold-500",
        transparent:
          "bg-transparent focus:ring-text-color-500 focus:border-text-color-500",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputStyles> {}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ variant, className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputStyles({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

export default CustomInput;
