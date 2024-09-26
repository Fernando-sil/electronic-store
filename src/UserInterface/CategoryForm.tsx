import { useLoaderData } from "@tanstack/react-router";
import Label from "./ReusableComponents/Label";
import CustomInput from "./ReusableComponents/CustomInput";
import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CustomButton } from "./ReusableComponents/CutomButton";
import HeadingElement from "./ReusableComponents/HeadingElement";
import { GetMultipleOptions } from "../Queries/Generic/GetMultipleOptions";
import { useGenericAddIdMultiple } from "../Queries/Generic/useGenericAddIdMultiple";
import {
  TGenericForm,
  TGenericFormAddMultiple,
  TGenericIdUpdate,
} from "../Types/Types";
import { useGenericUpdate } from "../Queries/Generic/useGenericUpdate";
import DeleteField from "./ReusableComponents/DeleteField";
import { useSubmissionResponse, useToggleModal } from "../Hooks";
import { SubmissionMessageBuilder } from "../HelperMethods";
import {
  CustomDropdown,
  CustomDropdownBody,
  CustomDropdownItems,
} from "./ReusableComponents/CustomDropdown";

type TComparer = {
  id: number;
}[];

function CategoryForm() {
  const { addGenericIdMultiple } = useGenericAddIdMultiple();
  const { updateGeneric } = useGenericUpdate();
  const { submissionResponse } = useSubmissionResponse();
  const response = useLoaderData({
    from: "/admin/categories/editCategory/$id/",
  });

  const { data: brands } = useSuspenseQuery(
    GetMultipleOptions("Brand/all-brands")
  );
  const ids = response.data.brands.map((element) => element.id);
  const newField = {
    id: brands.data[0].id,
  };
  const initial = response.data.brands.map((element) => {
    return {
      id: element.id,
    };
  });
  const dropDownOptions = brands.data.map((brand) => {
    return { id: brand.id, text: brand.name };
  });
  console.log("called");

  const [formData, setFormData] = useState(initial);
  const [categoryInput, setCategoryInput] = useState(
    response.data.categoryName
  );
  const [hasChanged, setHasChanged] = useState(false);
  const { toggleDialog, dialogRef } = useToggleModal();

  function HandleSelectChange(
    e: React.FormEvent<HTMLDivElement>,
    index: number
  ) {
    const targetValues = e.currentTarget.firstElementChild;
    if (targetValues?.textContent === "") return;
    const data = [...formData];
    data[index]["id"] = Number(targetValues?.getAttribute("data-value"));
    setFormData(data);

    if (!ids.includes(Number(targetValues?.getAttribute("data-value")))) {
      setHasChanged(true);
    } else {
      setHasChanged(false);
    }
  }

  function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // console.log({ formData });

    const categoryId = response.data.id;
    const ids: TGenericIdUpdate[] = formData
      .filter((data) => data.id !== 0)
      .map((brandId) => {
        return {
          id: brandId.id,
        };
      });

    const submitData: TGenericFormAddMultiple<TGenericIdUpdate> = {
      name: ids,
      field: `Category/${categoryId}/add-brand-to-category`,
    };
    if (categoryInput !== response.data.categoryName) {
      const category: TGenericForm = {
        id: categoryId,
        name: { name: categoryInput },
        field: `Category`,
      };
      updateGeneric(category);
    }
    addGenericIdMultiple(
      submitData,
      submissionResponse(
        `Category ${SubmissionMessageBuilder("update", "success")}`,
        `${SubmissionMessageBuilder("update", "fail")} category`,
        ""
      )
    );
  }

  function handleAddField(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setFormData([...formData, newField]);
    setHasChanged(true);
  }

  function HandleRemoveField(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) {
    e.preventDefault();
    const data = [...formData];
    data.splice(index, 1);
    setFormData(data);
    const hasFormDataChanged = haveBrandsChanged(data);
    if (hasFormDataChanged) {
      setHasChanged(true);
    } else {
      setHasChanged(false);
    }
  }

  function HandleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCategoryInput(e.target.value);
    if (e.target.value !== response.data.categoryName) {
      setHasChanged(true);
    } else {
      setHasChanged(false);
    }
  }

  function haveBrandsChanged(data: TComparer) {
    const hasFormDataChanged = ids.map((id) =>
      data.map((element) => element.id).includes(id)
    );
    const haveBrandsUpdated = hasFormDataChanged.some((t) => t === false);
    return haveBrandsUpdated;
  }

  return (
    <section className="space-y-4">
      <HeadingElement>
        Edit Category {response.data.categoryName}
      </HeadingElement>
      <form onSubmit={(e) => HandleSubmit(e)} className="flex flex-col gap-3">
        <Label label="Category">
          <CustomInput
            defaultValue={response.data.categoryName}
            onChange={(e) => HandleInputChange(e)}
          />
        </Label>
        <Label label="Brands" className="flex flex-col gap-2">
          {formData.map((data, index) => (
            <div key={index} className="mx-4 flex items-center gap-3">
              <Label label="Brand" className="w-full">
                <CustomDropdown
                  dropdownOptions={dropDownOptions}
                  defaultValue={
                    brands.data.find((brand) => brand.id === data.id)?.name
                  }
                  onChange={(e) => HandleSelectChange(e, index)}
                  id={`brandId${index}`}
                >
                  <CustomDropdownBody>
                    <CustomDropdownItems />
                  </CustomDropdownBody>
                </CustomDropdown>
              </Label>
              {index > 0 && (
                <CustomButton
                  size={"small"}
                  className="bg-red-500 place-self-end"
                  onClick={(e) => HandleRemoveField(e, index)}
                >
                  Remove
                </CustomButton>
              )}
            </div>
          ))}
        </Label>
        <CustomButton
          buttonColor={"accent"}
          size={"medium"}
          className="ml-4"
          onClick={(e) => handleAddField(e)}
        >
          Add Brand
        </CustomButton>
        <CustomButton className="mt-3" disabled={!hasChanged}>
          Save
        </CustomButton>
      </form>
      <CustomButton onClick={toggleDialog}>Delete Category</CustomButton>
      <DeleteField
        dialogRef={dialogRef}
        toggleDialog={toggleDialog}
        response={{ id: response.data.id, name: response.data.categoryName }}
        classification="Category"
        to="/admin/categories/SearchCategory"
      />
    </section>
  );
}

export default CategoryForm;
