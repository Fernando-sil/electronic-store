import { useMutation } from "@tanstack/react-query";
import { AddBrands } from "../../Services/Brands";
import { TAddBrand } from "../../Types/BrandTypes";

export function useAddBrand() {
  const {
    mutate: addBrands,
    data,
    isPending,
  } = useMutation({
    mutationFn: (data: TAddBrand[]) => AddBrands(data),
  });
  return { addBrands, data, isPending };
}
