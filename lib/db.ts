import { PrismaClient, Board, Reply, Thread } from "@prisma/client";
import { readdirSync } from "fs";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function getBoards(): Promise<Board[]> {
  console.debug(`Fetching all boards`);
  return await prisma.board.findMany();
}

export async function getBoardByTag(tag: string): Promise<Board> {
  console.debug(`Fetching board with tag ${tag}`);
  const board = await prisma.board.findFirstOrThrow({
    where: { tag: tag },
  });
  return board;
}

export async function getBoardThreads(board: Board): Promise<Thread[]> {
  console.debug(`Fetching Threads for ${board.tag}`);
  const threads = await prisma.thread.findMany({
    where: { boardId: board.id },
  });
  return threads;
}

export async function getThreadReplies(threadId: string): Promise<Reply[]> {
  const replies = await prisma.reply.findMany({
    where: {
      threadId: threadId,
    },
  });
  return replies;
}

export async function addThread(thread: Thread) {
  await prisma.thread.create({
    data: thread,
  });
}

export async function addReply(reply: Reply) {
  await prisma.reply.create({
    data: reply,
  });
}

export function getMediaPath(mediaId: string): string | null {
  const files = readdirSync("public/images/");
  const filename = files.find((filename) => filename.includes(mediaId));
  return filename? `/images/${filename}` : null;
}
