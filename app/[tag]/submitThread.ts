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

  const buffer = await image.arrayBuffer();
  var mime = image.type;
  var encoding = "base64";
  var base64Data = Buffer.from(buffer).toString("base64");
  var fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

  try {
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload(fileUri, {
            invalidate: true,
            public_id: newThread.mediaId,
          })
          .then((result) => {
            console.log(result);
            resolve(result);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    };
    await uploadToCloudinary();
  } catch (error) {
    console.log("server error", error);
    return {
      message: "Internal Server Error",
    };
  }

  console.log(`uploaded picture`);
  await addThread(newThread);
  console.log(`added thread`);
  revalidatePath("/");
  return {
    message: "",
  };
}
