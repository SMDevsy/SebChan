// import { MakeOptional } from "./types";

// export interface Thread {
//   id: number;
//   author: string | null;
//   title: string | null;
//   content: string;
//   mediaId: string;
//   createdAt: Date;
//   replies: Reply[];
// }

// /**
// Thread, but with optional mediaId and without replies
// **/
// export type Reply = Omit<MakeOptional<Thread, "mediaId">, "replies">;

// const newThread: Thread = {
//   id: new ObjectId().toString(),
//   author: "anonymous",
//   title: loremIpsum(),
//   content: loremIpsum(),
//   createdAt: new Date(Date.now()),
//   boardId: board.id,
//   mediaId: "mediaId",
// };

// console.log(newThread);
// addThread(newThread);
