import { createFileRoute } from "@tanstack/react-router";
import { getItemOptions } from "../../../Queries/Items/GetItemOptions";
import ProductDetails from "../../../UserInterface/ProductDetails";

export const Route = createFileRoute("/products/$id/")({
  loader: ({ context: { queryClient }, params }) =>
    queryClient.ensureQueryData(getItemOptions(params.id)),
  component: () => <ProductDetails />,
});
