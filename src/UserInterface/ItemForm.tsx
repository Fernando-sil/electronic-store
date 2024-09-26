import {
  useForm,
  useFieldArray,
  UseFormRegister,
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFieldArrayAppend,
} from "react-hook-form";
import CustomInput from "./ReusableComponents/CustomInput";
import CustomTextArea from "./ReusableComponents/CustomTextArea";
import { CustomButton } from "./ReusableComponents/CutomButton";
import Label from "./ReusableComponents/Label";
import CustomGrid from "./ReusableComponents/CustomGrid";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useAddItem } from "../Queries/Items/useAddItem";
import { useAddSpecToItem } from "../Queries/Specs/useAddSpecToItem";
import {
  FromItemFormToUseAddSpecToItem,
  FromUpdateItemToMutateUpdateItem,
} from "../ObjectTypeConversions";
import { useUpdateItem } from "../Queries/Items/useUpdateItem";
import { TItemForm } from "../Types/ProductTypes";
import { GetMultipleOptions } from "../Queries/Generic/GetMultipleOptions";
import { useSubmissionResponse } from "../Hooks";
import { SubmissionMessageBuilder } from "../HelperMethods";
import {
  TDropdownOptions,
  CustomDropdown,
  CustomDropdownBody,
  CustomDropdownItems,
} from "./ReusableComponents/CustomDropdown";

