import { useGenericDelete } from "../../Queries/Generic/useGenericDelete";
import DeleteModal from "./DeleteModal";
import {
  useSubmissionResponse,
  useSubmissionResponseWithNavigation,
} from "../../Hooks";
import { SubmissionMessageBuilder } from "../../HelperMethods";

function DeleteField({
  dialogRef,
  toggleDialog,
  response,
  classification,
  to,
}: {
  dialogRef: React.RefObject<HTMLDialogElement>;
  toggleDialog: () => void;
  response: { id: number; name: string };
  classification: string;
  to?: string;
}) {
  const { deleteGeneric } = useGenericDelete();
  const { submissionResponse } = useSubmissionResponse();
  const { submissionResponseWithNavigation } =
    useSubmissionResponseWithNavigation();
  const queryKeyEndPoint =
    classification === "Category" ? "all-categories" : "all-brands";

  function handleDeleteCategory() {
    if (to !== undefined) {
      deleteGeneric(
        `${classification}/${response.id}`,
        submissionResponseWithNavigation(
          `${classification} ${SubmissionMessageBuilder("delete", "success")}`,
          `${SubmissionMessageBuilder("delete", "fail")} ${classification} `,
          `${classification}/${queryKeyEndPoint}`,
          to
        )
      );
    } else {
      deleteGeneric(
        `${classification}/${response.id}`,
        submissionResponse(
          `${classification} ${SubmissionMessageBuilder("delete", "success")}`,
          `${SubmissionMessageBuilder("delete", "fail")} ${classification} `,
          `${classification}/${queryKeyEndPoint}`
        )
      );
    }
  }
  return (
    <DeleteModal
      dialogRef={dialogRef}
      toggleDialog={toggleDialog}
      handleDelete={handleDeleteCategory}
      objectName={response.name}
    />
  );
}

export default DeleteField;
