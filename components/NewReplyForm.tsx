"use client";

import FormInput from "./formInput";
import { submitReply } from "../lib/actions";
import { FormState } from "../lib/types";
import { useRef } from "react";

export default function NewReplyForm(props: {
  threadId: string;
  initialState: FormState;
}) {
  let ref = useRef<HTMLFormElement>(null);
  return (
    <div>
      <form
        action={async (formData) => {
          await submitReply(formData);
          ref.current?.reset();
        }}
        ref={ref}
      >
        <FormInput label={"Author"} required={false}></FormInput>
        <FormInput
          label={"Content"}
          required={true}
          inputType="textarea"
        ></FormInput>
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