function ItemForm({
  edit = false,
  item,
  id,
}: {
  edit?: boolean;
  item?: TItemForm;
  id?: string;
}) {
  const { data: categories } = useSuspenseQuery(
    GetMultipleOptions("Category/all-categories")
  );
  const { data: brands } = useSuspenseQuery(
    GetMultipleOptions("Brand/all-brands")
  );
  const { addItem, isPending } = useAddItem();
  const { submissionResponse } = useSubmissionResponse();
  const { updateItem, isPending: isPendingUpdate } = useUpdateItem();
  const { addSpecsToItem, isPending: isSpecToItemPending } = useAddSpecToItem();
  const {
    handleSubmit,
    register,
    control,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm<TItemForm>({
    defaultValues: {
      itemName: item?.itemName ?? "",
      description: item?.description ?? "",
      quantity: item?.quantity ?? 0,
      price: item?.price ?? 0,
      score: item?.score ?? 0,
      categoryId: item?.categoryId ?? 0,
      brandId: item?.brandId ?? 0,
      imageUrl: item?.imageUrl ?? "",
      specifications: item?.specifications?.map((spec) => {
        return {
          specificationId: spec.specificationId ?? 0,
          value: spec.value ?? 0,
        };
      }),
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "specifications",
    control,
  });

  function onSubmit(formData: TItemForm) {
    if (edit && id) {
      const specs = FromItemFormToUseAddSpecToItem(formData, id);
      updateItem(FromUpdateItemToMutateUpdateItem(formData, id));
      addSpecsToItem(
        specs,
        submissionResponse(
          `Product ${SubmissionMessageBuilder("update", "success")}`,
          `${SubmissionMessageBuilder("update", "success")} product`,
          "products"
        )
      );
    } else {
      addItem(
        formData,
        submissionResponse(
          `Product ${SubmissionMessageBuilder("create", "success")}`,
          `${SubmissionMessageBuilder("create", "success")} product`,
          "products",
          [reset()]
        )
      );
    }
  }

  function handleChangeDropDown(
    e: React.FormEvent<HTMLDivElement>,
    id: "brandId" | "categoryId" | `specifications.${number}.specificationId`
  ) {
    const targetValues = e.currentTarget.firstElementChild;
    if (targetValues?.textContent === "") return;
    setValue(id, Number(targetValues?.getAttribute("data-value")), {
      shouldDirty: true,
      shouldTouch: true,
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[40rem] flex flex-col gap-3"
    >
      <CustomGrid numberOfCols="custom" className="grid-cols-[2fr_1fr]">
        <div>
          <Label label="Item Name">
            <CustomInput
              type="text"
              {...register("itemName", {
                required: true,
              })}
            />
          </Label>
          {errors.itemName && (
            <p className="text-red-400">This field cannot be empty</p>
          )}
          <Label label="Description">
            <CustomTextArea
              {...register("description", {
                required: true,
                minLength: 10,
              })}
            />
          </Label>
          {errors.description && (
            <p className="text-red-400">
              This field must have at least 10 characters
            </p>
          )}
        </div>
        <div>
          <Label label="Quantity">
            <CustomInput
              type="number"
              {...register("quantity", {
                required: "This field must be greater than 0",
                min: 1,
              })}
            />
          </Label>
          {errors.quantity && (
            <p className="text-red-400">This field must be greater than 0</p>
          )}
          <Label label="Price">
            <CustomInput
              step={0.01}
              type="number"
              {...register("price", {
                required:
                  "This field must be greater than 0 and lower than 15,000",
                min: 1,
                max: 15000,
              })}
            />
          </Label>
          {errors.quantity && (
            <p className="text-red-400">
              This field must be greater than 0 and lower than 15,000
            </p>
          )}
          <Label label="Category">
            <DropDown
              dropdownOptions={categories.data.map((category) => {
                return { id: category.id, text: category.name };
              })}
              defaultValue={
                categories.data.find(
                  (category) => category.id === item?.categoryId
                )?.name
              }
              id={"categoryId"}
              handleChangeDropDown={(e) =>
                handleChangeDropDown(e, "categoryId")
              }
            />
          </Label>
          <Label label="Brand">
            <DropDown
              dropdownOptions={brands.data.map((brand) => {
                return { id: brand.id, text: brand.name };
              })}
              defaultValue={
                brands.data.find((brand) => brand.id === item?.brandId)?.name
              }
              id={"brandId"}
              handleChangeDropDown={(e) => handleChangeDropDown(e, "brandId")}
            />
          </Label>
        </div>
      </CustomGrid>
      <Label label="Image Url">
        <CustomInput type="text" {...register("imageUrl")} />
      </Label>
      {edit && (
        <div>
          <SpecificationItems
            fields={fields}
            register={register}
            remove={remove}
            append={append}
            handleChangeDropDown={handleChangeDropDown}
          />
        </div>
      )}
      <CustomButton
        disabled={
          isPending || isPendingUpdate || isSpecToItemPending || !isDirty
        }
        className="mt-2"
      >
        Submit
      </CustomButton>
    </form>
  );
}

function SpecificationItems({
  fields,
  register,
  remove,
  append,
  handleChangeDropDown,
}: {
  fields: FieldArrayWithId<TItemForm, "specifications", "id">[];
  register: UseFormRegister<TItemForm>;
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<TItemForm, "specifications">;
  handleChangeDropDown: (
    e: React.FormEvent<HTMLDivElement>,
    id: "brandId" | "categoryId" | `specifications.${number}.specificationId`
  ) => void;
}) {
  const { data: specs } = useSuspenseQuery(GetMultipleOptions("specs"));

  return (
    <Label label="Specification">
      {fields.map((field, index) => {
        return (
          <div
            className="grid grid-cols-[2fr_1fr_1fr] gap-2 ml-4"
            key={field.id}
          >
            <Label label="Spec">
              <DropDown
                dropdownOptions={specs.data.map((spec) => {
                  return { id: spec.id, text: spec.name };
                })}
                defaultValue={
                  specs.data.find((spec) => spec.id === field.specificationId)
                    ?.name
                }
                id={`specifications.${index}.specificationId` as const}
                handleChangeDropDown={(e) =>
                  handleChangeDropDown(
                    e,
                    `specifications.${index}.specificationId`
                  )
                }
              />
            </Label>
            <Label label="Value">
              <CustomInput
                type="text"
                {...register(`specifications.${index}.value`)}
              ></CustomInput>
            </Label>
            {index > 0 && (
              <CustomButton
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  remove(index);
                }}
                buttonColor="accent"
                className="self-end"
              >
                Remove
              </CustomButton>
            )}
          </div>
        );
      })}
      <CustomButton
        size="large"
        buttonColor="accent"
        className="m-4"
        onClick={(e) => {
          e.preventDefault();
          append({ specificationId: 0, value: "" });
        }}
      >
        Add spec
      </CustomButton>
    </Label>
  );
}

function DropDown({
  dropdownOptions,
  defaultValue,
  id,
  handleChangeDropDown,
}: {
  dropdownOptions: TDropdownOptions[];
  defaultValue: string | number | readonly string[] | undefined;
  id: "categoryId" | "brandId" | `specifications.${number}.specificationId`;
  handleChangeDropDown: (
    e: React.FormEvent<HTMLDivElement>,
    id: "brandId" | "categoryId" | `specifications.${number}.specificationId`
  ) => void;
}) {
  return (
    <CustomDropdown
      dropdownOptions={dropdownOptions}
      defaultValue={defaultValue}
      id={id}
      onChange={(e) => handleChangeDropDown(e, id)}
    >
      <CustomDropdownBody>
        <CustomDropdownItems />
      </CustomDropdownBody>
    </CustomDropdown>
  );
}

export default ItemForm;
