import { useMutation } from "@tanstack/react-query";
import { AddSpecs } from "../../Services/Specs";
import { TAddSpecs } from "../../Types/SpecificationTypes";

export function useAddSpecs() {
  const {
    mutate: addSpecs,
    data,
    isPending,
  } = useMutation({
    mutationFn: (body: TAddSpecs[]) => AddSpecs(body),
  });
  return { addSpecs, data, isPending };
}
