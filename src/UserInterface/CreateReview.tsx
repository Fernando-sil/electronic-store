import { useAddRatingToItem } from "../Queries/Items/AddRatingToItem";
import { CustomCard, CustomCardBody } from "./ReusableComponents/CustomCard";
import CustomGrid from "./ReusableComponents/CustomGrid";
// import CustomInput from "./ReusableComponents/CustomInput";
import HeadingElement from "./ReusableComponents/HeadingElement";
import ReviewForm from "./ReviewForm";
import { useLoaderData } from "@tanstack/react-router";

function CreateReview() {
  const item = useLoaderData({ from: "/products/$id/reviews/" });
  const { addRating } = useAddRatingToItem();
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
            <ReviewForm mutation={addRating} />
          </div>
        </CustomGrid>
      </CustomCardBody>
    </CustomCard>
  );
}

export default CreateReview;
