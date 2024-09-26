import { cva, VariantProps } from "cva";
import { createContext, useContext, useState } from "react";
import { IconContext } from "react-icons";
import { IoMdArrowDropdown } from "react-icons/io";
import { cn } from "../../CN";
import CustomInput from "./CustomInput";
import { IoSearchSharp } from "react-icons/io5";
import React from "react";

const dropDownStyles = cva("relative rounded-md h-9 px-3 py-2", {
  variants: {
    variant: {
      primary: "bg-gold-200 text-text-color-800",
      secondary: "bg-secondary-blue-200",
      accent: "bg-rose-gold-200",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

const DropdownBgColor = {
  primary: "bg-gold-200",
  secondary: "bg-secondary-blue-200",
  accent: "bg-rose-gold-200",
};
const ListItemBgColor = {
  primary: "bg-gold-300",
  secondary: "bg-secondary-blue-300",
  accent: "bg-rose-gold-500",
};

export type TDropdownOptions = {
  id: number | string;
  text: string;
};

type TDropdownContext = {
  variant: "primary" | "secondary" | "accent" | null | undefined;
  setSelection: (selection: TDropdownOptions) => void;
  dropdownOptions: TDropdownOptions[];
  search: string | null;
  setSearch: (searchString: string) => void;
  id: string | null;
};

const DropDownContext = createContext<TDropdownContext>({
  variant: null,
  setSelection: () => null,
  dropdownOptions: [
    {
      id: 0,
      text: "",
    },
  ],
  search: null,
  setSearch: () => null,
  id: "",
});

export type DropDownItems = React.HTMLAttributes<HTMLUListElement> & {
  setSelectionId?: (id: number) => void;
};
export type DropDownDiv = React.InputHTMLAttributes<HTMLInputElement>;
export type DropDownProps = DropDownDiv & {
  dropdownOptions: TDropdownOptions[];
  id: string;
} & VariantProps<typeof dropDownStyles>;

const CustomDropdown2 = React.forwardRef<HTMLInputElement, DropDownProps>(
  (
    {
      className,
      variant,
      dropdownOptions,
      defaultValue,
      id,
      children,
      ...props
    },
    ref
  ) => {
    const [selection, setSelection] = useState<TDropdownOptions>({
      id: 0,
      text: "",
    });
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    return (
      <DropDownContext.Provider
        value={{
          variant,
          setSelection,
          dropdownOptions,
          search,
          setSearch,
          id,
        }}
      >
        <div className={cn(dropDownStyles({ variant }), className)}>
          <input type="checkbox" id={id} className="hidden peer" />
          <label htmlFor={id}>
            <IconContext.Provider
              value={{
                className: `absolute top-1 right-1 ${open && "text-text-color-600"} cursor-pointer z-50`,
                size: "30",
              }}
            >
              <IoMdArrowDropdown onClick={() => setOpen(!open)} />
            </IconContext.Provider>
          </label>
          <CustomInput
            variant={variant}
            ref={ref}
            className="absolute top-0 left-0 w-full h-full"
            value={selection.text}
            data-value={selection.id}
            // onChange={(e) => (e.target.value = selection.id.toString())}
            // readOnly
            {...props}
          />
          {children}
        </div>
      </DropDownContext.Provider>
    );
  }
);

function CustomDropdownSearch2() {
  const { search, setSearch } = useContext(DropDownContext);
  return (
    <>
      <CustomInput
        value={search ?? ""}
        onChange={(e) => setSearch(e.target.value)}
      />
      <IconContext.Provider value={{ className: "absolute top-2 right-5" }}>
        <IoSearchSharp />
      </IconContext.Provider>
    </>
  );
}

function CustomDropdownBody2({ className, ...props }: DropDownDiv) {
  const { variant } = useContext(DropDownContext);

  const ulColor =
    variant === undefined || variant === null ? "primary" : variant;
  return (
    <div
      className={cn(
        `w-full p-2 space-y-3 rounded-md h-auto absolute top-11 z-[100] left-0 hidden peer-checked:block ${DropdownBgColor[ulColor]}`,
        className
      )}
      {...props}
    ></div>
  );
}

function CustomDropdownItems2({
  className,
  setSelectionId,
  ...props
}: DropDownItems) {
  const { dropdownOptions, variant, setSelection, search, id } =
    useContext(DropDownContext);
  const ulColor =
    variant === undefined || variant === null ? "primary" : variant;
  //   console.log(ListItemBgColor[ulColor]);

  return (
    <ul className={cn(``, className)} {...props}>
      <label htmlFor={id!}>
        {dropdownOptions
          .filter((item) => item.text.includes(search ?? ""))
          .map((option) => (
            <li
              key={option.id}
              value={option.id}
              className={`px-2 py-1 hover:${ListItemBgColor[ulColor]} hover:rounded-md`}
              onClick={(e) => {
                setSelection({
                  id: e.currentTarget.value,
                  text: e.currentTarget.textContent!,
                });
                if (setSelectionId !== undefined) {
                  setSelectionId(e.currentTarget.value);
                }
              }}
            >
              {option.text}
            </li>
          ))}
      </label>
    </ul>
  );
}

export {
  CustomDropdown2,
  CustomDropdownItems2,
  CustomDropdownSearch2,
  CustomDropdownBody2,
};
