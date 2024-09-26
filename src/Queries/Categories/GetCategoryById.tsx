import { queryOptions } from "@tanstack/react-query";
import { GetCategory } from "../../Services/Categories";

export function GetCategoryById(id: number) {
  const options = queryOptions({
    queryKey: ["category", id],
    queryFn: () => GetCategory(id),
  });
  return options;
}
