import { useParams } from "@tanstack/react-router";
import { CustomCard, CustomCardBody } from "./ReusableComponents/CustomCard";
import CustomGrid from "./ReusableComponents/CustomGrid";
import HeadingElement from "./ReusableComponents/HeadingElement";
import ReviewForm from "./ReviewForm";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getItemOptions } from "../Queries/Items/GetItemOptions";
import { useUpdateRating } from "../Queries/Rating/useUpdateRating";

function EditReview() {
  const { reviewId } = useParams({ from: "/products/$id/reviews/$reviewId/" });
  const { id } = useParams({ from: "/products/$id/reviews/$reviewId/" });
  const { data: item } = useSuspenseQuery(getItemOptions(id));
  const { updateRating } = useUpdateRating();
  return (
    <CustomCard size="full">
      <CustomCardBody>
        <CustomGrid colGap={8}>
          <div className="space-y-3">
            <HeadingElement heading="h3">{item.data.itemName}</HeadingElement>
            <img
              src={item.data.imageUrl}
              className="h-96 rounded-md aspect-video"
            />
          </div>
          <div className="space-y-5">
            <HeadingElement heading="h3">
              What do you think of this product?
            </HeadingElement>
            <ReviewForm reviewId={Number(reviewId)} mutation={updateRating} />
          </div>
        </CustomGrid>
      </CustomCardBody>
    </CustomCard>
  );
}

export default EditReview;
