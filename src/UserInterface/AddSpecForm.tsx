import { useState } from "react";
import { useAddSpecs } from "../Queries/Specs/useAddSpec";
import { TIndexing } from "../Types/Types";
import { FromTIndexToSpec } from "../ObjectTypeConversions";
import CustomInput from "./ReusableComponents/CustomInput";
import { CustomButton } from "./ReusableComponents/CutomButton";
import Label from "./ReusableComponents/Label";
import RemoveFormFieldButton from "./ReusableComponents/RemoveFormFiledButton";

const Initial = { spec: "" };

function AddSpecForm() {
  const { addSpecs } = useAddSpecs();
  const [formData, setFormData] = useState<TIndexing[]>([{ spec: "" }]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
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

  function handleAddFormField(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    setFormData([...formData, { ...Initial }]);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const specs = formData.map((data) => FromTIndexToSpec(data));
    addSpecs(specs);
  }
  return (
    <section>
      <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
        {formData.map((data, index) => (
          <div key={index} className="flex gap-3">
            <Label label="Brand">
              <CustomInput
                name="brandName"
                type="text"
                onChange={(e) => handleChange(e, index)}
                value={data["brandName"]}
              />
            </Label>
            {index > 0 && (
              <RemoveFormFieldButton
                handleRemoveFormField={handleRemoveFormField}
                index={index}
              />
            )}
          </div>
        ))}
        <CustomButton
          buttonColor={"accent"}
          size={"medium"}
          onClick={(e) => handleAddFormField(e)}
        >
          Add Brand
        </CustomButton>
        <CustomButton className="mt-3">Save</CustomButton>
      </form>
    </section>
  );
}

export default AddSpecForm;
