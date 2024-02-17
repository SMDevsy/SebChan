import { Reply } from "@prisma/client";

export default async function ReplyCompontent(props: { reply: Reply }) {
  const reply = props.reply;
  return (
    <div>
      <div style={{ marginLeft: "3rem" }} key={reply.id}>
        <h5>{reply.author}</h5>
        {reply.content}
        <br />
      </div>
    </div>
  );
}
