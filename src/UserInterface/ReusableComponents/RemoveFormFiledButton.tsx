import { CustomButton } from "./CutomButton";

function RemoveFormFieldButton({
  handleRemoveFormField,
  index,
}: {
  handleRemoveFormField: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => void;
  index: number;
}) {
  return (
    <CustomButton
      className="place-self-end bg-red-500"
      size="small"
      onClick={(e) => handleRemoveFormField(e, index)}
    >
      Delete
    </CustomButton>
  );
}

export default RemoveFormFieldButton;
