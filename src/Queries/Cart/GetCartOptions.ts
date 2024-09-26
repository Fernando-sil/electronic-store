import { queryOptions } from "@tanstack/react-query";
import { GetUserCart } from "../../Services/Cart";

export function GetCartOptions() {
  const options = queryOptions({
    queryKey: ["cart"],
    queryFn: () => GetUserCart(),
  });
  return options;
}
