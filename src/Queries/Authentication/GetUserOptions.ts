import { queryOptions } from "@tanstack/react-query";
import { GetUser } from "../../Services/Authentication";

export function GetUserById(id: string) {
  const options = queryOptions({
    queryKey: ["user", id],
    queryFn: () => GetUser(id),
  });
  return options;
}
