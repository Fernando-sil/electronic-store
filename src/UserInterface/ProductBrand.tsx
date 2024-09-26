import { useSuspenseQuery } from "@tanstack/react-query";
import {
  useParams,
  Link,
  useSearch,
  useNavigate,
} from "@tanstack/react-router";
import HeadingElement from "./ReusableComponents/HeadingElement";
import ProductCard from "./ReusableComponents/ProductCard";
import { GetProductsByBrandOptions } from "../Queries/Items/GetItemsByBrandOptions";
import CategoryFilter from "./ReusableComponents/CategoryFilter";

function ProductBrand() {
  const { id } = useParams({ from: "/products/brands/$id/" });
  const { category } = useSearch({ from: "/products/brands/$id/" });
  const navigate = useNavigate({ from: "/products/brands/$id" });
  const { data: products } = useSuspenseQuery(
    GetProductsByBrandOptions(Number(id), category)
  );

  function handleSearchParams(category: string | undefined) {
    navigate({ search: { category: category } });
  }

  return (
    <section className="space-y-4">
      <HeadingElement>Shop {products.data.brand}</HeadingElement>
      <CategoryFilter
        categories={products.data.categories.map((category) => {
          return { name: category.name };
        })}
        setCategory={handleSearchParams}
        field="category"
      />
      {products.data.items.length === 0 ? (
        <HeadingElement className="text-rose-gold-400 pt-4">
          No products yet...
        </HeadingElement>
      ) : (
        <div className="flex flex-wrap gap-5">
          {products.data.items.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductBrand;
