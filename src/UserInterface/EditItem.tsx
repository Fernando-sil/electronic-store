import { useLoaderData, useParams } from "@tanstack/react-router";
import ItemForm from "./ItemForm";
import HeadingElement from "./ReusableComponents/HeadingElement";
import { FromItemsToItemForm } from "../ObjectTypeConversions";

function EditItem() {
  const item = useLoaderData({ from: "/admin/items/editItem/$id/" });
  const { id } = useParams({ from: "/admin/items/editItem/$id/" });
  const itemData = item.data;
  const itemForm = FromItemsToItemForm(itemData);
  return (
    <section>
      <div className="p-4">
        <HeadingElement>Edit Item</HeadingElement>
        <ItemForm edit item={itemForm} id={id} />
      </div>
    </section>
  );
}

export default EditItem;
