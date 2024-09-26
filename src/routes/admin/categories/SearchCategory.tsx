import { createFileRoute } from "@tanstack/react-router";
import SelectCategoryOrBrand from "../../../UserInterface/SelectCategoryOrBrand";
import { GetCategoriesOptions } from "../../../Queries/Categories/GetCategoryOptions";

export const Route = createFileRoute("/admin/categories/SearchCategory")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(GetCategoriesOptions()),
  component: () => <SelectCategoryOrBrand />,
});
