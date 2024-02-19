"use server";
import { writeFileSync } from "fs";
import { Thread } from "@prisma/client";
import { addThread, getBoardByTag } from "../../lib/db";
import { ObjectId } from "mongodb";
import { extname } from "path";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { FormState } from "../../components/FormConfig";

const maxMediaSize = 1024 * 1024 * 1; // 1MB;

export default async function submitThread(
  _currentState: FormState,
  formData: FormData,
): Promise<FormState> {
  // Check image size
  const image = formData.get("image") as File;
  const ext = extname(image.name);

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

  const buffer = new Uint8Array(await image.arrayBuffer());
  const path = `public/images/${newThread.mediaId}${ext}`;

  writeFileSync(path, buffer);
  await addThread(newThread);
  revalidatePath("/");
  return {
    message: "",
  };
}
