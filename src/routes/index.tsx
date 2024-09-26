import { createFileRoute } from "@tanstack/react-router";
// import HotDeals from "../UserInterface/HotDeals";
// import PopularBrands from "../UserInterface/PopularBrands";
import { getItemsOnSale } from "../Queries/Items/GetItemsOnSale";
import { GetMultipleOptions } from "../Queries/Generic/GetMultipleOptions";
// import ShopByCategories from "../UserInterface/ShopByCategories";
import Home from "../UserInterface/Home";

export const Route = createFileRoute("/")({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(getItemsOnSale());
    await queryClient.ensureQueryData(
      GetMultipleOptions("Brand/popular-brands")
    );
    await queryClient.ensureQueryData(
      GetMultipleOptions("Category/all-categories")
    );
  },
  component: () => {
    return <Home />;
  },
});
// export const Route = createFileRoute("/")({
//   loader: ({ context: { queryClient } }) =>
//     queryClient.ensureQueryData(getItemsOnSale()),
//   component: () => (
//     <>
//       <HotDeals />
//       <PopularBrands />
//     </>
//   ),
// });
