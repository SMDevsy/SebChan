import { Board, Reply, Thread } from "@prisma/client";
import { getBoardByTag, getBoardThreads, getThreadReplies } from "../../lib/db";
//import { NewThreadForm } from "./NewThreadForm.1";
import ThreadComponent from "./ThreadComponent";
import ReplyCompontent from "./ReplyCompontent";
import { Metadata } from "next";
import PostForm from "../../components/PostForm";
import { FormConfigs, FormState } from "../../components/FormConfig";

const initialState: FormState = {
  message: "",
};

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

  //<NewThreadForm tag={params.tag} />
  return (
    <>
      <PostForm
        tag={params.tag}
        formConfig={FormConfigs.NewThread}
        initialState={initialState}
        threadId={null}
      />
      <h2>{params.tag}</h2>
      <h4>Threads: {threads.length}</h4>
      {threadsWithReplies.map(({ thread, replies }) => (
        <div key={thread.id}>
          <ThreadComponent thread={thread} boardTag={params.tag} />
          {replies.map((r: Reply) => (
            <ReplyCompontent key={r.id} reply={r} />
          ))}
        </div>
      ))}
    </>
  );
}

export async function generateMetadata({ params: { tag } }): Promise<Metadata> {
  return {
    title: tag,
  };
}
