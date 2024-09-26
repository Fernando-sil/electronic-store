import { createFileRoute } from "@tanstack/react-router";
import EditBrands from "../../../UserInterface/EditBrands";
import { GetMultipleOptions } from "../../../Queries/Generic/GetMultipleOptions";

export const Route = createFileRoute("/admin/brands/editBrands")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(GetMultipleOptions("Brand/all-brands")),
  component: () => <EditBrands />,
});
