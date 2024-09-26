import { useMutation } from "@tanstack/react-query";
import { GenericDelete } from "../../Services/BackEndCalls";

export function useGenericDelete() {
  const { mutate: deleteGeneric, isPending } = useMutation({
    mutationFn: (field: string) => GenericDelete(field),
  });
  return { deleteGeneric, isPending };
}
