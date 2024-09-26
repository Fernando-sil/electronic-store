import { useMutation } from "@tanstack/react-query";
import { UpdateRating } from "../../Services/Rating";
import { useParams } from "@tanstack/react-router";
import { TRating } from "../../Types/RatingTypes";

export function useUpdateRating() {
  const { reviewId } = useParams({ from: "/products/$id/reviews/$reviewId/" });
  const { mutate: updateRating } = useMutation({
    mutationFn: (data: TRating) => UpdateRating(Number(reviewId), data),
  });
  return { updateRating };
}
