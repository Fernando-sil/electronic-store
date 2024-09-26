import { CustomCard, CustomCardBody } from "./ReusableComponents/CustomCard";
import { CategoryIcons } from "./ReusableComponents/CategoryIcons";
import { IconContext } from "react-icons";
import HeadingElement from "./ReusableComponents/HeadingElement";
import { Link } from "@tanstack/react-router";
import { TResponseWithCount, TGenericGetMultiple } from "../Types/Types";

function ShopByCategories({
  categories,
}: {
  categories: TResponseWithCount<TGenericGetMultiple[]>;
}) {
  return (
    <section className="flex flex-col gap-4 mb-4">
      <HeadingElement data-testid="categories">Shop By Category</HeadingElement>
      <div className="flex flex-wrap gap-3">
        {categories.data.map((category) => (
          <Link key={category.id} to={`/products/categories/${category.id}`}>
            <CustomCard
              cardColor={"secondary"}
              data-testid="categoryCard"
              className="hover:scale-105 transition-all"
            >
              <CustomCardBody className="flex flex-col items-center">
                <IconContext.Provider
                  value={{ className: "text-gold-500", size: "100" }}
                >
                  {CategoryIcons[category.name]}
                </IconContext.Provider>
                <HeadingElement heading={"h4"}>{category.name}</HeadingElement>
              </CustomCardBody>
            </CustomCard>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ShopByCategories;
