import { createFileRoute } from "@tanstack/react-router";
import { GetCategoryById } from "../../../../../Queries/Categories/GetCategoryById";
import CategoryForm from "../../../../../UserInterface/CategoryForm";

export const Route = createFileRoute("/admin/categories/editCategory/$id/")({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(GetCategoryById(Number(params.id))),
  component: () => <CategoryForm />,
});
