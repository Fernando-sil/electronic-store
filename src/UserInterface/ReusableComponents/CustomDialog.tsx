import { cva, VariantProps } from "cva";
import React, { createContext, useContext } from "react";
import { cn } from "../../CN";

const dialogStyles = cva(
  "absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-50 border-none transition-all rounded-md shadow-md overflow-clip backdrop:bg-black/80 backdrop:backdrop-blur-sm open:animate-fade-in open:backdrop:animate-fade-in close:animate-fade-out close:backdrop:animate-fade-out",
  {
    variants: {
      variant: {
        primary: "bg-gold-200",
        secondary: "bg-secondary-blue-200",
        accent: "bg-rose-gold-200",
      },
      size: {
        small: "h-16",
        medium: "h-24",
        large: "h-32",
        variable: "h-fit",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "variable",
    },
  }
);

type TDiv = React.HTMLAttributes<HTMLDivElement>;

type TContext = {
  variant: "primary" | "secondary" | "accent" | null | undefined;
};

const DialogContext = createContext<TContext>({
  variant: null,
});

export interface CustomDialogProps
  extends React.DialogHTMLAttributes<HTMLDialogElement>,
    VariantProps<typeof dialogStyles> {}

const CustomDialog = React.forwardRef<HTMLDialogElement, CustomDialogProps>(
  ({ className, size, variant, ...props }, ref) => {
    const value = { variant };
    return (
      <DialogContext.Provider value={value}>
        <dialog
          className={cn(dialogStyles({ size, variant }), className)}
          ref={ref}
          {...props}
        ></dialog>
      </DialogContext.Provider>
    );
  }
);

function CustomDialogBody({ className, ...props }: TDiv) {
  return <div className={cn("p-4", className)} {...props}></div>;
}

function CustomDialogFooter({ className, ...props }: TDiv) {
  const { variant } = useContext(DialogContext);
  const backgroundColor = variant ?? "primary";

  return (
    <div
      className={cn("p-4", className, {
        "bg-gold-600": backgroundColor === "primary",
        "bg-secondary-blue-600": backgroundColor === "secondary",
        "bg-rose-gold-600": backgroundColor === "accent",
      })}
      {...props}
    ></div>
  );
}

export { CustomDialog, CustomDialogFooter, CustomDialogBody };
