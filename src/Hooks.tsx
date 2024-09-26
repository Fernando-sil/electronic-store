import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { TIndexing } from "./Types/Types";

export function useSubmissionResponseWithNavigation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const submissionResponseWithNavigation = (
    successMessage: string,
    failMessage: string,
    queryKey: string,
    to: string,
    setters?: void[]
  ) => {
    return {
      onSuccess: () => {
        toast.success(successMessage);
        if (setters) {
          setters.map((method) => method);
        }
        navigate({ to: to });
        return queryClient.invalidateQueries({ queryKey: [queryKey] });
      },
      onError: () => toast.error(failMessage),
    };
  };
  return { submissionResponseWithNavigation };
}
export function useSubmissionResponse() {
  const queryClient = useQueryClient();
  const submissionResponse = (
    successMessage: string,
    failMessage: string,
    queryKey: string,
    setters?: void[]
  ) => {
    return {
      onSuccess: () => {
        toast.success(successMessage);
        if (setters) {
          setters.map((method) => method);
        }
        return queryClient.invalidateQueries({ queryKey: [queryKey] });
      },
      onError: () => toast.error(failMessage),
    };
  };
  return { submissionResponse };
}

export function useToggleModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const toggleDialog = () => {
    if (!dialogRef.current) return;
    return dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };
  function closeDialog(e: React.MouseEvent<HTMLDialogElement, MouseEvent>) {
    if (e.currentTarget === e.target) {
      toggleDialog();
    }
  }
  return { toggleDialog, dialogRef, closeDialog };
}

export function useFormData() {
  const [formData, setFormData] = useState<TIndexing[]>([{ name: "" }]);
  const [error, setError] = useState([-1]);

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
    setFormData([...formData, { name: "" }]);
  }
  function validateForm() {
    const errors = [-1];
    formData.map((data, index) => {
      if (data["name"] === "") {
        if (errors[0] === -1) {
          errors[0] = index;
        } else {
          errors.push(index);
        }
      }
    });
    setError([...errors]);
  }

  return {
    formData,
    setFormData,
    error,
    setError,
    handleChange,
    handleAddFormField,
    handleRemoveFormField,
    validateForm,
  };
}
