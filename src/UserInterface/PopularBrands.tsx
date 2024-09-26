import { CustomCard, CustomCardTitle } from "./ReusableComponents/CustomCard";
import HeadingElement from "./ReusableComponents/HeadingElement";
import { Link } from "@tanstack/react-router";
import { TResponseWithCount, TGenericGetMultiple } from "../Types/Types";

function PopularBrands({
  brands,
}: {
  brands: TResponseWithCount<TGenericGetMultiple[]>;
}) {
  return (
    <section className="space-y-5">
      <HeadingElement data-testid="popularBrands">
        Popular Brands
      </HeadingElement>
      <div className="flex gap-5 flex-wrap ml-12" data-testid="brands">
        {brands.data.map((brand) => (
          <Link key={brand.id} to={`/products/brands/${brand.id}`}>
            <CustomCard
              size="small"
              className="flex flex-col justify-between p-3 h-full bg-rose-gold-600 hover:scale-105 transition-all"
              data-testid="brandCard"
            >
              <img
                src={brand.imageUrl}
                alt={`${brand.name} logo`}
                className="h-40"
              ></img>
              <CustomCardTitle>{brand.name}</CustomCardTitle>
            </CustomCard>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default PopularBrands;
