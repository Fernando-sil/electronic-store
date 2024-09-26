import { BaseURl } from "../Constants";
import { TCart, TCartUpdate } from "../Types/CartTypes";
import { TResponse } from "../Types/Types";
import { fetchDataWithCredentials } from "./BackEndCalls";

export async function GetUserCart(): Promise<TResponse<TCart>> {
  const url = `${BaseURl}Cart`;
  const data = await fetchDataWithCredentials(url);
  return data;
}
export async function GetUserCartOnLogin(
  token: string
): Promise<TResponse<TCart>> {
  const url = `${BaseURl}Cart`;
  const data = await fetchDataWithCredentials(url, "GET", "", token);
  return data;
}
export async function UpdateCart(
  items: TCartUpdate
): Promise<TResponse<string>> {
  const url = `${BaseURl}CartItem/update-items`;
  const data = await fetchDataWithCredentials(url, "POST", items);
  return data;
}
