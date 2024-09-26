import { queryOptions } from "@tanstack/react-query";
import { GetUserCartOnLogin } from "../../Services/Cart";

export function GetUserCartOnLoginOptions(token: string) {
  const options = queryOptions({
    queryKey: ["cart-login"],
    queryFn: () => GetUserCartOnLogin(token),
  });
  return options;
}
