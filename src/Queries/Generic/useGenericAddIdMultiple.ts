import { useMutation } from "@tanstack/react-query";
import { GenericAddMultiple } from "../../Services/BackEndCalls";
import { TGenericFormAddMultiple, TGenericIdUpdate } from "../../Types/Types";

export function useGenericAddIdMultiple() {
  const {
    mutate: addGenericIdMultiple,
    data,
    isPending,
  } = useMutation({
    mutationFn: (data: TGenericFormAddMultiple<TGenericIdUpdate>) =>
      GenericAddMultiple(data.name, data.field),
  });
  return { addGenericIdMultiple, data, isPending };
}
