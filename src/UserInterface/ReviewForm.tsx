import { SubmitHandler, useForm } from "react-hook-form";
import Label from "./ReusableComponents/Label";
import CustomInput from "./ReusableComponents/CustomInput";
import { FaStar } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useState } from "react";
import { CustomButton } from "./ReusableComponents/CutomButton";
import CustomTextArea from "./ReusableComponents/CustomTextArea";
import { TRating } from "../Types/RatingTypes";
import { UseMutateFunction, useSuspenseQuery } from "@tanstack/react-query";
import { GetRatingOptions } from "../Queries/Rating/GetRatingOptions";
import { TResponse } from "../Types/Types";
import { useSubmissionResponse } from "../Hooks";
import { SubmissionMessageBuilder } from "../HelperMethods";

type TFunction = UseMutateFunction<TResponse<TRating>, Error, TRating, unknown>;

function ReviewForm({
  reviewId = 0,
  mutation,
}: {
  reviewId?: number;
  mutation: TFunction;
}) {
  const { data: rating } = useSuspenseQuery(GetRatingOptions(Number(reviewId)));
  const { submissionResponse } = useSubmissionResponse();
  const [starNumber, setStarNumber] = useState(rating.data?.rate ?? 0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TRating>({
    defaultValues: {
      rate: starNumber,
      comment: rating.data?.comment ?? "",
    },
  });
  const onSubmit: SubmitHandler<TRating> = (data) => {
    if (reviewId === 0) {
      mutation(
        data,
        submissionResponse(
          `Review ${SubmissionMessageBuilder("create", "success")}`,
          `${SubmissionMessageBuilder("create", "fail")} review`,
          "product"
        )
      );
    } else {
      mutation(
        data,
        submissionResponse(
          `Review ${SubmissionMessageBuilder("update", "success")}`,
          `${SubmissionMessageBuilder("update", "fail")} review`,
          "product"
        )
      );
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3">
        <Label label="Comment" size="large">
          <CustomTextArea
            {...register("comment", { required: true, minLength: 5 })}
          />
          {errors?.comment && (
            <p className="text-red-400">Min number of characters is 5</p>
          )}
        </Label>
        <Label label="Rate" size="large">
          <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <IconContext.Provider
                key={i}
                value={{
                  className: `${i <= starNumber - 1 ? "fill-gold-500" : ""}`,
                }}
              >
                <FaStar onClick={() => setStarNumber(i + 1)} />
              </IconContext.Provider>
            ))}
          </div>
          {errors?.rate && <p className="text-red-500">Min value is 1</p>}
          <CustomInput type="hidden" {...register("rate", { min: 1 })} />
        </Label>
        {/* <CustomInput type="hidden" value={itemId} {...register("itemId")} /> */}
      </div>
      <CustomButton
        size="large"
        className="mx-auto"
        onClick={() => setValue("rate", starNumber)}
        // disabled={isPending}
      >
        Submit
      </CustomButton>
    </form>
  );
}

export default ReviewForm;
