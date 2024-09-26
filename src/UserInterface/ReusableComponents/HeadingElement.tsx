import { cva, VariantProps } from "cva";
import { cn } from "../../CN";

const HeadingElementStyles = cva("", {
  variants: {
    heading: {
      h1: "text-5xl leading-normal",
      h2: "text-4xl",
      h3: "text-3xl",
      h4: "text-2xl",
      h5: "text-xl",
      h6: "text-lg",
    },
  },
  defaultVariants: {
    heading: "h1",
  },
});

export interface CustomHeadingElementProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof HeadingElementStyles> {}

function HeadingElement({
  className,
  heading,
  ...props
}: CustomHeadingElementProps) {
  return (
    <p
      className={cn(HeadingElementStyles({ heading }), className)}
      {...props}
    ></p>
  );
}

export default HeadingElement;
