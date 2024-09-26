import { useMutation } from "@tanstack/react-query";
import { TRating } from "../../Types/RatingTypes";
import { AddRatingToItem } from "../../Services/Rating";
import { useParams } from "@tanstack/react-router";

export function useAddRatingToItem() {
  const { id } = useParams({ from: "/products/$id/reviews/" });
  const {
    mutate: addRating,
    isPending,
    data,
  } = useMutation({
    mutationFn: (rating: TRating) => AddRatingToItem(rating, id),
  });
  return { addRating, isPending, data };
}
