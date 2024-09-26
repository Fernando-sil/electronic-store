import { useState } from "react";
import CustomInput from "./ReusableComponents/CustomInput";
import { CustomButton } from "./ReusableComponents/CutomButton";
import Label from "./ReusableComponents/Label";
import { useAddCategories } from "../Queries/Categories/useAddCategory";
import HeadingElement from "./ReusableComponents/HeadingElement";
import { TAddCategory } from "../Types/CategoryTypes";

type TIndexing = {
  [key: string]: string;
};

const initial: TIndexing = { category: "" };

function AddCategories() {
  const { addCategory } = useAddCategories();
  const [formData, setFormData] = useState([initial]);
  const [error, setError] = useState([-1]);
  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const data = [...formData];
    data[index][e.target.name] = e.target.value;
    setFormData(data);
  }

  function handleRemoveFormField(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) {
    e.preventDefault();
    const data = [...formData];
    data.splice(index, 1);
    setFormData(data);
  }

  function validateForm() {
    const errors = [-1];
    formData.map((data, index) => {
      if (data["name"] === "") {
        if (errors[0] === -1) {
          errors[0] = index;
        } else {
          errors.push(index);
        }
      }
    });
    setError([...errors]);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    validateForm();
    const dataToSubmit = formData.filter((data) => data["category"] !== "");
    const submitData: TAddCategory[] = dataToSubmit.map((element) => {
      return { categoryName: element["category"] };
    });
    addCategory(submitData);
  }

  return (
    <section className="space-y-4">
      <HeadingElement>Add Categories</HeadingElement>
      <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
        {formData.map((field, index) => (
          <div key={index}>
            <div className="flex gap-3 items-center">
              <Label label="Category">
                <CustomInput
                  name="category"
                  type="text"
                  onChange={(e) => handleInputChange(e, index)}
                  value={field["category"]}
                />
              </Label>
              {index > 0 && (
                <CustomButton
                  className="place-self-end bg-red-500"
                  size="small"
                  onClick={(e) => handleRemoveFormField(e, index)}
                >
                  Delete
                </CustomButton>
              )}
            </div>
            {error.includes(index) && (
              <p className="text-red-600">This field cannot be empty</p>
            )}
          </div>
        ))}
        <CustomButton
          size="medium"
          buttonColor="accent"
          onClick={(e) => {
            e.preventDefault();
            setFormData([...formData, { category: "" }]);
          }}
        >
          Add more
        </CustomButton>
        <CustomButton>Save</CustomButton>
      </form>
    </section>
  );
}

export default AddCategories;
