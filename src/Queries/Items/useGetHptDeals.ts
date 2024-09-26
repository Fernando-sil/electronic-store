import { useQuery } from "@tanstack/react-query";
import { GetProductsOnSale } from "../../Services/Products";

export function useGetHotDeals() {
  const {
    data: getHotDeals,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["test-hotDeals"],
    queryFn: GetProductsOnSale,
  });

  return { getHotDeals, isLoading, isSuccess };
}
