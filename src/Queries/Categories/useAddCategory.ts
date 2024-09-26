import { useMutation } from "@tanstack/react-query";
import { TAddCategory } from "../../Types/CategoryTypes";
import { AddCategories } from "../../Services/Categories";

export function useAddCategories() {
  const {
    mutate: addCategory,
    data,
    isPending,
  } = useMutation({
    mutationFn: (body: TAddCategory[]) => AddCategories(body),
  });
  return { addCategory, data, isPending };
}
