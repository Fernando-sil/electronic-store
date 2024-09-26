import { queryOptions } from "@tanstack/react-query";
import { GetCategories } from "../../Services/Categories";

export function GetCategoriesOptions() {
  const options = queryOptions({
    queryKey: ["category"],
    queryFn: () => GetCategories(),
  });
  return options;
}
