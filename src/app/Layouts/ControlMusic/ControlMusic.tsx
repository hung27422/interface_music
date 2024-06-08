"use client";
import classNames from "classnames/bind";
import styles from "./ControlMusic.module.scss";
import MediaSong from "@/components/MediaSong/MediaSong";
import ControlMiddle from "./ControlMiddle";
import useGetDataInfoSong from "@/hooks/api/useGetDataInfoSong";
import ControlRight from "./ControlRight";
import { useContext, useEffect, useState } from "react";
import { MusicContext } from "@/components/ContextMusic/ContextMusic";
import Image from "next/image";
import images from "@/assets/images/images";
import { isEmpty } from "lodash";

const cx = classNames.bind(styles);
function ControlMusic() {
  const { data } = useGetDataInfoSong();
  const { dataStorage, setDataStorage } = useContext(MusicContext);
  useEffect(() => {
    const storedData = localStorage.getItem("currentSong");
    if (storedData) {
      try {
        setDataStorage(JSON.parse(storedData));
      } catch (err) {
        console.log(err);
      }
    }
  }, [setDataStorage]);

  const songData = data?.msg === "Success" ? data?.data : dataStorage;

  return (
    <div className={cx("wrapper")}>
      <div className={cx("control-left")}>
        {isEmpty(songData) ? (
          <div className={cx("control-null")}>
            <Image src={images.logo} width={80} height={80} alt="imag-avt" />
            <span className={cx("control-null-des")}>
              Hãy chọn 1 bài nhạc nhé ^.^
            </span>
          </div>
        ) : (
          <MediaSong data={songData} control={"control"} />
        )}
      </div>
      <div>
        <ControlMiddle />
      </div>
      <div className={cx("control-right")}>
        <ControlRight data={songData} />
      </div>
    </div>
  );
}

export default ControlMusic;
