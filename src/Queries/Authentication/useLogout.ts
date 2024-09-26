import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { LogUserOut } from "../../Services/Authentication";
import { TLoginResponse } from "../../Types/AuthenticationTypes";
import { useNavigate } from "@tanstack/react-router";
import { TCart, TCartItem } from "../../Types/CartTypes";
import { CartContext } from "../../Context/CartContext";

const initialState: TLoginResponse = {
  id: "",
  userName: "",
  emailAddress: "",
  confirmedEmail: false,
  role: "",
  isActive: true,
  token: "",
};

const initialStateCart: TCart = {
  dateCreated: new Date(),
  isPurchasePaid: false,
  datePurchasePaid: new Date(),
  userName: "",
  cartItems: new Array<TCartItem>(),
  total: 0,
};

export function useLogout() {
  const user = useContext(UserContext);
  const cart = useContext(CartContext);
  const navigate = useNavigate();
  const {
    mutate: logout,
    data,
    isPending,
  } = useMutation({
    mutationFn: LogUserOut,
    onSuccess: () => {
      user.setUser(initialState);
      cart.setCart(initialStateCart);
      sessionStorage.clear();
      localStorage.clear();
      navigate({ to: "/" });
    },
  });
  return { logout, data, isPending };
}
