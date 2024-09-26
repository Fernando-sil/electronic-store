import { cva, VariantProps } from "cva";
import { cn } from "../../CN";
import React from "react";

const textAreaStyles = cva(
  "flex w-full justify-between h-9 py-1 px-3 rounded-md text-base file:bg-gold-500 file:border-0 file-mr-4 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 overflow-y-auto text-text-color-800",
  {
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
      size: {
        short: "min-h-[10rem]",
        medium: "min-h-[20rem]",
        large: "min-h-[40rem]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "short",
    },
  }
);

export interface CustomTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textAreaStyles> {}

const CustomTextArea = React.forwardRef<
  HTMLTextAreaElement,
  CustomTextAreaProps
>(({ variant, size, className, ...props }, ref) => {
  return (
    <textarea
      className={cn(textAreaStyles({ variant, size }), className)}
      ref={ref}
      {...props}
    />
  );
});

export default CustomTextArea;
