import { Thread } from "./Thread";
import { db } from "./db";

export default interface Board {
  tag: string;
  name: string;
  description: string;
  threads: Thread[];
}

export function getBoards(): string[] {
  return Object.keys(db);
}

export function getBoardThreads(tag: string): Thread[] {
  const board = db.find((b: Board) => b.tag === tag);
  return board?.threads ?? [];
}
