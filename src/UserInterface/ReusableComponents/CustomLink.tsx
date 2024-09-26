import { cva, VariantProps } from "cva";
import { cn } from "../../CN";

const linkStyles = cva("font-base px-3 py-1 rounded-md transition-colors", {
  variants: {
    variant: {
      default: "hover:underline",
      button: "flex items-center gap-4 justify-center",
    },
    linkStyle: {
      plain: "bg-transparent",
      primary:
        "bg-gold-500 text-text-color-900 hover:bg-gold-300 active:bg-gold-500",
      secondary:
        "bg-secondary-blue-500 hover:bg-secondary-blue-700 active:bg-secondary-blue-500",
      accent:
        "bg-rose-gold-600 hover:bg-rose-gold-700 active:bg-rose-gold-500 text-text-color-300",
    },
  },
  defaultVariants: {
    variant: "default",
    linkStyle: "plain",
  },
});

export interface LinkProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof linkStyles> {
  className?: string;
}

function CustomLink({ className, variant, linkStyle, ...props }: LinkProps) {
  return (
    <p
      className={cn(linkStyles({ variant, linkStyle }), className)}
      {...props}
    ></p>
  );
}

export default CustomLink;
