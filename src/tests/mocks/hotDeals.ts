import { TProductOnsale } from "../../Types/ProductTypes";
import { TResponseWithCount } from "../../Types/Types";
import * as productFunctions from "../../Services/BackEndCalls";

const productObject: TResponseWithCount<TProductOnsale[]> = {
  count: 3,
  data: [
    {
      id: "fb75f63e-8279-47de-cf7f-08dcba180e6e",
      itemName:
        "HP 15.6in HD Business Laptop, Intel Pentium N200 Processor, 16GB RAM, 128GB SSD",
      imageUrl:
        "https://i5.walmartimages.com/asr/e30bffdb-feed-4507-9992-81f6bbb0d597.63751803b15eb3b68dcda668ccc54e2e.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
      price: 589,
      score: 4.7,
      categoryName: "",
    },
    {
      id: "a83a56b4-35f3-4474-cf80-08dcba180e6e",
      itemName:
        "Lenovo IdeaPad 3 14in Laptop, Intel Core i3-1005G1 Processor, 4GB DDR4 RAM, 128GB M.2 SSD Storage",
      imageUrl:
        "https://i5.walmartimages.com/asr/6c9a9742-1eb9-4430-87cf-a18daa7af0c3.1d3316a6bdbefcf06b7fdba083f7760f.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
      price: 379.99,
      score: 4,
      categoryName: "",
    },
    {
      id: "88fc128e-e39a-448f-cf81-08dcba180e6e",
      itemName:
        "ASUS VivoBook 14 X415 Thin and Light Laptop, 14in FHD Display, Intel Core i3-1115G4 Processor",
      imageUrl:
        "https://m.media-amazon.com/images/I/41lval8GR5L._AC_SX425_.jpg",
      price: 509.99,
      score: 2,
      categoryName: "",
    },
  ],
  success: true,
  message: "",
};

export function spyHotDeals() {
  jest
    .spyOn(productFunctions, "fetchDataWithCredentials")
    .mockResolvedValue(productObject);
}
