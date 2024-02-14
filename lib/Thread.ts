interface Thread {
  author: string | null;
  title: string | null;
  content: string;
  mediaId: string;
  createdAt: Date;
  replies: Reply[];
}

/**
Thread, but with optional mediaId and without replies
**/
type Reply = Omit<MakeOptional<Thread, "mediaId">, "replies">;
