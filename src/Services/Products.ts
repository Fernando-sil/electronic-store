import { BaseURl } from "../Constants";
import {
  TItem,
  TItems,
  TUpdateProducts,
  TProductOnsale,
  TItemForm,
  TProductsByCategory,
  TProductsByBrand,
} from "../Types/ProductTypes";
import { TResponse, TResponseWithCount } from "../Types/Types";
import { fetchDataWithCredentials } from "./BackEndCalls";

export async function GetProduct(id: string): Promise<TResponse<TItem>> {
  const url = `${BaseURl}Item/${id}`;
  const data = await fetchDataWithCredentials(url);
  return data;
}

export async function GetProducts(
  itemName?: string
): Promise<TResponseWithCount<TItems[]>> {
  const url =
    itemName === null || itemName === undefined || itemName === ""
      ? `${BaseURl}Item/all-items`
      : `${BaseURl}Item/all-items?name=${itemName}`;
  const result = await fetchDataWithCredentials(url);
  return result;
}

export async function UpdateProduct(
  body: TUpdateProducts,
  id: string
): Promise<TResponse<TItem>> {
  const url = `${BaseURl}Item/${id}`;
  const response = fetchDataWithCredentials(url, "PUT", body);
  return response;
}

export async function GetProductsOnSale(): Promise<
  TResponseWithCount<TProductOnsale[]>
> {
  const url = `${BaseURl}Item/items-on-sale`;
  const data = await fetchDataWithCredentials(url);
  return data;
}

export async function AddProduct(body: TItemForm): Promise<TResponse<TItem>> {
  const url = `${BaseURl}Item/add-item`;
  const data = await fetchDataWithCredentials(url, "POST", body);
  return data;
}

export async function GetProductsByCategory(
  id: number,
  brand?: string
): Promise<TResponseWithCount<TProductsByCategory>> {
  const baseUrl = `${BaseURl}Item/category/${id}`;
  const url =
    brand === undefined || brand === "" ? baseUrl : `${baseUrl}?name=${brand}`;

  const data = await fetchDataWithCredentials(url);
  return data;
}
export async function GetProductsByBrand(
  id: number,
  category?: string
): Promise<TResponseWithCount<TProductsByBrand>> {
  const baseUrl = `${BaseURl}Item/brand/${id}`;
  const url =
    category === undefined || category === ""
      ? baseUrl
      : `${baseUrl}?name=${category}`;
  const data = await fetchDataWithCredentials(url);
  return data;
}
