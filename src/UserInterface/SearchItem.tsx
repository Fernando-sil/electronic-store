import { Link, useSearch } from "@tanstack/react-router";
import {
  CustomCard,
  CustomCardHeader,
  CustomCardTitle,
} from "./ReusableComponents/CustomCard";
import { useSuspenseQuery } from "@tanstack/react-query";
import { GetItemsOptions } from "../Queries/Items/GetItemsOptions";
import HeadingElement from "./ReusableComponents/HeadingElement";
import SearchItemBar from "./ReusableComponents/SearchItemBar";

function SearchItem() {
  const { name } = useSearch({ from: "/admin/items/searchItem" });
  const { data: items } = useSuspenseQuery(GetItemsOptions(name));

  return (
    <div className="space-y-6">
      <HeadingElement>Select item to edit</HeadingElement>
      <SearchItemBar urlReference="/admin/items/searchItem" />
      <section className="flex flex-col gap-4">
        {items.data.map((item) => (
          <Link key={item.id} to={`/admin/items/editItem/${item.id}`}>
            <CustomCard size="variable" className="flex">
              <img className="h-24 aspect-square" src={item.imageUrl} />
              <CustomCardHeader>
                <CustomCardTitle>{item.itemName}</CustomCardTitle>
              </CustomCardHeader>
            </CustomCard>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default SearchItem;
