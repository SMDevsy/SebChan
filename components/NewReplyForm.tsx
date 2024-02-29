"use client";

import { useFormState } from "react-dom";
import FormInput from "./formInput";
import { submitReply } from "../lib/actions";
import { FormState } from "../lib/types";

export default function NewReplyForm(props: {
  threadId: string;
  initialState: FormState;
}) {
  let [_, formAction] = useFormState(submitReply, props.initialState);
  return (
    <div>
      <form action={formAction}>
        <FormInput label={"Author"} required={false}></FormInput>
        <FormInput label={"Content"} required={true}></FormInput>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          required={false}
        />
        <input name="threadId" type="hidden" value={props.threadId}></input>
        <button type="submit" className="my-3">
          Submit
        </button>
      </form>
    </div>
  );
}
