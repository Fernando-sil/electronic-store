import { queryOptions } from "@tanstack/react-query";
import { GetProductsOnSale } from "../../Services/Products";

export function getItemsOnSale() {
  console.log("called");

  const options = queryOptions({
    queryKey: ["onSale"],
    queryFn: GetProductsOnSale,
    throwOnError: true,
  });
  return options;
}
