import HeadingElement from "./ReusableComponents/HeadingElement";
import ItemForm from "./ItemForm";

function AddItem() {
  return (
    <section>
      <div className="p-4">
        <HeadingElement>New Item</HeadingElement>
        <ItemForm />
      </div>
    </section>
  );
}

export default AddItem;
