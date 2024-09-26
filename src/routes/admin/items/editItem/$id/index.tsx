import { createFileRoute } from "@tanstack/react-router";
import EditItem from "../../../../../UserInterface/EditItem";
import { getItemOptions } from "../../../../../Queries/Items/GetItemOptions";

export const Route = createFileRoute("/admin/items/editItem/$id/")({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(getItemOptions(params.id)),
  component: () => <EditItem />,
});
