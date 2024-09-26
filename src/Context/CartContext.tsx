import { createContext, useEffect, useState } from "react";
import { TCart, TCartItem } from "../Types/CartTypes";

export type TCartContext = {
  cart: TCart | null;
  setCart: (cart: TCart) => void;
  AddCartItem: (item: TCartItem) => void;
  RemoveCartItem: (itemId: string) => void;
  IncrementCartItemQuantity: (itemId: string) => void;
  DecrementCartItemQuantity: (itemId: string) => void;
};

const CartContext = createContext<TCartContext>({
  cart: null,
  setCart: () => null,
  AddCartItem: () => null,
  RemoveCartItem: () => null,
  IncrementCartItemQuantity: () => null,
  DecrementCartItemQuantity: () => null,
});

const initialState: TCart = {
  dateCreated: new Date(),
  isPurchasePaid: false,
  datePurchasePaid: new Date(),
  userName: "",
  cartItems: new Array<TCartItem>(),
  total: 0,
};

function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState(initialState);

  function SetTotal(items: TCartItem[]) {
    return Number(
      items
        .reduce((acc, item) => acc + item.quantity * item.price, 0)
        .toFixed(2)
    );
  }

  function SetQuantity(item: TCartItem, isDecreasing: boolean = false) {
    const newQuantity = !isDecreasing ? item.quantity + 1 : item.quantity - 1;
    return {
      ...item,
      quantity: newQuantity,
      subTotal: newQuantity * item.price,
    };
  }

  useEffect(() => {
    if (cart.cartItems.length === 0) return;
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cartItems")!);
    if (cart) {
      setCart(cart);
    }
  }, []);

  function UpdateCartPostAction(cartItems: TCartItem[]) {
    setCart({ ...cart, cartItems: cartItems, total: SetTotal(cartItems) });
  }

  function AddCartItem(item: TCartItem) {
    const cartItem = cart!.cartItems.concat(item);
    UpdateCartPostAction(cartItem);
  }

  function RemoveCartItem(itemId: string) {
    const items = cart.cartItems.filter((element) => element.itemId !== itemId);
    UpdateCartPostAction(items);
  }

  function IncrementCartItemQuantity(itemId: string) {
    const items = cart.cartItems.map((item) =>
      item.itemId === itemId ? SetQuantity(item) : item
    );
    UpdateCartPostAction(items);
  }
  function DecrementCartItemQuantity(itemId: string) {
    const items = cart.cartItems.map((item) =>
      item.itemId === itemId ? SetQuantity(item, true) : item
    );
    UpdateCartPostAction(items);
  }
  const value = {
    cart,
    setCart,
    AddCartItem,
    RemoveCartItem,
    IncrementCartItemQuantity,
    DecrementCartItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export { CartContext, CartProvider };
