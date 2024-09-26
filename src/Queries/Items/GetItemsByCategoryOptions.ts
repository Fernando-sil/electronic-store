import { queryOptions } from "@tanstack/react-query";
import { GetProductsByCategory } from "../../Services/Products";

export function GetProductsByCategoryOptions(id: number, brand?: string) {
  const options = queryOptions({
    queryKey: ["product-category", id, brand],
    queryFn: () => GetProductsByCategory(id, brand),
  });
  return options;
}
