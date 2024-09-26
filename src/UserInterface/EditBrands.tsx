import HeadingElement from "./ReusableComponents/HeadingElement";
import BrandForm from "./BrandForm";
import { useSuspenseQuery } from "@tanstack/react-query";
import { GetMultipleOptions } from "../Queries/Generic/GetMultipleOptions";

function EditBrands() {
  // const response = useLoaderData({ from: "/admin/brands/editBrands" });
  const { data: response } = useSuspenseQuery(
    GetMultipleOptions("Brand/all-brands")
  );

  return (
    <section className="flex flex-col gap-4 mb-5">
      <HeadingElement className="text-center">
        Select a brand to edit
      </HeadingElement>
      <div className="grid grid-cols-3 gap-3">
        {response.data.map((brand) => (
          <BrandForm brand={brand} key={brand.id} field="Brand" />
        ))}
      </div>
    </section>
  );
}

export default EditBrands;
