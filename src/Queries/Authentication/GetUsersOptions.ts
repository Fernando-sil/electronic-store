import { queryOptions } from "@tanstack/react-query";
import { GetAllUsers } from "../../Services/Authentication";

export function GetUsersOptions(name?: string) {
  const options = queryOptions({
    queryKey: ["get-users", name],
    queryFn: () => GetAllUsers(name),
  });
  return options;
}
