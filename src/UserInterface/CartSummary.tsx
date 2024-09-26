import { TCart } from "../Types/CartTypes";
import {
  CustomCard,
  CustomCardHeader,
  CustomCardTitle,
  CustomCardBody,
} from "./ReusableComponents/CustomCard";
import CustomGrid from "./ReusableComponents/CustomGrid";
import HeadingElement from "./ReusableComponents/HeadingElement";

function CartSummary({ cart }: { cart: TCart }) {
  return (
    <section>
      <CustomCard cardColor="accent">
        <CustomCardHeader>
          <CustomCardTitle>Cart Summary</CustomCardTitle>
        </CustomCardHeader>
        <CustomCardBody className="space-y-3">
          {cart.cartItems.map((item) => (
            <CustomGrid
              className="border-y-2 border-text-color-700"
              key={item.itemId}
            >
              <p>Product</p>
              <p>{item.itemName}</p>
              <p>Quantity</p>
              <p>{item.quantity}</p>
              <p>Sub Total</p>
              <p>${item.subTotal}</p>
              {/* <p>${item.price * item.quantity}</p> */}
            </CustomGrid>
          ))}
          <CustomGrid>
            <HeadingElement heading="h3">Total</HeadingElement>
            <HeadingElement heading="h3">${cart.total}</HeadingElement>
          </CustomGrid>
        </CustomCardBody>
      </CustomCard>
    </section>
  );
}

export default CartSummary;
