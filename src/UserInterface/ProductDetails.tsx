import { useSuspenseQuery } from "@tanstack/react-query";
import {
  CustomCard,
  CustomCardBody,
  CustomCardHeader,
} from "./ReusableComponents/CustomCard";
import CustomGrid from "./ReusableComponents/CustomGrid";
import { CustomButton } from "./ReusableComponents/CutomButton";
import HeadingElement from "./ReusableComponents/HeadingElement";
import { getItemOptions } from "../Queries/Items/GetItemOptions";
import { useParams } from "@tanstack/react-router";
import StarGenerator from "./ReusableComponents/StarGenerator";
import Reviews from "./Reviews";
import ProductInformation from "./ProductInformation";
import { TResponse } from "../Types/Types";
import { IoMdCart } from "react-icons/io";
import { IconContext } from "react-icons";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { FromItemToCartItem } from "../ObjectTypeConversions";
import { TItem } from "../Types/ProductTypes";

function ProductDetails() {
  const { id } = useParams({ from: "/products/$id/" });

  const { data: product } = useSuspenseQuery(getItemOptions(id));
  const { AddCartItem, cart } = useContext(CartContext);

  const isItemInCart = cart?.cartItems.some(
    (items) => items.itemId === product.data.id
  );

  return (
    <div className="space-y-8 h-[100%]">
      <TitleSection product={product} />
      <CustomGrid
        numberOfCols="custom"
        colGap={5}
        className="grid-cols-[2fr_1fr]"
      >
        <section>
          <CustomCard
            size="full"
            className="bg-white flex items-center justify-center"
          >
            <img
              src={product.data.imageUrl}
              alt="laptop"
              className="rounded-lg h-[32rem]"
            ></img>
          </CustomCard>
        </section>
        <div className="flex flex-col justify-between">
          <ProductInformation product={product} />
          <div className="flex gap-1">
            <HeadingElement heading="h5">$</HeadingElement>
            <HeadingElement heading="h2" className="text-rose-gold-500">
              {product.data.price}
            </HeadingElement>
          </div>
          <CustomButton
            disabled={isItemInCart}
            className="text-2xl"
            onClick={() => AddCartItem(FromItemToCartItem(product.data))}
          >
            {isItemInCart ? (
              "Item already in cart!"
            ) : (
              <>
                <IconContext.Provider
                  value={{ className: "text-rose-gold-600" }}
                >
                  <IoMdCart size="2rem" />
                </IconContext.Provider>
                Add to cart
              </>
            )}
          </CustomButton>
        </div>
      </CustomGrid>
      <ProductDescription description={product.data.description} />
      <Reviews product={product} />
    </div>
  );
}

function TitleSection({ product }: { product: TResponse<TItem> }) {
  return (
    <div className="space-y-1">
      <HeadingElement className="bg-gradient-to-r from-gold-400  to-rose-gold-500 inline-block text-transparent bg-clip-text leading-[3.5rem]">
        {product.data.itemName}
      </HeadingElement>
      <div className="flex gap-1 items-center">
        <HeadingElement heading="h4" className="text-rose-gold-400">
          {product.data.averageRating}
        </HeadingElement>
        <StarGenerator score={product.data.averageRating} />
      </div>
    </div>
  );
}

function ProductDescription({ description }: { description: string }) {
  return (
    <CustomCard cardColor={"accent"} size={"full"}>
      <CustomCardHeader>
        <HeadingElement heading={"h4"}>Description</HeadingElement>
      </CustomCardHeader>
      <CustomCardBody className="py-1">{description}</CustomCardBody>
    </CustomCard>
  );
}

export default ProductDetails;
