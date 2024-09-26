import CustomInput from "./ReusableComponents/CustomInput";
import { CustomButton } from "./ReusableComponents/CutomButton";
import Label from "./ReusableComponents/Label";
import RemoveFormFieldButton from "./ReusableComponents/RemoveFormFiledButton";
import { TGenericFormAddMultiple, TGenericUpdate } from "../Types/Types";
import { FromTIndexToGenericUpdate } from "../ObjectTypeConversions";
import { useGenericAddMultiple } from "../Queries/Generic/useGenericAdd";
import { useFormData, useSubmissionResponseWithNavigation } from "../Hooks";
import { SubmissionMessageBuilder } from "../HelperMethods";

// const Initial = { name: "" };

function AddGenericForm({
  field,
  classification,
  to,
}: {
  field: string;
  classification: string;
  to: string;
}) {
  const { addGenericMultiple } = useGenericAddMultiple();
  const { submissionResponseWithNavigation } =
    useSubmissionResponseWithNavigation();
  const {
    formData,
    setFormData,
    error,
    handleChange,
    handleAddFormField,
    handleRemoveFormField,
    validateForm,
  } = useFormData();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    validateForm();

    const brands = formData.map((data) => FromTIndexToGenericUpdate(data));
    const updateBrands: TGenericFormAddMultiple<TGenericUpdate> = {
      name: brands,
      field: field,
    };

    addGenericMultiple(
      updateBrands,
      submissionResponseWithNavigation(
        `${field} ${SubmissionMessageBuilder("create", "success")}`,
        `${SubmissionMessageBuilder("create", "fail")} ${field}`,
        "",
        to,
        setFormData([{ name: "" }])!
      )
    );
  }

  return (
    <section>
      <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
        {formData.map((data, index) => (
          <div key={index}>
            <div className="flex gap-3">
              <Label label={classification} className="w-full">
                <CustomInput
                  name="name"
                  type="text"
                  onChange={(e) => handleChange(e, index)}
                  value={data["name"]}
                />
              </Label>
              {index > 0 && (
                <RemoveFormFieldButton
                  handleRemoveFormField={handleRemoveFormField}
                  index={index}
                />
              )}
            </div>
            {error.includes(index) && (
              <p className="text-red-600">This field cannot be empty</p>
            )}
          </div>
        ))}
        <CustomButton
          buttonColor={"accent"}
          size={"large"}
          onClick={(e) => handleAddFormField(e)}
        >
          Add {classification}
        </CustomButton>
        <CustomButton className="mt-3">Save</CustomButton>
      </form>
    </section>
  );
}

export default AddGenericForm;
