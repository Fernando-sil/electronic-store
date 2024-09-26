import { createFileRoute } from "@tanstack/react-router";
import AddGenericForm from "../../../UserInterface/AddGenericForm";
import HeadingElement from "../../../UserInterface/ReusableComponents/HeadingElement";
import { EndPoints } from "../../../Constants";

export const Route = createFileRoute("/admin/categories/addCategories")({
  component: () => (
    <div className="flex flex-col gap-4">
      <section>
        <HeadingElement>Add Categories</HeadingElement>
      </section>
      <AddGenericForm
        field="Category/add-categories"
        classification="Category"
        to={EndPoints["categories"]}
      />
    </div>
  ),
});
