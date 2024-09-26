import HeadingElement from "./ReusableComponents/HeadingElement";
import { useSuspenseQuery } from "@tanstack/react-query";
import { GetMultipleOptions } from "../Queries/Generic/GetMultipleOptions";
import DisplayCard from "./DisplayCard";

function EditSpecs() {
  const { data: response } = useSuspenseQuery(GetMultipleOptions("specs"));

  return (
    <section className="flex flex-col gap-4 mb-5">
      <HeadingElement className="text-center">
        Select a spec to edit
      </HeadingElement>
      <div className="grid grid-cols-3 gap-3">
        {response.data.map((brand) => (
          <DisplayCard brand={brand} key={brand.id} field="specs" />
        ))}
      </div>
    </section>
  );
}

export default EditSpecs;
