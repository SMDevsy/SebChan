import { getBoardThreads } from "../../lib/Board";
import { Thread } from "../../lib/Thread";

export default function Board({ params }: { params: { board: string } }) {
  const threads = getBoardThreads(params.board);

  return (
    <>
      <h1>{params.board}</h1>
      {threads.map((t: Thread) => (
        <>
          <h2>{t.title}</h2>
          <small>{t.author}</small>
          <br />
          <small>{t.createdAt.toLocaleString()}</small>
          <article>{t.content}</article>
          <br />
        </>
      ))}
    </>
  );
}
