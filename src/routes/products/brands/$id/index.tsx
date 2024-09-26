import { createFileRoute } from "@tanstack/react-router";
import ProductBrand from "../../../../UserInterface/ProductBrand";
import { GetProductsByBrandOptions } from "../../../../Queries/Items/GetItemsByBrandOptions";

type ProductSearch = {
  category?: string;
};

export const Route = createFileRoute("/products/brands/$id/")({
  validateSearch: (search: Record<string, unknown>): ProductSearch => {
    return {
      category: search.category as string,
    };
  },
  loader: ({ context: { queryClient }, params }) =>
    queryClient.ensureQueryData(GetProductsByBrandOptions(Number(params.id))),
  component: () => <ProductBrand />,
});
