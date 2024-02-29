"use client";

import { useFormState } from "react-dom";
import FormInput from "./formInput";
import { submitThread } from "../lib/actions";
import { FormState } from "../lib/types";

export default function NewThreadForm(props: {
  boardTag: string;
  initialState: FormState;
}) {
  let [_, formAction] = useFormState(submitThread, props.initialState);
  return (
    <div>
      <form action={formAction}>
        <FormInput label={"Author"} required={false}></FormInput>
        <FormInput label={"Title"} required={false}></FormInput>
        <FormInput label={"Content"} required={true}></FormInput>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          required={true}
        />
        <input name={"boardTag"} type="hidden" value={props.boardTag}></input>
        <button type="submit" className="my-3">
          Submit
        </button>
      </form>
    </div>
  );
}

// export default function PostForm(props: {
//   tag: string;
//   threadId?: string | null;
//   initialState: FormState;
//   formConfig: FormConfig;
// }) {
//   let [state, formAction] = useFormState(
//     props.formConfig.submitAction,
//     props.initialState,
//   );

//   return (
//     <>
//       <form action={formAction}>
//         <input type="hidden" value={props.tag} name="boardTag" readOnly />
//         {/*If it's a reply form, include this information*/}
//         {props.threadId ? (
//           <input
//             type="hidden"
//             value={props.threadId}
//             name="threadId"
//             readOnly
//           />
//         ) : (
//           <></>
//         )}

//         <FormInput label={"Author"} inputType={"input"} required={false} />
//         <FormInput
//           label={"Title"}
//           inputType={"input"}
//           required={props.formConfig.titleRequired}
//         />
//         <FormInput label={"Content"} inputType={"textarea"} required={true} />

//         <div>
//           <label>Image: </label>
//         </div>

//         <button type="submit" className="my-3">
//           Submit
//         </button>
//       </form>
//       <p aria-live="polite" className="text-red-500 sr-only">
//         {state?.message}
//       </p>
//     </>
//   );
// }
