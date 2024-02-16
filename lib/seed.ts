import { Board, Reply, Thread } from "@prisma/client";
import { addReply, addThread, getBoards } from "./db";
import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum();

function randomThread(boardId: string) {
  const t: Thread = {
    id: randStr(12),
    author: randStr(15),
    title: lorem.generateWords(1),
    content: lorem.generateParagraphs(1),
    mediaId: randStr(5),
    createdAt: new Date(Date.now()),
    boardId,
  };
  return t;
}

function randomReply(threadId: string) {
  const r: Reply = {
    id: randStr(12),
    author: randStr(15),
    content: lorem.generateSentences(2),
    createdAt: new Date(Date.now()),
    mediaId: Math.random() > 0.4 ? randStr(5) : null,
    threadId,
  };
  return r;
}

export async function seedDb() {
  console.info("SEEDING DATABASE");
  const boardIds = (await getBoards()).map((b: Board) => b.id);
  for (let i = 0; i < 20; i++) {
    for (const id of boardIds) {
      const t = randomThread(id);
      for (let j = 0; j < 4; j++) {
        const r = randomReply(t.id);
        await addReply(r);
      }
      await addThread(t);
    }
  }
  console.info("SEEDED DATABASE");
}

function dec2hex(dec: number): string {
  return dec.toString(16).padStart(2, "0");
}

function randStr(len: number): string {
  let arr = new Uint8Array(len);
  crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
}
