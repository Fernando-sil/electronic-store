import { IconContext } from "react-icons";
import { TiWarning } from "react-icons/ti";
import {
  CustomDialog,
  CustomDialogBody,
  CustomDialogFooter,
} from "./CustomDialog";
import { CustomButton } from "./CutomButton";
import HeadingElement from "./HeadingElement";

function DeleteModal({
  dialogRef,
  toggleDialog,
  handleDelete,
  objectName,
}: {
  dialogRef: React.RefObject<HTMLDialogElement>;
  toggleDialog: () => void;
  handleDelete: () => void;
  objectName: string;
}) {
  return (
    <CustomDialog
      ref={dialogRef}
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          toggleDialog();
        }
      }}
    >
      <CustomDialogBody className="flex items-center gap-3">
        <IconContext.Provider value={{ className: "text-red-400", size: "70" }}>
          <TiWarning />
        </IconContext.Provider>
        <HeadingElement heading={"h4"}>
          Are you sure you want to delete {objectName}?
        </HeadingElement>
      </CustomDialogBody>
      <CustomDialogFooter>
        <div className="flex gap-3">
          <CustomButton
            size={"small"}
            onClick={toggleDialog}
            className="ml-auto"
          >
            No
          </CustomButton>
          <CustomButton size={"small"} onClick={handleDelete}>
            Yes
          </CustomButton>
        </div>
      </CustomDialogFooter>
    </CustomDialog>
  );
}

export default DeleteModal;
