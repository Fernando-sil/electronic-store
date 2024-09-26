import { useMutation } from "@tanstack/react-query";
import { TCartUpdate } from "../../Types/CartTypes";
import { UpdateCart } from "../../Services/Cart";

export function UpdateCartItems() {
  const {
    mutate: updateCartItems,
    data,
    isPending,
  } = useMutation({
    mutationFn: (cartItems: TCartUpdate) => UpdateCart(cartItems),
  });
  return { updateCartItems, data, isPending };
}
