import { MdPayment } from "react-icons/md";
import CartSummary from "./CartSummary";
import CustomGrid from "./ReusableComponents/CustomGrid";
import { CustomButton } from "./ReusableComponents/CutomButton";
import HeadingElement from "./ReusableComponents/HeadingElement";
import { IconContext } from "react-icons";
import { IoMdCart } from "react-icons/io";
import CartItems from "./CartItems";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { UpdateCartItems } from "../Queries/Cart/UpdateCartItems";
import { FromCartItemsToCartUpdate } from "../ObjectTypeConversions";
import { useSubmissionResponse } from "../Hooks";
import { SubmissionMessageBuilder } from "../HelperMethods";

function ShoppingCart() {
  const cartContext = useContext(CartContext);
  const { updateCartItems } = UpdateCartItems();
  const { submissionResponse } = useSubmissionResponse();

  return (
    <div className="space-y-8">
      <div className="flex gap-2 items-center">
        <HeadingElement>Your Cart</HeadingElement>
        <IoMdCart size="4rem" />
      </div>
      <CustomGrid
        numberOfCols="custom"
        colGap={5}
        className="grid-cols-[2fr_1fr]"
      >
        <div className="flex flex-col justify-between">
          <CartItems cart={cartContext.cart!} />
          <CustomButton
            className="text-2xl"
            onClick={() =>
              updateCartItems(
                FromCartItemsToCartUpdate(cartContext.cart!.cartItems),
                submissionResponse(
                  `Cart ${SubmissionMessageBuilder("update", "success")}`,
                  `${SubmissionMessageBuilder("update", "fail")} cart`,
                  ""
                )
              )
            }
          >
            <IconContext.Provider value={{ className: "text-rose-gold-600" }}>
              <MdPayment size="2rem" /> Procede to payment
            </IconContext.Provider>
          </CustomButton>
        </div>
        <CartSummary cart={cartContext.cart!} />
      </CustomGrid>
    </div>
  );
}

export default ShoppingCart;

// http://localhost:5173/products/fb75f63e-8279-47de-cf7f-08dcba180e6e
