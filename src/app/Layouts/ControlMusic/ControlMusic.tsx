"use client";
import classNames from "classnames/bind";
import styles from "./ControlMusic.module.scss";
import MediaSong from "@/components/MediaSong/MediaSong";
import {
  MVIcon,
  MicroIcon,
  NextIcon,
  PlayIcon,
  PrevIcon,
  RandomIcon,
  RepeatIcon,
  SoundIcon,
} from "@/components/Icons";
import Tippy from "@tippyjs/react";
import ControlMiddle from "./ControlMiddle";
import useGetDataInfoSong from "@/components/hooks/useGetDataInfoSong";
import ControlRight from "./ControlRight";
import { useContext, useEffect, useState } from "react";
import { MusicContext } from "@/components/ContextMusic/ContextMusic";
import Image from "next/image";
import images from "@/assets/images/images";
import TitlePage from "@/components/TitlePage/TitlePage";

const cx = classNames.bind(styles);
function ControlMusic() {
  const { data } = useGetDataInfoSong();
  const { dataStorage, setDataStorage } = useContext(MusicContext);
  useEffect(() => {
    const storedData = localStorage.getItem("currentSong");
    if (storedData) {
      setDataStorage(JSON.parse(storedData));
    }
  }, [setDataStorage]);

  const songData = data?.data ? data?.data : dataStorage;

  return (
    <div className={cx("wrapper")}>
      <div className={cx("control-left")}>
        {songData ? (
          <MediaSong data={songData} control={"control"} />
        ) : (
          <div className={cx("control-null")}>
            <Image src={images.logo} width={80} height={80} alt="imag-avt" />
            <span className={cx("control-null-des")}>
              Hãy chọn 1 bài nhạc nhé ^.^
            </span>
          </div>
        )}
      </div>
      <div>
        <ControlMiddle />
      </div>
      <div className={cx("control-right")}>
        <ControlRight />
      </div>
    </div>
  );
}

export default ControlMusic;
