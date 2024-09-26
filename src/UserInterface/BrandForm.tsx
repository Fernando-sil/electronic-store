import { useForm } from "react-hook-form";
import { TCategoryOrBrand, TGenericForm } from "../Types/Types";
import { IconContext } from "react-icons";
import { CiEdit } from "react-icons/ci";
import { FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CustomCard, CustomCardBody } from "./ReusableComponents/CustomCard";
import CustomInput from "./ReusableComponents/CustomInput";
import HeadingElement from "./ReusableComponents/HeadingElement";
import Label from "./ReusableComponents/Label";
import { useState } from "react";
import { useGenericUpdate } from "../Queries/Generic/useGenericUpdate";
import DeleteField from "./ReusableComponents/DeleteField";
import { useQueryClient } from "@tanstack/react-query";
import { SubmissionMessageBuilder } from "../HelperMethods";
import { toast } from "react-toastify";
import { useToggleModal } from "../Hooks";

function BrandForm({
  brand,
  field,
}: {
  brand: TCategoryOrBrand;
  field: string;
}) {
  const { updateGeneric } = useGenericUpdate();
  const { toggleDialog, dialogRef } = useToggleModal();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm<TCategoryOrBrand>({
    defaultValues: {
      name: brand.name,
      imageUrl: brand.imageUrl ?? "",
      isPopular: brand.isPopular ?? false,
    },
  });
  const [editName, setEditName] = useState(false);
  const queryClient = useQueryClient();

  function onSubmit(formData: TCategoryOrBrand) {
    const updateData: TGenericForm = {
      id: brand.id,
      name: formData,
      field: field,
    };
    updateGeneric(updateData, {
      onSuccess: async (response) => {
        setEditName(false);
        reset(response.data);
        toast.success(`Brand ${SubmissionMessageBuilder("update", "success")}`);
        return await queryClient.invalidateQueries({
          queryKey: ["Brand/all-brands"],
          refetchType: "all",
        });
      },
      onError: () =>
        toast.error(`${SubmissionMessageBuilder("update", "fail")} brand`),
    });
  }

  return (
    <>
      <CustomCard size={"full"} key={brand.id}>
        <CustomCardBody>
          <form
            className="flex justify-between items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              {editName ? (
                <Label label="Brand">
                  <CustomInput
                    variant={"secondary"}
                    type="text"
                    // autoFocus
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <p className="text-red-500">This field is required</p>
                  )}
                </Label>
              ) : (
                <HeadingElement heading={"h3"}>{brand.name}</HeadingElement>
              )}
              {editName && (
                <Label label="Image Url">
                  <CustomInput
                    variant={"secondary"}
                    type="text"
                    // autoFocus
                    {...register("imageUrl")}
                  />
                </Label>
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
                    {...register("isPopular")}
                  />{" "}
                  Is popular
                </Label>
              )}
            </div>
            <div className="flex flex-col gap-3 ml-2">
              <IconContext.Provider
                value={{
                  className: `cursor-pointer ${editName === true ? "text-gold-100" : "text-gold-400"}`,
                  size: "25",
                }}
              >
                <CiEdit onClick={() => setEditName(!editName)} />
              </IconContext.Provider>
              <IconContext.Provider
                value={{ className: "cursor-pointer text-red-500", size: "25" }}
              >
                <MdDelete onClick={toggleDialog} />
              </IconContext.Provider>
              {isDirty && (
                <IconContext.Provider
                  value={{
                    className: "cursor-pointer text-green-500",
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
      <DeleteField
        dialogRef={dialogRef}
        toggleDialog={toggleDialog}
        response={{ id: brand.id, name: brand.name }}
        classification="Brand"
        to="/admin/brands/editBrands"
      />
    </>
  );
}

export default BrandForm;
