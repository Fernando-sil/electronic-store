import { queryOptions } from "@tanstack/react-query";
import { GetProduct } from "../../Services/Products";

export function getItemOptions(id: string) {
  const options = queryOptions({
    queryKey: ["product", id],
    queryFn: () => GetProduct(id),
  });
  return options;
}
