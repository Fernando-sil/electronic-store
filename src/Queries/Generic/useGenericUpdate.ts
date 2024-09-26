import { useMutation } from "@tanstack/react-query";
import { GenericUpdate } from "../../Services/BackEndCalls";
import { TGenericForm } from "../../Types/Types";

export function useGenericUpdate() {
  const {
    mutate: updateGeneric,
    data,
    isPending,
  } = useMutation({
    mutationFn: (data: TGenericForm) =>
      GenericUpdate(data.name, data.id, data.field),
  });

  return { updateGeneric, data, isPending };
}
