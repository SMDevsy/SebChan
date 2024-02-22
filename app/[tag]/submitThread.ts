"use server";
import { Thread } from "@prisma/client";
import { addThread, getBoardByTag } from "../../lib/db";
import { ObjectId } from "mongodb";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { FormState } from "../../components/FormConfig";
import cloudinary from "../../lib/cloudinary";

const maxMediaSize = 1024 * 1024 * 4; // 4MB;

export default async function submitThread(
  _currentState: FormState,
  formData: FormData,
): Promise<FormState> {
  // Check image size
  const image = formData.get("image") as File;
  //const ext = extname(image.name);

  if (image.size > maxMediaSize) {
    console.error("Image too large");
    return {
      message: "Image too large",
    };
  }

  // Check if the board exists
  // the value is passed as a hidden form input (can't trust it)
  let boardId = "";
  try {
    const tag = formData.get("boardTag") as string;
    boardId = (await getBoardByTag(tag)).id;
  } catch (e) {
    return {
      message: "No such board",
    };
  }

  // get all data and create a Thread
  const [title, author, content] = ["title", "author", "content"].map(
    (s) => formData.get(s) as string,
  );

  const newThread: Thread = {
    id: new ObjectId().toString(),
    author,
    title,
    content,
    createdAt: new Date(Date.now()),
    mediaId: nanoid(),
    boardId,
  };

  console.log(`GENERATED THREAD WITH MEDIAID = ${newThread.mediaId}`);

  const buffer = new Uint8Array(await image.arrayBuffer());
  //const path = `public/images/${newThread.mediaId}${ext}`;
  await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          tags: [],
          public_id: newThread.mediaId,
        },
        function (error, result) {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        },
      )
      .end(buffer);
  });
  await addThread(newThread);
  revalidatePath("/");
  return {
    message: "",
  };
}
