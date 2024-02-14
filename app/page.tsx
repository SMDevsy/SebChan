import utilStyles from "../styles/utils.module.css";
import Head from "next/head";
import Board from "../lib/Board";
import Link from "next/link";
import { db } from "../lib/db";

const boards = db;
const siteTitle = "SebChan";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>SebChan!</p>
        <p> Homepage </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Boards</h2>
      </section>

      {boards.map((b: Board) => (
        <>
          <h1>
            <Link key={b.tag} href={`/${b.tag}`}>
              {b.tag + "\n"}
            </Link>
          </h1>
          <br />
        </>
      ))}
    </>
  );
}
