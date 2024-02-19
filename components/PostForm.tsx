"use client";

import { useFormState } from "react-dom";
import submitThread from "../app/[tag]/submitThread";
import submitReply from "../app/[tag]/[threadId]/submitReply";
import { FormState } from "./FormConfig";

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

export default function PostForm(props: {
  tag: string;
  threadId?: string | null;
  initialState: FormState;
  formConfig: FormConfig;
}) {
  console.log(props);

  let [state, formAction] = useFormState(
    props.formConfig.submitAction,
    props.initialState,
  );

  return (
    <>
      <form action={formAction}>
        <input type="hidden" value={props.tag} name="boardTag" readOnly />
        {/*If it's a reply form, include this information*/}
        {props.threadId ? (
          <input
            type="hidden"
            value={props.threadId}
            name="threadId"
            readOnly
          />
        ) : (
          <></>
        )}
        <div>
          <label>Author </label>
          <input type="text" name="author" required={false} />
        </div>

        <div>
          <label>Title </label>
          <input
            type="text"
            name="title"
            required={props.formConfig.titleRequired}
          />
        </div>

        <div>
          <label>Content </label>
          <textarea name="content" required={true} />
        </div>

        <div>
          <label>Image </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            required={props.formConfig.mediaRequired}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
      <p aria-live="polite" className="sr-only" style={{ color: "red" }}>
        {state?.message}
      </p>
    </>
  );
}
