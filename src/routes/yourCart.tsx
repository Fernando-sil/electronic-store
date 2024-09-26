import { createFileRoute, redirect } from "@tanstack/react-router";
import ShoppingCart from "../UserInterface/ShopingCart";
import { GetCartOptions } from "../Queries/Cart/GetCartOptions";
import { GetUserSession } from "../Services/BackEndCalls";
// import { TLoginResponse } from "../Types/AuthenticationTypes";

export const Route = createFileRoute("/yourCart")({
  beforeLoad: async ({ context }) => {
    const user = context.user.user;
    const UserSession = GetUserSession();
    const currentUser = user?.userName === "" ? UserSession : user;

    if (currentUser === null) {
      throw redirect({
        to: "/login",
        // from: location.pathname,
        search: { fallback: "/yourCart" },
      });
    }
  },
  loader: async ({ context }) => {
    const cart = context.cart;
    const userCart =
      await context.queryClient.ensureQueryData(GetCartOptions());
    cart.setCart(userCart.data);
    return userCart;
  },
  component: () => <ShoppingCart />,
});
