import { SubmissionMessageOptions } from "./Constants";
import { TSubmissionMethod, TSubmissionStatus } from "./Types/Types";

export function SubmissionMessageBuilder(
  method: TSubmissionMethod,
  submissionStatus: TSubmissionStatus
) {
  return `${SubmissionMessageOptions[method][submissionStatus]}`;
}
