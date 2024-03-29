import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const name = "SebChan";
const siteTitle = "SebChan";

export const metadata: Metadata = {
  title: {
    default: "SebChan",
    template: "%s | SebChan",
  },
  description: "Your modern imageboard",
};

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <div className="container px-2 mt-12 mb-24 md">
          <Head>
            <title>{siteTitle}</title>
            <link rel="icon" href="/favicon.ico" />
            <meta name="description" content="A modern imageboard" />
            <meta
              property="og:image"
              content={`https://og-image.vercel.app/${encodeURI(
                siteTitle,
              )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
            />
            <meta name="og:title" content={siteTitle} />
            <meta name="twitter:card" content="summary_large_image" />
          </Head>

          {children}
        </div>
      </body>
    </html>
  );
}
