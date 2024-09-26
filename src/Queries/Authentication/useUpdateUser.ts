import { useMutation } from "@tanstack/react-query";
import { UpdateUser } from "../../Services/Authentication";
import { TUpdateUserForm } from "../../Types/AuthenticationTypes";

export function useUpdateUser() {
  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: (data: TUpdateUserForm) => UpdateUser(data.id, data.data),
  });

  return { updateUser, isPending };
}
