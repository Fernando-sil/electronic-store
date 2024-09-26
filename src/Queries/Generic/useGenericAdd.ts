import { useMutation } from "@tanstack/react-query";
import { GenericAddMultiple } from "../../Services/BackEndCalls";
import { TGenericFormAddMultiple, TGenericUpdate } from "../../Types/Types";

export function useGenericAddMultiple() {
  const {
    mutate: addGenericMultiple,
    data,
    isPending,
  } = useMutation({
    mutationFn: (data: TGenericFormAddMultiple<TGenericUpdate>) =>
      GenericAddMultiple(data.name, data.field),
  });
  return { addGenericMultiple, data, isPending };
}
