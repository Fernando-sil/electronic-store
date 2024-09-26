import { cva, VariantProps } from "cva";
import { cn } from "../../CN";

const gridStyles = cva("grid", {
  variants: {
    numberOfCols: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      custom: "",
    },
    colGap: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      7: "gap-7",
      8: "gap-8",
    },
  },
  defaultVariants: {
    numberOfCols: 2,
    colGap: 3,
  },
});

export interface CustomGridProps
  extends React.HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridStyles> {}

function CustomGrid({
  className,
  numberOfCols,
  colGap,
  ...props
}: CustomGridProps) {
  return (
    <div
      className={cn(gridStyles({ numberOfCols, colGap }), className)}
      {...props}
    ></div>
  );
}

export default CustomGrid;
