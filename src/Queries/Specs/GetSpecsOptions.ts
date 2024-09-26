import { queryOptions } from "@tanstack/react-query";
import { GetSpecs } from "../../Services/Specs";

export function GetSpecsOptions() {
  const options = queryOptions({
    queryKey: ["specs"],
    queryFn: () => GetSpecs(),
  });
  return options;
}
