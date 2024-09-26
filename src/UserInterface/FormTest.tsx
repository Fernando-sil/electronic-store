import { useForm } from "react-hook-form";
import {
  CustomDropdown2,
  CustomDropdownBody2,
  CustomDropdownItems2,
} from "./ReusableComponents/CustomDropDown2";
import { CustomButton } from "./ReusableComponents/CutomButton";

const data = [
  { id: 0, text: "text1" },
  { id: 1, text: "text2" },
  { id: 2, text: "text3" },
  { id: 3, text: "text4" },
];

function FormTest() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      role: "text2",
    },
  });
  function submit(formData) {
    console.log(formData);
  }
  return (
    <form onSubmit={handleSubmit(submit)}>
      <CustomDropdown2 dropdownOptions={data} id="id" {...register("role")}>
        <CustomDropdownBody2>
          <CustomDropdownItems2 />
        </CustomDropdownBody2>
      </CustomDropdown2>
      <CustomButton>Save</CustomButton>
    </form>
  );
}

export default FormTest;
