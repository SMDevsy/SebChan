"use server";

import { FormState } from "../../../components/FormConfig";

const maxMediaSize = 1024 * 1024 * 1; // 1MB;

export default async function submitReply(
  _currentState: FormState,
  formData: FormData,
): Promise<FormState> {
  // Check image size
  return {
    message: "Submitted Reply",
  };
}
