import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getBoardByTag,
  getBoardOneThread,
  getThreadReplies,
} from "../../../lib/db";
import { Reply } from "@prisma/client";
import PostForm from "../../../components/PostForm";
import { FormConfigs, FormState } from "../../../components/FormConfig";

const initialState: FormState = {
  message: "",
};

export default async function ThreadFullComponent({
  params,
}: {
  params: { tag: string; threadId: string };
}) {
  const board = await getBoardByTag(params.tag);
  const thread = await getBoardOneThread(board, params.threadId);
  if (!thread) {
    notFound();
  }

  // thread is valid, so it has a valid mediaId
  const mediaPath = `http://127.0.0.1:3000/api/images?mediaId=${thread.mediaId}`;

  const replies = await getThreadReplies(thread.id);
  /**
  Massive code duplication, remove later
  **/
  return (
    <div>
      <PostForm
        tag={params.tag}
        threadId={params.threadId}
        formConfig={FormConfigs.NewReply}
        initialState={initialState}
      />
      <div>
        <h1>{thread.title ?? "Untitled"}</h1>
        <small>{thread.author}</small>
        <br />
        <small>{thread.createdAt.toLocaleString()}</small>
        <div style={{ position: "relative", width: "100%", height: "auto" }}>
          <Image
            src={mediaPath}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }} // optional
            alt="thread image"
          />
        </div>
        <article>{thread.content}</article>
      </div>
      <div>
        {replies.map((r: Reply) => (
          <>{r.content}</>
        ))}
      </div>
    </div>
  );
}
