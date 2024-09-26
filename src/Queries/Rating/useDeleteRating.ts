import { useMutation } from "@tanstack/react-query";
import { GenericDelete } from "../../Services/BackEndCalls";

export function useDeleteRating() {
  const { mutate: deleteRating } = useMutation({
    mutationFn: (id: number) => GenericDelete(`api/ratings/${id}`),
  });
  return { deleteRating };
}
