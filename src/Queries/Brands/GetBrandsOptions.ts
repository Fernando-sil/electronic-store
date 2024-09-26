import { queryOptions } from "@tanstack/react-query";
// import { GetBrands } from "../../Services/Brands";
import { GenericGetMultiple } from "../../Services/BackEndCalls";

export function GetBrandsOptions(field: string) {
  const options = queryOptions({
    queryKey: ["brands"],
    queryFn: () => GenericGetMultiple(field),
  });
  return options;
}
// export function GetBrandsOptions() {
//   const options = queryOptions({
//     queryKey: ["brands"],
//     queryFn: () => GetBrands(),
//   });
//   return options;
// }
