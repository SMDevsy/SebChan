import { Board, Reply, Thread } from "@prisma/client";
import { getBoardByTag, getBoardThreads, getThreadReplies } from "../../lib/db";
import { NewThreadForm } from "./NewThreadForm";
import ThreadComponent from "./ThreadComponent";
import ReplyCompontent from "./ReplyCompontent";

export default async function BoardDisplay({
  params,
}: {
  params: { tag: string };
}) {
  const board: Board = await getBoardByTag(params.tag);
  const threads: Thread[] = await getBoardThreads(board);

  const threadsWithRepliesPromises = threads.map(async (t: Thread) => {
    const replies: Reply[] = await getThreadReplies(t.id);
    return {
      thread: t,
      replies: replies,
    };
  });

  let threadsWithReplies = await Promise.all(threadsWithRepliesPromises);

  return (
    <>
      <NewThreadForm tag={params.tag} />
      <h2>{params.tag}</h2>
      <h4>Threads: {threads.length}</h4>
      {threadsWithReplies.map(({ thread, replies }) => (
        <div key={thread.id}>
          <ThreadComponent thread={thread} />
          {replies.map((r: Reply) => (
            <ReplyCompontent key={r.id} reply={r} />
          ))}
        </div>
      ))}
    </>
  );
}
