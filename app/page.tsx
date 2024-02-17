import utilStyles from "../styles/utils.module.css";
import Head from "next/head";
import Link from "next/link";
import { getBoards } from "../lib/db";
import { Board } from "@prisma/client";

const siteTitle = "SebChan";

export default async function HomePage() {
  const boards: Board[] = await getBoards();

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>SebChan!</p>
        <p>Homepage</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Boards</h2>
      </section>

      {boards.map((b) => (
        <>
          <h1>
            <Link key={b.tag} href={`/${b.tag}`}>
              {b.name + "\n"}
            </Link>
          </h1>
        </>
      ))}
    </>
  );
}
