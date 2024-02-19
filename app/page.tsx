import { Boards } from "../components/boards";
import utilStyles from "../styles/utils.module.css";
import Head from "next/head";

const siteTitle = "SebChan";

export default function HomePage() {
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
        <Boards />
      </section>
    </>
  );
}
