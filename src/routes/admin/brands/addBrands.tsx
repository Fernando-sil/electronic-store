import { createFileRoute } from "@tanstack/react-router";
import AddGenericForm from "../../../UserInterface/AddGenericForm";
import HeadingElement from "../../../UserInterface/ReusableComponents/HeadingElement";
import { EndPoints } from "../../../Constants";

export const Route = createFileRoute("/admin/brands/addBrands")({
  component: () => (
    <div className="flex flex-col gap-4">
      <section>
        <HeadingElement>Add Brands</HeadingElement>
      </section>
      <AddGenericForm
        field="Brand/add-brands"
        classification="Brand"
        to={EndPoints["brands"]}
      />
    </div>
  ),
});
