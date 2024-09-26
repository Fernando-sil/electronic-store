import * as productFunctions from "../../Services/BackEndCalls";
import { TResponseWithCount, TGenericGetMultiple } from "../../Types/Types";

const categories: TResponseWithCount<TGenericGetMultiple[]> = {
  count: 5,
  data: [
    {
      id: 1,
      name: "Computers",
    },
    {
      id: 2,
      name: "Laptops",
    },
    {
      id: 3,
      name: "Tablets",
    },
    {
      id: 4,
      name: "Headphones & Speakers",
    },
    {
      id: 5,
      name: "Cellphones",
    },
  ],
  success: true,
  message: "",
};

export function spyCategories() {
  jest
    .spyOn(productFunctions, "fetchDataWithCredentials")
    .mockResolvedValue(categories);
}
