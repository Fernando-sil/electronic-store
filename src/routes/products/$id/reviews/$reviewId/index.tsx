import { createFileRoute } from "@tanstack/react-router";
import { GetRatingOptions } from "../../../../../Queries/Rating/GetRatingOptions";
import EditReview from "../../../../../UserInterface/EditReview";

export const Route = createFileRoute("/products/$id/reviews/$reviewId/")({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(
      GetRatingOptions(Number(params.reviewId))
    ),
  component: () => <EditReview />,
});
