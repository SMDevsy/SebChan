import Image from "next/image";
import { Boards } from "../components/boards";
import utilStyles from "../styles/utils.module.css";
import Head from "next/head";
import Link from "next/link";
import Logo from "../components/logo";

const siteTitle = "SebChan";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <Logo />

      <section className="text-2xl">
        <p>SebChan!</p>
        <p>Homepage</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl">Boards</h2>
        <Boards />
      </section>
    </>
  );
}
