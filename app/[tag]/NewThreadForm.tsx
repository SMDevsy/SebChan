"use client";
import { useFormState } from "react-dom";
import submitThread from "./submitThread";

export type FormState = {
  message: string;
};
const initialState: FormState = {
  message: "",
};

export function NewThreadForm(params: { tag: string }) {
  let [state, formAction] = useFormState(submitThread, initialState);

  return (
    <>
      <h2>Start a new thread</h2>

      <form action={formAction}>
        <input type="hidden" value={params.tag} name="boardTag" readOnly />
        <div>
          <label>Author </label>
          <input type="text" name="author" />
        </div>

        <div>
          <label>Title </label>
          <input type="text" name="title" />
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
            required={true}
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
