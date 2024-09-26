import { BaseURl } from "../Constants";
import {
  TCategories,
  TAddCategory,
  TGetCategory,
  TCategoryForm,
} from "../Types/CategoryTypes";
import {
  TCategoryOrBrand,
  TGenericUpdate,
  TResponse,
  TResponseWithCount,
} from "../Types/Types";
import { fetchDataWithCredentials } from "./BackEndCalls";

export async function GetCategories(): Promise<
  TResponseWithCount<TCategoryOrBrand[]>
> {
  const url = `${BaseURl}Category/all-categories`;
  const result = await fetchDataWithCredentials(url);
  return result;
}

export async function AddCategories(
  body: TAddCategory[]
): Promise<TResponseWithCount<TCategories>> {
  const url = `${BaseURl}Category/add-categories`;
  const response = await fetchDataWithCredentials(url, "POST", body);
  return response;
}

export async function GetCategory(
  id: number
): Promise<TResponse<TGetCategory>> {
  const url = `${BaseURl}Category/${id}`;
  const response = await fetchDataWithCredentials(url);
  return response;
}

export async function UpdateCategoryBrands(
  body: TCategoryForm,
  id: number
): Promise<TResponse<TGetCategory>> {
  const url = `${BaseURl}Category/${id}/add-brand-to-category`;
  const response = await fetchDataWithCredentials(url, "POST", body);
  return response;
}

export async function UpdateCategory(
  body: TGenericUpdate,
  id: number
): Promise<TResponse<TCategoryOrBrand>> {
  const url = `${BaseURl}Category/${id}`;
  const response = await fetchDataWithCredentials(url, "PUT", body);
  return response;
}
