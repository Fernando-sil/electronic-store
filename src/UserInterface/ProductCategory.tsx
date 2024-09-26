import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Link,
  useNavigate,
  useParams,
  useSearch,
} from "@tanstack/react-router";
import HeadingElement from "./ReusableComponents/HeadingElement";
import { GetProductsByCategoryOptions } from "../Queries/Items/GetItemsByCategoryOptions";
import ProductCard from "./ReusableComponents/ProductCard";
import CategoryFilter from "./ReusableComponents/CategoryFilter";

function ProductCategory() {
  const { id } = useParams({ from: "/products/categories/$id/" });
  const { brand } = useSearch({ from: "/products/categories/$id/" });
  const navigate = useNavigate({ from: "/products/categories/$id" });
  const { data: products } = useSuspenseQuery(
    GetProductsByCategoryOptions(Number(id), brand)
  );
  function handleSearchParams(brand: string | undefined) {
    navigate({ search: { brand: brand } });
  }

  return (
    <section className="space-y-3">
      <HeadingElement>Shop {products.data.category}</HeadingElement>
      <CategoryFilter
        categories={products.data.brands.map((brand) => {
          return { name: brand.name, imageUrl: brand.imageUrl };
        })}
        setCategory={handleSearchParams}
        field="brand"
      />
      {products.data.items.length > 0 ? (
        <div className="flex flex-wrap gap-5">
          {products.data.items.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      ) : (
        <HeadingElement className="text-rose-gold-500">
          No products under selected brand
        </HeadingElement>
      )}
    </section>
  );
}

export default ProductCategory;
