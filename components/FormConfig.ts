import submitReply from "../app/[tag]/[threadId]/submitReply";
import submitThread from "../app/[tag]/submitThread";

export type FormState = {
  message: string;
};

export type SubmitServerAction = (
  currentState: FormState,
  formData: FormData,
) => Promise<FormState>;

export interface FormConfig {
  readonly titleRequired: boolean;
  readonly mediaRequired: boolean;
  readonly submitAction: SubmitServerAction;
  readonly message: string;
}

export const FormConfigs: {
  NewThread: FormConfig;
  NewReply: FormConfig;
} = {
  NewThread: {
    titleRequired: false,
    mediaRequired: true,
    submitAction: submitThread,
    message: "",
  },
  NewReply: {
    titleRequired: false,
    mediaRequired: false,
    submitAction: submitReply,
    message: "",
  },
};
