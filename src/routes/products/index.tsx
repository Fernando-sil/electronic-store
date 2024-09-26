import { createFileRoute } from "@tanstack/react-router";
import { GetItemsOptions } from "../../Queries/Items/GetItemsOptions";
import SelectProduct from "../../UserInterface/SelectProduct";

type ProductSearch = {
  itemName?: string;
};

export const Route = createFileRoute("/products/")({
  validateSearch: (search: Record<string, unknown>): ProductSearch => {
    return {
      itemName: search.itemName as string,
    };
  },
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(GetItemsOptions()),
  component: () => <SelectProduct />,
});
