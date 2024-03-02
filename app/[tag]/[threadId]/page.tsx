import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getBoardByTag,
  getBoardOneThread,
  getMediaUrl,
  getThreadReplies,
} from "../../../lib/db";
import { Reply } from "@prisma/client";
import NewReplyForm from "../../../components/NewReplyForm";
import ReplyCompontent from "../ReplyCompontent";

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
  const mediaUrl = getMediaUrl(thread.mediaId);

  const replies = await getThreadReplies(thread.id);
  /**
  Massive code duplication, remove later
  **/
  return (
    <div>
      <NewReplyForm threadId={thread.id} initialState={{ message: "" }} />
      <div>
        <h1>{thread.title ?? "Untitled"}</h1>
        <small>{thread.author}</small>
        <br />
        <small>{thread.createdAt.toLocaleString()}</small>
        <div style={{ position: "relative", width: "100%", height: "auto" }}>
          <Image
            src={mediaUrl}
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
          <ReplyCompontent key={r.id} reply={r} />
        ))}
      </div>
    </div>
  );
}
