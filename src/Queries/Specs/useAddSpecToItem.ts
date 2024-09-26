import { useMutation } from "@tanstack/react-query";
import { TUseAddSpecToItem } from "../../Types/SpecificationTypes";
import { AddSpecsToItem } from "../../Services/Specs";

export function useAddSpecToItem() {
  const {
    mutate: addSpecsToItem,
    data,
    isPending,
  } = useMutation({
    mutationFn: (data: TUseAddSpecToItem) =>
      AddSpecsToItem(data.specs, data.itemId),
  });
  return { addSpecsToItem, data, isPending };
}
