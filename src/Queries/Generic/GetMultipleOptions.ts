import { queryOptions } from "@tanstack/react-query";
import { GenericGetMultiple } from "../../Services/BackEndCalls";

export function GetMultipleOptions(field: string) {
  const options = queryOptions({
    queryKey: [field],
    queryFn: () => GenericGetMultiple(field),
  });
  return options;
}
