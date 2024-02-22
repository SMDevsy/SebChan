import { getBoards } from "../../lib/db";
import { Board } from "@prisma/client";
import Link from "next/link";

export async function Boards() {
  const boards: Board[] = await getBoards();

  return (
    <>
      {boards.map((b) => (
        <div key={b.tag} className="mt-2">
          <Link href={`/${b.tag}`}>
            {b.name}
            <br />
          </Link>
        </div>
      ))}
    </>
  );
}
