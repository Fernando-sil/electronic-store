import { TAddBrand, TBrand, TBrands } from "../Types/BrandTypes";
import {
  TCategoryOrBrand,
  TResponse,
  TResponseWithCount,
} from "../Types/Types";
import { fetchDataWithCredentials } from "./BackEndCalls";

export async function GetBrands(): Promise<
  TResponseWithCount<TCategoryOrBrand[]>
> {
  const url = "http://localhost:5211/api/Brand/all-brands";
  const result = await fetchDataWithCredentials(url);
  return result;
}

export async function AddBrands(
  body: TAddBrand[]
): Promise<TResponse<TBrands>> {
  const url = "http://localhost:5211/api/Brand/add-brands";
  const result = await fetchDataWithCredentials(url, "POST", body);
  return result;
}

export async function UpdateBrand(
  body: TAddBrand,
  id: number
): Promise<TResponse<TBrand>> {
  const url = `http://localhost:5211/api/Brand/${id}`;
  const result = await fetchDataWithCredentials(url, "PUT", body);
  return result;
}
