import { Link } from "@tanstack/react-router";
import { TResponse } from "../Types/Types";
import {
  CustomCard,
  CustomCardHeader,
  CustomCardBody,
} from "./ReusableComponents/CustomCard";
import HeadingElement from "./ReusableComponents/HeadingElement";
import StarGenerator from "./ReusableComponents/StarGenerator";
import CustomLink from "./ReusableComponents/CustomLink";
import { TItem } from "../Types/ProductTypes";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { IconContext } from "react-icons";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DeleteModal from "./ReusableComponents/DeleteModal";
import { useGenericDelete } from "../Queries/Generic/useGenericDelete";
import { useSubmissionResponseWithNavigation, useToggleModal } from "../Hooks";
import { SubmissionMessageBuilder } from "../HelperMethods";

let hasUserCommented: boolean = false;

function Reviews({ product }: { product: TResponse<TItem> }) {
  const productRatings = product.data.ratings;
  const users = productRatings.map((rating) => rating.userName);
  const user = useContext(UserContext);
  const { submissionResponseWithNavigation } =
    useSubmissionResponseWithNavigation();
  const { deleteGeneric } = useGenericDelete();
  const { toggleDialog, dialogRef } = useToggleModal();

  function handleDelete() {
    const id = productRatings.find(
      (rating) => rating.userName === user.user?.userName
    )?.id;
    deleteGeneric(
      `ratings/${id}`,
      submissionResponseWithNavigation(
        `Review ${SubmissionMessageBuilder("delete", "success")}`,
        `${SubmissionMessageBuilder("delete", "fail")} review`,
        "product",
        `/products/${product.data.id}`
      )
    );
    toggleDialog();
  }
  return (
    <section className="space-y-8">
      {productRatings.length > 0 ? (
        <>
          <div className="flex items-center gap-6">
            <ReviewTitle
              title={`Reviews (${productRatings.length})`}
              id={product.data.id}
              users={users}
            />
          </div>
          {productRatings.map((rating) => (
            <div className="flex items-center gap-8" key={rating.id}>
              <CustomCard size="full">
                <CustomCardHeader className="flex gap-3 items-center">
                  <HeadingElement heading="h4">
                    {rating.userName}
                  </HeadingElement>
                  {rating.userName === user.user?.userName && (
                    <div className="flex gap-2 items-center">
                      <IconContext.Provider
                        value={{ className: "text-rose-gold-400" }}
                      >
                        <Link to={`/products/$id/reviews/${rating.id}`}>
                          <FaEdit />
                        </Link>
                      </IconContext.Provider>
                      <IconContext.Provider
                        value={{ className: "text-red-400 cursor-pointer" }}
                      >
                        <MdDelete onClick={toggleDialog} />
                      </IconContext.Provider>
                    </div>
                  )}
                </CustomCardHeader>
                <CustomCardBody className="px-4 py-2">
                  <div>{rating.comment}</div>
                </CustomCardBody>
              </CustomCard>
              <div className="space-y-2 text-center">
                <HeadingElement
                  heading="h2"
                  className="text-6xl text-rose-gold-400"
                >
                  {rating.rate}
                </HeadingElement>
                <StarGenerator score={rating.rate} />
              </div>
            </div>
          ))}
        </>
      ) : (
        <ReviewTitle
          title="No reviews for this product yet"
          id={product.data.id}
          users={users}
        />
      )}
      <DeleteModal
        toggleDialog={toggleDialog}
        handleDelete={handleDelete}
        objectName="this review"
        dialogRef={dialogRef}
      />
    </section>
  );
}

function ReviewTitle({
  id,
  title,
  users,
}: {
  id: string;
  title: string;
  users?: string[];
}) {
  const user = useContext(UserContext);

  if (users!.includes(user.user!.userName)) {
    hasUserCommented = true;
  } else {
    hasUserCommented = false;
  }

  return (
    <div className="flex items-center gap-6 justify-center">
      <HeadingElement heading="h2">{title}</HeadingElement>
      {/* <CustomLink to>Add a review</CustomLink> */}
      {hasUserCommented === false && (
        <Link to={`/products/${id}/reviews`}>
          <CustomLink linkStyle="accent" variant="button">
            Add a review
          </CustomLink>
        </Link>
      )}
    </div>
  );
}

export default Reviews;
