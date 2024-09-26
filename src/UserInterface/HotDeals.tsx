import HeadingElement from "./ReusableComponents/HeadingElement";
import { Link } from "@tanstack/react-router";
import ProductCard from "./ReusableComponents/ProductCard";
import { TProductOnsale } from "../Types/ProductTypes";
import { TResponseWithCount } from "../Types/Types";

function HotDeals({
  products,
}: {
  products: TResponseWithCount<TProductOnsale[]>;
}) {
  return (
    <section className="space-y-3">
      <HeadingElement data-testid="hotDeals">
        <span className="bg-gradient-to-t from-gold-100 via-orange-400 to-red-500 animate-gradient inline-block text-transparent bg-clip-text">
          HOT DEALS
        </span>{" "}
        🔥
      </HeadingElement>
      <div className="flex gap-5" data-testid="productCard">
        {products.data.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default HotDeals;
