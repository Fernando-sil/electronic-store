import { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import {
  CustomCard,
  CustomCardBody,
  CustomCardTitle,
} from "./ReusableComponents/CustomCard";
import CustomGrid from "./ReusableComponents/CustomGrid";
import { CustomButton } from "./ReusableComponents/CutomButton";
import HeadingElement from "./ReusableComponents/HeadingElement";
import { TCartItem } from "../Types/CartTypes";

function CardItemCart({ item }: { item: TCartItem }) {
  const cartContext = useContext(CartContext);
  const [itemQuantity, setItemQuantity] = useState(0);

  function IncreaseQuantity(itemId: string, quantity: number) {
    setItemQuantity(quantity + 1);
    cartContext.IncrementCartItemQuantity(itemId);
  }
  function DecreaseQuantity(itemId: string, quantity: number) {
    setItemQuantity(quantity - 1);
    if (item.quantity === 1) {
      cartContext.RemoveCartItem(itemId);
      return;
    }
    cartContext.DecrementCartItemQuantity(itemId);
  }
  const quantity = itemQuantity === 0 ? item.quantity : itemQuantity;
  return (
    <CustomCard size="full">
      <div className="flex items-center justify-between">
        <div className="flex">
          <img
            src={item.imageUrl}
            alt="laptop"
            className="h-32 aspect-square"
          />
          <CustomCardBody className="flex items-center gap-5 px-4 py-1">
            <div className="space-y-3">
              <CustomCardTitle>{item.itemName}</CustomCardTitle>
              <CustomGrid colGap={0}>
                <p>Quantity</p>
                <p data-testid="test">x{quantity}</p>
                <p>Sub Total</p>
                <p className="text-gold-400">${item.subTotal}</p>
              </CustomGrid>
            </div>
            <div className="flex items-center gap-3">
              <div className="space-y-3">
                <CustomButton
                  size="full"
                  buttonColor="accent"
                  className="py-1 px-3"
                  onClick={() => IncreaseQuantity(item.itemId, item.quantity)}
                  data-testid="button"
                >
                  +
                </CustomButton>
                <CustomButton
                  size="full"
                  buttonColor="accent"
                  className="py-1 px-3"
                  onClick={() => DecreaseQuantity(item.itemId, item.quantity)}
                >
                  -
                </CustomButton>
              </div>
              <HeadingElement
                heading="h2"
                className="text-gold-400"
                data-testid="heading"
              >
                {itemQuantity === 0 ? item.quantity : itemQuantity}
              </HeadingElement>
            </div>
          </CustomCardBody>
        </div>
      </div>
    </CustomCard>
  );
}

export default CardItemCart;
