import { useMutation } from "@tanstack/react-query";
import { TMutateItem, TUpdateProducts } from "../../Types/ProductTypes";
import { UpdateProduct } from "../../Services/Products";

export function useUpdateItem() {
  const {
    mutate: updateItem,
    data,
    isPending,
  } = useMutation({
    mutationFn: (data: TMutateItem<TUpdateProducts>) =>
      UpdateProduct(data.item, data.id),
  });

  return { updateItem, data, isPending };
}
