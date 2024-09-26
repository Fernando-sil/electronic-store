import { cva, VariantProps } from "cva";
import { HTMLAttributes } from "react";
import { cn } from "../../CN";

const LabelStyles = cva(
  "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      size: {
        small: "text-sm",
        medium: "text-base",
        large: "text-lg",
      },
    },
    defaultVariants: {
      size: "small",
    },
  }
);

export interface LabelProps
  extends HTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof LabelStyles> {}

type TProps = {
  label: string;
} & LabelProps;

function Label({ label, children, className, size, ...props }: TProps) {
  return (
    <label className={cn(LabelStyles({ size }), className)} {...props}>
      {label}
      {children}
    </label>
  );
}

export default Label;
