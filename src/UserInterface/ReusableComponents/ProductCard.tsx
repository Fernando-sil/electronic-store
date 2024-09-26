import { TProductOnsale } from "../../Types/ProductTypes";
import { CustomCard, CustomCardTitle, CustomCardBody } from "./CustomCard";
import StarGenerator from "./StarGenerator";

function ProductCard({ product }: { product: TProductOnsale }) {
  return (
    <CustomCard
      cardColor="primary"
      className="h-full hover:scale-105 transition-all"
      data-testid="customCard"
    >
      <div className="h-full flex flex-col justify-between">
        <CustomCard className="bg-white rounded-none">
          <img
            src={product.imageUrl}
            alt="laptop"
            className="h-48 mx-auto"
          ></img>
        </CustomCard>
        <CustomCardTitle>{product.itemName}</CustomCardTitle>
        <CustomCardBody>
          <div className="flex justify-between items-center">
            <p className="font-medium italic text-2xl">${product.price}</p>
            <StarGenerator
              score={product.score}
              className="text-rose-gold-600"
            />
          </div>
        </CustomCardBody>
      </div>
    </CustomCard>
  );
}

export default ProductCard;
