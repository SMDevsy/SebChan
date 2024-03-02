import { PrismaClient, Board, Reply, Thread } from "@prisma/client";
import cloudinary from "./cloudinary";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function getBoards(): Promise<Board[]> {
  return await prisma.board.findMany();
}

export async function getBoardByTag(tag: string): Promise<Board> {
  const board = await prisma.board.findFirstOrThrow({
    where: { tag: tag },
  });
  return board;
}

export async function getBoardThreads(board: Board): Promise<Thread[]> {
  const threads = await prisma.thread.findMany({
    where: { boardId: board.id },
  });
  return threads;
}

export async function getBoardOneThread(
  board: Board,
  threadId: string,
): Promise<Thread | null> {
  const thread = await prisma.thread.findUnique({
    where: {
      boardId: board.id,
      id: threadId,
    },
  });
  return thread;
}

export async function getThreadById(threadId: string): Promise<Thread> {
  return await prisma.thread.findFirstOrThrow({
    where: {
      id: threadId,
    },
  });
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

export function getMediaUrl(mediaId: string): string {
  const url = cloudinary.url(mediaId, {
    urlAnalytics: false,
  });
  console.log(`URL from Clodinary: `, url);
  return url;
  // const files = (await readdir("public/images/")).map((f) => path.parse(f));
  // const filename = files.find((f) => f.name == mediaId);
  //return filename ? `public/images/${filename.base}` : null;
}
