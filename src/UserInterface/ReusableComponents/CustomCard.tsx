import { cva, type VariantProps } from "cva";
import { createContext, useContext } from "react";
import { cn } from "../../CN";

const cardStyles = cva("rounded-md overflow-clip", {
  variants: {
    size: {
      small: "w-72",
      medium: "w-80",
      large: "w-96",
      variable: "w-auto",
      full: "w-full",
    },
    cardColor: {
      primary: "bg-gold-500 text-text-color-900",
      secondary: "bg-secondary-blue-500",
      accent: "bg-rose-gold-500",
    },
  },
  defaultVariants: {
    size: "medium",
    cardColor: "secondary",
  },
});

type TCardContext = {
  cardColor: "primary" | "secondary" | "accent" | null | undefined;
};

const CardContext = createContext<TCardContext>({ cardColor: null });

export interface CustomCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardStyles> {}

function CustomCard({ className, size, cardColor, ...props }: CustomCardProps) {
  return (
    <CardContext.Provider value={{ cardColor }}>
      <div
        className={cn(cardStyles({ size, cardColor }), className)}
        {...props}
      ></div>
    </CardContext.Provider>
  );
}

function CustomCardHeader({ className, ...props }: CustomCardProps) {
  return <div className={cn("px-4 py-2", className)} {...props}></div>;
}

function CustomCardTitle({ className, ...props }: CustomCardProps) {
  return (
    <h2
      className={cn(
        "text-center font-semibold leading-none text-lg",
        className
      )}
      {...props}
    ></h2>
  );
}

function CustomCardBody({ className, ...props }: CustomCardProps) {
  const { cardColor } = useContext(CardContext);
  return (
    <div
      className={cn(
        "p-6 space-y-2",
        {
          "text-text-color-800": cardColor === "primary",
        },
        className
      )}
      {...props}
    ></div>
  );
}

export { CustomCard, CustomCardHeader, CustomCardTitle, CustomCardBody };
