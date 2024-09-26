import { BaseURl } from "../Constants";
import { TRating, TRatingResponse } from "../Types/RatingTypes";
import { TResponse } from "../Types/Types";
import { fetchDataWithCredentials } from "./BackEndCalls";

export async function AddRatingToItem(
  rating: TRating,
  itemId: string
): Promise<TResponse<TRating>> {
  const url = `${BaseURl}ratings/add-rating`;
  const newRating = { ...rating, itemId };
  const result = await fetchDataWithCredentials(url, "POST", newRating);
  return result;
}

export async function GetRating(
  id: number
): Promise<TResponse<TRatingResponse>> {
  const url = `${BaseURl}ratings/${id}`;
  const result = await fetchDataWithCredentials(url, "GET", "");

  return result;
}

export async function UpdateRating(
  id: number,
  body: TRating
): Promise<TResponse<TRating>> {
  const url = `${BaseURl}ratings/${id}`;

  const result = await fetchDataWithCredentials(url, "PUT", body);

  return result;
}
