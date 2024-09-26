import { BaseURl } from "../Constants";
import {
  TSpecs,
  TSpecification,
  TItemSpecs,
  TAddSpecs,
} from "../Types/SpecificationTypes";
import { TResponseWithCount, TResponse } from "../Types/Types";
import { fetchDataWithCredentials } from "./BackEndCalls";

export async function GetSpecs(): Promise<TResponseWithCount<TSpecs>> {
  const url = `${BaseURl}specs`;
  const result = await fetchDataWithCredentials(url);
  return result;
}

export async function AddSpecsToItem(
  body: TSpecification[],
  itemId: string
): Promise<TResponse<TItemSpecs>> {
  const url = `${BaseURl}Item/${itemId}/add-specs-to-item`;
  const result = await fetchDataWithCredentials(url, "POST", body);
  return result;
}

export async function AddSpecs(body: TAddSpecs[]): Promise<TResponse<TSpecs>> {
  const url = `${BaseURl}specs/add-specs`;
  const result = await fetchDataWithCredentials(url, "POST", body);
  return result;
}
