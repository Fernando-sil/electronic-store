import { createFileRoute } from "@tanstack/react-router";
import { GetProductsByCategoryOptions } from "../../../../Queries/Items/GetItemsByCategoryOptions";
import ProductCategory from "../../../../UserInterface/ProductCategory";

type ProductSearch = {
  brand?: string;
};

export const Route = createFileRoute("/products/categories/$id/")({
  validateSearch: (search: Record<string, unknown>): ProductSearch => {
    return {
      brand: search.brand as string,
    };
  },
  loader: ({ context: { queryClient }, params }) =>
    queryClient.ensureQueryData(
      GetProductsByCategoryOptions(Number(params.id))
    ),
  component: () => <ProductCategory />,
});
