import * as productFunctions from "../../Services/BackEndCalls";
import { TResponseWithCount, TGenericGetMultiple } from "../../Types/Types";

const popularBrands: TResponseWithCount<TGenericGetMultiple[]> = {
  count: 5,
  data: [
    {
      id: 1,
      name: "Apple",
      imageUrl:
        "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png",
    },
    {
      id: 2,
      name: "Acer",
      imageUrl:
        "https://1000logos.net/wp-content/uploads/2016/09/Acer-Logo-2001.png",
    },
    {
      id: 3,
      name: "Dell",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/8/82/Dell_Logo.png",
    },
    {
      id: 6,
      name: "Microsoft",
      imageUrl:
        "https://cdn.prod.website-files.com/5ee732bebd9839b494ff27cd/5eef3a3260847d0d2783a76d_Microsoft-Logo-PNG-Transparent-Image.png",
    },
    {
      id: 8,
      name: "Samsung",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/1024px-Samsung_Logo.svg.png",
    },
  ],
  success: true,
  message: "",
};

export function spyPopularBrands() {
  jest
    .spyOn(productFunctions, "fetchDataWithCredentials")
    .mockResolvedValue(popularBrands);
}
