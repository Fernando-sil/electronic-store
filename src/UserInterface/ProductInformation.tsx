import React from "react";
import { TItem } from "../Types/ProductTypes";
import { TResponse } from "../Types/Types";
import {
  CustomCard,
  CustomCardHeader,
  CustomCardTitle,
  CustomCardBody,
} from "./ReusableComponents/CustomCard";
import CustomGrid from "./ReusableComponents/CustomGrid";

function ProductInformation({ product }: { product: TResponse<TItem> }) {
  return (
    <section>
      <CustomCard size="large">
        <CustomCardHeader>
          <CustomCardTitle>Product Information</CustomCardTitle>
        </CustomCardHeader>
        <CustomCardBody>
          <CustomGrid>
            <p>Brand</p>
            <p>{product.data.itemBrand.name}</p>
            {product.data.itemSpecifications.map((spec) => (
              <React.Fragment key={spec.id}>
                <p>{spec.spec}</p>
                <p>{spec.value}</p>
              </React.Fragment>
            ))}
          </CustomGrid>
        </CustomCardBody>
      </CustomCard>
    </section>
  );
}

export default ProductInformation;
