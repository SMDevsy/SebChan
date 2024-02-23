"use client";
import styles from "./style.module.css";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Logo = () => {
  const noHoverUrl = "/niemabazyWojak.png";
  const hoverUrl = "/jestbazaWojak.png";

  const [imageUrl, setImageUrl] = useState(noHoverUrl);
  const [audio, setAudio] = useState(null as any);

  useEffect(() => {
    const audio = new Audio("badToTheBone.mp3");
    audio.load();
    setAudio(audio); // only call client
  }, []);

  function play() {
    if (audio.readyState === 4) {
      audio.play();
      setImageUrl(hoverUrl);
    }
  }
  function stop() {
    audio.pause();
    setImageUrl(noHoverUrl);
    audio.currentTime = 0;
  }
  return (
    <>
      <header>
        <Link href={"/"} className="flex flex-col items-center">
          <Image
            className={styles.logo}
            onMouseEnter={play}
            onMouseLeave={stop}
            src={imageUrl}
            //fill={true}
            height={144}
            width={144}
            alt=""
          />
          <h1 className="my-2 text-5xl font-bold">SebChan</h1>
        </Link>
      </header>
    </>
  );
};

export default Logo;
