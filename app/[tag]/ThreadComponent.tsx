import { Thread } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { getMediaUrl } from "../../lib/db";

export default async function ThreadComponent(props: {
  thread: Thread;
  boardTag: string;
}) {
  const thread = props.thread;
  console.log(`Media ID = `, thread.mediaId);
  const mediaUrl = getMediaUrl(thread.mediaId);
  console.log(`Media URL = `, mediaUrl);
  //const mediaPath = `http://127.0.0.1:3000/api/images?mediaId=${thread.mediaId}`;
  return (
    <div>
      <Link href={`/${props.boardTag}/${thread.id}`}>
        <h3>{thread.title}</h3>
      </Link>
      {mediaUrl ? (
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
      ) : (
        <div style={{ color: "red" }}>
          <small>No image</small>
          <br />
        </div>
      )}
      <small>{thread.author}</small>
      <br />
      <article>{thread.content}</article>
      <br />
    </div>
  );
}
