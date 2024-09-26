import { createFileRoute } from "@tanstack/react-router";
import AddGenericForm from "../../../UserInterface/AddGenericForm";
import HeadingElement from "../../../UserInterface/ReusableComponents/HeadingElement";

export const Route = createFileRoute("/admin/specs/addSpecs")({
  component: () => (
    <div className="flex flex-col gap-4">
      <section>
        <HeadingElement>Add Specs</HeadingElement>
      </section>
      <AddGenericForm
        field="specs/add-specs"
        classification="Spec"
        to="/admin/specs/"
      />
    </div>
  ),
});
