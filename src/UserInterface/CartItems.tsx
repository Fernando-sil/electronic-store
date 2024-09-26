import { TCart } from "../Types/CartTypes";
import CardItemCart from "./CartItemCard";

function CartItems({ cart }: { cart: TCart }) {
  return (
    <section className="space-y-5">
      {cart.cartItems.map((item) => (
        <CardItemCart item={item} key={item.itemId} />
      ))}
    </section>
  );
}

export default CartItems;
