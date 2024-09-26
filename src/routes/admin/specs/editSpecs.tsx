import { createFileRoute } from "@tanstack/react-router";
import { GetMultipleOptions } from "../../../Queries/Generic/GetMultipleOptions";
import EditSpecs from "../../../UserInterface/EditSpecs";

export const Route = createFileRoute("/admin/specs/editSpecs")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(GetMultipleOptions("specs")),
  component: () => <EditSpecs />,
});
