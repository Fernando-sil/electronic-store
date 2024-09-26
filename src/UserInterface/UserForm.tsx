import { useForm } from "react-hook-form";
import Label from "./ReusableComponents/Label";
import CustomSelect from "./ReusableComponents/CustomSelect";
import { CustomButton } from "./ReusableComponents/CutomButton";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { GetUserById } from "../Queries/Authentication/GetUserOptions";
import { useUpdateUser } from "../Queries/Authentication/useUpdateUser";
import { TUpdateUserForm } from "../Types/AuthenticationTypes";

type TUserForm = {
  role: string;
  isActive: string;
};

function UserForm({
  userId,
  toggleDialog,
}: {
  userId: string;
  toggleDialog: () => void;
}) {
  const { data: user } = useSuspenseQuery(GetUserById(userId));
  const { updateUser } = useUpdateUser();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<TUserForm>({
    defaultValues: {
      role: user.data.role,
      isActive: user.data.isActive.toString(),
    },
  });

  function handleOnSubmit(formData: TUserForm) {
    const userToUpdate: TUpdateUserForm = {
      id: userId,
      data: {
        role: formData.role,
        isActive: formData.isActive === "true" ? true : false,
      },
    };

    updateUser(userToUpdate, {
      onSuccess: async (response) => {
        reset({
          role: response.data.role,
          isActive: response.data.isActive.toString(),
        });
        toggleDialog();
        return await queryClient.invalidateQueries({
          queryKey: ["user"],
          refetchType: "all",
        });
      },
    });
  }
  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <div className="flex flex-col gap-2">
        <Label label="Role">
          <CustomSelect
            {...register("role", { required: true })}
            variant={"accent"}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </CustomSelect>
          {errors.role && <p className="text-red-500"></p>}
        </Label>
        <Label label="Is Active">
          <CustomSelect
            {...register("isActive", { required: true })}
            variant={"accent"}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </CustomSelect>
          {errors.isActive && <p className="text-red-500"></p>}
        </Label>
      </div>
      <CustomButton disabled={!isDirty}>Save</CustomButton>
    </form>
  );
}

export default UserForm;
