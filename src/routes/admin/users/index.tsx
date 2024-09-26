import { createFileRoute } from "@tanstack/react-router";
import { GetUsersOptions } from "../../../Queries/Authentication/GetUsersOptions";
import SelectUser from "../../../UserInterface/SelectUser";

type UserSearch = {
  name?: string;
};

export const Route = createFileRoute("/admin/users/")({
  validateSearch: (search: Record<string, unknown>): UserSearch => {
    return {
      name: search.name as string,
    };
  },
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(GetUsersOptions()),
  component: () => <SelectUser />,
});
