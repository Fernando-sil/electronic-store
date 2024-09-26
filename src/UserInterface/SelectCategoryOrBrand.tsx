import { Link } from "@tanstack/react-router";
import { CustomCard, CustomCardBody } from "./ReusableComponents/CustomCard";
import HeadingElement from "./ReusableComponents/HeadingElement";
import CustomGrid from "./ReusableComponents/CustomGrid";
import { useSuspenseQuery } from "@tanstack/react-query";
import { GetCategoriesOptions } from "../Queries/Categories/GetCategoryOptions";

function SelectCategoryOrBrand() {
  const { data: response } = useSuspenseQuery(GetCategoriesOptions());

  return (
    <section className="flex flex-col gap-3 mb-5">
      <HeadingElement>Select a category</HeadingElement>
      <CustomGrid className="items-stretch">
        {response.data.map((category) => (
          <Link
            key={category.id}
            to={`/admin/categories/editCategory/${category.id}`}
          >
            <CustomCard size={"large"} className="h-full">
              <CustomCardBody>
                <HeadingElement>{category.name}</HeadingElement>
              </CustomCardBody>
            </CustomCard>
          </Link>
        ))}
      </CustomGrid>
    </section>
  );
}

export default SelectCategoryOrBrand;
