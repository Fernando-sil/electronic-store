import { IconContext } from "react-icons";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { CustomCard, CustomCardBody } from "./ReusableComponents/CustomCard";
import CustomInput from "./ReusableComponents/CustomInput";
import HeadingElement from "./ReusableComponents/HeadingElement";
import { useState } from "react";
import { TCategoryOrBrand, TGenericForm } from "../Types/Types";
import { FaSave } from "react-icons/fa";
import { useGenericUpdate } from "../Queries/Generic/useGenericUpdate";
import Label from "./ReusableComponents/Label";
import { useGenericDelete } from "../Queries/Generic/useGenericDelete";
import { useLocation } from "@tanstack/react-router";
import DeleteModal from "./ReusableComponents/DeleteModal";
import {
  useSubmissionResponse,
  useSubmissionResponseWithNavigation,
  useToggleModal,
} from "../Hooks";
import { SubmissionMessageBuilder } from "../HelperMethods";

function DisplayCard({
  brand,
  field,
}: {
  brand: TCategoryOrBrand;
  field: string;
}) {
  const { updateGeneric } = useGenericUpdate();
  const { deleteGeneric } = useGenericDelete();
  const { submissionResponse } = useSubmissionResponse();
  const { submissionResponseWithNavigation } =
    useSubmissionResponseWithNavigation();
  const { pathname } = useLocation();
  const [editName, setEditName] = useState(false);
  const [name, setName] = useState(brand.name);
  const [save, setSave] = useState(false);
  const [checked, setChecked] = useState(brand.isPopular ?? false);
  const { toggleDialog, dialogRef } = useToggleModal();

  function saveState(expression: boolean) {
    if (expression) {
      setSave(true);
    } else {
      setSave(false);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setName(e.target.value);
    saveState(e.target.value !== brand.name);
  }
  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") setEditName(false);
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const test =
      field === "Brand" ? { name: name, isPopular: checked } : { name: name };
    const data: TGenericForm = {
      id: brand.id,
      name: test,
      field: field,
    };

    updateGeneric(
      data,
      submissionResponse(
        `${field} ${SubmissionMessageBuilder("update", "success")}`,
        `${SubmissionMessageBuilder("update", "fail")} ${field}`,
        "",
        [setEditName(false), setSave(false)]
      )
    );
  }
  function handleCheckBox(e: React.ChangeEvent<HTMLInputElement>) {
    const checkBox = e.target.checked;
    setChecked(checkBox);
    saveState(checkBox !== brand.isPopular);
  }
  function handleDelete() {
    deleteGeneric(
      `${field}/${brand.id}`,
      submissionResponseWithNavigation(
        `${field} ${SubmissionMessageBuilder("delete", "success")}`,
        `${SubmissionMessageBuilder("delete", "fail")} ${field}`,
        field,
        pathname,
        [toggleDialog()]
      )
    );
    // deleteGeneric(`${field}/${brand.id}`, {
    //   onSuccess: async () => {
    //     toggleDialog();
    //     navigate({ to: pathname });
    //     return await queryClient.invalidateQueries({
    //       queryKey: ["field"],
    //       refetchType: "all",
    //     });
    //   },
    // });
  }
  return (
    <>
      <CustomCard size={"full"} key={brand.id}>
        <CustomCardBody>
          <form
            className="flex justify-between items-center"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div>
              {editName ? (
                <CustomInput
                  name="name"
                  variant={"secondary"}
                  type="text"
                  value={name}
                  onChange={(e) => handleInputChange(e)}
                  onKeyDown={(e) => handleKeyPress(e)}
                  autoFocus
                />
              ) : (
                <HeadingElement heading={"h3"}>{name}</HeadingElement>
              )}
              {field === "Brand" && (
                <Label
                  label=""
                  className="flex gap-2 items-center text-rose-gold-200"
                >
                  <CustomInput
                    type="checkbox"
                    variant={"primary"}
                    className="w-auto"
                    onChange={handleCheckBox}
                    checked={checked}
                  />{" "}
                  Is popular
                </Label>
              )}
            </div>
            <div className="flex flex-col gap-3 ml-2">
              <IconContext.Provider
                value={{
                  className: "text-gold-400 cursor-pointer",
                  size: "25",
                }}
              >
                <CiEdit onClick={() => setEditName(!editName)} />
              </IconContext.Provider>
              <IconContext.Provider
                value={{ className: "text-red-500 cursor-pointer", size: "25" }}
              >
                <MdDelete onClick={toggleDialog} />
              </IconContext.Provider>
              {save && (
                <IconContext.Provider
                  value={{
                    className: "text-green-500 cursor-pointer",
                    size: "25",
                  }}
                >
                  <button>
                    <FaSave />
                  </button>
                </IconContext.Provider>
              )}
            </div>
          </form>
        </CustomCardBody>
      </CustomCard>
      <DeleteModal
        dialogRef={dialogRef}
        toggleDialog={toggleDialog}
        handleDelete={handleDelete}
        objectName={brand.name}
      />
    </>
  );
}

export default DisplayCard;
