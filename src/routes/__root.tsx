import { createRootRouteWithContext } from "@tanstack/react-router";
import Navbar from "../UserInterface/NavBar";
import AppLayout from "../UserInterface/AppLayout";
import { QueryClient } from "@tanstack/react-query";
// import { TTokenContext } from "../Context/TokenContext";
// import { TLoginResponse } from "../Types";
import { TCreateContext } from "../Context/UserContext";
import { TCartContext } from "../Context/CartContext";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  user: TCreateContext;
  cart: TCartContext;
}>()({
  component: () => (
    <div className="flex flex-col gap-3 h-[100%]">
      <Navbar />
      <AppLayout />
    </div>
  ),
});
