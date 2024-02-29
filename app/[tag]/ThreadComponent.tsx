import { Thread } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { getMediaUrl } from "../../lib/db";

export default async function ThreadComponent(props: {
  thread: Thread;
  boardTag: string;
}) {
  const thread = props.thread;
  const mediaUrl = getMediaUrl(thread.mediaId);

  return (
    <div>
      <Link href={`/${props.boardTag}/${thread.id}`}>
        <h3>{thread.title}</h3>
        <div style={{ position: "relative", width: "30%", height: "auto" }}>
          <Image
            src={mediaUrl}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }} // optional
            alt="thread image"
          />
        </div>
      </Link>
      <small>{thread.author}</small>
      <br />
      <article>{thread.content}</article>
      <br />
    </div>
  );
}
