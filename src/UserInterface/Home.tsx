import { useSuspenseQuery } from "@tanstack/react-query";
import { GetMultipleOptions } from "../Queries/Generic/GetMultipleOptions";
import { getItemsOnSale } from "../Queries/Items/GetItemsOnSale";
import HotDeals from "./HotDeals";
import PopularBrands from "./PopularBrands";
import ShopByCategories from "./ShopByCategories";

function Home() {
  const { data: products } = useSuspenseQuery(getItemsOnSale());
  const { data: brands } = useSuspenseQuery(
    GetMultipleOptions("Brand/popular-brands")
  );
  const { data: categories } = useSuspenseQuery(
    GetMultipleOptions("Category/all-categories")
  );
  return (
    <div className="space-y-10">
      <HotDeals products={products} />
      <PopularBrands brands={brands} />
      <ShopByCategories categories={categories} />
    </div>
  );
}

export default Home;
