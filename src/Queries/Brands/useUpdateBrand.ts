import { useMutation } from "@tanstack/react-query";
import { TGenericForm } from "../../Types/Types";
import { GenericUpdate } from "../../Services/BackEndCalls";

export function useUpdateBrand() {
  const {
    mutate: updateBrand,
    data,
    isPending,
  } = useMutation({
    mutationFn: (data: TGenericForm) =>
      GenericUpdate(data.name, data.id, data.field),
  });
  return { updateBrand, data, isPending };
}
