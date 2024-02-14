/**
Defines interface for fetching data from our remote DB.
For now it's mock data.
 **/

import { LoremIpsum } from "lorem-ipsum";
import Board from "./Board";
import { Reply, Thread } from "./Thread";
const lorem = new LoremIpsum();

function dec2hex(dec: number): string {
  return dec.toString(16).padStart(2, "0");
}

function randStr(len: number): string {
  let arr = new Uint8Array(len);
  crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
}

function getRandomReply(): Reply {
  return {
    author: randStr(10),
    title: randStr(20),
    content: lorem.generateSentences(3),
    createdAt: new Date(Date.now()),
    mediaId: Math.random() > 0.4 ? randStr(5) : undefined,
  };
}

function getRandomReplies(num: number): Reply[] {
  return Array(num)
    .fill(null)
    .map(() => getRandomReply());
}

function getRandomThread(): Thread {
  const numOfReplies = Math.floor(Math.random() * 10);
  return {
    author: randStr(10),
    title: randStr(20),
    content: lorem.generateSentences(3),
    createdAt: new Date(Date.now()),
    mediaId: randStr(5),
    replies: getRandomReplies(numOfReplies),
  };
}

function getRandomBoard(): Board {
  const name = randStr(6);
  const threads = Array(5)
    .fill(null)
    .map(() => getRandomThread());

  return {
    tag: name.substring(0, 3),
    name: name,
    description: lorem.generateSentences(1),
    threads: threads,
  };
}

function getMockBoards(): Board[] {
  return Array(3)
    .fill(null)
    .map(() => getRandomBoard());
}

export const db: Board[] = getMockBoards();
