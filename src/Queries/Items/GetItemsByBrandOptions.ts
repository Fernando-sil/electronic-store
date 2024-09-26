import { queryOptions } from "@tanstack/react-query";
import { GetProductsByBrand } from "../../Services/Products";

export function GetProductsByBrandOptions(id: number, category?: string) {
  const options = queryOptions({
    queryKey: ["product-brand", id, category],
    queryFn: () => GetProductsByBrand(id, category),
  });
  return options;
}
