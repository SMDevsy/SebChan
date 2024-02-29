"use server";
import { Reply, Thread } from "@prisma/client";
import { ObjectId } from "mongodb";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { maxMediaSize } from "./const";
import { addReply, addThread, getBoardByTag, getThreadById } from "./db";
import { uploadToCloudinary } from "./cloudinary";

/**
 * Submit a new Thread.
 * This can throw in many ways and should be handled by the caller
 **/
export async function submitThread(formData: FormData) {
  // Check image size
  const image = formData.get("image") as File;

  if (image.size > maxMediaSize) {
    console.error("Image too large");
    throw new Error("Image too large");
  }

  // Check if the board exists
  // the value is passed as a hidden form input (can't trust it)
  const tag = formData.get("boardTag") as string;
  const boardId = (await getBoardByTag(tag)).id;

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

  await Promise.all([
    addThread(newThread),
    uploadToCloudinary(image, newThread.mediaId),
  ]);

  revalidatePath("/[tag]", "page");
  return {
    message: "",
  };
}

export async function submitReply(formData: FormData) {
  // Check image size
  const image = formData.get("image");
  if (image && (image as File).size > maxMediaSize) {
    console.error("Image too large");
    throw new Error("Image too large");
  }

  // the value is passed as a hidden form input (can't trust it to be valid)
  // Check if the thread exists
  const id = formData.get("threadId") as string;
  const threadId = (await getThreadById(id)).id;

  // get all data and create a Thread
  const [author, content] = ["author", "content"].map(
    (s) => formData.get(s) as string,
  );

  const newReply: Reply = {
    id: new ObjectId().toString(),
    author,
    content,
    createdAt: new Date(Date.now()),
    mediaId: image ? nanoid() : null,
    threadId,
  };

  console.log(image);
  // Image is not null, so mediaId is also not null
  if ((image as File).size > 0 && newReply.mediaId) {
    console.info("uploading image");
    await uploadToCloudinary(image as File, newReply.mediaId);
  }
  await addReply(newReply);

  revalidatePath("/[tag]/[threadId]", "page");
}
