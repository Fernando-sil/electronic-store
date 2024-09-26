import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import { GetItemsOptions } from "../Queries/Items/GetItemsOptions";
import HeadingElement from "./ReusableComponents/HeadingElement";
import SearchItemBar from "./ReusableComponents/SearchItemBar";
import ProductCard from "./ReusableComponents/ProductCard";
import { FromTItemsToTProductOnSale } from "../ObjectTypeConversions";

function SelectProduct() {
  const { itemName } = useSearch({ from: "/products/" });
  const { data: items } = useSuspenseQuery(GetItemsOptions(itemName));
  return (
    <div className="space-y-6 mb-5">
      <HeadingElement>Select or find item</HeadingElement>
      <SearchItemBar urlReference="/products/" />
      <section className="grid grid-cols-3 gap-5 items-stretch justify-stretch">
        {items.data.map((item) => (
          <Link
            key={item.id}
            to={`/products/${item.id}`}
            className="h-full contents"
          >
            <ProductCard product={FromTItemsToTProductOnSale(item)} />
          </Link>
        ))}
      </section>
    </div>
  );
}

export default SelectProduct;
