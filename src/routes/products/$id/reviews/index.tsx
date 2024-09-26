import { createFileRoute } from "@tanstack/react-router";
import CreateReview from "../../../../UserInterface/CreateReview";
import { getItemOptions } from "../../../../Queries/Items/GetItemOptions";

export const Route = createFileRoute("/products/$id/reviews/")({
  loader: ({ params, context }) =>
    context.queryClient.ensureQueryData(getItemOptions(params.id)),
  component: () => <CreateReview />,
});
