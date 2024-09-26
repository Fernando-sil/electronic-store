import { createFileRoute } from "@tanstack/react-router";
import SearchItem from "../../../UserInterface/SearchItem";
import { GetItemsOptions } from "../../../Queries/Items/GetItemsOptions";

type ProductSearch = {
  name?: string;
};

export const Route = createFileRoute("/admin/items/searchItem")({
  validateSearch: (search: Record<string, unknown>): ProductSearch => {
    return {
      name: search.name as string,
    };
  },
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(GetItemsOptions()),
  component: () => <SearchItem />,
});
