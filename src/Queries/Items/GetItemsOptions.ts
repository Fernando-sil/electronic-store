import { queryOptions } from "@tanstack/react-query";
import { GetProducts } from "../../Services/Products";

export function GetItemsOptions(itemName?: string) {
  const options = queryOptions({
    queryKey: ["all-items", itemName],
    queryFn: () => GetProducts(itemName),
  });
  return options;
}
