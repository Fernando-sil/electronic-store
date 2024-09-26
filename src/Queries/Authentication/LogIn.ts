import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Route } from "../../routes/login";
import { TLogin } from "../../Types/AuthenticationTypes";
import { LogIn } from "../../Services/Authentication";
import { GetUserCartOnLoginOptions } from "../Cart/GetUserCartOnLoginOptions";

type TSearch = {
  fallback: string;
};

export function LogInUser() {
  const queryClient = useQueryClient();
  const user = useContext(UserContext);
  const cart = useContext(CartContext);
  const fallback: TSearch = useSearch({ from: Route.fullPath });
  const navigate = useNavigate({ from: Route.fullPath });

  const {
    mutate: login,
    data,
    isPending,
  } = useMutation({
    mutationFn: (credentials: TLogin) => LogIn(credentials),
    onSuccess: async (data) => {
      user.setUser(data?.data);
      const userCart = await queryClient.ensureQueryData(
        GetUserCartOnLoginOptions(data?.data.token)
      );
      cart.setCart(userCart.data);
      navigate({
        to: fallback.fallback !== undefined ? fallback.fallback : "/",
      });
    },
  });

  return { login, data, isPending };
}
