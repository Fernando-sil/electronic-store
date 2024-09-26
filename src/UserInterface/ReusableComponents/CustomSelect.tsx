import { cva, VariantProps } from "cva";
import React from "react";
import { cn } from "../../CN";

const selectStyles = cva("rounded-lg block w-full p-2 appearance-none border", {
  variants: {
    variant: {
      primary:
        "bg-gold-200 border-gold-200 text-text-color-800 focus:ring-gold-800 focus:border-gold-800",
      secondary:
        "bg-secondary-blue-200 border-secondary-blue-200 text-text-color-800 focus:ring-secondary-blue-800 focus:border-secondaryBlue-800",
      accent:
        "bg-rose-gold-200 border-rose-gold-200 text-text-color-800 focus:ring-rose-gold-800 focus:border-rose-gold-800",
      transparent:
        "bg-transparent border focus:ring-text-color-500 focus:border-text-color-500",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export interface CustomSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectStyles> {}

const CustomSelect = React.forwardRef<HTMLSelectElement, CustomSelectProps>(
  ({ variant, className, ...props }, ref) => {
    return (
      <select
        className={cn(selectStyles({ variant }), className)}
        ref={ref}
        {...props}
      ></select>
    );
  }
);

export default CustomSelect;
