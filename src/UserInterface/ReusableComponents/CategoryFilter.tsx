import { IconContext } from "react-icons";
import { CategoryIcons } from "./CategoryIcons";
import { CustomCard, CustomCardBody } from "./CustomCard";
import { useState } from "react";
import { TiThSmall } from "react-icons/ti";

type TFilter = {
  name: string;
  imageUrl?: string;
};

function CategoryFilter({
  categories,
  setCategory,
  field,
}: {
  categories: TFilter[];
  setCategory?: (category: string | undefined) => void;
  field: "brand" | "category";
}) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <div className="flex gap-4">
      <FilterCard
        index={-1}
        setCategory={setCategory}
        category="All"
        setSelectedIndex={setSelectedIndex}
        selectedIndex={selectedIndex}
      >
        <IconContext.Provider
          value={{
            size: "40",
            className: `${selectedIndex === -1 ? "text-rose-gold-500" : "text-gold-500"}`,
          }}
        >
          {<TiThSmall />}
        </IconContext.Provider>
      </FilterCard>
      {categories.map((category, index) => (
        <FilterCard
          index={index}
          setCategory={setCategory}
          category={category.name}
          key={category.name}
          setSelectedIndex={setSelectedIndex}
          selectedIndex={selectedIndex}
        >
          {field === "category" ? (
            <IconContext.Provider
              value={{
                size: "40",
                className: `${selectedIndex === index ? "text-rose-gold-500" : "text-gold-500"}`,
              }}
            >
              {CategoryIcons[category.name]}
            </IconContext.Provider>
          ) : (
            <img src={category.imageUrl} className="h-10 aspect-square" />
          )}
        </FilterCard>
      ))}
    </div>
  );
}

function FilterCard({
  index,
  setCategory,
  category,
  setSelectedIndex,
  children,
  selectedIndex,
}: {
  index: number;
  setCategory?: (category: string | undefined) => void;
  category: string;
  setSelectedIndex: (index: number) => void;
  children: React.ReactNode;
  selectedIndex: number;
}) {
  const cardVariant = selectedIndex === index ? "primary" : "secondary";
  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={() => {
        setSelectedIndex(index);
        if (setCategory) {
          setCategory(category === "All" ? undefined : category);
        }
      }}
    >
      <CustomCard className="rounded-full w-fit" cardColor={cardVariant}>
        <CustomCardBody className="p-3">{children}</CustomCardBody>
      </CustomCard>
      <p>{category}</p>
    </div>
  );
}

export default CategoryFilter;
