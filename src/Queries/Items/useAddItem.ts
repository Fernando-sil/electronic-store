import { useMutation } from "@tanstack/react-query";
import { TItemForm } from "../../Types/ProductTypes";
import { AddProduct } from "../../Services/Products";

export function useAddItem() {
  const {
    mutate: addItem,
    data,
    isPending,
  } = useMutation({
    mutationFn: (body: TItemForm) => AddProduct(body),
  });

  return { addItem, data, isPending };
}
