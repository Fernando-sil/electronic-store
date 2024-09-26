import { queryOptions } from "@tanstack/react-query";
import { GetRating } from "../../Services/Rating";

export function GetRatingOptions(id: number) {
  const options = queryOptions({
    queryKey: ["get-rating", id],
    queryFn: () => GetRating(id),
  });
  return options;
}
