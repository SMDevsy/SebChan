import { Thread } from "@prisma/client";
import Image from "next/image";
import { getMediaPath } from "../../lib/db";

export default async function ThreadComponent(props: { thread: Thread }) {
  const thread = props.thread;
  const mediaPath = getMediaPath(thread.mediaId);
  return (
    <div>
      <h3>{thread.title}</h3>
      {mediaPath ? (
        <div style={{ position: "relative", width: "30%", height: "auto" }}>
          <Image
            src={mediaPath}
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
