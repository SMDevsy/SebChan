import { Reply, Thread } from "@prisma/client";
import { getBoardByTag, getBoardThreads, getThreadReplies } from "../../lib/db";

export default async function Board({ params }: { params: { tag: string } }) {
  const board = await getBoardByTag(params.tag);
  const threads = await getBoardThreads(board);
  const threadsWithRepliesPromises = threads.map(async (t: Thread) => {
    const replies = await getThreadReplies(t.id);
    return {
      thread: t,
      replies: replies,
    };
  });
  let threadsWithReplies = await Promise.all(threadsWithRepliesPromises);

  return (
    <>
      <h2>{params.tag}</h2>
      <h4>Threads: {threads.length}</h4>
      <br />
      {threadsWithReplies.map(({ thread, replies }) => (
        <>
          <h3>{thread.title}</h3>
          <small>{thread.author}</small>
          <br />
          <article>{thread.content}</article>
          <br />
          {replies.map((r: Reply) => (
            <div style={{ marginLeft: "3rem" }} key={r.id}>
              <h5>{r.author}</h5>
              {r.content}
              <br />
            </div>
          ))}
        </>
      ))}
    </>
  );
}
